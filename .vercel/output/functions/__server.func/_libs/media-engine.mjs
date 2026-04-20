import { g as getDefaultExportFromCjs } from "./react.mjs";
var queries;
var hasRequiredQueries;
function requireQueries() {
  if (hasRequiredQueries) return queries;
  hasRequiredQueries = 1;
  function MaxHeight(value2) {
    this.value = value2;
    this.match = function(options) {
      return this.value >= options.height;
    };
  }
  function MinHeight(value2) {
    this.value = value2;
    this.match = function(options) {
      return this.value < options.height;
    };
  }
  function MaxWidth(value2) {
    this.value = value2;
    this.match = function(options) {
      return this.value >= options.width;
    };
  }
  function MinWidth(value2) {
    this.value = value2;
    this.match = function(options) {
      return this.value < options.width;
    };
  }
  function Orientation(value2) {
    this.value = value2;
    this.match = function(options) {
      return this.value === options.orientation;
    };
  }
  queries = function Query(type, value2) {
    switch (type) {
      case "max-height":
        return new MaxHeight(value2);
      case "min-height":
        return new MinHeight(value2);
      case "max-width":
        return new MaxWidth(value2);
      case "min-width":
        return new MinWidth(value2);
      case "orientation":
        return new Orientation(value2);
      default:
        throw new Error(value2);
    }
  };
  return queries;
}
var operators;
var hasRequiredOperators;
function requireOperators() {
  if (hasRequiredOperators) return operators;
  hasRequiredOperators = 1;
  function And(left, right) {
    this.left = left;
    this.right = right;
    this.match = function(options) {
      return left.match(options) && right.match(options);
    };
  }
  function Or(left, right) {
    this.left = left;
    this.right = right;
    this.match = function(options) {
      return left.match(options) || right.match(options);
    };
  }
  operators = function Operator(type, left, right) {
    switch (type) {
      case "and":
        return new And(left, right);
      case ",":
        return new Or(left, right);
      default:
        throw new Error(value);
    }
  };
  return operators;
}
var parser_1;
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser_1;
  hasRequiredParser = 1;
  var Query = requireQueries();
  var Operator = requireOperators();
  var NUMBERS = /[0-9]/;
  var LETTERS = /[a-z|\-]/i;
  var WHITESPACE = /\s/;
  var COLON = /:/;
  var COMMA = /,/;
  var AND = /and$/;
  var AT = /@/;
  function tokenizer(input) {
    var current = 0;
    var tokens = [];
    while (current < input.length) {
      var char = input[current];
      if (AT.test(char)) {
        char = input[++current];
        while (LETTERS.test(char) && char !== void 0) {
          char = input[++current];
        }
      }
      if (WHITESPACE.test(char) || char === ")" || char === "(") {
        current++;
        continue;
      }
      if (COLON.test(char) || COMMA.test(char)) {
        current++;
        tokens.push({ type: "operator", value: char });
        continue;
      }
      if (NUMBERS.test(char)) {
        var value2 = "";
        while (NUMBERS.test(char)) {
          value2 += char;
          char = input[++current];
        }
        tokens.push({ type: "number", value: value2 });
        continue;
      }
      if (LETTERS.test(char)) {
        var value2 = "";
        while (LETTERS.test(char) && char !== void 0) {
          value2 += char;
          char = input[++current];
        }
        if (AND.test(value2)) {
          tokens.push({ type: "operator", value: value2 });
        } else {
          tokens.push({ type: "literal", value: value2 });
        }
        continue;
      }
      throw new TypeError(
        "Tokenizer: I dont know what this character is: " + char
      );
    }
    return tokens;
  }
  function parser(tokens) {
    var output = [];
    var stack = [];
    while (tokens.length > 0) {
      var token = tokens.shift();
      if (token.type === "number" || token.type === "literal") {
        output.push(token);
        continue;
      }
      if (token.type === "operator") {
        if (COLON.test(token.value)) {
          token = { type: "query", key: output.pop(), value: tokens.shift() };
          output.push(token);
          continue;
        }
        while (stack.length > 0) {
          output.unshift(stack.pop());
        }
        stack.push(token);
      }
    }
    while (stack.length > 0) {
      output.unshift(stack.pop());
    }
    function walk() {
      var head = output.shift();
      if (head.type === "number") {
        return parseInt(head.value);
      }
      if (head.type === "literal") {
        return head.value;
      }
      if (head.type === "operator") {
        var l = walk();
        var r = walk();
        return Operator(head.value, l, r);
      }
      if (head.type === "query") {
        var l = head.key.value;
        var r = head.value.value;
        return Query(l, r);
      }
    }
    return walk();
  }
  parser_1 = {
    parse: function(query) {
      var tokens = tokenizer(query);
      var ast = parser(tokens);
      return ast;
    }
  };
  return parser_1;
}
var src;
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src;
  hasRequiredSrc = 1;
  var Parser = requireParser();
  src = function(queries2, options) {
    var result = {};
    Object.keys(queries2).forEach(function(query) {
      if (Parser.parse(query).match(options)) {
        Object.assign(result, queries2[query]);
      }
    });
    return result;
  };
  return src;
}
var srcExports = requireSrc();
const matchMedia = /* @__PURE__ */ getDefaultExportFromCjs(srcExports);
export {
  matchMedia as m
};
