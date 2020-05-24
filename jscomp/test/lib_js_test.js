'use strict';

var Mt = require("./mt.js");
var Block = require("../../lib/js/block.js");

console.log(JSON.stringify(/* :: */{
          _0: 1,
          _1: /* :: */{
            _0: 2,
            _1: /* :: */{
              _0: 3,
              _1: /* [] */0
            }
          }
        }));

console.log("hey");

var suites_000 = /* tuple */[
  "anything_to_string",
  (function (param) {
      return /* Eq */{
              tag: 0,
              _0: "3",
              _1: String(3)
            };
    })
];

var suites = /* :: */{
  _0: suites_000,
  _1: /* [] */0
};

Mt.from_pair_suites("Lib_js_test", suites);

exports.suites = suites;
/*  Not a pure module */
