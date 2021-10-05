import {animal} from "./animal.js";
import {circuit} from "./circuit.js";

// on definie une class grenouille qui hérite d'animal, avec l objet iconFrog en string
class grenouille extends animal {

  constructor (iconFrog : String) {
    super(iconFrog);
  }

  // une fonction "move" qui va gerer le deplacement en fonction
  // value:  recupere de la class circuit
  // command: en string
  // de type void:  undefined, utiliser qd il n y a pas de return
  public move (value : circuit, command : String) : void {
    console.log(value.flies);

    // on definie des variables de position et de deplacement
    // querySelector (selectionner un element avec les proprité css)
    var square = document.querySelector(".square[data-x='" + value.frog.coordX + "'][data-y='" + value.frog.coordY + "']");
    var squareLeft = document.querySelector(".square[data-x='" + (value.frog.coordX - 1) + "'][data-y='" + value.frog.coordY + "']");
    var squareRight = document.querySelector(".square[data-x='" + (value.frog.coordX + 1) + "'][data-y='" + value.frog.coordY + "']");
    var squareUp = document.querySelector(".square[data-x='" + value.frog.coordX + "'][data-y='" + (value.frog.coordY - 1) + "']");
    var squareDown = document.querySelector(".square[data-x='" + value.frog.coordX + "'][data-y='" + (value.frog.coordY + 1) + "']");

    // on definie command dans un switch case en fonction de la direction choisie
    // classlist (retourne une collection des attributs de class)
    // exemple: squareUp! cette variable peut etre de ce type ou null(!) en typescript
    switch (command) {
      case "UP" :
      if (squareUp) {
        if (squareUp!.classList[1] == "rock") { //si la case choisie = rocher, alert message, index 1 (on veut 2e class Rock)
          alert("Un rocher bloque le passage !");
          return;
        }
        if (squareUp!.classList[1] == "fly") { // si la case choisie = mouche, remove la class fly
          squareUp!.classList.remove("fly");
          value.popFly(value.frog.coordX, value.frog.coordY - 1); // on appelle popFly avec les coor de la mouche qu on va suprimer, pour suprimer du tableau l'objet mouche, la mouche avec les meme coord
        }
      }
      if (value.frog.coordY - 1 == 0) { // on limite sur les bord pour que frog ne sort pas du cadre
        alert("c'est en dehors de l'espace !");
        return;
      }
      value.frog.coordY = value.frog.coordY - 1;
      break;

      case "RIGHT" :
      if (squareRight) {
        if (squareRight!.classList[1] == "rock") {
          alert("Un rocher bloque le passage !");
          return;
        }
        if (squareRight!.classList[1] == "fly") {
          squareRight!.classList.remove("fly");
          value.popFly(value.frog.coordX + 1, value.frog.coordY);
        }
      }
      if (value.frog.coordX + 1 == 11) {
        alert("c'est en dehors de l'espace !");
        return;
      }
      value.frog.coordX = value.frog.coordX + 1;
      break;

      case "LEFT" :
      if (squareLeft) {
        if (squareLeft!.classList[1] == "rock") {
          alert("Un rocher bloque le passage !");
          return;
        }
        if (squareLeft!.classList[1] == "fly") {
          squareLeft!.classList.remove("fly");
          value.popFly(value.frog.coordX - 1, value.frog.coordY);
        }
      }
      if (value.frog.coordX - 1 == 0) {
        alert("c'est en dehors de l'espace !");
        return;
      }
      value.frog.coordX = value.frog.coordX - 1;
      break;

      case "DOWN" :
      if (squareDown) {
        if (squareDown!.classList[1] == "rock") {
          alert("Un rocher bloque le passage !");
          return;
        }
        if (squareDown!.classList[1] == "fly") {
          squareDown!.classList.remove("fly");
          value.popFly(value.frog.coordX, value.frog.coordY + 1);
        }
      }
      if (value.frog.coordY + 1 == 11) {
        alert("c'est en dehors de l'espace !");
        return;
      }
      value.frog.coordY = value.frog.coordY + 1;
      break;

    }

    square!.classList.remove('frog'); // Tu remove la class frog avec c'est coord
    square = document.querySelector(".square[data-x='" + value.frog.coordX + "'][data-y='" + value.frog.coordY + "']");
    square!.classList.add('frog'); // tu ajoute la class frog au nouvelle coord
    return;
  }



}

export {grenouille};
