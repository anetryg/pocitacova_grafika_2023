Animace je v zásadě sled statických obrázků / stavů grafiky měnící se v čase. Může se jednat o rastrovou grafiku (GIF) nebo o vektorovou. Animace mohou být interaktivní, SVG a HTML5 Canvas jsou pro tento účel ideální.

Jako základ pro animaci můžeme využít např. funkci `animate`, kde pro vykreslování grafiky využíváme optimalizované API prohlížečů `requestAnimationFrame`. Při každém zavolání `animate` funkce _požádá_ o vykreslení dalšího snímku animace a jeden snímek animace vykreslí. Funkce `requestAnimationFrame` také funci `animate` předá jako parametr přesný aktuální čas, použijeme tedy ten místo např. `Date.now()`.

```js
function animate(timestamp) {
    requestAnimationFrame(animate);

    draw();
}
```

Pokud chceme zobrazit animaci pohybujícího se kruhu, potřebujeme znát jeho počáteční pozici (`x`, `y`), rychlost pohybu (`speed`) ve směru os referenční roviny (prostoru) a zvolit vhodnou snímkovou frekvenci animace (`FPS` → počet snímků za sekundu). Nejčastěji se můžeme setkat s hodnotou 60 FPS. U videozáznamů se často používá i 24–30 FPS, tam je ale iluze plynulého pohybu dosaženo [pohybovou neostrostí](https://en.m.wikipedia.org/wiki/Motion_blur#Animation) pohybujících se objektů. V našem případě je 30 FPS nedostačující (doporučuji si ale vyzkoušet prohlédnout stejnou animaci s různými hodnotami FPS).

Také můžeme kontrolu FPS úplně vynechat a spokojit se s výchozí hodnotou `requestAnimationFrame`, která je rovna obnovovací frekvenci monitoru (nejčastěji 60 Hz → 60 FPS).

Mít přehled o čase uplynulém mezi jednotlivými vykreslenými snímky je ale důležité pokud nechceme aby byla rychlost pohybu objektu závislá na rychlosti animace (např. 5 px za vykreslený snímek), ale přímo na čase (300 px/s). Rychlost objektu by měla být stejná v obou případech při 60 FPS, pokud je ale prohlížeč vytížený, FPS může kolísat a v prvním případě by docházelo k „opožďování“ objektu oproti zamýšlenému stavu. Volba přístupu záleží na konkrétní aplikaci.

### Kontrola FPS:
```js
const FPS = 60;
const INTERVAL = 1000 / FPS; // → cca 1 snímek za 17 ms
let then = null;
let delta;

function animate(timestamp) {
    if (then === null) then = timestamp;

    requestAnimationFrame(animate);

    delta = timestamp - then;
    if (delta > INTERVAL) {
        then = timestamp - (delta % INTERVAL);

        draw();
    }
}

requestAnimationFrame(animate);
```

### Vykreslování objektu:
```js
let x = 25;
let y = 100;
// pro tento příklad je směr pohybu přímo po ose X
let speed = 5;

function draw() {
    const CVS = document.getElementById("draw");
    const CTX = CVS.getContext("2d");

    x += speed;
    if (x <= 25 || x >= 475) {
        // pokud se kruh dostane na okraj canvasu, změní se směr jeho pohybu → odrazí se od stěny
        speed = -speed;
    }

    CTX.clearRect(0, 0, 500, 200);
    CTX.beginPath();
    CTX.fillStyle = "#ff0000";
    CTX.arc(x, y, 25, 0, 2 * Math.PI, false);
    CTX.fill();
}
```

# Gravitace a interaktivita

Náš kód se stará přímo o výpočet pozice objektu, můžeme tedy vytvářet fyzikální modely, např. gravitační zrychlení ve směru osy `y`. Pro větší realističnost nasimulujeme pružnost míče, aby při odrazu ztrácel energii. Zároveň můžeme detekovat kliknutí na míč a uvést ho do pohybu daným směrem.

### Simulace gravitačního zrychlení:
```js
const G = 2000; // 2000 px / s²
let speed = {
	x: 0,
	y: 0
};

function draw(dt) {
    speed.y += G * dt / 1000;
    // …
}
```

### Pružnost:
```js
const BOUNCINESS = 0.7;

function draw(dt) {
    // …
        speed.x = BOUNCINESS * -speed.x;
    // …
        speed.y = BOUNCINESS * -speed.y;
    // …
}
```

### Odpal míče:
```js
const SHOVE_SPEED = G;

function click(e) {
	const POS = getEvPos(e);

    if (distance(POS, [x, y]) < R) { // pokud bylo kliknuto na míč
        const D = Math.abs(POS[0] - x) + Math.abs(POS[1] - y);
        // rozlož rychlost postrčení ve směru os x a y podle vzdálenosti kliknutí od středu míče ve směru těchto os
		speed.x += SHOVE_SPEED * (x - POS[0]) / D;
		speed.y += SHOVE_SPEED * (y - POS[1]) / D;
	}
}
```

# Interakce pomocí klávesnice

V JavaScriptu můžeme také pomocí `keydown`, `keyup`, `keypress` eventů zjišťovat které klávesy uživatel zmáčkl a pustil a chování animace podle toho upravovat, například měnit rychlost objektu na osách `x` a `y`.

### Jednoduchá varianta:
```js
function keydown(e) {
	switch (e.keyCode) {
		case 38: // ↑
		case 87: // W
			speed.y = -300;
			break;

		case 40: // ↓
		case 83: // S
			speed.y = 300;
			break;

		case 37: // ←
		case 65: // A
			speed.x = -300;
			break;

		case 39: // →
		case 68: // D
			speed.x = 300;
			break;
	}
}

function keyup(e) {
	// vertikální klávesy: ↑, ↓, W, S
	if ([38, 40, 87, 83].includes(e.keyCode)) speed.y = 0;
	// horizontální klávesy: ←, →, A, D
	if ([37, 39, 65, 68].includes(e.keyCode)) speed.x = 0;
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
```


Event `keydown` při zmáčknuté klávese nenastane pouze jednou, ale může se opakovat – klikněte myší např. do adresního řádku a držte klávesu `a`, písmeno `a` se nejdříve vypíše jednou a po krátké prodlevě se začne vypisovat opakovaně s podstatně menší prodlevou. S podobnou frekvencí se opakuje event `keydown`.

Kvůli tomuto chování a příliš jednoduché implementaci působí ovládání prvku neohrabaně (např. když uživatel rychle změní směr pohybu zleva doprava a šipku vpravo zmáčkne dříve než pustí šipku doleva). Následující příklad funguje obdobně, ale podle zmáčknutých kláves lépe rozhoduje o změně rychlosti objektu.

### Relevantní kód:
```js
const Y_KEYS = [38, 87, 40, 83], // v pořadí: ↑ W ↓ S
	Y_PRESSED = [];

function keydown(e) {
    // pokud byla zmáčknuta klávesa pro osu Y a není v seznamu zmáčknutých kláves
	if (Y_KEYS.includes(e.keyCode) && !Y_PRESSED.includes(e.keyCode)) {
        // přidej klávesu mezi zmáčknuté
        Y_PRESSED.push(e.keyCode);
        // vyhodnoť jak se má upravit rychlost pro osu Y
		speed.y = resolveSpeed(Y_KEYS, Y_PRESSED);
    }
    
    // …
}

function keyup(e) {
    // pokud byla zmáčknuta klávesa pro osu Y a je v seznamu zmáčknutých kláves
	if (Y_KEYS.includes(e.keyCode) && Y_PRESSED.includes(e.keyCode)) {
        // vyřaď klávesu ze seznamu
        Y_PRESSED.splice(Y_PRESSED.indexOf(e.keyCode), 1);
        // a znovu vyhodnoť rychlost
        // (pohyb se může zastavit, změnit do opačného směru nebo teoreticky zůstat stejný pokud uživatel pustil ↓ a zároveň drží S)
		speed.y = resolveSpeed(Y_KEYS, Y_PRESSED);
	}

	// …
}

function resolveSpeed(keys, pressed) {
    const LAST_PRESSED = pressed.slice(-1)[0];
    // pokud je poslední zmáčknutá klávesa W nebo ↑, nastav -300
	if (keys.slice(0, 2).includes(LAST_PRESSED)) return -300;
    // pokud je poslední zmáčknutá klávesa S nebo ↓, nastav -300
    if (keys.slice(2, 4).includes(LAST_PRESSED)) return 300;
    // jinak nastav 0
	return 0;
}
```
