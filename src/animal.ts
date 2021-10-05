import {circuit} from "./circuit.js";

// on définie une class abstraite animal, avec l'objet "iconName" en string
abstract class animal {

  private iconName : String;

  constructor (iconName : String) {
    this.iconName = iconName;
  }

  // une fonction "move" qui contient en parametre:
  // direction:  soit en string, soit de la class "circuit, soit un nom avec des coordonnées
  // command: soit en string , soit null
  public move (direction : String | circuit | {name:string, coordX:number, coordY:number}, command : String | null) : void {
  }

}

export {animal};
