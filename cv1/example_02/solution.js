const LIST = document.getElementById("seznam");

// první úkol
for (let i = 1; i <= 7; i++) {
  const NEW_ITEM = document.createElement("li");
  NEW_ITEM.innerHTML = `item ${i + 4}`;

  LIST.appendChild(NEW_ITEM);
}

// alternativa
let newItem;

newItem = document.createElement("li");
newItem.innerHTML = "item 5";
LIST.appendChild(newItem);
newItem = document.createElement("li");
newItem.innerHTML = "item 6";
LIST.appendChild(newItem);
newItem = document.createElement("li");
newItem.innerHTML = "item 7";
LIST.appendChild(newItem);
newItem = document.createElement("li");
newItem.innerHTML = "item 8";
LIST.appendChild(newItem);
newItem = document.createElement("li");
newItem.innerHTML = "item 9";
LIST.appendChild(newItem);
newItem = document.createElement("li");
newItem.innerHTML = "item 10";
LIST.appendChild(newItem);
newItem = document.createElement("li");
newItem.innerHTML = "item 11";
LIST.appendChild(newItem);

// druhý úkol
// více způsobů
const PAR = document.getElementById("lipsum");
const LINKS = PAR.getElementsByTagName("a");
//const LINKS = document.querySelectorAll("#lipsum a");
//const LINKS = document.getElementsByTagName("a"); // není správně, dostali bychom také odkazy v jiných odstavcích!

// na seznamy HTML elementů bychom měli používat smyčku for … of místo for … in
for (let LINK of LINKS) {
  LINK.style.color = "red";
  LINK.style.textDecoration = "underline";
}

// třetí úkol
const PARS = document.getElementsByTagName("p");

for (let PAR of PARS) {
  if (PAR.classList.contains("big")) {
    PAR.style.fontSize = "2em";
  }
}
