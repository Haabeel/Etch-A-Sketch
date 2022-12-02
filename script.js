//Defining constant default values on website load
const DefaultBrushColor = "black";
const DefaultBGColor = "white";
const DefaultBrushSize = 16;
//---------------------------------------------------------//
let DefaultNum = 0;
let CMode = "Paint";
let BufferBrushColor = DefaultBrushColor;
let CurrentBGColor = DefaultBGColor;
let CurrentSize = DefaultBrushSize;
let PixelSize = document.querySelector("#SizeSlider");
let SizeText = document.querySelector("#SizeValue");
let Grid = document.querySelector(".Grid");
let BrushColor = DefaultBrushColor;
let ClearBtn = document.querySelector(".ClearBtn");
let EraserBtn = document.querySelector(".EraserBtn");
let BrushBtn = document.querySelector(".BrushBtn");
let ColorInput = document.querySelector("#BrushColor");
let BGColorInput = document.querySelector("#BGColor");
function DefaultGridSize() {
  Grid.style.gridTemplateColumns = `repeat(16, 1fr)`;
  Grid.style.gridTemplateRows = `repeat(16, 1fr)`;
  UpdateGrid(16);
  DefaultNum++;
}
function Paint() {
  if (DefaultNum < 1) {
    DefaultGridSize();
  }
  BrushColor = BufferBrushColor;
  PixelSize.classList.remove("Hidden");
  SizeText.classList.remove("Hidden");
  PixelSize.onchange = (e) => UpdateSize(e.target.value);
  PixelSize.onmousemove = (e) => SizeValue(e.target.value);
  BrushBtn.classList.add("PaintMode");
}
function CurrentMode(Mode) {
  if (Mode == "Paint") {
    Paint();
    EraserBtn.classList.remove("ACTIVE");
  } else if (Mode == "Eraser") {
    BrushColor = CurrentBGColor;
    Eraser();
    BrushBtn.classList.remove("PaintMode");
  }
}
function UpdateSize(value) {
  CurrentSize = value;
  GRID(CurrentSize);
}
function SizeValue(value) {
  SizeText.innerHTML = `${value} x ${value}`;
}
let draw = false;
window.addEventListener("mousedown", function () {
  draw = true;
});
window.addEventListener("mouseup", function () {
  draw = false;
});

function UpdateGrid(Value) {
  Grid.style.gridTemplateColumns = `repeat(${Value}, 1fr)`;
  Grid.style.gridTemplateRows = `repeat(${Value}, 1fr)`;
  for (let j = 0; j < Value * Value; j++) {
    const GridElement = document.createElement("div");
    GridElement.classList.add("GridElement");
    GridElement.addEventListener("mouseover", Brush);
    GridElement.addEventListener("mousedown", (e) => {
      e.target.style.backgroundColor = BrushColor;
      e.target.classList.add("Brushed");
    });

    Grid.appendChild(GridElement);
    BackGroundColor(CurrentBGColor);
  }
}
function ResetGrid() {
  Grid.innerHTML = "";
}

function GRID(Value) {
  ResetGrid();
  UpdateGrid(Value);
}

function Brush(e) {
  if (!draw) return;
  e.target.style.backgroundColor = BrushColor;
  e.target.classList.add("Brushed");
}

ClearBtn.addEventListener("click", () => {
  ResetGrid();
  UpdateGrid(CurrentSize);
});

BrushBtn.addEventListener("click", () => {
  CMode = "Paint";
  CurrentMode(CMode);
});

EraserBtn.addEventListener("click", () => {
  CMode = "Eraser";
  CurrentMode(CMode);
  console.log(CMode);
});

function Eraser() {
  EraserBtn.classList.add("ACTIVE");
  const Elements = document.querySelectorAll(".Brushed");
  for (let i = 0; i < Elements.length; i++) {
    Elements[i].onclick = () => {
      Elements[i].style.backgroundColor = CurrentBGColor;
      Elements[i].classList.remove("Brushed ");
    };
  }
}
ColorInput.oninput = (e) => CurrentBrushColor(e.target.value);
function CurrentBrushColor(Color) {
  BrushColor = Color;
  BufferBrushColor = Color;
}

BGColorInput.oninput = (e) => BackGroundColor(e.target.value);
function BackGroundColor(BGColor) {
  CurrentBGColor = BGColor;
  const Elements = document.querySelectorAll(".GridElement");
  for (let i = 0; i < Elements.length; i++) {
    if (!Elements[i].classList.contains("Brushed")) {
      Elements[i].style.backgroundColor = CurrentBGColor;
    } else if (DefaultNum < 1) {
      Grid.style.backgroundColor = CurrentBGColor;
    }
  }
}
