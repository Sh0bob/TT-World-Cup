const fs = require("fs");
const path = require("path");

function pngToBase64(filePath) {
  const abs = path.resolve(__dirname, "..", filePath);
  const data = fs.readFileSync(abs);
  return data.toString("base64");
}


module.exports = {
  ttwcLogo: pngToBase64("assets/ttwc-logo.png"),

  transparentPixel:
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",

  crownIcon: pngToBase64("assets/ttwc-crown.png"),

  sideButton1: pngToBase64("assets/ogbutton.png"),
  sideButton2: pngToBase64("assets/catbutton.png"),
  sideButton3: pngToBase64("assets/catbutton2.png"),

  partners: pngToBase64("assets/partners.png"),
};
