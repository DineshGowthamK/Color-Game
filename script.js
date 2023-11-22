const boxes = document.querySelector(".boxes");
const colors = [
  "aqua",
  "red",
  "blueviolet",
  "chartreuse",
  "coral",
  "gold",
  "maroon",
  "hotpink",
];
const colorList = [...colors, ...colors];
const boxLength = colorList.length;

//! Initializing the main elements of the game state
let revealCount = 0;
let activeBox = null;
let waitingTime = false;

//!function to display the boxes in the webpage
function buildboxes(color) {
  const element = document.createElement("div");
  element.classList.add("box");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed","false"); //!used to check revealed boxes
  
  //*adding event listeners for click event
  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (waitingTime || revealed ==="true" || element== activeBox) {
      return;
    }
    element.style.backgroundColor = color;
    
    //!Checking the active box
    if (!activeBox) {
      activeBox = element;
      return;
    }
    
    //!Logic for matching color and waiting condition
    const colorMatch = activeBox.getAttribute("data-color");
    if (colorMatch === color) {
        activeBox.setAttribute("data-revealed","true");
        element.setAttribute("data-revealed","true");
      activeBox = null;
      waitingTime = false;
      revealCount += 2;
      if (revealCount === boxLength) {
        alert("Congratulations! 😍 You Won!  Refresh to play again");
      }
      return;
    }

    //! change the waiting time to true and using settimeout for transistion
    waitingTime = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeBox.style.backgroundColor = null;
      waitingTime = false;
      activeBox = null;
    }, 1000);
  });
  return element;
}

//!Building the boxes for the game
for (let i = 0; i < boxLength; i++) {
  //*this is the place where the colors will be displayed randomly
  const randomIndex = Math.floor(Math.random() * colorList.length);
  const color = colorList[randomIndex];
  const box = buildboxes(color);

  //*using splice method to avoid 3 repeated calls
  colorList.splice(randomIndex, 1);
  boxes.append(box);
}
