const seznam = document.getElementById("seznam");

for (let i = 0; i < 7; i++) {
  const li = document.createElement("li");
  li.innerHTML = `Přidaný odstavec ${i + 1}`;
  seznam.appendChild(li);
}

let hypertexts = document.querySelectorAll("p");

for (let a of hypertexts) {
  if (a.classList.contains("big")) {
    a.style.fontSize = "2em";
  }
}
