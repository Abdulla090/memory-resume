import { g as getDefaultExportFromCjs } from "./react.mjs";
import { r as requireConverter } from "./hsl-to-rgb-for-reals.mjs";
var hslToHex;
var hasRequiredHslToHex;
function requireHslToHex() {
  if (hasRequiredHslToHex) return hslToHex;
  hasRequiredHslToHex = 1;
  var toRgb = requireConverter();
  function max(val, n) {
    return val > n ? n : val;
  }
  function min(val, n) {
    return val < n ? n : val;
  }
  function cycle(val) {
    val = max(val, 1e7);
    val = min(val, -1e7);
    while (val < 0) {
      val += 360;
    }
    while (val > 359) {
      val -= 360;
    }
    return val;
  }
  function hsl(hue, saturation, luminosity) {
    hue = cycle(hue);
    saturation = min(max(saturation, 100), 0);
    luminosity = min(max(luminosity, 100), 0);
    saturation /= 100;
    luminosity /= 100;
    var rgb = toRgb(hue, saturation, luminosity);
    return "#" + rgb.map(function(n) {
      return (256 + n).toString(16).substr(-2);
    }).join("");
  }
  hslToHex = hsl;
  return hslToHex;
}
var hslToHexExports = requireHslToHex();
const hlsToHex = /* @__PURE__ */ getDefaultExportFromCjs(hslToHexExports);
export {
  hlsToHex as h
};
