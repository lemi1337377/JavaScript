class Simbol {
    constructor(naziv) {
        this.naziv = naziv;
        this.provereno = false;
    }
}

const simboli = [
    "herc", "karo", "pik", "tref", "zvezda", "joker"
];
let odigrano = [];
let brPoteza = brProvere = 1;
let kombinacija = nasumicnaKombinacija();
let krajIgre = false;
let ime = document.getElementById("ime");
let button = document.getElementById("submit");
let igrac = document.getElementById("igrac");

function ispisIgraca(){
    igrac.innerHTML = `Igrac:${ime.value}`;
    ime.style.display = "none";
    button.style.display="none";
}

button.addEventListener("click",ispisIgraca);

function ispisSimbola() {
    let e = document.getElementById("simboli");
    e.innerHTML = "";
    for (let i = 0; i < simboli.length; i++) {
        e.innerHTML += `
            <div id=${simboli[i]} onclick="potez(this)">
                <img src="img/${simboli[i]}.png"/>
            </div>
        `;
    }
}

function ispisPolja() {
    let e = document.getElementById("ciklusi");
    let brPolja = 1;
    let brProvera = 1;
    e.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            e.innerHTML += `<div class='polje' id='polje${brPolja++}'></div>`;

        }
        for (let j = 0; j < 4; j++) {
            e.innerHTML += `<div class='provera' id='provera${brProvera++}'></div>`;

        }
    }
}

function ispisPoljaRezultata() {
    let e = document.getElementById("resenje");
    e.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        e.innerHTML += `
            <div id="resenje${i}"></div> 
        `;
    }
}

function nasumicnaKombinacija() {
    let komb = [];

    for (let i = 0; i < 4; i++) {
        let br = Math.ceil(Math.random() * 60);
        if (br <= 10) komb[i] = new Simbol("herc");
        else if (br <= 20) komb[i] = new Simbol("karo");
        else if (br <= 30) komb[i] = new Simbol("pik");
        else if (br <= 40) komb[i] = new Simbol("tref");
        else if (br <= 50) komb[i] = new Simbol("zvezda");
        else komb[i] = new Simbol("joker");
    }

    return komb;
}


function potez(e) {
    if(!krajIgre){
        odigrano.push(new Simbol(e.id));
        let el = document.getElementById(`polje${brPoteza}`);
        el.innerHTML += `<img src="img/${e.id}.png"/>`;
        if (brPoteza % 4 == 0) {
            console.log(odigrano);
            proveraKombinacije();
        }
        brPoteza++;
    }

}


function proveraKombinacije() {
    console.log("Provera");

    let naMestu = 0;
    let postoje = 0;

    for (let i = 0; i < 4; i++) {
        if (odigrano[i].naziv == kombinacija[i].naziv) {
            odigrano[i].provereno = true;
            kombinacija[i].provereno = true;
            naMestu++;
        } else {
            kombinacija[i].provereno = false;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (kombinacija[i].provereno == false) {
            for (let j = 0; j < 4; j++) {
                if (kombinacija[i].naziv == odigrano[j].naziv && odigrano[j].provereno == false) {
                    odigrano[j].provereno = true;
                    postoje++;
                    break;
                }
            }
        }
    }

    console.log("Na mestu: " + naMestu);
    console.log("Tu su ali nisu na mestu: " + postoje);
    rezultatCiklusa(naMestu, postoje);
    odigrano = [];

    if(naMestu == 4 || brPoteza == 24){
        ispisResenja();
        krajIgre = true;
    }
}

function rezultatCiklusa(naMestu, postoje) {

    for (let i = 0; i < naMestu; i++) {
        let e = document.getElementById(`provera${brProvere}`);
        e.style.backgroundColor = "red";
        brProvere++;
    }

    for (let i = 0; i < postoje; i++) {
        let e = document.getElementById(`provera${brProvere}`);
        e.style.backgroundColor = "yellow";
        brProvere++;
    }

    brProvere = brPoteza + 1;

}

function ispisResenja(){
    for (let i = 0; i < 4; i++) {
        let e = document.getElementById(`resenje${i}`);
        e.innerHTML = `<img src="img/${kombinacija[i].naziv}.png"/>`;
        
    }
}

function restart(){
    odigrano = [];
    brPoteza = brProvere = 1;
    kombinacija = nasumicnaKombinacija();
    krajIgre = false;
    start();
}

function start() {
    ispisSimbola();
    ispisPolja();
    ispisPoljaRezultata();
    console.log(kombinacija);
}

start();

