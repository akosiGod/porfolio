// Function definitions placed globally so inline HTML onclick attributes can access them
function openCertModal(imageSrc) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("modalImg");
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.style.display = "flex";
    }
}

function closeCertModal() {
    const modal = document.getElementById("certModal");
    if (modal) {
        modal.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Esc Key listener to close certificate modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeCertModal();
        }
    });

    // ===================================================
    // 1. HIGHLY DETAILED VIBRANT COSMIC BACKGROUND CANVAS
    // ===================================================
    const spaceCanvas = document.getElementById("space-canvas");
    const spaceCtx = spaceCanvas.getContext("2d");
    const pxCanvas = document.getElementById("phoenix-canvas");
    const pxCtx = pxCanvas.getContext("2d");
    const portfolioMain = document.getElementById("portfolio-main");

    let width = spaceCanvas.width = pxCanvas.width = window.innerWidth;
    let height = spaceCanvas.height = pxCanvas.height = window.innerHeight;

    // Offscreen Canvas for Static Micro-Stars (Massive FPS boost)
    const microCanvas = document.createElement("canvas");
    const microCtx = microCanvas.getContext("2d");

    let bgDimAlpha = 1.0;

    window.addEventListener("resize", () => {
        width = spaceCanvas.width = pxCanvas.width = window.innerWidth;
        height = spaceCanvas.height = pxCanvas.height = window.innerHeight;
        initCosmos();
        resizeEggCanvas();
    });

    let stars = [];
    let dustClouds = [];
    let cosmicRays = [];
    let meteors = [];
    let cosmicRipples = [];
    let floatingEmbers = [];
    let globalCosmicTime = 0;

    function initCosmos() {
        stars = [];
        dustClouds = [];
        cosmicRays = [];
        meteors = [];
        cosmicRipples = [];
        floatingEmbers = [];

        microCanvas.width = width;
        microCanvas.height = height;

        const maxStars = Math.min(Math.floor((width * height) / 1000), 1800);
        const nebulaCenter = { x: width * 0.5, y: height * 0.5, radius: width * 0.45 };

        // Layer 1: Pre-render Micro-Star Field
        microCtx.clearRect(0, 0, width, height);
        const totalMicroStars = Math.floor(maxStars * 1.5);
        for (let i = 0; i < totalMicroStars; i++) {
            microCtx.beginPath();
            microCtx.arc(
                Math.random() * width,
                Math.random() * height,
                Math.random() * 0.45 + 0.1,
                0, Math.PI * 2
            );
            microCtx.fillStyle = Math.random() > 0.5 ? "#fff8e7" : "#ffcc00";
            microCtx.globalAlpha = Math.random() * 0.6 + 0.15;
            microCtx.fill();
        }

        // Layer 2: Main Dynamic Stellar Cloud
        for (let i = 0; i < maxStars; i++) {
            let isNebulaStar = Math.random() < 0.8;
            let x, y;

            if (isNebulaStar) {
                let angle = Math.random() * Math.PI * 2;
                let dist = Math.pow(Math.random(), 1.2) * nebulaCenter.radius;
                x = nebulaCenter.x + Math.cos(angle) * dist;
                y = nebulaCenter.y + Math.sin(angle) * dist;
            } else {
                x = Math.random() * width;
                y = Math.random() * height;
            }

            let colorRoll = Math.random();
            let color = "#ffffff";
            if (colorRoll < 0.35) color = "#ff0055";
            else if (colorRoll < 0.6) color = "#ff7700";
            else if (colorRoll < 0.8) color = "#ffcc00";
            else color = "#fff8e7";

            stars.push({
                x: x, y: y, vx: 0, vy: 0,
                size: Math.random() * 1.2 + 0.2,
                hasFlare: Math.random() > 0.92,
                alpha: Math.random() * 0.9,
                twinkleSpeed: Math.random() * 0.03 + 0.008,
                twinklePhase: Math.random() * Math.PI * 2,
                color: color,
                isExploding: false
            });
        }

        // Layer 3: Volumetric Dust Clouds
        for (let i = 0; i < 35; i++) {
            let angle = Math.random() * Math.PI * 2;
            let dist = (Math.random() * 0.35 + 0.05) * Math.max(width, height);

            dustClouds.push({
                baseX: nebulaCenter.x + Math.cos(angle) * dist,
                baseY: nebulaCenter.y + Math.sin(angle) * dist,
                x: nebulaCenter.x + Math.cos(angle) * dist,
                y: nebulaCenter.y + Math.sin(angle) * dist,
                radius: Math.random() * 260 + 140,
                driftAngle: Math.random() * Math.PI * 2,
                driftSpeed: Math.random() * 0.1 + 0.03,
                pulseSpeed: Math.random() * 0.015 + 0.004,
                color: Math.random() > 0.45 ? "rgba(230, 10, 85, " : Math.random() > 0.2 ? "rgba(255, 130, 0, " : "rgba(120, 0, 180, ",
                baseAlpha: Math.random() * 0.22 + 0.06
            });
        }

        // Layer 4: Cosmic Rays
        for (let i = 0; i < 10; i++) {
            cosmicRays.push({
                angle: (i / 10) * Math.PI * 2,
                length: Math.random() * 320 + 220,
                width: Math.random() * 0.18 + 0.08,
                speed: (Math.random() - 0.5) * 0.0012,
                alpha: Math.random() * 0.15 + 0.05
            });
        }

        // Layer 5: Ambient Floating Embers
        for (let i = 0; i < 120; i++) {
            floatingEmbers.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -Math.random() * 0.7 - 0.25,
                size: Math.random() * 2.5 + 0.4,
                alpha: Math.random() * 0.85,
                color: Math.random() > 0.5 ? "#ff0055" : Math.random() > 0.25 ? "#ffaa00" : "#ffffff"
            });
        }
    }
    initCosmos();

    function spawnMeteor() {
        if (Math.random() < 0.025 && meteors.length < 3) {
            let startX = Math.random() * width * 1.2 - width * 0.1;
            let startY = Math.random() * height * 0.4;
            let angle = Math.PI * 0.25 + (Math.random() - 0.5) * 0.2;
            let speed = Math.random() * 12 + 10;

            meteors.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                length: Math.random() * 140 + 80,
                thickness: Math.random() * 2 + 1,
                alpha: 1.0,
                decay: Math.random() * 0.02 + 0.012,
                color: Math.random() > 0.4 ? "#ffffff" : "#ffcc00"
            });
        }
    }

    function spawnCosmicRipple() {
        if (Math.random() < 0.015 && cosmicRipples.length < 3) {
            cosmicRipples.push({
                radius: 10,
                maxRadius: Math.max(width, height) * 0.45,
                alpha: 0.35,
                speed: Math.random() * 1.8 + 1.2
            });
        }
    }

    function renderSpace() {
        globalCosmicTime += 0.015;
        spaceCtx.clearRect(0, 0, width, height);

        let bgGrad = spaceCtx.createRadialGradient(
            width * 0.5, height * 0.5, 10,
            width * 0.5, height * 0.5, Math.max(width, height) * 0.95
        );
        bgGrad.addColorStop(0, "#1c000d");
        bgGrad.addColorStop(0.35, "#0a0107");
        bgGrad.addColorStop(1, "#020003");
        spaceCtx.fillStyle = bgGrad;
        spaceCtx.fillRect(0, 0, width, height);

        spaceCtx.globalCompositeOperation = "screen";
        let breathe = Math.sin(globalCosmicTime * 0.85) * 28;
        let hollowGrad = spaceCtx.createRadialGradient(
            width * 0.5, height * 0.5, 5,
            width * 0.5, height * 0.5, width * 0.28 + breathe
        );
        hollowGrad.addColorStop(0, `rgba(255, 235, 210, ${0.48 * bgDimAlpha})`);
        hollowGrad.addColorStop(0.25, `rgba(255, 0, 95, ${0.32 * bgDimAlpha})`);
        hollowGrad.addColorStop(0.6, `rgba(130, 0, 160, ${0.18 * bgDimAlpha})`);
        hollowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        spaceCtx.fillStyle = hollowGrad;
        spaceCtx.beginPath();
        spaceCtx.arc(width * 0.5, height * 0.5, width * 0.28 + breathe, 0, Math.PI * 2);
        spaceCtx.fill();

        spaceCtx.save();
        spaceCtx.translate(width * 0.5, height * 0.5);
        for (let ray of cosmicRays) {
            ray.angle += ray.speed;
            spaceCtx.save();
            spaceCtx.rotate(ray.angle);

            let rayGrad = spaceCtx.createLinearGradient(0, 0, ray.length, 0);
            rayGrad.addColorStop(0, `rgba(255, 100, 150, ${ray.alpha * bgDimAlpha})`);
            rayGrad.addColorStop(0.5, `rgba(255, 160, 0, ${ray.alpha * 0.5 * bgDimAlpha})`);
            rayGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

            spaceCtx.fillStyle = rayGrad;
            spaceCtx.beginPath();
            spaceCtx.moveTo(0, 0);
            spaceCtx.arc(0, 0, ray.length, -ray.width * 0.5, ray.width * 0.5);
            spaceCtx.closePath();
            spaceCtx.fill();
            spaceCtx.restore();
        }
        spaceCtx.restore();

        spawnCosmicRipple();
        for (let i = cosmicRipples.length - 1; i >= 0; i--) {
            let rip = cosmicRipples[i];
            rip.radius += rip.speed;
            rip.alpha -= 0.003;

            if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
                cosmicRipples.splice(i, 1);
                continue;
            }

            spaceCtx.strokeStyle = `rgba(255, 120, 180, ${rip.alpha * bgDimAlpha})`;
            spaceCtx.lineWidth = 2.5;
            spaceCtx.beginPath();
            spaceCtx.arc(width * 0.5, height * 0.5, rip.radius, 0, Math.PI * 2);
            spaceCtx.stroke();
        }

        for (let cloud of dustClouds) {
            cloud.driftAngle += 0.0018;
            cloud.x = cloud.baseX + Math.cos(cloud.driftAngle) * 24;
            cloud.y = cloud.baseY + Math.sin(cloud.driftAngle) * 24;

            let cloudPulse = Math.sin(globalCosmicTime * cloud.pulseSpeed * 100) * 0.04;
            let currentAlpha = Math.max(0, cloud.baseAlpha + cloudPulse) * bgDimAlpha;

            let cGrad = spaceCtx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
            cGrad.addColorStop(0, `${cloud.color}${currentAlpha})`);
            cGrad.addColorStop(0.5, `${cloud.color}${currentAlpha * 0.45})`);
            cGrad.addColorStop(1, "rgba(0,0,0,0)");

            spaceCtx.fillStyle = cGrad;
            spaceCtx.beginPath();
            spaceCtx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
            spaceCtx.fill();
        }

        spaceCtx.globalCompositeOperation = "lighter";
        spaceCtx.globalAlpha = bgDimAlpha;
        spaceCtx.drawImage(microCanvas, 0, 0);

        for (let emb of floatingEmbers) {
            emb.x += emb.vx;
            emb.y += emb.vy;

            if (emb.y < -10) emb.y = height + 10;
            if (emb.x < -10) emb.x = width + 10;
            if (emb.x > width + 10) emb.x = -10;

            spaceCtx.beginPath();
            spaceCtx.arc(emb.x, emb.y, emb.size, 0, Math.PI * 2);
            spaceCtx.fillStyle = emb.color;
            spaceCtx.globalAlpha = emb.alpha * bgDimAlpha * (Math.sin(globalCosmicTime * 2.2 + emb.x) * 0.35 + 0.65);
            spaceCtx.fill();
        }

        spawnMeteor();
        for (let i = meteors.length - 1; i >= 0; i--) {
            let m = meteors[i];
            m.x += m.vx;
            m.y += m.vy;
            m.alpha -= m.decay;

            if (m.alpha <= 0) {
                meteors.splice(i, 1);
                continue;
            }

            let invLen = m.length / Math.hypot(m.vx, m.vy);
            let tailX = m.x - m.vx * invLen;
            let tailY = m.y - m.vy * invLen;

            let mGrad = spaceCtx.createLinearGradient(m.x, m.y, tailX, tailY);
            mGrad.addColorStop(0, m.color);
            mGrad.addColorStop(0.3, "rgba(255, 120, 0, 0.8)");
            mGrad.addColorStop(1, "rgba(255, 0, 85, 0)");

            spaceCtx.strokeStyle = mGrad;
            spaceCtx.lineWidth = m.thickness;
            spaceCtx.globalAlpha = m.alpha * bgDimAlpha;
            spaceCtx.beginPath();
            spaceCtx.moveTo(m.x, m.y);
            spaceCtx.lineTo(tailX, tailY);
            spaceCtx.stroke();
        }

        for (let s of stars) {
            if (s.isExploding) {
                s.x += s.vx;
                s.y += s.vy;
                s.alpha -= 0.008;
            } else {
                s.twinklePhase += s.twinkleSpeed;
                let twinkle = (Math.sin(s.twinklePhase) + 1) * 0.5;
                s.alpha = s.size > 0.6 ? 0.35 + twinkle * 0.65 : 0.15 + twinkle * 0.55;
            }

            if (s.alpha <= 0) continue;

            let renderAlpha = Math.max(0, Math.min(1, s.alpha * bgDimAlpha));

            spaceCtx.beginPath();
            spaceCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            spaceCtx.fillStyle = s.color;
            spaceCtx.globalAlpha = renderAlpha;
            spaceCtx.fill();

            if (s.hasFlare && renderAlpha > 0.5) {
                spaceCtx.strokeStyle = s.color;
                spaceCtx.lineWidth = 0.5;
                let flareLen = s.size * 4.8 * renderAlpha;

                spaceCtx.beginPath();
                spaceCtx.moveTo(s.x - flareLen, s.y);
                spaceCtx.lineTo(s.x + flareLen, s.y);
                spaceCtx.moveTo(s.x, s.y - flareLen);
                spaceCtx.lineTo(s.x, s.y + flareLen);
                spaceCtx.stroke();
            }
        }

        spaceCtx.globalCompositeOperation = "source-over";
        spaceCtx.globalAlpha = 1.0;

        requestAnimationFrame(renderSpace);
    }
    renderSpace();

    // ===================================================
    // 2. EGG SYSTEM (CRACK & SHARDS)
    // ===================================================
    const eggScreen = document.getElementById("egg-screen");
    const counter = document.getElementById("counter");

    const rawEgg = document.getElementById("phoenix-egg");
    if (rawEgg) rawEgg.style.display = "none";

    let crackStage = 0;
    let shellShards = [];
    let crownShards = [];
    let screenShake = 0;
    let isEggActive = true;
    let transitionProgress = 0;

    const eggCanvas = document.createElement("canvas");
    eggCanvas.style.position = "absolute";
    eggCanvas.style.top = "0";
    eggCanvas.style.left = "0";
    eggCanvas.style.width = "100%";
    eggCanvas.style.height = "100%";
    eggCanvas.style.zIndex = "1";
    eggCanvas.style.pointerEvents = "none";
    eggScreen.appendChild(eggCanvas);
    const eggCtx = eggCanvas.getContext("2d");

    function resizeEggCanvas() {
        eggCanvas.width = window.innerWidth;
        eggCanvas.height = window.innerHeight;
    }
    resizeEggCanvas();

    eggScreen.addEventListener("click", () => {
        if (!isEggActive || crackStage >= 3) return;

        crackStage++;
        screenShake = crackStage * 28;
        if (counter) counter.textContent = `(${crackStage}/3)`;

        let cx = width / 2;
        let cy = height * 0.5;
        let eggH = 310;

        let shardOriginY = cy - 120 + (crackStage - 1) * 75;
        for (let i = 0; i < crackStage * 20; i++) {
            let angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
            let force = Math.random() * (16 * crackStage) + 6;
            shellShards.push({
                x: cx + (Math.random() - 0.5) * 110,
                y: shardOriginY + (Math.random() - 0.5) * 35,
                vx: Math.cos(angle) * force,
                vy: Math.sin(angle) * force - 4,
                rot: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 24 + 10,
                alpha: 1.0,
                color: Math.random() > 0.4 ? "#ff0055" : "#ffcc00"
            });
        }

        if (crackStage === 1) {
            let crownY = cy - eggH * 0.52;
            for (let i = 0; i < 18; i++) {
                let dir = (Math.random() - 0.5) * 2.6;
                crownShards.push({
                    x: cx + dir * 55,
                    y: crownY + (Math.random() - 0.5) * 18,
                    vx: dir * (Math.random() * 8 + 3),
                    vy: -Math.random() * 7 - 3,
                    rot: Math.random() * Math.PI * 2,
                    vRot: (Math.random() - 0.5) * 0.6,
                    size: Math.random() * 22 + 8,
                    alpha: 1.0,
                    sparks: Math.random() > 0.2
                });
            }
        }

        if (crackStage === 3) {
            smoothFinalCrackSequence();
        }
    });

    function smoothFinalCrackSequence() {
        let startTime = performance.now();
        let duration = 600;

        function step(currentTime) {
            let elapsed = currentTime - startTime;
            transitionProgress = Math.min(1, elapsed / duration);

            if (transitionProgress < 1) {
                requestAnimationFrame(step);
            } else {
                seamlessIgnitionHandoff();
            }
        }
        requestAnimationFrame(step);
    }

    function drawDetailedEggWings(cx, cy, w, h, time, stage) {
        eggCtx.save();
        eggCtx.globalCompositeOperation = "lighter";

        let wingPulse = Math.sin(time * 2.8) * 16;
        let flap = Math.cos(time * 1.8) * 0.08;

        for (let side of [-1, 1]) {
            eggCtx.save();
            eggCtx.translate(cx, cy - h * 0.08);
            eggCtx.scale(side, 1);
            eggCtx.rotate(side * flap);

            let baseGrad = eggCtx.createRadialGradient(w * 0.5, -h * 0.2, 10, w * 0.8, -h * 0.4, w * 1.2);
            baseGrad.addColorStop(0, `rgba(255, 0, 85, ${0.4 + stage * 0.1})`);
            baseGrad.addColorStop(0.5, "rgba(255, 120, 0, 0.25)");
            baseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

            eggCtx.fillStyle = baseGrad;
            eggCtx.beginPath();
            eggCtx.arc(w * 0.6, -h * 0.25, w * 0.85 + wingPulse, 0, Math.PI * 2);
            eggCtx.fill();

            const primaryFeathers = [
                { length: 1.4, angle: -0.52, tipW: 18 },
                { length: 1.5, angle: -0.38, tipW: 22 },
                { length: 1.42, angle: -0.22, tipW: 20 },
                { length: 1.28, angle: -0.06, tipW: 18 },
                { length: 1.1, angle: 0.1, tipW: 15 },
                { length: 0.85, angle: 0.25, tipW: 12 }
            ];

            primaryFeathers.forEach((f) => {
                let fLen = w * f.length + wingPulse * 1.2;
                let endX = Math.cos(f.angle) * fLen;
                let endY = Math.sin(f.angle) * fLen - h * 0.15;

                let fGrad = eggCtx.createLinearGradient(0, 0, endX, endY);
                fGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
                fGrad.addColorStop(0.3, "rgba(255, 200, 0, 0.85)");
                fGrad.addColorStop(0.75, "rgba(255, 0, 90, 0.6)");
                fGrad.addColorStop(1, "rgba(120, 0, 40, 0)");

                eggCtx.fillStyle = fGrad;
                eggCtx.beginPath();
                eggCtx.moveTo(w * 0.18, h * 0.05);
                eggCtx.quadraticCurveTo(endX * 0.5, endY - 25, endX, endY);
                eggCtx.quadraticCurveTo(endX * 0.65, endY + f.tipW, w * 0.22, h * 0.18);
                eggCtx.closePath();
                eggCtx.fill();

                eggCtx.strokeStyle = "rgba(255, 255, 255, 0.75)";
                eggCtx.lineWidth = 1.8;
                eggCtx.beginPath();
                eggCtx.moveTo(w * 0.2, h * 0.08);
                eggCtx.quadraticCurveTo(endX * 0.5, endY - 10, endX * 0.92, endY);
                eggCtx.stroke();
            });

            const secondaryFeathers = [
                { length: 0.95, angle: -0.42 },
                { length: 1.05, angle: -0.26 },
                { length: 0.98, angle: -0.1 },
                { length: 0.8, angle: 0.08 }
            ];

            secondaryFeathers.forEach((f) => {
                let fLen = w * f.length + wingPulse * 0.6;
                let endX = Math.cos(f.angle) * fLen;
                let endY = Math.sin(f.angle) * fLen - h * 0.08;

                let sGrad = eggCtx.createLinearGradient(0, 0, endX, endY);
                sGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
                sGrad.addColorStop(0.5, "rgba(255, 170, 0, 0.8)");
                sGrad.addColorStop(1, "rgba(255, 0, 85, 0)");

                eggCtx.fillStyle = sGrad;
                eggCtx.beginPath();
                eggCtx.moveTo(w * 0.15, h * 0.02);
                eggCtx.quadraticCurveTo(endX * 0.5, endY - 15, endX, endY);
                eggCtx.quadraticCurveTo(endX * 0.6, endY + 14, w * 0.18, h * 0.12);
                eggCtx.closePath();
                eggCtx.fill();
            });

            eggCtx.restore();
        }
        eggCtx.restore();
    }

    function drawFlameCrown(cx, cy, w, h, time, stage) {
        eggCtx.save();
        let crownY = cy - h * 0.52;

        if (stage === 0) {
            eggCtx.save();
            eggCtx.translate(cx, crownY);
            eggCtx.globalCompositeOperation = "lighter";

            let baseGrad = eggCtx.createLinearGradient(-w * 0.28, 0, w * 0.28, 0);
            baseGrad.addColorStop(0, "rgba(255, 0, 85, 0.8)");
            baseGrad.addColorStop(0.5, "rgba(255, 230, 0, 0.95)");
            baseGrad.addColorStop(1, "rgba(255, 0, 85, 0.8)");

            eggCtx.strokeStyle = baseGrad;
            eggCtx.lineWidth = 5;
            eggCtx.beginPath();
            eggCtx.ellipse(0, 8, w * 0.26, 12, 0, 0, Math.PI * 2);
            eggCtx.stroke();

            const peaks = [
                { x: -w * 0.24, h: 28 },
                { x: -w * 0.14, h: 48 },
                { x: 0, h: 65 },
                { x: w * 0.14, h: 48 },
                { x: w * 0.24, h: 28 }
            ];

            peaks.forEach((p, idx) => {
                let wave = Math.sin(time * 5 + idx) * 6;
                let peakGrad = eggCtx.createLinearGradient(p.x, 10, p.x + wave, -p.h);
                peakGrad.addColorStop(0, "#ff0055");
                peakGrad.addColorStop(0.4, "#ffaa00");
                peakGrad.addColorStop(0.85, "#ffffcc");
                peakGrad.addColorStop(1, "#ffffff");

                eggCtx.fillStyle = peakGrad;
                eggCtx.beginPath();
                eggCtx.moveTo(p.x - 12, 8);
                eggCtx.quadraticCurveTo(p.x - 6, -p.h * 0.5, p.x + wave, -p.h - wave);
                eggCtx.quadraticCurveTo(p.x + 8, -p.h * 0.4, p.x + 12, 8);
                eggCtx.closePath();
                eggCtx.fill();
            });

            eggCtx.restore();
        }

        for (let i = crownShards.length - 1; i >= 0; i--) {
            let cs = crownShards[i];
            cs.x += cs.vx;
            cs.y += cs.vy;
            cs.vy += 0.52;
            cs.rot += cs.vRot;
            cs.alpha -= 0.018;

            if (cs.alpha <= 0) {
                crownShards.splice(i, 1);
                continue;
            }

            eggCtx.save();
            eggCtx.translate(cs.x, cs.y);
            eggCtx.rotate(cs.rot);
            eggCtx.globalAlpha = cs.alpha;
            eggCtx.globalCompositeOperation = "lighter";

            let shardGrad = eggCtx.createLinearGradient(0, -cs.size, 0, cs.size);
            shardGrad.addColorStop(0, "#ffffff");
            shardGrad.addColorStop(0.4, "#ffcc00");
            shardGrad.addColorStop(1, "#ff0055");

            eggCtx.fillStyle = shardGrad;
            eggCtx.beginPath();
            eggCtx.moveTo(0, -cs.size);
            eggCtx.lineTo(cs.size * 0.6, cs.size * 0.5);
            eggCtx.lineTo(-cs.size * 0.6, cs.size * 0.8);
            eggCtx.closePath();
            eggCtx.fill();
            eggCtx.restore();
        }

        eggCtx.restore();
    }

    function drawLickingFlames(cx, cy, w, h, time) {
        eggCtx.save();
        eggCtx.globalCompositeOperation = "lighter";

        for (let side = -1; side <= 1; side += 2) {
            for (let i = 0; i < 5; i++) {
                let wave = Math.sin(time * 6 + i + side) * 16;
                let tongueGrad = eggCtx.createLinearGradient(cx, cy + h * 0.4, cx, cy - h * 0.6);
                tongueGrad.addColorStop(0, "rgba(255, 0, 85, 0.9)");
                tongueGrad.addColorStop(0.5, "rgba(255, 140, 0, 0.95)");
                tongueGrad.addColorStop(0.85, "rgba(255, 230, 0, 0.98)");
                tongueGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

                eggCtx.fillStyle = tongueGrad;
                eggCtx.beginPath();
                eggCtx.moveTo(cx + (side * i * 18), cy + h * 0.3);
                eggCtx.bezierCurveTo(
                    cx + side * (w * 0.45 + wave), cy + h * 0.1,
                    cx + side * (w * 0.25 - wave), cy - h * 0.38,
                    cx + side * (i * 10), cy - h * 0.55 - wave
                );
                eggCtx.bezierCurveTo(
                    cx + side * (w * 0.12), cy - h * 0.2,
                    cx + side * (w * 0.3), cy + h * 0.1,
                    cx + (side * i * 18), cy + h * 0.3
                );
                eggCtx.fill();
            }
        }
        eggCtx.restore();
    }

    function renderDynamicEgg() {
        if (!isEggActive) return;

        eggCtx.clearRect(0, 0, width, height);

        let cx = width / 2;
        let cy = height * 0.5;

        let eggW = 270;
        let eggH = 310;

        if (screenShake > 0) {
            screenShake *= 0.84;
            cx += (Math.random() - 0.5) * screenShake;
            cy += (Math.random() - 0.5) * screenShake;
        }

        drawDetailedEggWings(cx, cy, eggW, eggH, globalCosmicTime, crackStage);

        let shellGrad = eggCtx.createRadialGradient(
            cx - eggW * 0.25, cy - eggH * 0.2, 5,
            cx, cy, eggH * 0.65
        );
        shellGrad.addColorStop(0, "#ff2a6d");
        shellGrad.addColorStop(0.35, "#b0003a");
        shellGrad.addColorStop(0.75, "#52001a");
        shellGrad.addColorStop(1, "#1a0007");

        eggCtx.save();
        eggCtx.globalCompositeOperation = "lighter";
        let volatilePulse = Math.sin(globalCosmicTime * (16 + crackStage * 12)) * (14 + crackStage * 18);
        let coreRadius = (crackStage * 62) + volatilePulse + 28 + (transitionProgress * 120);

        if (crackStage > 0) {
            let coreGrad = eggCtx.createRadialGradient(cx, cy - 25, 2, cx, cy - 25, coreRadius);
            coreGrad.addColorStop(0, "#ffffff");
            coreGrad.addColorStop(0.2, "#ffe600");
            coreGrad.addColorStop(0.5, "#ff3300");
            coreGrad.addColorStop(0.8, `rgba(255, 0, 85, ${0.6 + crackStage * 0.15})`);
            coreGrad.addColorStop(1, "rgba(0,0,0,0)");

            eggCtx.fillStyle = coreGrad;
            eggCtx.beginPath();
            eggCtx.arc(cx, cy - 25, coreRadius, 0, Math.PI * 2);
            eggCtx.fill();
        }
        eggCtx.restore();

        eggCtx.save();
        eggCtx.fillStyle = shellGrad;
        eggCtx.strokeStyle = crackStage > 0 ? "#ffaa00" : "#ff0055";
        eggCtx.lineWidth = 8.5;
        eggCtx.globalAlpha = Math.max(0, 1 - transitionProgress * 0.8);

        eggCtx.beginPath();
        eggCtx.moveTo(cx, cy - eggH * 0.55);

        if (crackStage === 0) {
            eggCtx.bezierCurveTo(cx + eggW * 0.44, cy - eggH * 0.55, cx + eggW * 0.58, cy + eggH * 0.45, cx, cy + eggH * 0.45);
            eggCtx.bezierCurveTo(cx - eggW * 0.58, cy + eggH * 0.45, cx - eggW * 0.44, cy - eggH * 0.55, cx, cy - eggH * 0.55);
        } else if (crackStage === 1) {
            eggCtx.lineTo(cx + eggW * 0.38, cy - eggH * 0.18);
            eggCtx.lineTo(cx + eggW * 0.18, cy - eggH * 0.08);
            eggCtx.lineTo(cx, cy - eggH * 0.22);
            eggCtx.lineTo(cx - eggW * 0.22, cy - eggH * 0.05);
            eggCtx.lineTo(cx - eggW * 0.4, cy - eggH * 0.18);
            eggCtx.bezierCurveTo(cx - eggW * 0.58, cy + eggH * 0.45, cx + eggW * 0.58, cy + eggH * 0.45, cx + eggW * 0.38, cy - eggH * 0.18);
        } else if (crackStage === 2) {
            eggCtx.lineTo(cx + eggW * 0.45, cy + eggH * 0.08);
            eggCtx.lineTo(cx + eggW * 0.12, cy + eggH * 0.18);
            eggCtx.lineTo(cx, cy + eggH * 0.04);
            eggCtx.lineTo(cx - eggW * 0.18, cy + eggH * 0.22);
            eggCtx.lineTo(cx - eggW * 0.45, cy + eggH * 0.08);
            eggCtx.bezierCurveTo(cx - eggW * 0.58, cy + eggH * 0.45, cx + eggW * 0.58, cy + eggH * 0.45, cx + eggW * 0.45, cy + eggH * 0.08);
        } else if (crackStage === 3) {
            eggCtx.lineTo(cx + eggW * 0.28, cy + eggH * 0.32);
            eggCtx.lineTo(cx, cy + eggH * 0.4);
            eggCtx.lineTo(cx - eggW * 0.28, cy + eggH * 0.32);
            eggCtx.bezierCurveTo(cx - eggW * 0.58, cy + eggH * 0.45, cx + eggW * 0.58, cy + eggH * 0.45, cx + eggW * 0.28, cy + eggH * 0.32);
        }

        eggCtx.fill();
        eggCtx.stroke();
        eggCtx.restore();

        drawFlameCrown(cx, cy, eggW, eggH, globalCosmicTime, crackStage);
        drawLickingFlames(cx, cy, eggW, eggH, globalCosmicTime);

        for (let i = shellShards.length - 1; i >= 0; i--) {
            let s = shellShards[i];
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.48;
            s.rot += s.vRot;
            s.alpha -= 0.015;

            if (s.alpha <= 0) {
                shellShards.splice(i, 1);
                continue;
            }

            eggCtx.save();
            eggCtx.translate(s.x, s.y);
            eggCtx.rotate(s.rot);
            eggCtx.globalAlpha = s.alpha;

            eggCtx.fillStyle = s.color;
            eggCtx.strokeStyle = "#ffffff";
            eggCtx.lineWidth = 1.8;

            eggCtx.beginPath();
            eggCtx.moveTo(0, -s.size);
            eggCtx.lineTo(s.size * 0.85, s.size * 0.7);
            eggCtx.lineTo(-s.size * 0.85, s.size * 0.5);
            eggCtx.closePath();
            eggCtx.fill();
            eggCtx.stroke();

            eggCtx.restore();
        }

        requestAnimationFrame(renderDynamicEgg);
    }
    renderDynamicEgg();

    // ===================================================
    // 3. FLUID PHOENIX FLIGHT & CHARGING SEQUENCE
    // ===================================================
    let animState = "IDLE";
    let trail = [];
    let flightProgress = 0;
    let currentPathIndex = 0;
    let chargeTimer = 0;
    let animTime = 0;
    let screenFlameRadius = 0;
    let energyParticles = [];

    let spiralRadius = 0;
    let spiralAngle = 0;
    let flightPaths = [];

    function seamlessIgnitionHandoff() {
        isEggActive = false;

        let startX = width / 2;
        let startY = height * 0.5 - 25;

        eggScreen.style.opacity = "0";
        setTimeout(() => eggScreen.classList.add("hidden"), 300);
        pxCanvas.classList.remove("hidden");

        flightPaths = [
            { p0: { x: startX / width, y: startY / height }, p1: { x: 0.45, y: 0.12 }, p2: { x: 0.5, y: -0.25 }, duration: 85 },
            { p0: { x: 1.3, y: 0.15 }, p1: { x: 0.5, y: 0.25 }, p2: { x: -0.3, y: 0.15 }, duration: 105 },
            { p0: { x: -0.3, y: 0.6 }, p1: { x: 0.5, y: 0.75 }, p2: { x: 1.3, y: 0.55 }, duration: 105 },
            { p0: { x: 0.5, y: 1.3 }, p1: { x: 0.55, y: 0.75 }, p2: { x: 0.5, y: 0.3 }, duration: 95 }
        ];

        trail = [
            { x: startX, y: startY, alpha: 1.0 },
            { x: startX, y: startY, alpha: 1.0 }
        ];

        animState = "FLIGHT";
        currentPathIndex = 0;
        flightProgress = 0;
    }

    function initEnergyParticles(cx, cy) {
        energyParticles = [];
        for (let i = 0; i < 140; i++) {
            let angle = Math.random() * Math.PI * 2;
            let dist = Math.random() * Math.max(width, height) * 0.6 + 180;
            energyParticles.push({
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                targetX: cx,
                targetY: cy,
                speed: Math.random() * 0.024 + 0.012,
                size: Math.random() * 5.2 + 1.8,
                color: Math.random() > 0.5 ? "#ffffff" : Math.random() > 0.25 ? "#ffcc00" : "#ff0055"
            });
        }
    }

    function updateFlightPhysics() {
        if (animState !== "FLIGHT") return;

        let path = flightPaths[currentPathIndex];
        flightProgress += 1 / path.duration;

        let t = Math.min(1, flightProgress);
        let p0 = { x: path.p0.x * width, y: path.p0.y * height };
        let p1 = { x: path.p1.x * width, y: path.p1.y * height };
        let p2 = { x: path.p2.x * width, y: path.p2.y * height };

        let x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
        let y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

        trail.push({ x: x, y: y, alpha: 1.0 });
        if (trail.length > 45) trail.shift();

        if (t >= 1) {
            currentPathIndex++;
            flightProgress = 0;
            if (currentPathIndex >= flightPaths.length) {
                animState = "SPIRAL";
                spiralRadius = Math.max(width, height) * 0.38;
                spiralAngle = Math.PI * 0.5;
            }
        }
    }

    function updateSpiralPhysics() {
        if (animState !== "SPIRAL") return;

        let cx = width / 2;
        let cy = height / 2;

        spiralAngle += 0.108;
        spiralRadius *= 0.966;

        let x = cx + Math.cos(spiralAngle) * spiralRadius;
        let y = cy + Math.sin(spiralAngle) * spiralRadius;

        trail.push({ x: x, y: y, alpha: 1.0 });
        if (trail.length > 45) trail.shift();

        if (spiralRadius < 14) {
            animState = "CHARGE";
            chargeTimer = 0;
            initEnergyParticles(cx, cy);
        }
    }

    function renderPhoenix() {
        pxCtx.clearRect(0, 0, width, height);
        pxCtx.globalCompositeOperation = "lighter";
        animTime += 0.035;

        if (animState === "FLIGHT" || animState === "SPIRAL" || (animState === "CHARGE" && trail.length > 0)) {
            if (animState === "FLIGHT") updateFlightPhysics();
            if (animState === "SPIRAL") updateSpiralPhysics();

            if (animState === "CHARGE" && trail.length > 0) {
                trail.shift();
            }

            if (trail.length > 1) {
                let len = trail.length;
                for (let i = 1; i < len; i++) {
                    let p1 = trail[i - 1];
                    let p2 = trail[i];
                    let prg = i / len;
                    let a = p2.alpha * prg;

                    drawFastStroke(p1, p2, 90 * prg + 8, "#600020", a * 0.25);
                    drawFastStroke(p1, p2, 55 * prg + 5, "#ff0055", a * 0.5);
                    drawFastStroke(p1, p2, 30 * prg + 3, "#ff7700", a * 0.8);
                    drawFastStroke(p1, p2, 12 * prg + 1, "#ffe600", a * 0.95);
                }

                if (animState !== "CHARGE") {
                    let head = trail[trail.length - 1];
                    let prev = trail[Math.max(0, trail.length - 3)];
                    let angle = Math.atan2(head.y - prev.y, head.x - prev.x);
                    drawMassiveFlyingBird(head.x, head.y, angle);
                }
            }
        }

        if (animState === "CHARGE") {
            chargeTimer += 1 / 60;
            let chargeRatio = Math.min(1.0, chargeTimer / 3.5);
            bgDimAlpha = Math.max(0.01, 1 - chargeRatio * 0.98);

            let shakeX = (Math.random() - 0.5) * chargeRatio * 20;
            let shakeY = (Math.random() - 0.5) * chargeRatio * 20;
            let cx = width / 2 + shakeX;
            let cy = height / 2 + shakeY;

            for (let p of energyParticles) {
                let curSpeed = p.speed * (1 + chargeRatio * 3.8);
                p.x += (p.targetX - p.x) * curSpeed;
                p.y += (p.targetY - p.y) * curSpeed;

                let dx = p.x - p.targetX;
                let dy = p.y - p.targetY;
                if (dx * dx + dy * dy < 225) {
                    let angle = Math.random() * Math.PI * 2;
                    let newDist = Math.random() * Math.max(width, height) * 0.5 + 200;
                    p.x = cx + Math.cos(angle) * newDist;
                    p.y = cy + Math.sin(angle) * newDist;
                }

                pxCtx.beginPath();
                pxCtx.arc(p.x, p.y, p.size * (1 + chargeRatio * 1.2), 0, Math.PI * 2);
                pxCtx.fillStyle = p.color;
                pxCtx.globalAlpha = 0.9;
                pxCtx.fill();
            }

            let violentFlicker = Math.sin(animTime * (12 + chargeRatio * 38)) * (15 + chargeRatio * 38);
            let coreRadius = Math.max(5, (38 + chargeRatio * 115) + violentFlicker);

            let coreGrad = pxCtx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
            coreGrad.addColorStop(0, "#ffffff");
            coreGrad.addColorStop(0.2, chargeRatio > 0.8 ? "#ffffff" : "#ffe600");
            coreGrad.addColorStop(0.55, "#ff3300");
            coreGrad.addColorStop(0.85, "#990033");
            coreGrad.addColorStop(1, "rgba(80, 0, 20, 0)");

            pxCtx.beginPath();
            pxCtx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
            pxCtx.fillStyle = coreGrad;
            pxCtx.globalAlpha = 1.0;
            pxCtx.fill();

            if (chargeRatio >= 1.0) {
                animState = "EXPLODE";
                triggerExplosion();
            }
        }

        if (animState === "EXPLODE") {
            let cx = width / 2;
            let cy = height / 2;

            screenFlameRadius += (Math.max(width, height) * 1.85 - screenFlameRadius) * 0.055;

            let screenFire = pxCtx.createRadialGradient(cx, cy, screenFlameRadius * 0.05, cx, cy, screenFlameRadius);
            screenFire.addColorStop(0, "rgba(255, 255, 255, 1.0)");
            screenFire.addColorStop(0.25, "rgba(255, 204, 0, 0.98)");
            screenFire.addColorStop(0.55, "rgba(255, 0, 85, 0.92)");
            screenFire.addColorStop(0.85, "rgba(120, 0, 40, 0.88)");
            screenFire.addColorStop(1, "rgba(10, 0, 5, 0)");

            pxCtx.beginPath();
            pxCtx.arc(cx, cy, screenFlameRadius, 0, Math.PI * 2);
            pxCtx.fillStyle = screenFire;
            pxCtx.fill();
        }

        pxCtx.globalCompositeOperation = "source-over";
        pxCtx.globalAlpha = 1.0;

        requestAnimationFrame(renderPhoenix);
    }
    renderPhoenix();

    function drawFastStroke(p1, p2, w, color, alpha) {
        pxCtx.beginPath();
        pxCtx.moveTo(p1.x, p1.y);
        pxCtx.lineTo(p2.x, p2.y);
        pxCtx.strokeStyle = color;
        pxCtx.lineWidth = w;
        pxCtx.lineCap = "round";
        pxCtx.lineJoin = "round";
        pxCtx.globalAlpha = alpha;
        pxCtx.stroke();
    }

    function drawMassiveFlyingBird(x, y, angle) {
        pxCtx.save();
        pxCtx.translate(x, y);
        pxCtx.rotate(angle);

        let wingFlap = Math.sin(animTime * 4.0) * 0.4 + 0.6;
        let tailWiggle = Math.sin(animTime * 3.0);

        for (let tIdx = -1; tIdx <= 1; tIdx++) {
            pxCtx.save();
            let tailGrad = pxCtx.createLinearGradient(-20, 0, -220, tIdx * 40 + tailWiggle * 25);
            tailGrad.addColorStop(0, "rgba(255, 230, 0, 0.95)");
            tailGrad.addColorStop(0.4, "rgba(255, 0, 85, 0.8)");
            tailGrad.addColorStop(1, "rgba(120, 0, 40, 0)");

            pxCtx.strokeStyle = tailGrad;
            pxCtx.lineWidth = 6 - Math.abs(tIdx) * 1.5;
            pxCtx.beginPath();
            pxCtx.moveTo(-20, tIdx * 6);
            pxCtx.bezierCurveTo(
                -80, tIdx * 20 + tailWiggle * 15,
                -140, tIdx * 45 - tailWiggle * 20,
                -220, tIdx * 65 + tailWiggle * 30
            );
            pxCtx.stroke();

            pxCtx.fillStyle = "#ffe600";
            pxCtx.beginPath();
            pxCtx.arc(-220, tIdx * 65 + tailWiggle * 30, 4, 0, Math.PI * 2);
            pxCtx.fill();
            pxCtx.restore();
        }

        for (let side of [-1, 1]) {
            pxCtx.save();
            pxCtx.scale(1, side);

            let pWingGrad = pxCtx.createLinearGradient(0, 0, -80 * wingFlap, -220 * wingFlap);
            pWingGrad.addColorStop(0, "#ffffff");
            pWingGrad.addColorStop(0.2, "#ffcc00");
            pWingGrad.addColorStop(0.6, "#ff0055");
            pWingGrad.addColorStop(1, "rgba(90, 0, 30, 0)");

            pxCtx.fillStyle = pWingGrad;
            pxCtx.beginPath();
            pxCtx.moveTo(25, -2);
            pxCtx.bezierCurveTo(-10, -60 * wingFlap, -80 * wingFlap, -160 * wingFlap, -45 * wingFlap, -210 * wingFlap);
            pxCtx.bezierCurveTo(-40, -130 * wingFlap, -15, -40 * wingFlap, -15, 0);
            pxCtx.fill();

            let sWingGrad = pxCtx.createLinearGradient(0, 0, -60 * wingFlap, -180 * wingFlap);
            sWingGrad.addColorStop(0, "#ffffff");
            sWingGrad.addColorStop(0.5, "#ffaa00");
            sWingGrad.addColorStop(1, "rgba(255, 0, 85, 0)");

            pxCtx.fillStyle = sWingGrad;
            pxCtx.beginPath();
            pxCtx.moveTo(10, -5);
            pxCtx.bezierCurveTo(-30, -80 * wingFlap, -100 * wingFlap, -225 * wingFlap, -65 * wingFlap, -235 * wingFlap);
            pxCtx.bezierCurveTo(-45, -140 * wingFlap, -20, -50 * wingFlap, -10, 0);
            pxCtx.fill();

            pxCtx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            pxCtx.lineWidth = 2;
            pxCtx.beginPath();
            pxCtx.moveTo(15, -4);
            pxCtx.quadraticCurveTo(-30 * wingFlap, -100 * wingFlap, -50 * wingFlap, -200 * wingFlap);
            pxCtx.stroke();

            pxCtx.restore();
        }

        let bodyGrad = pxCtx.createLinearGradient(-30, 0, 50, 0);
        bodyGrad.addColorStop(0, "#ff0055");
        bodyGrad.addColorStop(0.5, "#ffaa00");
        bodyGrad.addColorStop(1, "#ffffff");

        pxCtx.fillStyle = bodyGrad;
        pxCtx.beginPath();
        pxCtx.moveTo(55, 0);
        pxCtx.lineTo(38, -6);
        pxCtx.bezierCurveTo(32, -16, 18, -14, 5, -8);
        pxCtx.bezierCurveTo(-15, -12, -35, -8, -40, 0);
        pxCtx.bezierCurveTo(-35, 8, -15, 12, 5, 8);
        pxCtx.bezierCurveTo(18, 14, 32, 16, 38, 6);
        pxCtx.closePath();
        pxCtx.fill();

        pxCtx.fillStyle = "#ffffff";
        for (let c = 0; c < 3; c++) {
            pxCtx.beginPath();
            pxCtx.moveTo(28 - c * 5, -10);
            pxCtx.quadraticCurveTo(15 - c * 8, -25 - c * 4, 2 - c * 10, -22 - c * 5);
            pxCtx.quadraticCurveTo(12 - c * 6, -12, 22 - c * 5, -8);
            pxCtx.fill();
        }

        pxCtx.fillStyle = "#ffffff";
        pxCtx.beginPath();
        pxCtx.arc(32, -4, 2.5, 0, Math.PI * 2);
        pxCtx.fill();

        pxCtx.restore();
    }

    function triggerExplosion() {
        const cx = width / 2;
        const cy = height / 2;

        for (let s of stars) {
            let dx = s.x - cx;
            let dy = s.y - cy;
            let dist = Math.hypot(dx, dy) || 1;
            let force = Math.random() * 26 + 18;
            s.vx = (dx / dist) * force;
            s.vy = (dy / dist) * force;
            s.isExploding = true;
        }

        setTimeout(() => {
            if (portfolioMain) portfolioMain.classList.remove("hidden");
            window.scrollTo(0, 0);

            pxCanvas.style.transition = "opacity 2.5s ease";
            pxCanvas.style.opacity = "0";

            bgDimAlpha = 1.0;

            setTimeout(() => {
                pxCanvas.classList.add("hidden");
            }, 2500);
        }, 600);
    }


    
});