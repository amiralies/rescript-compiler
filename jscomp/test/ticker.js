'use strict';

var List = require("../../lib/js/list.js");
var Block = require("../../lib/js/block.js");
var Curry = require("../../lib/js/curry.js");
var Printf = require("../../lib/js/printf.js");
var $$String = require("../../lib/js/string.js");
var Caml_obj = require("../../lib/js/caml_obj.js");
var Pervasives = require("../../lib/js/pervasives.js");
var Caml_format = require("../../lib/js/caml_format.js");
var Caml_option = require("../../lib/js/caml_option.js");
var Caml_primitive = require("../../lib/js/caml_primitive.js");
var Caml_js_exceptions = require("../../lib/js/caml_js_exceptions.js");

function split(delim, s) {
  var len = s.length;
  if (len !== 0) {
    var _l = /* [] */0;
    var _i = len;
    while(true) {
      var i = _i;
      var l = _l;
      if (i === 0) {
        return l;
      }
      var i$prime;
      try {
        i$prime = $$String.rindex_from(s, i - 1 | 0, delim);
      }
      catch (raw_exn){
        var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
        if (exn.RE_EXN_ID === "Not_found") {
          return /* :: */{
                  _0: $$String.sub(s, 0, i),
                  _1: l
                };
        }
        throw exn;
      }
      var l_000 = $$String.sub(s, i$prime + 1 | 0, (i - i$prime | 0) - 1 | 0);
      var l$1 = /* :: */{
        _0: l_000,
        _1: l
      };
      var l$2 = i$prime === 0 ? /* :: */({
            _0: "",
            _1: l$1
          }) : l$1;
      _i = i$prime;
      _l = l$2;
      continue ;
    };
  } else {
    return /* [] */0;
  }
}

function string_of_float_option(x) {
  if (x !== undefined) {
    return Pervasives.string_of_float(x);
  } else {
    return "nan";
  }
}

var Util = {
  split: split,
  string_of_float_option: string_of_float_option
};

function string_of_rank(i) {
  if (typeof i === "number") {
    if (i !== 0) {
      return "Visited";
    } else {
      return "Uninitialized";
    }
  } else {
    return Curry._1(Printf.sprintf(/* Format */{
                    _0: /* String_literal */{
                      tag: 11,
                      _0: "Ranked(",
                      _1: /* Int */{
                        tag: 4,
                        _0: /* Int_i */3,
                        _1: /* No_padding */0,
                        _2: /* No_precision */0,
                        _3: /* Char_literal */{
                          tag: 12,
                          _0: /* ")" */41,
                          _1: /* End_of_format */0
                        }
                      }
                    },
                    _1: "Ranked(%i)"
                  }), i._0);
  }
}

function find_ticker_by_name(all_tickers, ticker) {
  return List.find((function (param) {
                return param.ticker_name === ticker;
              }), all_tickers);
}

function print_all_composite(all_tickers) {
  return List.iter((function (param) {
                if (param.type_) {
                  console.log(param.ticker_name);
                  return ;
                }
                
              }), all_tickers);
}

function height(param) {
  if (param) {
    return param.h;
  } else {
    return 0;
  }
}

