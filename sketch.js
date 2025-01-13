// setup() is called once at page-load
function setup() {
    createCanvas(1000, 400); // make an HTML canvas element width x height pixels
}

let lastMinute = -1;
const CELL_SIZE = 25;
const PADDING = 10;
const GLOW_INTENSITY = 3;

// draw() is called 60 times per second
function draw() {
    let h = hour();
    let m = minute();
    let s = second();
    console.log(h);
    background(180);

    if (m !== lastMinute) {
        console.log('minute', m);
        lastMinute = m;
    }

    // Draw hours / red
    for (let i = 0; i < 24; i++) {
        let x = PADDING + CELL_SIZE / 2 + i * (CELL_SIZE + 5);
        let y = PADDING + CELL_SIZE / 2;

        let baseColor = color(255, 50, 50);

        // glow effect for active hour(s)
        if (i <= h) {
            drawGlowingCell(x, y, baseColor);
        } else {
            noStroke();
            fill(100, 10, 10);
            circle(x, y, CELL_SIZE, CELL_SIZE);
        }
    }

    // Draw minutes / yellow
    for (let i = 0; i < 60; i++) {
        let x = PADDING + CELL_SIZE / 2 + (i % 30) * (CELL_SIZE + 5);
        let y = PADDING * 3 + CELL_SIZE * 2.5 + parseInt(i / 30) * (CELL_SIZE + 5);

        let baseColor = color(255, 255, 50);

        // glow effect for active hour(s)
        if (i <= m) {
            drawGlowingCell(x, y, baseColor);
        } else {
            noStroke();
            fill(100, 100, 10);
            circle(x, y, CELL_SIZE, CELL_SIZE);
        }
    }

    // Draw seconds / green
    for (let i = 0; i < 60; i++) {
        let x = PADDING + CELL_SIZE / 2 + (i % 30) * (CELL_SIZE + 5);
        let y = PADDING * 5 + CELL_SIZE * 5.5 + parseInt(i / 30) * (CELL_SIZE + 5);

        let baseColor = color(50, 255, 50);

        // glow effect for active hour(s)
        if (i <= s) {
            drawGlowingCell(x, y, baseColor);
        } else {
            noStroke();
            fill(10, 80, 10);
            circle(x, y, CELL_SIZE, CELL_SIZE);
        }
    }


}

// helper function
function drawGlowingCell(x, y, baseColor, extraGlow = 0) {
    for (let i = GLOW_INTENSITY + extraGlow; i > 0; i--) {
        let glowSize = i * 2;
        let alpha = map(i, 0, GLOW_INTENSITY + extraGlow, 255, 0);
        baseColor.setAlpha(alpha);
        noStroke();
        fill(baseColor);
        circle(
            x,
            y,
            CELL_SIZE,
            glowSize
        );
    }

    baseColor.setAlpha(255);
    fill(baseColor);
    noStroke();
    circle(x, y, CELL_SIZE, CELL_SIZE);
}