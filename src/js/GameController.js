// Темы игрового поля
import themes from "./themes";
// GameState - объект, который хранит текущее состояние игры
import GameState from "./GameState";
// Подключаем составы команд
import Team from "./Team";
// Подключаем генератор персонажей и состава команд
import { generateTeam } from "./generators";
import PositionedCharacter from "./PositionedCharacter";
import cursors from "./cursors";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.defaultTheme = themes.prairie;

    this.userHero = Team.playerHeroes();
    this.enemyHero = Team.enemyHeroes();
    this.playerTeam = [];
    this.enemyTeam = [];

    this.level = 1;
    this.playerPositions = [];
    this.enemyPositions = [];
    this.allCell = [];
  }

  init() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));

    this.startGame();
  }

  startGame() {
    if (this.level === 1) {
      this.playerTeam = generateTeam(Team.playerHeroes(), 1, 2);
      this.enemyTeam = generateTeam(Team.enemyHeroes(), 1, 2);
      this.positionTeams(this.playerTeam, this.enemyTeam);
      this.allCell.push(...this.playerPositions, ...this.enemyPositions);
    }
    const coordinates = this.getPositions(this.playerPositions.length);
    for (let i = 0; i < this.playerPositions.length; i += 1) {
      this.playerPositions[i].position = coordinates.user[i];
      this.enemyPositions[i].position = coordinates.enemy[i];
    }

    this.gamePlay.drawUi(this.defaultTheme);
    this.gamePlay.redrawPositions([
      ...this.playerPositions,
      ...this.enemyPositions,
    ]);
  }

  positionTeams(playerTeam, enemyTeam) {
    for (let i = 0; i < playerTeam.length; i += 1) {
      this.playerPositions.push(new PositionedCharacter(playerTeam[i], 0));
    }
    for (let i = 0; i < enemyTeam.length; i += 1) {
      this.enemyPositions.push(new PositionedCharacter(enemyTeam[i], 0));
    }
  }

  randomPosition(column = 0) {
    return (
      Math.floor(Math.random() * 8) * 8 +
      (Math.floor(Math.random() * 2) + column)
    );
  }

  getPositions(length) {
    const position = {
      user: [],
      enemy: [],
    };
    let random;
    for (let i = 0; i < length; i += 1) {
      do {
        random = this.randomPosition();
      } while (position.user.includes(random));
      position.user.push(random);

      do {
        random = this.randomPosition(6);
      } while (position.enemy.includes(random));
      position.enemy.push(random);
    }
    return position;
  }
  getPositionedCharacter(index) {
    return this.allCell.find((element) => element.position === index);
  }
  onCellEnter(cellIndex) {
    if (this.getPositionedCharacter(cellIndex)) {
      const unit = this.getPositionedCharacter(cellIndex).character;
      this.gamePlay.showCellTooltip(
        `\u{1F538}${unit.type}\u{1F396}${unit.level}\u{2694}${unit.attack}\u{1F6E1}${unit.defence}\u{2764}${unit.health}`,
        cellIndex
      );
    }
  }

  cellEnter() {
    this.gameplay.addCellEnterListener(this.onCellEnter);
  }

  onCellClick() {}
}
