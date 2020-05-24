'use strict';

var Mt = require("./mt.js");
var Block = require("../../lib/js/block.js");

var suites_000 = /* tuple */[
  "toExponential",
  (function (param) {
      return /* Eq */{
              tag: 0,
              _0: "1.23456e+5",
              _1: (123456).toExponential()
            };
    })
];

var suites_001 = /* :: */{
  _0: /* tuple */[
    "toExponentialWithPrecision - digits:2",
    (function (param) {
        return /* Eq */{
                tag: 0,
                _0: "1.23e+5",
                _1: (123456).toExponential(2)
              };
      })
  ],
  _1: /* :: */{
    _0: /* tuple */[
      "toExponentialWithPrecision - digits:4",
      (function (param) {
          return /* Eq */{
                  tag: 0,
                  _0: "1.2346e+5",
                  _1: (123456).toExponential(4)
                };
        })
    ],
    _1: /* :: */{
      _0: /* tuple */[
        "toExponentialWithPrecision - digits:20",
        (function (param) {
            return /* Eq */{
                    tag: 0,
                    _0: "0.00000000000000000000e+0",
                    _1: (0).toExponential(20)
                  };
          })
      ],
      _1: /* :: */{
        _0: /* tuple */[
          "File \"js_int_test.ml\", line 12, characters 3-10",
          (function (param) {
              return /* ThrowAny */{
                      tag: 7,
                      _0: (function (param) {
                          (0).toExponential(101);
                          
                        })
                    };
            })
        ],
        _1: /* :: */{
          _0: /* tuple */[
            "toExponentialWithPrecision - digits:-1",
            (function (param) {
                return /* ThrowAny */{
                        tag: 7,
                        _0: (function (param) {
                            (0).toExponential(-1);
                            
                          })
                      };
              })
          ],
          _1: /* :: */{
            _0: /* tuple */[
              "toPrecision",
              (function (param) {
                  return /* Eq */{
                          tag: 0,
                          _0: "123456",
                          _1: (123456).toPrecision()
                        };
                })
            ],
            _1: /* :: */{
              _0: /* tuple */[
                "toPrecisionWithPrecision - digits:2",
                (function (param) {
                    return /* Eq */{
                            tag: 0,
                            _0: "1.2e+5",
                            _1: (123456).toPrecision(2)
                          };
                  })
              ],
              _1: /* :: */{
                _0: /* tuple */[
                  "toPrecisionWithPrecision - digits:4",
                  (function (param) {
                      return /* Eq */{
                              tag: 0,
                              _0: "1.235e+5",
                              _1: (123456).toPrecision(4)
                            };
                    })
                ],
                _1: /* :: */{
                  _0: /* tuple */[
                    "toPrecisionWithPrecision - digits:20",
                    (function (param) {
                        return /* Eq */{
                                tag: 0,
                                _0: "0.0000000000000000000",
                                _1: (0).toPrecision(20)
                              };
                      })
                  ],
                  _1: /* :: */{
                    _0: /* tuple */[
                      "File \"js_int_test.ml\", line 25, characters 3-10",
                      (function (param) {
                          return /* ThrowAny */{
                                  tag: 7,
                                  _0: (function (param) {
                                      (0).toPrecision(101);
                                      
                                    })
                                };
                        })
                    ],
                    _1: /* :: */{
                      _0: /* tuple */[
                        "toPrecisionWithPrecision - digits:-1",
                        (function (param) {
                            return /* ThrowAny */{
                                    tag: 7,
                                    _0: (function (param) {
                                        (0).toPrecision(-1);
                                        
                                      })
                                  };
                          })
                      ],
                      _1: /* :: */{
                        _0: /* tuple */[
                          "toString",
                          (function (param) {
                              return /* Eq */{
                                      tag: 0,
                                      _0: "123",
                                      _1: (123).toString()
                                    };
                            })
                        ],
                        _1: /* :: */{
                          _0: /* tuple */[
                            "toStringWithRadix - radix:2",
                            (function (param) {
                                return /* Eq */{
                                        tag: 0,
                                        _0: "11110001001000000",
                                        _1: (123456).toString(2)
                                      };
                              })
                          ],
                          _1: /* :: */{
                            _0: /* tuple */[
                              "toStringWithRadix - radix:16",
                              (function (param) {
                                  return /* Eq */{
                                          tag: 0,
                                          _0: "1e240",
                                          _1: (123456).toString(16)
                                        };
                                })
                            ],
                            _1: /* :: */{
                              _0: /* tuple */[
                                "toStringWithRadix - radix:36",
                                (function (param) {
                                    return /* Eq */{
                                            tag: 0,
                                            _0: "2n9c",
                                            _1: (123456).toString(36)
                                          };
                                  })
                              ],
                              _1: /* :: */{
                                _0: /* tuple */[
                                  "toStringWithRadix - radix:37",
                                  (function (param) {
                                      return /* ThrowAny */{
                                              tag: 7,
                                              _0: (function (param) {
                                                  (0).toString(37);
                                                  
                                                })
                                            };
                                    })
                                ],
                                _1: /* :: */{
                                  _0: /* tuple */[
                                    "toStringWithRadix - radix:1",
                                    (function (param) {
                                        return /* ThrowAny */{
                                                tag: 7,
                                                _0: (function (param) {
                                                    (0).toString(1);
                                                    
                                                  })
                                              };
                                      })
                                  ],
                                  _1: /* :: */{
                                    _0: /* tuple */[
                                      "toStringWithRadix - radix:-1",
                                      (function (param) {
                                          return /* ThrowAny */{
                                                  tag: 7,
                                                  _0: (function (param) {
                                                      (0).toString(-1);
                                                      
                                                    })
                                                };
                                        })
                                    ],
                                    _1: /* [] */0
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

var suites = /* :: */{
  _0: suites_000,
  _1: suites_001
};

Mt.from_pair_suites("Js_int_test", suites);

exports.suites = suites;
/*  Not a pure module */
