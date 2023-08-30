import Character from '../Character';

export default class Magician extends Character {
  constructor(level, type) {
    super(level, type);
    this.type = 'magician';
    this.attack = 10;
    this.defence = 40;
  }
}
