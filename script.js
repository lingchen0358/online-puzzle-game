const puzzleContainer = document.getElementById("puzzle-container");
const piecesContainer = document.getElementById("pieces-container");

// Puzzle configuration
const rows = 4;
const cols = 4;
const imageSrc = "image1.jpg"

let draggedPiece = null;

// Create puzzle slots
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const slot = document.createElement("div");
    slot.classList.add("slot");
    slot.dataset.position = `${row}-${col}`;
    puzzleContainer.appendChild(slot);
  }
}

// Create puzzle pieces
const pieces = [];
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.backgroundImage = `url(${imageSrc})`;
    piece.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
    piece.dataset.position = `${row}-${col}`;
    pieces.push(piece);
  }
}

// Shuffle pieces and append to container
pieces.sort(() => Math.random() - 0.5);
pieces.forEach(piece => {
  piece.draggable = true;
  piece.addEventListener("dragstart", handleDragStart);
  piece.addEventListener("dragend", handleDragEnd);
  piecesContainer.appendChild(piece);
});

// Drag and drop handlers
function handleDragStart(e) {
  draggedPiece = this;
  setTimeout(() => (this.style.display = "none"), 0);
}

function handleDragEnd() {
  this.style.display = "block";
  draggedPiece = null;
}

puzzleContainer.addEventListener("dragover", e => e.preventDefault());

puzzleContainer.addEventListener("drop", function (e) {
  const target = e.target;
  if (target.classList.contains("slot") && !target.firstChild) {
    const piecePosition = draggedPiece.dataset.position;
    const slotPosition = target.dataset.position;
    if (piecePosition === slotPosition) {
      target.appendChild(draggedPiece);
    }
  }
});
