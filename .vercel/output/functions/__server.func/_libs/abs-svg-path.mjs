import { g as getDefaultExportFromCjs } from "./react.mjs";
var absSvgPath;
var hasRequiredAbsSvgPath;
function requireAbsSvgPath() {
  if (hasRequiredAbsSvgPath) return absSvgPath;
  hasRequiredAbsSvgPath = 1;
  absSvgPath = absolutize;
  function absolutize(path) {
    var startX = 0;
    var startY = 0;
    var x = 0;
    var y = 0;
    return path.map(function(seg) {
      seg = seg.slice();
      var type = seg[0];
      var command = type.toUpperCase();
      if (type != command) {
        seg[0] = command;
        switch (type) {
          case "a":
            seg[6] += x;
            seg[7] += y;
            break;
          case "v":
            seg[1] += y;
            break;
          case "h":
            seg[1] += x;
            break;
          default:
            for (var i = 1; i < seg.length; ) {
              seg[i++] += x;
              seg[i++] += y;
            }
        }
      }
      switch (command) {
        case "Z":
          x = startX;
          y = startY;
          break;
        case "H":
          x = seg[1];
          break;
        case "V":
          y = seg[1];
          break;
        case "M":
          x = startX = seg[1];
          y = startY = seg[2];
          break;
        default:
          x = seg[seg.length - 2];
          y = seg[seg.length - 1];
      }
      return seg;
    });
  }
  return absSvgPath;
}
var absSvgPathExports = requireAbsSvgPath();
const absPath = /* @__PURE__ */ getDefaultExportFromCjs(absSvgPathExports);
export {
  absPath as a
};