function create(l, x, d, r) {
  var hl = height(l);
  var hr = height(r);
  return /* Node */{
          l: /* l */l,
          v: /* v */x,
          d: /* d */d,
          r: /* r */r,
          h: /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function singleton(x, d) {
  return /* Node */{
          l: /* l : Empty */0,
          v: /* v */x,
          d: /* d */d,
          r: /* r : Empty */0,
          h: /* h */1
        };
}

function bal(l, x, d, r) {
  var hl = l ? l.h : 0;
  var hr = r ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    if (l) {
      var lr = l.r;
      var ld = l.d;
      var lv = l.v;
      var ll = l.l;
      if (height(ll) >= height(lr)) {
        return create(ll, lv, ld, create(lr, x, d, r));
      }
      if (lr) {
        return create(create(ll, lv, ld, lr.l), lr.v, lr.d, create(lr.r, x, d, r));
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return /* Node */{
            l: /* l */l,
            v: /* v */x,
            d: /* d */d,
            r: /* r */r,
            h: /* h */hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (r) {
    var rr = r.r;
    var rd = r.d;
    var rv = r.v;
    var rl = r.l;
    if (height(rr) >= height(rl)) {
      return create(create(l, x, d, rl), rv, rd, rr);
    }
    if (rl) {
      return create(create(l, x, d, rl.l), rl.v, rl.d, create(rl.r, rv, rd, rr));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.bal",
        Error: new Error()
      };
}

function is_empty(param) {
  if (param) {
    return false;
  } else {
    return true;
  }
}

function add(x, data, m) {
  if (!m) {
    return /* Node */{
            l: /* l : Empty */0,
            v: /* v */x,
            d: /* d */data,
            r: /* r : Empty */0,
            h: /* h */1
          };
  }
  var r = m.r;
  var d = m.d;
  var v = m.v;
  var l = m.l;
  var c = Caml_obj.caml_compare(x, v);
  if (c === 0) {
    if (d === data) {
      return m;
    } else {
      return /* Node */{
              l: /* l */l,
              v: /* v */x,
              d: /* d */data,
              r: /* r */r,
              h: /* h */m.h
            };
    }
  }
  if (c < 0) {
    var ll = add(x, data, l);
    if (l === ll) {
      return m;
    } else {
      return bal(ll, v, d, r);
    }
  }
  var rr = add(x, data, r);
  if (r === rr) {
    return m;
  } else {
    return bal(l, v, d, rr);
  }
}

function find(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var c = Caml_obj.caml_compare(x, param.v);
      if (c === 0) {
        return param.d;
      }
      _param = c < 0 ? param.l : param.r;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function find_first(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var v = param.v;
      if (Curry._1(f, v)) {
        var _v0 = v;
        var _d0 = param.d;
        var _param$1 = param.l;
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return /* tuple */[
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1.v;
          if (Curry._1(f, v$1)) {
            _param$1 = param$1.l;
            _d0 = param$1.d;
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1.r;
          continue ;
        };
      }
      _param = param.r;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function find_first_opt(f, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var v = param.v;
    if (Curry._1(f, v)) {
      var _v0 = v;
      var _d0 = param.d;
      var _param$1 = param.l;
      while(true) {
        var param$1 = _param$1;
        var d0 = _d0;
        var v0 = _v0;
        if (!param$1) {
          return /* tuple */[
                  v0,
                  d0
                ];
        }
        var v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.l;
          _d0 = param$1.d;
          _v0 = v$1;
          continue ;
        }
        _param$1 = param$1.r;
        continue ;
      };
    }
    _param = param.r;
    continue ;
  };
}

function find_last(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var v = param.v;
      if (Curry._1(f, v)) {
        var _v0 = v;
        var _d0 = param.d;
        var _param$1 = param.r;
        while(true) {
          var param$1 = _param$1;
          var d0 = _d0;
          var v0 = _v0;
          if (!param$1) {
            return /* tuple */[
                    v0,
                    d0
                  ];
          }
          var v$1 = param$1.v;
          if (Curry._1(f, v$1)) {
            _param$1 = param$1.r;
            _d0 = param$1.d;
            _v0 = v$1;
            continue ;
          }
          _param$1 = param$1.l;
          continue ;
        };
      }
      _param = param.l;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function find_last_opt(f, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var v = param.v;
    if (Curry._1(f, v)) {
      var _v0 = v;
      var _d0 = param.d;
      var _param$1 = param.r;
      while(true) {
        var param$1 = _param$1;
        var d0 = _d0;
        var v0 = _v0;
        if (!param$1) {
          return /* tuple */[
                  v0,
                  d0
                ];
        }
        var v$1 = param$1.v;
        if (Curry._1(f, v$1)) {
          _param$1 = param$1.r;
          _d0 = param$1.d;
          _v0 = v$1;
          continue ;
        }
        _param$1 = param$1.l;
        continue ;
      };
    }
    _param = param.l;
    continue ;
  };
}

function find_opt(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var c = Caml_obj.caml_compare(x, param.v);
    if (c === 0) {
      return Caml_option.some(param.d);
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    var c = Caml_obj.caml_compare(x, param.v);
    if (c === 0) {
      return true;
    }
    _param = c < 0 ? param.l : param.r;
    continue ;
  };
}

function min_binding(_param) {
  while(true) {
    var param = _param;
    if (param) {
      var l = param.l;
      if (!l) {
        return /* tuple */[
                param.v,
                param.d
              ];
      }
      _param = l;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function min_binding_opt(_param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var l = param.l;
    if (!l) {
      return /* tuple */[
              param.v,
              param.d
            ];
    }
    _param = l;
    continue ;
  };
}

function max_binding(_param) {
  while(true) {
    var param = _param;
    if (param) {
      var r = param.r;
      if (!r) {
        return /* tuple */[
                param.v,
                param.d
              ];
      }
      _param = r;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function max_binding_opt(_param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    var r = param.r;
    if (!r) {
      return /* tuple */[
              param.v,
              param.d
            ];
    }
    _param = r;
    continue ;
  };
}

function remove_min_binding(param) {
  if (param) {
    var l = param.l;
    if (l) {
      return bal(remove_min_binding(l), param.v, param.d, param.r);
    } else {
      return param.r;
    }
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.remove_min_elt",
        Error: new Error()
      };
}

function merge(t1, t2) {
  if (!t1) {
    return t2;
  }
  if (!t2) {
    return t1;
  }
  var match = min_binding(t2);
  return bal(t1, match[0], match[1], remove_min_binding(t2));
}

function remove(x, m) {
  if (!m) {
    return /* Empty */0;
  }
  var r = m.r;
  var d = m.d;
  var v = m.v;
  var l = m.l;
  var c = Caml_obj.caml_compare(x, v);
  if (c === 0) {
    return merge(l, r);
  }
  if (c < 0) {
    var ll = remove(x, l);
    if (l === ll) {
      return m;
    } else {
      return bal(ll, v, d, r);
    }
  }
  var rr = remove(x, r);
  if (r === rr) {
    return m;
  } else {
    return bal(l, v, d, rr);
  }
}

function update(x, f, m) {
  if (m) {
    var r = m.r;
    var d = m.d;
    var v = m.v;
    var l = m.l;
    var c = Caml_obj.caml_compare(x, v);
    if (c === 0) {
      var data = Curry._1(f, Caml_option.some(d));
      if (data === undefined) {
        return merge(l, r);
      }
      var data$1 = Caml_option.valFromOption(data);
      if (d === data$1) {
        return m;
      } else {
        return /* Node */{
                l: /* l */l,
                v: /* v */x,
                d: /* d */data$1,
                r: /* r */r,
                h: /* h */m.h
              };
      }
    }
    if (c < 0) {
      var ll = update(x, f, l);
      if (l === ll) {
        return m;
      } else {
        return bal(ll, v, d, r);
      }
    }
    var rr = update(x, f, r);
    if (r === rr) {
      return m;
    } else {
      return bal(l, v, d, rr);
    }
  }
  var data$2 = Curry._1(f, undefined);
  if (data$2 !== undefined) {
    return /* Node */{
            l: /* l : Empty */0,
            v: /* v */x,
            d: /* d */Caml_option.valFromOption(data$2),
            r: /* r : Empty */0,
            h: /* h */1
          };
  } else {
    return /* Empty */0;
  }
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return ;
    }
    iter(f, param.l);
    Curry._2(f, param.v, param.d);
    _param = param.r;
    continue ;
  };
}

function map(f, param) {
  if (!param) {
    return /* Empty */0;
  }
  var l$prime = map(f, param.l);
  var d$prime = Curry._1(f, param.d);
  var r$prime = map(f, param.r);
  return /* Node */{
          l: /* l */l$prime,
          v: /* v */param.v,
          d: /* d */d$prime,
          r: /* r */r$prime,
          h: /* h */param.h
        };
}

function mapi(f, param) {
  if (!param) {
    return /* Empty */0;
  }
  var v = param.v;
  var l$prime = mapi(f, param.l);
  var d$prime = Curry._2(f, v, param.d);
  var r$prime = mapi(f, param.r);
  return /* Node */{
          l: /* l */l$prime,
          v: /* v */v,
          d: /* d */d$prime,
          r: /* r */r$prime,
          h: /* h */param.h
        };
}

function fold(f, _m, _accu) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (!m) {
      return accu;
    }
    _accu = Curry._3(f, m.v, m.d, fold(f, m.l, accu));
    _m = m.r;
    continue ;
  };
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return true;
    }
    if (!Curry._2(p, param.v, param.d)) {
      return false;
    }
    if (!for_all(p, param.l)) {
      return false;
    }
    _param = param.r;
    continue ;
  };
}

function exists(p, _param) {
  while(true) {
    var param = _param;
    if (!param) {
      return false;
    }
    if (Curry._2(p, param.v, param.d)) {
      return true;
    }
    if (exists(p, param.l)) {
      return true;
    }
    _param = param.r;
    continue ;
  };
}

function add_min_binding(k, x, param) {
  if (param) {
    return bal(add_min_binding(k, x, param.l), param.v, param.d, param.r);
  } else {
    return singleton(k, x);
  }
}

function add_max_binding(k, x, param) {
  if (param) {
    return bal(param.l, param.v, param.d, add_max_binding(k, x, param.r));
  } else {
    return singleton(k, x);
  }
}

function join(l, v, d, r) {
  if (!l) {
    return add_min_binding(v, d, r);
  }
  if (!r) {
    return add_max_binding(v, d, l);
  }
  var rh = r.h;
  var lh = l.h;
  if (lh > (rh + 2 | 0)) {
    return bal(l.l, l.v, l.d, join(l.r, v, d, r));
  } else if (rh > (lh + 2 | 0)) {
    return bal(join(l, v, d, r.l), r.v, r.d, r.r);
  } else {
    return create(l, v, d, r);
  }
}

function concat(t1, t2) {
  if (!t1) {
    return t2;
  }
  if (!t2) {
    return t1;
  }
  var match = min_binding(t2);
  return join(t1, match[0], match[1], remove_min_binding(t2));
}

function concat_or_join(t1, v, d, t2) {
  if (d !== undefined) {
    return join(t1, v, Caml_option.valFromOption(d), t2);
  } else {
    return concat(t1, t2);
  }
}

function split$1(x, param) {
  if (!param) {
    return /* tuple */[
            /* Empty */0,
            undefined,
            /* Empty */0
          ];
  }
  var r = param.r;
  var d = param.d;
  var v = param.v;
  var l = param.l;
  var c = Caml_obj.caml_compare(x, v);
  if (c === 0) {
    return /* tuple */[
            l,
            Caml_option.some(d),
            r
          ];
  }
  if (c < 0) {
    var match = split$1(x, l);
    return /* tuple */[
            match[0],
            match[1],
            join(match[2], v, d, r)
          ];
  }
  var match$1 = split$1(x, r);
  return /* tuple */[
          join(l, v, d, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function merge$1(f, s1, s2) {
  if (s1) {
    var v1 = s1.v;
    if (s1.h >= height(s2)) {
      var match = split$1(v1, s2);
      return concat_or_join(merge$1(f, s1.l, match[0]), v1, Curry._3(f, v1, Caml_option.some(s1.d), match[1]), merge$1(f, s1.r, match[2]));
    }
    
  } else if (!s2) {
    return /* Empty */0;
  }
  if (s2) {
    var v2 = s2.v;
    var match$1 = split$1(v2, s1);
    return concat_or_join(merge$1(f, match$1[0], s2.l), v2, Curry._3(f, v2, match$1[1], Caml_option.some(s2.d)), merge$1(f, match$1[2], s2.r));
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: /* tuple */[
          "map.ml",
          393,
          10
        ],
        Error: new Error()
      };
}

function union(f, s1, s2) {
  if (!s1) {
    return s2;
  }
  if (!s2) {
    return s1;
  }
  var d2 = s2.d;
  var v2 = s2.v;
  var d1 = s1.d;
  var v1 = s1.v;
  if (s1.h >= s2.h) {
    var match = split$1(v1, s2);
    var d2$1 = match[1];
    var l = union(f, s1.l, match[0]);
    var r = union(f, s1.r, match[2]);
    if (d2$1 !== undefined) {
      return concat_or_join(l, v1, Curry._3(f, v1, d1, Caml_option.valFromOption(d2$1)), r);
    } else {
      return join(l, v1, d1, r);
    }
  }
  var match$1 = split$1(v2, s1);
  var d1$1 = match$1[1];
  var l$1 = union(f, match$1[0], s2.l);
  var r$1 = union(f, match$1[2], s2.r);
  if (d1$1 !== undefined) {
    return concat_or_join(l$1, v2, Curry._3(f, v2, Caml_option.valFromOption(d1$1), d2), r$1);
  } else {
    return join(l$1, v2, d2, r$1);
  }
}

function filter(p, m) {
  if (!m) {
    return /* Empty */0;
  }
  var r = m.r;
  var d = m.d;
  var v = m.v;
  var l = m.l;
  var l$prime = filter(p, l);
  var pvd = Curry._2(p, v, d);
  var r$prime = filter(p, r);
  if (pvd) {
    if (l === l$prime && r === r$prime) {
      return m;
    } else {
      return join(l$prime, v, d, r$prime);
    }
  } else {
    return concat(l$prime, r$prime);
  }
}

function partition(p, param) {
  if (!param) {
    return /* tuple */[
            /* Empty */0,
            /* Empty */0
          ];
  }
  var d = param.d;
  var v = param.v;
  var match = partition(p, param.l);
  var lf = match[1];
  var lt = match[0];
  var pvd = Curry._2(p, v, d);
  var match$1 = partition(p, param.r);
  var rf = match$1[1];
  var rt = match$1[0];
  if (pvd) {
    return /* tuple */[
            join(lt, v, d, rt),
            concat(lf, rf)
          ];
  } else {
    return /* tuple */[
            concat(lt, rt),
            join(lf, v, d, rf)
          ];
  }
}

function cons_enum(_m, _e) {
  while(true) {
    var e = _e;
    var m = _m;
    if (!m) {
      return e;
    }
    _e = /* More */{
      _0: m.v,
      _1: m.d,
      _2: m.r,
      _3: e
    };
    _m = m.l;
    continue ;
  };
}

function compare(cmp, m1, m2) {
  var _e1 = cons_enum(m1, /* End */0);
  var _e2 = cons_enum(m2, /* End */0);
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      if (e2) {
        return -1;
      } else {
        return 0;
      }
    }
    if (!e2) {
      return 1;
    }
    var c = Caml_obj.caml_compare(e1._0, e2._0);
    if (c !== 0) {
      return c;
    }
    var c$1 = Curry._2(cmp, e1._1, e2._1);
    if (c$1 !== 0) {
      return c$1;
    }
    _e2 = cons_enum(e2._2, e2._3);
    _e1 = cons_enum(e1._2, e1._3);
    continue ;
  };
}

function equal(cmp, m1, m2) {
  var _e1 = cons_enum(m1, /* End */0);
  var _e2 = cons_enum(m2, /* End */0);
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      if (e2) {
        return false;
      } else {
        return true;
      }
    }
    if (!e2) {
      return false;
    }
    if (!Caml_obj.caml_equal(e1._0, e2._0)) {
      return false;
    }
    if (!Curry._2(cmp, e1._1, e2._1)) {
      return false;
    }
    _e2 = cons_enum(e2._2, e2._3);
    _e1 = cons_enum(e1._2, e1._3);
    continue ;
  };
}

function cardinal(param) {
  if (param) {
    return (cardinal(param.l) + 1 | 0) + cardinal(param.r) | 0;
  } else {
    return 0;
  }
}

function bindings_aux(_accu, _param) {
  while(true) {
    var param = _param;
    var accu = _accu;
    if (!param) {
      return accu;
    }
    _param = param.l;
    _accu = /* :: */{
      _0: /* tuple */[
        param.v,
        param.d
      ],
      _1: bindings_aux(accu, param.r)
    };
    continue ;
  };
}

function bindings(s) {
  return bindings_aux(/* [] */0, s);
}

var Ticker_map = {
  empty: /* Empty */0,
  is_empty: is_empty,
  mem: mem,
  add: add,
  update: update,
  singleton: singleton,
  remove: remove,
  merge: merge$1,
  union: union,
  compare: compare,
  equal: equal,
  iter: iter,
  fold: fold,
  for_all: for_all,
  exists: exists,
  filter: filter,
  partition: partition,
  cardinal: cardinal,
  bindings: bindings,
  min_binding: min_binding,
  min_binding_opt: min_binding_opt,
  max_binding: max_binding,
  max_binding_opt: max_binding_opt,
  choose: min_binding,
  choose_opt: min_binding_opt,
  split: split$1,
  find: find,
  find_opt: find_opt,
  find_first: find_first,
  find_first_opt: find_first_opt,
  find_last: find_last,
  find_last_opt: find_last_opt,
  map: map,
  mapi: mapi
};

function compute_update_sequences(all_tickers) {
  List.fold_left((function (counter, ticker) {
          var loop = function (counter, ticker) {
            var rank = ticker.rank;
            if (typeof rank !== "number") {
              return counter;
            }
            if (rank !== 0) {
              return counter;
            }
            ticker.rank = /* Visited */1;
            var match = ticker.type_;
            if (match) {
              var match$1 = match._0;
              var counter$1 = loop(counter, match$1.lhs);
              var counter$2 = loop(counter$1, match$1.rhs);
              var counter$3 = counter$2 + 1 | 0;
              ticker.rank = /* Ranked */{
                _0: counter$3
              };
              return counter$3;
            }
            var counter$4 = counter + 1 | 0;
            ticker.rank = /* Ranked */{
              _0: counter$4
            };
            return counter$4;
          };
          return loop(counter, ticker);
        }), 0, all_tickers);
  var map = List.fold_left((function (map, ticker) {
          if (!ticker.type_) {
            return add(ticker.ticker_name, /* :: */{
                        _0: ticker,
                        _1: /* [] */0
                      }, map);
          }
          var loop = function (_up, _map, _ticker) {
            while(true) {
              var ticker = _ticker;
              var map = _map;
              var up = _up;
              var type_ = ticker.type_;
              var ticker_name = ticker.ticker_name;
              if (type_) {
                var match = type_._0;
                var map$1 = loop(/* :: */{
                      _0: ticker,
                      _1: up
                    }, map, match.lhs);
                _ticker = match.rhs;
                _map = map$1;
                _up = /* :: */{
                  _0: ticker,
                  _1: up
                };
                continue ;
              }
              var l = find(ticker_name, map);
              return add(ticker_name, Pervasives.$at(up, l), map);
            };
          };
          return loop(/* [] */0, map, ticker);
        }), /* Empty */0, List.rev(all_tickers));
  return fold((function (k, l, map) {
                var l$1 = List.sort_uniq((function (lhs, rhs) {
                        var x = lhs.rank;
                        if (typeof x === "number") {
                          throw {
                                RE_EXN_ID: "Failure",
                                _1: "All nodes should be ranked",
                                Error: new Error()
                              };
                        }
                        var y = rhs.rank;
                        if (typeof y === "number") {
                          throw {
                                RE_EXN_ID: "Failure",
                                _1: "All nodes should be ranked",
                                Error: new Error()
                              };
                        }
                        return Caml_primitive.caml_int_compare(x._0, y._0);
                      }), l);
                return add(k, l$1, map);
              }), map, map);
}

function process_quote(ticker_map, new_ticker, new_value) {
  var update_sequence = find(new_ticker, ticker_map);
  return List.iter((function (ticker) {
                var match = ticker.type_;
                if (match) {
                  var match$1 = match._0;
                  var match$2 = match$1.lhs.value;
                  var match$3 = match$1.rhs.value;
                  var value = match$2 !== undefined && match$3 !== undefined ? (
                      match$1.op ? match$2 - match$3 : match$2 + match$3
                    ) : undefined;
                  ticker.value = value;
                  return ;
                }
                if (ticker.ticker_name === new_ticker) {
                  ticker.value = new_value;
                  return ;
                }
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Only single Market ticker should be udpated upon a new quote",
                      Error: new Error()
                    };
              }), update_sequence);
}

function process_input_line(ticker_map, all_tickers, line) {
  var make_binary_op = function (ticker_name, lhs, rhs, op) {
    var lhs$1 = find_ticker_by_name(all_tickers, lhs);
    var rhs$1 = find_ticker_by_name(all_tickers, rhs);
    return {
            value: undefined,
            rank: /* Uninitialized */0,
            ticker_name: ticker_name,
            type_: /* Binary_op */{
              _0: {
                op: op,
                rhs: rhs$1,
                lhs: lhs$1
              }
            }
          };
  };
  var tokens = split(/* "|" */124, line);
  if (tokens) {
    switch (tokens._0) {
      case "Q" :
          var match = tokens._1;
          if (match) {
            var match$1 = match._1;
            if (match$1) {
              if (match$1._1) {
                throw {
                      RE_EXN_ID: "Failure",
                      _1: "Invalid input line",
                      Error: new Error()
                    };
              }
              var ticker_map$1 = ticker_map !== undefined ? Caml_option.valFromOption(ticker_map) : compute_update_sequences(all_tickers);
              var value = Caml_format.caml_float_of_string(match$1._0);
              process_quote(ticker_map$1, match._0, value);
              return /* tuple */[
                      all_tickers,
                      Caml_option.some(ticker_map$1)
                    ];
            }
            throw {
                  RE_EXN_ID: "Failure",
                  _1: "Invalid input line",
                  Error: new Error()
                };
          }
          throw {
                RE_EXN_ID: "Failure",
                _1: "Invalid input line",
                Error: new Error()
              };
      case "R" :
          var match$2 = tokens._1;
          if (match$2) {
            var match$3 = match$2._1;
            if (match$3) {
              var ticker_name = match$2._0;
              switch (match$3._0) {
                case "+" :
                    var match$4 = match$3._1;
                    if (match$4) {
                      var match$5 = match$4._1;
                      if (match$5) {
                        if (match$5._1) {
                          throw {
                                RE_EXN_ID: "Failure",
                                _1: "Invalid input line",
                                Error: new Error()
                              };
                        }
                        return /* tuple */[
                                /* :: */{
                                  _0: make_binary_op(ticker_name, match$4._0, match$5._0, /* PLUS */0),
                                  _1: all_tickers
                                },
                                ticker_map
                              ];
                      }
                      throw {
                            RE_EXN_ID: "Failure",
                            _1: "Invalid input line",
                            Error: new Error()
                          };
                    }
                    throw {
                          RE_EXN_ID: "Failure",
                          _1: "Invalid input line",
                          Error: new Error()
                        };
                case "-" :
                    var match$6 = match$3._1;
                    if (match$6) {
                      var match$7 = match$6._1;
                      if (match$7) {
                        if (match$7._1) {
                          throw {
                                RE_EXN_ID: "Failure",
                                _1: "Invalid input line",
                                Error: new Error()
                              };
                        }
                        return /* tuple */[
                                /* :: */{
                                  _0: make_binary_op(ticker_name, match$6._0, match$7._0, /* MINUS */1),
                                  _1: all_tickers
                                },
                                ticker_map
                              ];
                      }
                      throw {
                            RE_EXN_ID: "Failure",
                            _1: "Invalid input line",
                            Error: new Error()
                          };
                    }
                    throw {
                          RE_EXN_ID: "Failure",
                          _1: "Invalid input line",
                          Error: new Error()
                        };
                case "S" :
                    if (match$3._1) {
                      throw {
                            RE_EXN_ID: "Failure",
                            _1: "Invalid input line",
                            Error: new Error()
                          };
                    }
                    return /* tuple */[
                            /* :: */{
                              _0: {
                                value: undefined,
                                rank: /* Uninitialized */0,
                                ticker_name: ticker_name,
                                type_: /* Market */0
                              },
                              _1: all_tickers
                            },
                            ticker_map
                          ];
                default:
                  throw {
                        RE_EXN_ID: "Failure",
                        _1: "Invalid input line",
                        Error: new Error()
                      };
              }
            } else {
              throw {
                    RE_EXN_ID: "Failure",
                    _1: "Invalid input line",
                    Error: new Error()
                  };
            }
          } else {
            throw {
                  RE_EXN_ID: "Failure",
                  _1: "Invalid input line",
                  Error: new Error()
                };
          }
      default:
        throw {
              RE_EXN_ID: "Failure",
              _1: "Invalid input line",
              Error: new Error()
            };
    }
  } else {
    throw {
          RE_EXN_ID: "Failure",
          _1: "Invalid input line",
          Error: new Error()
        };
  }
}

function loop(_lines, _param) {
  while(true) {
    var param = _param;
    var lines = _lines;
    var all_tickers = param[0];
    if (!lines) {
      return print_all_composite(all_tickers);
    }
    _param = process_input_line(param[1], all_tickers, lines._0);
    _lines = lines._1;
    continue ;
  };
}

var lines = /* :: */{
  _0: "R|MSFT|S",
  _1: /* :: */{
    _0: "R|IBM|S",
    _1: /* :: */{
      _0: "R|FB|S",
      _1: /* :: */{
        _0: "R|CP1|+|MSFT|IBM",
        _1: /* :: */{
          _0: "R|CP2|-|FB|IBM",
          _1: /* :: */{
            _0: "R|CP12|+|CP1|CP2",
            _1: /* :: */{
              _0: "Q|MSFT|120.",
              _1: /* :: */{
                _0: "Q|IBM|130.",
                _1: /* :: */{
                  _0: "Q|FB|80.",
                  _1: /* [] */0
                }
              }
            }
          }
        }
      }
    }
  }
};

exports.Util = Util;
exports.string_of_rank = string_of_rank;
exports.find_ticker_by_name = find_ticker_by_name;
exports.print_all_composite = print_all_composite;
exports.Ticker_map = Ticker_map;
exports.compute_update_sequences = compute_update_sequences;
exports.process_quote = process_quote;
exports.process_input_line = process_input_line;
exports.lines = lines;
exports.loop = loop;
/* No side effect */
