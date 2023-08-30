import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';

export default class Team {
  constructor(characters) {
    this.characters = characters;
  }

  static playerHeroes() {
    return [Magician, Bowman, Swordsman];
  }

  static enemyHeroes() {
    return [Daemon, Undead, Vampire];
  }
}
