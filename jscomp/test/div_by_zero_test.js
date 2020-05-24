'use strict';

var Mt = require("./mt.js");
var Block = require("../../lib/js/block.js");
var Caml_int32 = require("../../lib/js/caml_int32.js");
var Caml_int64 = require("../../lib/js/caml_int64.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = /* :: */{
    _0: /* tuple */[
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return /* Eq */{
                  tag: 0,
                  _0: x,
                  _1: y
                };
        })
    ],
    _1: suites.contents
  };
  
}

function add(suite) {
  suites.contents = /* :: */{
    _0: suite,
    _1: suites.contents
  };
  
}

add(/* tuple */[
      "File \"div_by_zero_test.ml\", line 14, characters 7-14",
      (function (param) {
          return /* ThrowAny */{
                  tag: 7,
                  _0: (function (param) {
                      Caml_int32.div(3, 0);
                      
                    })
                };
        })
    ]);

add(/* tuple */[
      "File \"div_by_zero_test.ml\", line 15, characters 7-14",
      (function (param) {
          return /* ThrowAny */{
                  tag: 7,
                  _0: (function (param) {
                      Caml_int32.mod_(3, 0);
                      
                    })
                };
        })
    ]);

add(/* tuple */[
      "File \"div_by_zero_test.ml\", line 16, characters 7-14",
      (function (param) {
          return /* ThrowAny */{
                  tag: 7,
                  _0: (function (param) {
                      Caml_int32.div(3, 0);
                      
                    })
                };
        })
    ]);

add(/* tuple */[
      "File \"div_by_zero_test.ml\", line 17, characters 7-14",
      (function (param) {
          return /* ThrowAny */{
                  tag: 7,
                  _0: (function (param) {
                      Caml_int32.mod_(3, 0);
                      
                    })
                };
        })
    ]);

add(/* tuple */[
      "File \"div_by_zero_test.ml\", line 18, characters 7-14",
      (function (param) {
          return /* ThrowAny */{
                  tag: 7,
                  _0: (function (param) {
                      Caml_int64.div(Caml_int64.mk(3, 0), Caml_int64.zero);
                      
                    })
                };
        })
    ]);

add(/* tuple */[
      "File \"div_by_zero_test.ml\", line 19, characters 7-14",
      (function (param) {
          return /* ThrowAny */{
                  tag: 7,
                  _0: (function (param) {
                      Caml_int64.mod_(Caml_int64.mk(3, 0), Caml_int64.zero);
                      
                    })
                };
        })
    ]);

function div(x, y) {
  return Caml_int32.div(x, y) + 3 | 0;
}

Mt.from_pair_suites("Div_by_zero_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.add = add;
exports.div = div;
/*  Not a pure module */
