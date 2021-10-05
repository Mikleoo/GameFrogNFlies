import { grenouille } from "./grenouille.js";
import { mouche } from "./mouche.js";
class circuit {
    constructor(longueurCircuit, largeurCircuit, nbreTours) {
        this.nbreTours = 0;
        this.frog = {
            name: "Grenouille",
            coordX: 0,
            coordY: 0,
            css_class: "frog",
            nbreTours: 0,
        };
        this.flies = [];
        this.cookieValue = {
            Html: "",
            Frog: {},
            Flies: [],
        };
        this.longueurCircuit = longueurCircuit;
        this.largeurCircuit = largeurCircuit;
        this.nbreTours = nbreTours;
    }
    //Call les différentes fonctions, de facon à générer le layout du jeu.
    generate(nombreMouche) {
        this.generateMap(this.longueurCircuit, this.largeurCircuit);
        this.generateRocks();
        this.generateFlies(nombreMouche);
        this.generateFrog();
    }
    generateMap(longeurCircuit, largeurCircuit) {
        document.getElementById('container-circuit').innerHTML = ""; // réinitialise la carte
        var el = document.getElementById('container-circuit');
        for (var i = 0; i < longeurCircuit; i++) { // genere une carte de 10 sur 10
            var row = document.createElement('div');
            row.setAttribute("class", "row"); // attribution classe row
            el.appendChild(row);
            for (var j = 0; j < largeurCircuit; j++) {
                var col = document.createElement('div');
                col.setAttribute("class", "square"); // attribution classe row
                col.setAttribute("data-x", (j + 1).toString()); // attribution attribut data-x
                col.setAttribute("data-y", (i + 1).toString()); // attribution attribut data-y
                col.setAttribute("type", ""); // attribution attribut type (vide/blocked/weapon/player)
                row.appendChild(col);
            }
        }
    }
    generateRocks(nombreCailloux = 20) {
        for (var i = 0; i < nombreCailloux; i++) {
            var x = Math.ceil(Math.random() * 10); //genere un nombre entre 1 et 10
            var y = Math.ceil(Math.random() * 10);
            var rock = document.querySelector(".square[data-x='" + x + "'][data-y='" + y + "']"); // on recupere la case
            if (rock.getAttribute("type") === "") { // test si la case est vide
                rock.setAttribute("type", "rock"); // on defini le type a rock
                rock.classList.add("rock"); // on attribue la classe rock
            }
            else {
                i--; // si la case n'est pas vide on recommence l'iteration
            }
            ;
        }
    }
    generateFlies(nombreMouche) {
        for (var i = 0; i < nombreMouche; i++) {
            var x = Math.ceil(Math.random() * 10); //genere un nombre entre 1 et 10
            var y = Math.ceil(Math.random() * 10);
            var fly = document.querySelector(".square[data-x='" + x + "'][data-y='" + y + "']"); // on recupere la case
            if (fly.getAttribute("type") === "") { // test si la case est vide
                fly.setAttribute("type", "fly"); // on defini le type a fly
                fly.classList.add("fly"); // on attribue la classe fly
                //Creation d'un object littéral d'une mouche
                let _fly = {
                    name: `mouche${i}`,
                    coordX: x,
                    coordY: y,
                };
                //On Ajoute cet objet littéral dans un tableau
                this.flies.push(_fly);
            }
            else {
                i--; // si la case n'est pas vide on recommence l'iteration
            }
            ;
        }
    }
    generateFrog() {
        var x = parseInt(Math.ceil(Math.random() * 10).toString()); // on genere un nombre entre 1 et 10
        var y = parseInt(Math.ceil(Math.random() * 10).toString());
        this.frog.coordX = x; // On set les coordonnées
        this.frog.coordY = y;
        var frog = document.querySelector(".square[data-x='" + x + "'][data-y='" + y + "']"); // on recupere la case
        if (frog.getAttribute("type") === "") { // test si la case est vide
            frog.setAttribute("type", "frog"); // on defini le type a frog
            frog.classList.add("frog"); // on attribue la classe frog
        }
        else {
            this.generateFrog();
        }
        ;
    }
    //Vérifie le placement de la grenouille au "START" du jeu. condition : Si la grenouille est entouré de "ROCK" le jeu restart.
    checkGenerate() {
        var squareLeft = document.querySelector(".square[data-x='" + (this.frog.coordX - 1) + "'][data-y='" + this.frog.coordY + "']");
        var squareRight = document.querySelector(".square[data-x='" + (this.frog.coordX + 1) + "'][data-y='" + this.frog.coordY + "']");
        var squareUp = document.querySelector(".square[data-x='" + this.frog.coordX + "'][data-y='" + (this.frog.coordY - 1) + "']");
        var squareDown = document.querySelector(".square[data-x='" + this.frog.coordX + "'][data-y='" + (this.frog.coordY + 1) + "']");
        if (((squareLeft ? (squareLeft.classList[1] == "rock") : true) || this.frog.coordX - 1 == 0) && ((squareRight ? (squareRight.classList[1] == "rock") : true) || this.frog.coordX + 1 == 11) && ((squareUp ? (squareUp.classList[1] == "rock") : true) || this.frog.coordY - 1 == 0) && ((squareDown ? (squareDown.classList[1] == "rock") : true) || this.frog.coordY + 1 == 11)) {
            alert("Bloqué");
            window.location.reload();
        }
    }
    //pass turn each time "frog" does an action:
    Turn(value, command) {
        var frog = new grenouille("NomIconFrog");
        frog.move(value, command);
        var flie = new mouche("nomIconFlie");
        flie.moveAll(this.flies);
        this.nbreTours++;
        console.log("Nombre de tour : " + this.nbreTours);
        this.frog.nbreTours = this.nbreTours;
        console.log(this.frog.nbreTours);
        document.getElementById("nombredetours").innerHTML = "Tour : " + this.nbreTours + "";
        if (this.flies.length == 0) {
            this.final();
        }
    }
    // Fonction qui s'execute dès qu'il n'y a plus de mouche
    // Actualise le body du front pour permettre de remplir son pseudo et ainsi ajouter son score en appelant envoie()
    final() {
        document.body.innerHTML = `
      <div id="demo" class="modal">
        <div class="modal_content">
    			<h1>Partie Finie</h1>
    			<p>Veux tu sauvegarder ton scrore !?</p>

  				<input id="pseudo" type="text" placeholder="Pseudo">
          <input id="score" type="hidden" value="${this.nbreTours}">
  				<button id="button">Envoyer</button>
    			<a href="" class="modal_close">&times;</a>

    		</div>
    	</div>
      `;
        let addButton = document.getElementById('button');
        addButton.addEventListener('click', this.envoie);
    }
    // Fonction qui appelle un script php permettant de mettre à jour la bdd avec les infos utilisateurs et d'afficher un tableau de score
    envoie() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let d = year + "-0" + month + "-0" + day;
        $.ajax({
            url: '/frogNflies/models/final.php',
            type: 'POST',
            dataType: 'json',
            data: {
                pseudo: document.getElementById('pseudo').value,
                score: document.getElementById('score').value,
                date: d,
            },
            success: function (result) {
                console.log(result);
                document.body.innerHTML = "";
                for (var i = 0; i < result.length; i++) {
                    if (result[i]) {
                        document.body.innerHTML += `<p class="tier">n°${i + 1} : ${result[i][1]} a finis en ${result[i][2]} tours le ${result[i][3]}</p><br>`;
                    }
                }
                document.body.innerHTML += `<div class="tier"><a class="reload" href='.'><button class="r_button">Relancer une partie!</button></a></div>`;
            },
            error: function () { console.log("Ajax error"); }
        });
    }
    //effectue une comparaison entre la position des mouches et de la grenouille.
    //Si les positions récupéré correspondent, la mouche MEURT !
    popFly(coordX, coordY) {
        console.log("Wow tu es rentré dans popFly !");
        let _index = -1;
        this.flies.forEach(function (element, index) {
            console.log('here');
            if (element.coordX === coordX && element.coordY === coordY) {
                console.log('attraper');
                _index = index;
            }
        });
        if (_index != -1) {
            console.log('in popFly functionality');
            this.flies.splice(_index, 1);
        }
    }
    //Set expiration Date Cookie.
    //Store Data Cookie.
    //JSON.stringify: method converts a JavaScript object or value to a JSON string.
    //toUTCString: method converts a date to a string, using the UTC time zone
    setCookie(value) {
        var exdays = 20;
        var d = new Date();
        // Configure the expiration date: current date + x days
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.log("Dans setCookie : " + expires);
        localStorage.setItem(circuit.cookieName, JSON.stringify(value));
    }
    // Get Data Cookie.
    // return "string" (JSON.parse) into an "data" object.
    // "data" = type (voir construct)
    getCookie() {
        let cookieValue = localStorage.getItem(circuit.cookieName);
        return JSON.parse(cookieValue);
    }
}
circuit.cookieName = "circuit";
export { circuit };
