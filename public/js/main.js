import { circuit } from "./circuit.js";
let obj = new circuit(10, 10, 0); // On load notre jeu avec des dimension de 10x10 et un score de 0
obj.generate(5); // On génère tout ce qu'il y a a générée avec 5 mouches
obj.checkGenerate(); // On vérifie la générations pour ne pas être bloqué
/*  ALL Listeners   */
/* Save and Load Button */
let saveButton = document.getElementById('button_save');
let loadButton = document.getElementById('button_download');
let newButton = document.getElementById('button_new');
saveButton.addEventListener('click', function () { Save(); }); // Appelle Save() lors du clique sur le bouton save
loadButton.addEventListener('click', function () { Load(); }); // Appelle Load() lors du clique sur le bouton download
newButton.addEventListener('click', function () { newGame(); }); // Appelle newGame() lors du clique sur le bouton new
/* Pad Buttons */
// Appelle direction() avec la "direction" demandée
document.getElementById("haut").addEventListener("click", function () { direction("haut"); });
document.getElementById("droite").addEventListener("click", function () { direction("droite"); });
document.getElementById("gauche").addEventListener("click", function () { direction("gauche"); });
document.getElementById("bas").addEventListener("click", function () { direction("bas"); });
// Fonction direction qui permet d'appeler Turn avec la direction demandé par l'utilisteur et l'instance de circuit
function direction(direction) {
    if (direction == "haut") {
        obj.Turn(obj, "UP");
    }
    else if (direction == "droite") {
        obj.Turn(obj, "RIGHT");
    }
    else if (direction == "gauche") {
        obj.Turn(obj, "LEFT");
    }
    else if (direction == "bas") {
        obj.Turn(obj, "DOWN");
    }
}
// On définit un objet "matrice" avec comme type "data"
// On l'initialise à vide
let matrice = {
    tags: [],
    flies: [],
    frog: {
        name: "",
        coordX: 0,
        coordY: 0,
        css_class: "",
        nbreTours: 0
    }
};
// Fonction Save qui est appelé lors de l'appuie sur le bouton Save
// Son but est d'actualiser notre matrice et d'appeller setCookie() de circuit
function Save() {
    // On assigne la valeur de l'objet frog de la classe circuit dans la valeur frog de matrice
    // On utilise Object.assign() pour assigner la valeur de l'object frog depuis circuit et non sa référence car on assigne un objet à un autre (spécifique au language)
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    Object.assign(matrice.frog, obj.frog);
    // On boucle notre tableau d'objet flies de circuit
    for (let i = 0; i < obj.flies.length; ++i) {
        // On remplie dans notre tableau d'objet une valeur par default à chaque mouche
        matrice.flies[i] = {
            name: "",
            coordX: 0,
            coordY: 0,
        };
        // On assigne le tableau d'objet mouche de circuit dans notre tableau d'objets mouche de matrice
        Object.assign(matrice.flies[i], obj.flies[i]);
    }
    // On initialise le tags de matrice à vide
    matrice.tags = [];
    // On récupère le container de la grille
    let container = document.getElementById('container-circuit');
    // On récupère tout les enfants du container
    let allchild = container.getElementsByTagName("*");
    // On boucle pour chaque enfant de container
    for (let element of allchild) {
        // On ajouter de nouveau tags en dernier (push : https://www.tutorialspoint.com/typescript/typescript_array_push.htm)
        // On récupère les coordonnées et on set le type de la mouche
        matrice.tags.push({
            x: element.getAttribute('data-x'),
            y: element.getAttribute('data-y'),
            type: element.className
        });
    }
    // On appelle la fonction setCookie() qui va créee un cookie avec comme valeur notre matrice
    obj.setCookie(matrice);
}
// Fonction Load qui est appelé lors de l'appuie sur le bouton Download
// Son but est d'actualiser la matrice avec ce qu'on a récupérer du cookie
function Load() {
    var _a;
    // On récupère notre valeur du cookie (qui est une ancienne matrice) et on la met dans matrice
    Object.assign(matrice, obj.getCookie());
    // On set la position de frog depuis matrice récupéree dans notre frog de circuit
    Object.assign(obj.frog, matrice.frog);
    // On set la position de chacune de nos mouches depuis matrice récupéree dans notre tableau de mouche de circuit
    for (let i = 0; i < matrice.flies.length; ++i) {
        obj.flies[i] = {
            name: "",
            coordX: 0,
            coordY: 0,
        };
        Object.assign(obj.flies[i], matrice.flies[i]);
    }
    // On récupère la container et on le vide
    let container = document.getElementById('container-circuit');
    container.innerHTML = "";
    // On boucle pour chaque tags dans la matrice -> chaque case
    for (let element of matrice.tags) {
        // on crée une div
        let htmlTag = document.createElement('div');
        // On remplie lee typee de la case par rapport au valeur de type de matrice
        switch (element.type) {
            case "square frog":
                htmlTag.setAttribute('type', 'frog');
                break;
            case "square fly":
                htmlTag.setAttribute('type', 'fly');
                break;
            case "square rock":
                htmlTag.setAttribute('type', 'rock');
                break;
            case "square":
                htmlTag.setAttribute('type', '');
                break;
        }
        // On set la class de la case
        htmlTag.setAttribute('class', element.type);
        // On gère les div row
        if (element.type === 'row') {
            container === null || container === void 0 ? void 0 : container.appendChild(htmlTag);
        }
        else {
            // On pose les coordonnées de la case
            htmlTag.setAttribute('data-x', element.x.toString());
            htmlTag.setAttribute('data-y', element.y.toString());
            (_a = container === null || container === void 0 ? void 0 : container.lastChild) === null || _a === void 0 ? void 0 : _a.appendChild(htmlTag);
        }
    }
}
// Fonction newGame() qui est appelé lors de l'appuie sur le bouton New
// Son but est de rénitialiser le circuit
function newGame() {
    // On recrée le circuit 10x10 avec 5 mouches
    obj = new circuit(10, 10, 0);
    obj.generate(5);
    obj.checkGenerate();
    document.getElementById("nombredetours").innerHTML = "Tour : 0";
}
