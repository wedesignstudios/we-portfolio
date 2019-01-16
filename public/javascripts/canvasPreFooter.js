const canvasPreFooter = function() {
  window.onload = function() {

    const canvas = document.getElementById('canvas-pre-footer');
    const ctx = canvas.getContext('2d');
    const colorArr = ['1, 41, 127',
                      '79, 135, 255',
                      '2, 83, 255',
                      '39, 67, 127',
                      '2, 66, 204'];

    const colorArr2 = ['1, 41, 127',
                      '79, 135, 255',
                      '2, 83, 255',
                      '230, 227, 26',
                      '2, 66, 204'];

    var maxRadius = 150;
    var circleArray = [];

    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function getRandomArbitrary(min, max) {
      let randomNum = Math.random() * (max - min) + min;
      return Math.floor(randomNum);
    }

    function randomColor(colorArr) {
      let index = getRandomArbitrary(0, colorArr.length-1),
          a = Math.random() * (0.75, 0.15) + 0.15;

      return `rgba(${colorArr[index]}, ${a})`;
    }

    function minRadius(min) {
        let radius = Math.random() * 30 + 1;

      return radius > min ? radius : min;
    }

    function Circle(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;

      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
      }

      this.update = function() {
        (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) ? (dx = -dx) : null;
        (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) ?
          (dy = -dy) : null;
        this.x += dx;
        this.y += dy;
      }
    }

    function createCircles(numOfCircles) {
      circleArray = [];

      for (var i = 0; i < numOfCircles; i++) {
        var radius = minRadius(15);
        var x = Math.random() * (canvas.width - radius * 2) + radius;
        var y = Math.random() * (canvas.height - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 1.5;
        var dy = (Math.random() - 0.5) * 1.5;

        circleArray.push(new Circle(x, y, dx, dy, radius, randomColor(colorArr2)));
      };
    }

    function numberOfCircles() {
      if (canvas.width <= 425) {
        return 20;
      }

      if (canvas.width > 425 && canvas.width <= 768) {
        return 45;
      }

      if (canvas.width > 768 && canvas.width <= 1024) {
        return 50;
      }

      if (canvas.width > 1024 && canvas.width <= 1440) {
        return 65;
      }

      return 85;
    }

    function animate() {
      window.requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      circleArray.forEach(circle => {
        circle.update();
        circle.draw();
      });
    }

    function resizeCanvas(event) {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      createCircles(numberOfCircles());
    }

    window.addEventListener('resize', resizeCanvas);
    createCircles(numberOfCircles());
    animate();
  }

}();

module.exports = canvasPreFooter;
