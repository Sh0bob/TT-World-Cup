function replaceOne(source, regex, replacement, label) {
  const matches = source.match(regex);
  if (!matches) {
    throw new Error(`Patch failed: could not find ${label}`);
  }
  return source.replace(regex, replacement);
}

function applyPatches(source, assets) {
  source = replaceOne(
  source,
  /aHg\(6,\s*"territorial\.io",\s*6,\s*"[^"]+"\s*\)/,
  `aHg(6, "territorial.io", 8, "${assets.ttwcLogo}")`,
  "big territorial.io logo"
);

  source = replaceOne(
  source,
  /aHg\(22,\s*"logo",\s*8,\s*"[^"]+"\s*\)/,
  `aHg(22, "logo", 8, "${assets.transparentPixel}")`,
  "remove small logo"
);

  source = replaceOne(
  source,
  /textLength\s*=\s*\.84\s*\*\s*aQZ\.i\s*\/\s*text\.width;\s*vV\.setTransform\(textLength,\s*0,\s*0,\s*textLength,\s*aQZ\.fB\s*\+\s*\.08\s*\*\s*aQZ\.i,\s*aQZ\.fD\)/,
  `textLength = 1.05 * aQZ.i / text.width;
vV.setTransform(textLength, 0, 0, textLength, aQZ.fB - .035 * aQZ.i, aQZ.fD - 530)`,
  "resize and move main menu logo"
);

  source = replaceOne(
  source,
  /aRR\s*=\s*aRR\s*\|\|\s*bA\.a3B\.a4i\(text,\s*bA\.a3B\.a4o,\s*\[0,\s*0,\s*0\]\);\s*for\s*\(var fB = -1;\s*fB <= 1;\s*fB \+= 2\)\s*for\s*\(var fD = -1;\s*fD <= 1;\s*fD \+= 2\)\s*vV\.drawImage\(aRR,\s*fB,\s*fD\);\s*vV\.drawImage\(text,\s*0,\s*0\)/,
  `vV.drawImage(text, 0, 0)`,
  "remove main menu logo shadow processing"
);

  source = replaceOne(
  source,
  /this\.aHH\s*=\s*function\(\)\s*\{[\s\S]*?\}/,
  `this.aHH = function() {}`,
  "remove background FX title"
);
  return source;
}

module.exports = { applyPatches };
