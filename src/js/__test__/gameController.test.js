import Bowman from '../characters/Bowman';
import GameController from '../GameController';
import GamePlay from '../GamePlay';
import PositionedCharacter from '../PositionedCharacter';
import Swordsman from '../characters/Swordsman';
import Vampire from '../characters/Vampire';
import GameStateService from '../GameStateService';
import Daemon from '../characters/Daemon';

const posBowman = new PositionedCharacter(new Bowman(1), 1);
const posSwordsman = new PositionedCharacter(new Swordsman(1), 24);
const posVampire = new PositionedCharacter(new Vampire(1), 30);
const posDaemon = new PositionedCharacter(new Daemon(1), 33);
const playerTeam = [];
const enemyTeam = [];
const testGame = new GameController(new GamePlay(), GameStateService);
testGame.allCell.push(posBowman, posSwordsman, posVampire, posDaemon);
playerTeam.push(posBowman, posSwordsman);
enemyTeam.push(posVampire, posDaemon);

test('Проверяем создание персонажа в указанной ячейке', () => {
  expect(testGame.allCell[0].position).toEqual(1);
  expect(testGame.allCell[1].position).toEqual(24);
  expect(testGame.allCell[2].position).toEqual(30);
  expect(testGame.allCell[3].position).toEqual(33);
  expect(testGame.allCell.length).toBe(4);
});

test('Проверка персонажа по индексу', () => {
  expect(testGame.thisUser(24)).toBeTruthy();
  expect(testGame.thisUser(30)).toBeFalsy();
  expect(testGame.thisUser(1)).toBeTruthy();
});

test('Персонажи генерируются случайным образом в столбцах 1 и 2 для игрока и в столбцах 7 и 8 для соперника', () => {
  const arrTeam = testGame.getPositions(playerTeam.length);
  const posUserOne = arrTeam.user[0];
  const posUserTwo = arrTeam.user[1];
  const posEnemyOne = arrTeam.enemy[0];
  const posEnemyTwo = arrTeam.enemy[1];

  const arr = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
  const arr1 = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
  expect(arr).toContain(posUserOne);
  expect(arr).toContain(posUserTwo);
  expect(arr1).toContain(posEnemyOne);
  expect(arr1).toContain(posEnemyTwo);
  expect(arr).not.toContain(posEnemyOne);
  expect(arr).not.toContain(posEnemyTwo);
  expect(arr1).not.toContain(posUserOne);
  expect(arr1).not.toContain(posUserTwo);
});
