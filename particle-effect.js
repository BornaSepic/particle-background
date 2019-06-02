const canvas = document.querySelector('#particle-effect-container');
const c = canvas.getContext('2d');

let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;

canvas.height = maxHeight;
canvas.width = maxWidth;

const particlesCount = maxWidth / 20;

const colorCombos =[
    '#ff7553', '#40fff2',
    '#a14aff', '#f3ff4a',
    '#646cff', '#ff8120',
    '#ff00d0', '#3cff00'
];

const xVel = 1;
const yVel = 1;
const distanceTreshold = 90;

const circleRad = 2;

class Line {
    constructor(startPoint, endPoint, opacity) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.opacity = opacity;
    }
}

class Point {
    constructor(xCord, yCord, xVel, yVel) {
        this.xCord = xCord;
        this.yCord = yCord;

        this.xCurCord = xCord;
        this.yCurCord = yCord;

        this.xVel = xVel * Math.random();
        this.yVel = yVel * Math.random();

        this.color = colorCombos[Math.round(Math.random() * 7)];
    }

    move() {
        if(this.xCurCord <= 0 || this.xCurCord > maxWidth) {
            this.xVel = this.xVel * -1;
        }

        if(this.yCurCord <= 0 || this.yCurCord > maxHeight) {
            this.yVel = this.yVel * -1;
        }

        this.xCurCord = this.xCurCord + this.xVel;
        this.yCurCord = this.yCurCord + this.yVel;
    }   
}

const points = [];

for (let i = 0; i < particlesCount; i++) {
    points.push(new Point(
        Math.random() * maxWidth, 
        Math.random() * maxHeight, 
        Math.random() < 0.5 ? xVel : -xVel, 
        Math.random() < 0.5 ? yVel : -yVel)
    );
};

function animateCircles() {
    const lines = [];
    c.clearRect(0, 0, maxWidth, maxHeight);

    points.map(point => {
        c.beginPath();
        c.arc(point.xCurCord, point.yCurCord, circleRad, 0, 2 * Math.PI, false);
        c.fillStyle = point.color;
        c.fill();
        c.stroke();

        point.move();
    });

    points.map(mainPoint => {
        let mainX = mainPoint.xCurCord;
        let mainY = mainPoint.yCurCord;

        points.map(point => {
            let xDif = Math.abs(point.xCurCord - mainX);
            if (xDif === 0 || xDif > distanceTreshold) {
                return
            };

            let yDif = Math.abs(point.yCurCord - mainY);
            if (yDif === 0 || yDif > distanceTreshold) {
                return 
            };

            if(xDif < distanceTreshold &&  yDif < distanceTreshold) {
                lines.push({
                    startPoint: {x: mainX, y: mainY}, 
                    endPoint: {x: point.xCurCord, y: point.yCurCord}, 
                    opacity: 1 - ((xDif + yDif) / 100),
                    pointColors: [mainPoint.color, point.color]
                });
            };
        });
    });

    lines.map(line => {
        c.beginPath();
        c.moveTo(line.startPoint.x, line.startPoint.y);
        c.lineTo(line.endPoint.x, line.endPoint.y);

        const gradient = c.createLinearGradient(line.startPoint.x, line.startPoint.y, line.endPoint.x, line.endPoint.y);
        gradient.addColorStop("0", line.pointColors[0]);
        gradient.addColorStop("1", line.pointColors[1]);

        c.strokeStyle = gradient;
        c.stroke();
    });

    requestAnimationFrame(function() {
        animateCircles();
    });
}

animateCircles();


window.addEventListener("resize", event => {
    canvas.height = event.target.window.innerHeight;
    canvas.width = event.target.window.innerWidth;

    maxHeight = event.target.window.innerHeight;
    maxWidth = event.target.window.innerWidth;
});