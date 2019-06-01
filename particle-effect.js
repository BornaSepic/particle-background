const canvas = document.querySelector('#particle-effect-container');

const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

canvas.height = maxHeight;
canvas.width = maxWidth;
const c = canvas.getContext('2d');

c.fillStyle = "#00000";

const circleRad = 5;

class Point {
    constructor(xCord, yCord, xVel, yVel) {
        this.xCord = xCord;
        this.yCord = yCord;

        this.xCurCord = xCord;
        this.yCurCord = yCord;

        this.xVel = xVel;
        this.yVel = yVel;
    }

    move() {
        if(this.xCurCord < 0 || this.xCurCord > maxWidth) {
            this.xVel = this.xVel * -1;
        }

        if(this.yCurCord < 0 || this.yCurCord > maxHeight) {
            this.yVel = this.yVel * -1;
        }

        this.xCurCord = this.xCurCord + this.xVel;
        this.yCurCord = this.yCurCord + this.yVel;
    }   
}

const points = [];

for (let i = 0; i < 20; i++) {
    points.push(new Point(Math.random() * maxWidth, Math.random() * maxHeight, Math.random() < 0.5 ? 2 : -2, Math.random() < 0.5 ? 1.5 : -1.5))
}

function animateCircles() {
    c.clearRect(0, 0, maxWidth, maxHeight);

    points.map((point) => {
        c.beginPath();
        c.arc(point.xCurCord, point.yCurCord, circleRad, 0, 2 * Math.PI, false);
        c.fill();
        c.stroke();

        point.move();
    });

    requestAnimationFrame(function() {
        //animateCircles();
    });
}

animateCircles();


