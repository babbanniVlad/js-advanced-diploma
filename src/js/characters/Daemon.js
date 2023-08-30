import Character from '../Character';

export default class Daemon extends Character {
  constructor(level, type) {
    super(level, type);
    this.type = 'daemon';
    this.attack = 10;
    this.defence = 10;
  }
}
