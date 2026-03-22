const fs = require("fs");
const path = require("path");

function pngToBase64(filePath) {
  const abs = path.resolve(__dirname, "..", filePath);
  const data = fs.readFileSync(abs);
  return data.toString("base64");
}

module.exports = {
  ttwcLogo: pngToBase64("assets/ttwc-logo.png"),

  // for now, use the same file for the small logo too
  // later we can swap this to a dedicated small PNG if needed
  ttwcSmallLogo: pngToBase64("assets/ttwc-logo.png"),
};
