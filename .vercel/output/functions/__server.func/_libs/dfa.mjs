import { g as getDefaultExportFromCjs } from "./react.mjs";
var dfa;
var hasRequiredDfa;
function requireDfa() {
  if (hasRequiredDfa) return dfa;
  hasRequiredDfa = 1;
  var INITIAL_STATE = 1;
  var FAIL_STATE = 0;
  class StateMachine {
    constructor(dfa2) {
      this.stateTable = dfa2.stateTable;
      this.accepting = dfa2.accepting;
      this.tags = dfa2.tags;
    }
    /**
     * Returns an iterable object that yields pattern matches over the input sequence.
     * Matches are of the form [startIndex, endIndex, tags].
     */
    match(str) {
      var self = this;
      return {
        *[Symbol.iterator]() {
          var state = INITIAL_STATE;
          var startRun = null;
          var lastAccepting = null;
          var lastState = null;
          for (var p = 0; p < str.length; p++) {
            var c = str[p];
            lastState = state;
            state = self.stateTable[state][c];
            if (state === FAIL_STATE) {
              if (startRun != null && lastAccepting != null && lastAccepting >= startRun) {
                yield [startRun, lastAccepting, self.tags[lastState]];
              }
              state = self.stateTable[INITIAL_STATE][c];
              startRun = null;
            }
            if (state !== FAIL_STATE && startRun == null) {
              startRun = p;
            }
            if (self.accepting[state]) {
              lastAccepting = p;
            }
            if (state === FAIL_STATE) {
              state = INITIAL_STATE;
            }
          }
          if (startRun != null && lastAccepting != null && lastAccepting >= startRun) {
            yield [startRun, lastAccepting, self.tags[state]];
          }
        }
      };
    }
    /**
     * For each match over the input sequence, action functions matching
     * the tag definitions in the input pattern are called with the startIndex,
     * endIndex, and sub-match sequence.
     */
    apply(str, actions) {
      for (var [start, end, tags] of this.match(str)) {
        for (var tag of tags) {
          if (typeof actions[tag] === "function") {
            actions[tag](start, end, str.slice(start, end + 1));
          }
        }
      }
    }
  }
  dfa = StateMachine;
  return dfa;
}
var dfaExports = requireDfa();
const $52ZIf$dfa = /* @__PURE__ */ getDefaultExportFromCjs(dfaExports);
export {
  $52ZIf$dfa as $
};
