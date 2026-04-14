const input = document.getElementById("task-input");
const button = document.getElementById("add-btn");
const list = document.getElementById("task-list");

button.addEventListener("click", function () {
  const taskText = input.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");

    checkbox.addEventListener("change", function () {
      span.classList.toggle("done");
    });

    deleteBtn.addEventListener("click", function () {
      li.classList.add("removing");

      setTimeout(() => {
        li.remove();
      }, 300);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    list.appendChild(li);

    input.value = "";
  }
});


const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: null,
  y: null,
  down: false,
  grabbed: null
};

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;

  if (mouse.down && mouse.grabbed) {
    mouse.grabbed.x = mouse.x;
    mouse.grabbed.y = mouse.y;
  }
});

window.addEventListener("mousedown", () => {
  mouse.down = true;

  for (let obj of numbers) {
    const dx = mouse.x - obj.x;
    const dy = mouse.y - obj.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 30) {
      mouse.grabbed = obj;
      obj.vx = 0;
      obj.vy = 0;
      break;
    }
  }
});

window.addEventListener("mouseup", () => {
  mouse.down = false;

  if (mouse.grabbed) {
    mouse.grabbed.vx = (Math.random() - 0.5) * 10;
    mouse.grabbed.vy = (Math.random() - 0.5) * 10;
    mouse.grabbed = null;
  }
});

class Number67 {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.size = 24 + Math.random() * 10;
  }

  draw() {
    ctx.font = `bold ${this.size}px Arial`;
    ctx.fillStyle = "rgba(100, 100, 255, 0.15)";
    ctx.fillText("67", this.x, this.y);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // odbijanie od ścian
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // reakcja na mysz (odpychanie)
    if (mouse.x && mouse.y && !mouse.down) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 80) {
        this.vx += dx / dist;
        this.vy += dy / dist;
      }
    }
  }
}

const numbers = [];

for (let i = 0; i < 25; i++) {
  numbers.push(new Number67());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let obj of numbers) {
    obj.update();
    obj.draw();
  }

  requestAnimationFrame(animate);
}

animate();