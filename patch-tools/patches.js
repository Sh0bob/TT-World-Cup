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
  /var gap = \.5 \* bc\.gap,[\s\S]*?re\.e\.style\.font = bA\.qr\.si\(0, bA\.qr\.uu\(\.08 \* aQZ\.j\)\), bA\.qr\.r1\(re\.e, 5\)/,
  `var edgeGap = Math.max(8, .5 * bc.gap),
			panelW = .46 * aQZ.i,
			inputH = .16 * aQZ.j,
			colorSize = inputH,
			controlGap = Math.max(8, .02 * aQZ.j),
			buttonH = .115 * aQZ.j,
			buttonGap = Math.max(8, .018 * aQZ.j),
			left = aQZ.fB + .5 * (aQZ.i - panelW),
			top = aQZ.fD + .24 * aQZ.j,
			inputW = panelW - colorSize - controlGap,
			buttonTop = top + inputH + controlGap,
			panelPadX = 18,
			panelPadTop = 18,
			panelPadBottom = 16,
			panelH = (buttonTop + (buttonH + buttonGap) * 2 + buttonH + panelPadBottom) - (top - panelPadTop);

		sd = top;

		/* input + colour square */
		bA.qr.tY(re.e, left, top, inputW, inputH);
		bA.qr.tY(aRS[4].button, left + inputW + controlGap, top + .01 * aQZ.j, colorSize * .92, colorSize * .92);

		/* fake backplate using former Account button */
		bA.qr.tY(aRS[2].button, left - panelPadX, top - panelPadTop, panelW + panelPadX * 2, panelH);
		aRS[2].button.innerHTML = "";
		aRS[2].button.textContent = "";
		aRS[2].button.onclick = null;
		aRS[2].button.style.pointerEvents = "none";
		aRS[2].button.style.zIndex = "1";
		aRS[2].button.classList.add("ttwc-panel-btn");

		/* real clickable buttons */
		bA.qr.tY(aRS[0].button, left, buttonTop + (buttonH + buttonGap) * 0, panelW, buttonH);
		bA.qr.tY(aRS[1].button, left, buttonTop + (buttonH + buttonGap) * 1, panelW, buttonH);
		bA.qr.tY(aRS[3].button, left, buttonTop + (buttonH + buttonGap) * 2, panelW, buttonH);

		aRS[0].button.style.zIndex = "5";
		aRS[1].button.style.zIndex = "5";
		aRS[3].button.style.zIndex = "5";
		re.e.style.zIndex = "5";
		aRS[4].button.style.zIndex = "5";

		/* hide the duplicate lower custom buttons */
		bA.qr.tY(aRS[5].button, -9999, -9999, 1, 1);
		bA.qr.tY(aRS[6].button, -9999, -9999, 1, 1);

		for (var aB = 0; aB < aRS.length; aB++) {
			if (aB !== 2) {
				aRS[aB].button.style.font = bA.qr.si(0, bA.qr.uu(.045 * aQZ.j));
				bA.qr.r1(aRS[aB].button, 10);
			}
		}

		re.e.style.font = bA.qr.si(0, bA.qr.uu(.062 * aQZ.j));
		bA.qr.r1(re.e, 10)`,
  "replace main menu layout"
);

source = replaceOne(
  source,
  /this\.vU\s*=\s*function\(\)\s*\{\s*if\s*\(ec && this\.hq\(\)\)\s*\{\s*var aB;\s*for\s*\(vV\.imageSmoothingEnabled = !0,\s*aB = 0;\s*aB < 5;\s*aB\+\+\)\s*fW\[aB\] && this\.fr\[aB\] && \(vV\.setTransform\(na\[aB\], 0, 0, na\[aB\], fB\[aB\], fD\[aB\]\), vV\.drawImage\(ec\[aB\], 0, 0\)\);\s*vV\.setTransform\(1, 0, 0, 1, 0, 0\)\s*\}\s*\}/,
  `this.vU = function() {}`,
  "remove side buttons"
);

source = replaceOne(
  source,
  /return t\.u\(9,\s*t\.t8,\s*new aDb\(L\(126\),\s*bA\.qr\.a4B\(aBp\[aB\]\)\)\),\s*!0;/,
  `return !1;`,
  "disable side button leave-site popup"
);

source = replaceOne(
  source,
  /this\.z0\s*=\s*function\(\)\s*\{[\s\S]*?vV\.fillRect\(0,\s*0,\s*h\.i,\s*h\.j\)\s*\}/,
  `this.z0 = function() {
    vV.setTransform(1, 0, 0, 1, 0, 0);
    vV.clearRect(0, 0, h.i, h.j);
  }`,
  "make main menu background transparent"
);

