// on définie une class abstraite animal, avec l'objet "iconName" en string
class animal {
    constructor(iconName) {
        this.iconName = iconName;
    }
    // une fonction "move" qui contient en parametre:
    // direction:  soit en string, soit de la class "circuit, soit un nom avec des coordonnées
    // command: soit en string , soit null
    move(direction, command) {
    }
}
export { animal };
