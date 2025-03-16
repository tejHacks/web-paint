// Select Elements
const canvas = document.getElementById("canvas");
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const clearElement = document.getElementById("clear");
const downloadElement = document.getElementById("download");

const ctx = canvas.getContext("2d");

// Set Canvas Size Properly to Avoid Scaling Issues
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let size = 10;
let color = "#000000"; // Default to black
let x = undefined;
let y = undefined;
let isPressed = false;

// Function to get correct mouse position
const getMousePos = (event) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * (canvas.width / rect.width),
    y: (event.clientY - rect.top) * (canvas.height / rect.height),
  };
};

// Function to draw a circle
const drawCircle = (x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

// Function to draw a line
const drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.lineCap = "round"; // Smoother edges
  ctx.stroke();
};

// Function to update the brush size on screen
const updateSizeOnScreen = () => (sizeElement.innerText = size);

// Mouse Events for Drawing
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  const pos = getMousePos(e);
  x = pos.x;
  y = pos.y;
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isPressed) return;

  const pos = getMousePos(e);
  drawCircle(pos.x, pos.y);
  drawLine(x, y, pos.x, pos.y);
  x = pos.x;
  y = pos.y;
});

// Increase Brush Size
increaseButton.addEventListener("click", () => {
  size = Math.min(size + 5, 50);
  updateSizeOnScreen();
});

// Decrease Brush Size
decreaseButton.addEventListener("click", () => {
  size = Math.max(size - 5, 5);
  updateSizeOnScreen();
});

// Change Brush Color
colorElement.addEventListener("change", (e) => {
  color = e.target.value;
});

// Clear Canvas
clearElement.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download Drawing as Image
downloadElement.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