source = replaceOne(
  source,
  /aHg\(4,\s*"crown",\s*4,\s*"[^"]+"\s*\)/,
  `aHg(4, "crown", 4, "${assets.crownIcon}")`,
  "replace crown icon"
);

source = replaceOne(
  source,
  /aBA\[aAw\] = kA\[aD\.eo\], aBB\[aAw\] = ag\.gs\[aD\.eo\];/,
  `aBA[aAw] = kA[aD.eo], aBB[aAw] = ag.gs[aD.eo];
window.__TTWC = window.__TTWC || {};
window.__TTWC.getLeaderboardSnapshot = function() {
  try {
    const rows = [];
    const totalPlayers = Math.max(
      Array.isArray(kA) ? kA.length : 0,
      Array.isArray(ag?.a1a) ? ag.a1a.length : 0,
      Array.isArray(ag?.a1V) ? ag.a1V.length : 0,
      Array.isArray(ag?.gs) ? ag.gs.length : 0
    );

    for (let player = 0; player < totalPlayers; player++) {
      const rawName = String(ag?.a1a?.[player] ?? ag?.a1V?.[player] ?? "").trim();
      if (!rawName) continue;

      const order = Number.isFinite(kA?.[player]) ? Number(kA[player]) : 999999;
      const territory = Number(ag?.gs?.[player] ?? 0);

      rows.push({
        place: order + 1,
        id: player,
        playerId: player,
        name: rawName,
        displayName: String(ag?.a1V?.[player] ?? rawName),
        territory,
        score: territory,
        troops: 0,
        alive: ag?.my?.[player] !== 0
      });
    }

    rows.sort((a, b) =>
      a.place - b.place ||
      b.territory - a.territory ||
      a.id - b.id
    );

    return rows.map((row, index) => ({
      ...row,
      place: index + 1
    }));
  } catch (err) {
    console.error("[TTWC] getLeaderboardSnapshot failed:", err);
    return [];
  }
};`,
  "expose full leaderboard snapshot"
);

source = replaceOne(
  source,
  /this\.a1H = function\(\) \{/,
  `this.a1H = function() {
    try {
      window.__TTWC = window.__TTWC || {};
      window.__TTWC.endScreenShown = true;
      window.__TTWC.resultType = aD.a0x ? "stalemate" : "victory";
      window.__TTWC.endTriggeredAt = Date.now();
    } catch (err) {
      console.error("[TTWC] end result hook failed:", err);
    }`,
  "hook match end result"
);

source = replaceOne(
  source,
  /function a70\(eT, qY, id, gc, a73, a74, l2, a75, a76, a77, a7H\) \{/,
  `function a70(eT, qY, id, gc, a73, a74, l2, a75, a76, a77, a7H) {
    try {
      window.__TTWC = window.__TTWC || {};
      if (id === 40) {
        window.__TTWC.endScreenShown = true;
        window.__TTWC.resultType = "victory";
        window.__TTWC.endTriggeredAt = Date.now();
      } else if (id === 41) {
        window.__TTWC.endScreenShown = true;
        window.__TTWC.resultType = "stalemate";
        window.__TTWC.endTriggeredAt = Date.now();
      }
    } catch (err) {
      console.error("[TTWC] a70 result hook failed:", err);
    }`,
  "hook end result toast ids"
);

source = replaceOne(
  source,
  /this\.vU = function\(\) \{\s*if \(aa\.aHH\(\), aT\.vU\(\), f4 = Math\.floor\(\(a0\.a1\.iD\(\) \? \.018 : \.0137\) \* h\.iE\), vV\.font = bA\.qr\.si\(0, Math\.max\(5, f4\)\), bA\.qr\.textBaseline\(vV, 0\), bA\.qr\.textAlign\(vV, 2\), vV\.fillStyle = bB\.ny, vV\.fillText\(l\.dw, h\.i, 0\), text = "Win count: " \+\s*__fx\.wins\.count, textLength = vV\.measureText\(text\)\.width, f4 = Math\.max\(5, f4\), vV\.textAlign = "left", vV\.textBaseline = "middle", vV\.fillText\(text, vV\.canvas\.width - textLength - f4 \/ 2, 2 \* f4\),/,
  `this.vU = function() {
		if (aa.aHH(), aT.vU(),`,
  "remove top-right date and win count"
);
  return source;
}

module.exports = { applyPatches };
