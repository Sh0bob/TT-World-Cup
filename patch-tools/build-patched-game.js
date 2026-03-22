const fs = require("fs");
const path = require("path");
const assets = require("./assets");
const { applyPatches } = require("./patches");

const inputPath = path.resolve(__dirname, "..", "FX Client_files", "game.js");
const outputPath = path.resolve(__dirname, "..", "FX Client_files", "game.patched.js");

let source = fs.readFileSync(inputPath, "utf8");
source = applyPatches(source, assets);
fs.writeFileSync(outputPath, source, "utf8");

console.log("Patched game written to:", outputPath);
