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
  `aHg(22, "logo", 6, "${assets.transparentPixel}")`,
  "remove small logo"
  );

  source = replaceOne(
  source,
  /textLength\s*=\s*\.84\s*\*\s*aQZ\.i\s*\/\s*text\.width;\s*vV\.setTransform\(textLength,\s*0,\s*0,\s*textLength,\s*aQZ\.fB\s*\+\s*\.08\s*\*\s*aQZ\.i,\s*aQZ\.fD\)/,
  `textLength = 1.05 * aQZ.i / text.width;
vV.setTransform(textLength, 0, 0, textLength, aQZ.fB + .08 * aQZ.i, aQZ.fD - 180)`,
  "resize and move main menu logo"
);

  return source;
}

module.exports = { applyPatches };
