const puzzleContainer = document.getElementById("puzzle-container");
const rows = 4;
const cols = 4;
const imageUrl = "assets/image1.jpg";

// Generate puzzle pieces
function createPuzzlePieces() {
  const pieces = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const piece = document.createElement("div");
      piece.classList.add("puzzle-piece");
      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundPosition = `${-col * 125}px ${-row * 125}px`;
      piece.setAttribute("data-pos", `${row}-${col}`);
      pieces.push(piece);
    }
  }
  return pieces;
}

// Shuffle and render pieces
function renderPuzzle() {
  const pieces = createPuzzlePieces();
  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

renderPuzzle();
