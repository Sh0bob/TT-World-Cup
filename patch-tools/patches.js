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

  source = replaceOne(
  source,
  /this\.a2p\s*=\s*function\(\)\s*\{\s*-1\s*!==\s*aAA\s*&&\s*\(this\.aAH\s*=\s*!1\)\s*\}\s*,\s*this\.vU\s*=\s*function\(\)\s*\{[\s\S]*?\n\t\}/,
  `this.a2p = function() {
		-1 !== aAA && (this.aAH = !1)
	}, this.vU = function() {}`,
  "remove seconds played chart"
);

 source = replaceOne(
  source,
  /this\.vU\s*=\s*function\(fD\)\s*\{\s*vV\.lineWidth = 1 \+ Math\.floor\(xq \/ 15\),\s*vV\.translate\(h\.i - xq,\s*fD \+ xp\),\s*vV\.rotate\(-Math\.PI \/ 2\),[\s\S]*?vV\.setTransform\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)\s*\}/,
  `this.vU = function(fD) {}`,
  "remove next contest bar"
);

source = replaceOne(
  source,
  /new w\("⚔️<br>" \+ L\(324\), function\(\) \{\s*__fx\.isCustomLobbyVersion \? alert\("This version is for use with custom lobbies only\. For normal multiplayer, use the version at https:\/\/fxclient\.github\.io\/FXclient\/"\) : aRU\(0\)\s*\}, __fx\.isCustomLobbyVersion \? "rgba\(50, 50, 50, 0\.6\)" : bB\.oR\)/,
  `new w("Join/Create custom lobby", function() {
			__fx.customLobby.showJoinPrompt();
		}, "rgba(20, 9, 77, 0.5)")`,
  "replace multiplayer button with custom lobby"
);

source = replaceOne(
  source,
  /new w\("🗡️<br>" \+ L\(307\), function\(\) \{\s*aRU\(1\)\s*\}, bB\.ok\)/,
  `new w("FX Client settings", function() {
			__fx.WindowManager.openWindow("settings");
		}, "rgba(0, 0, 20, 0.5)")`,
  "replace custom scenario button with FX settings"
);

source = replaceOne(
  source,
  /bA\.qr\.tY\(aRS\[5\]\.button,\s*fB,\s*u6 \+ a9y \* 2 \+ gap \* 2,\s*i \* 2 \+ gap,\s*a9y \/ 3\);\s*bA\.qr\.tY\(aRS\[6\]\.button,\s*fB,\s*u6 \+ a9y \* 2\.33 \+ gap \* 3,\s*i \* 2 \+ gap,\s*a9y \/ 3\);/,
  `bA.qr.tY(aRS[5].button, -9999, -9999, 1, 1);
		bA.qr.tY(aRS[6].button, -9999, -9999, 1, 1);`,
  "hide duplicate custom buttons"
);

source = replaceOne(
  source,
  /this\.vU\s*=\s*function\(\)\s*\{\s*if\s*\(ec && this\.hq\(\)\)\s*\{\s*var aB;\s*for\s*\(vV\.imageSmoothingEnabled = !0,\s*aB = 0;\s*aB < 5;\s*aB\+\+\)\s*fW\[aB\] && this\.fr\[aB\] && \(vV\.setTransform\(na\[aB\], 0, 0, na\[aB\], fB\[aB\], fD\[aB\]\), vV\.drawImage\(ec\[aB\], 0, 0\)\);\s*vV\.setTransform\(1, 0, 0, 1, 0, 0\)\s*\}\s*\}/,
  `this.vU = function() {}`,
  "remove side buttons"
);
  return source;
}

module.exports = { applyPatches };
