$(document).ready(function () {
  
  if ($(window).width() > 767) {
    var mouseX, mouseY;
    var ww = $(window).width();
    var wh = $(window).height();
    var traX, traY;
    $(document).mousemove(function (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
      traX = (4 * mouseX) / 570 + 40;
      traY = (4 * mouseY) / 570 + 50;
      $(".title").css({ "background-position": traX + "%" + traY + "%" });
    });
  }

  class MezcladorTxt {
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = "";
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  const phrases = [
    "Desarrollador web " + String.fromCodePoint(0x1f4bb),
    "Uruguayo " +
      String.fromCodePoint(0x1f9c9) +
      " " +
      String.fromCodePoint(0x1f1fa) +
      String.fromCodePoint(0x1f1fe),
    "Buen bebedor de café " + String.fromCodePoint(0x2615),
    "Hincha del más grande " + String.fromCodePoint(0x1f609),
    "Hábil jugador de lo que venga " + String.fromCodePoint(0x1f3ae),
    "Catador de kangreburgers " + String.fromCodePoint(0x1f354),
    String.fromCodePoint(0x1f49b) +
      String.fromCodePoint(0x1f431) +
      String.fromCodePoint(0x1f436) +
      String.fromCodePoint(0x1f436) +
      String.fromCodePoint(0x1f436) +
      String.fromCodePoint(0x1f49b),
  ];

  const el = document.querySelector(".textoAleatorio");
  const fx = new MezcladorTxt(el);

  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800);
    });
    counter = (counter + 1) % phrases.length;
  };

  next();
});
