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
    `aHg(6, "territorial.io", 6, "${assets.ttwcLogo}")`,
    "big territorial.io logo"
  );

  source = replaceOne(
  source,
  /aHg\(22,\s*"logo",\s*8,\s*"[^"]+"\s*\)/,
  `aHg(22, "logo", 8, "${assets.transparentPixel}")`,
  "remove small logo"
  );

  return source;
}

module.exports = { applyPatches };
