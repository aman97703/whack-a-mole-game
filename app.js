let currentMole;
let currentPlantTile;
let score = 0;
let gameOver = false;

window.onload = function () {
  setInterval(setMole, 1000);
  setInterval(setPlant, 2000);
  const board = document.getElementById("board");
  board.addEventListener("click", handleTileClick);
};

const getRandomTileId = () => {
  const randomTileId = Math.floor(Math.random() * 9);
  return randomTileId.toString();
};

function setMole() {
  if (gameOver) return; // Stop setting moles if the game is over
  if (currentMole) {
    currentMole.innerHTML = ""; // Remove the mole from the previous tile
  }

  let mole = document.createElement("img");
  mole.src = "./assets/monty-mole.png";
  mole.id = "mole";

  const randomTileId = getRandomTileId();
  if (currentPlantTile && currentPlantTile.id === randomTileId) {
    return; // Avoid placing the mole on the same tile as the plant
  }
  currentMole = document.getElementById(randomTileId);
  currentMole.appendChild(mole);
}

function setPlant() {
  if (gameOver) return; // Stop setting plants if the game is over
  if (currentPlantTile) {
    currentPlantTile.innerHTML = ""; // Remove the mole from the previous tile
  }

  let planat = document.createElement("img");
  planat.src = "./assets/piranha-plant.png";
  planat.id = "plant";

  const randomTileId = getRandomTileId();
  if (currentMole && currentMole.id === randomTileId) {
    return; // Avoid placing the plant on the same tile as the mole
  }
  currentPlantTile = document.getElementById(randomTileId);
  currentPlantTile.appendChild(planat);
}

function handleCorrectClick() {
  score += 10;
  document.getElementById("score").innerText = score;
  currentMole.innerHTML = ""; // Remove the mole from the tile
}
function handleGameOver() {
  gameOver = true;
  alert("Game Over! Final Score: " + score);
  currentPlantTile.innerHTML = "";
  currentPlantTile = null;
}

function handleTileClick(e) {
  if (gameOver) {
    return;
  }
  const clickedTile = e.target;

  if (clickedTile.tagName === "IMG") {
    if (clickedTile.id === "mole") {
      handleCorrectClick();
      return;
    }
    if (clickedTile.id === "plant") {
      handleGameOver();
      return;
    }
  } else {
    if (currentMole === clickedTile) {
      handleCorrectClick();
      return;
    }
    if (currentPlantTile === clickedTile) {
      handleGameOver();
      return;
    }
  }
}
