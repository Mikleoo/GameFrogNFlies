import {animal} from "./animal.js";

class mouche extends animal {

  constructor (iconFly : String) {
    super(iconFly);
  }

  public move (value : {name:string, coordX:number, coordY:number}) : void {

    let command : number = Math.ceil(Math.random() * 4); // entre 1 et 4

    var square = document.querySelector(".square[data-x='" + value.coordX + "'][data-y='" + value.coordY + "']");
    var squareLeft = document.querySelector(".square[data-x='" + (value.coordX - 1) + "'][data-y='" + value.coordY + "']");
    var squareRight = document.querySelector(".square[data-x='" + (value.coordX + 1) + "'][data-y='" + value.coordY + "']");
    var squareUp = document.querySelector(".square[data-x='" + value.coordX + "'][data-y='" + (value.coordY - 1) + "']");
    var squareDown = document.querySelector(".square[data-x='" + value.coordX + "'][data-y='" + (value.coordY + 1) + "']");

    switch (command) {
    case 1 :
    if (squareUp) {
        if (squareUp!.classList[1] == "rock" || squareUp!.classList[1] == "frog" || squareUp!.classList[1] == "fly") {
        return;
        }
    }
    if (value.coordY - 1 == 0) {
        return;
    }
    value.coordY = value.coordY - 1;
    break;

    case 2 :
    if (squareRight) {
        if (squareRight!.classList[1] == "rock" || squareRight!.classList[1] == "frog" || squareRight!.classList[1] == "fly") {
        return;
        }
    }
    if (value.coordX + 1 == 11) {
        return;
    }
    value.coordX = value.coordX + 1;
    break;

    case 3 :
    if (squareLeft) {
        if (squareLeft!.classList[1] == "rock" || squareLeft!.classList[1] == "frog" || squareLeft!.classList[1] == "fly") {
        return;
        }
    }
    if (value.coordX - 1 == 0) {
        return;
    }
    value.coordX = value.coordX - 1;
    break;

    case 4 :
    if (squareDown) {
        if (squareDown!.classList[1] == "rock" || squareDown!.classList[1] == "frog" || squareDown!.classList[1] == "fly") {
        return;
        }
    }
    if (value.coordY + 1 == 11) {
        return;
    }
    value.coordY = value.coordY + 1;
    break;

    }

    square!.classList.remove('fly');
    square = document.querySelector(".square[data-x='" + value.coordX + "'][data-y='" + value.coordY + "']");
    square!.classList.add('fly');
  }

  public moveAll(moucheList : {name:string, coordX:number, coordY:number}[]) : void {
    for(let value of moucheList) {
        this.move(value);
    }
  }

}

export {mouche};
