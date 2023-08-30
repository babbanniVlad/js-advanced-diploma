import { calcTileType } from '../utils';

test('Тестируем углы игрового поля', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
  expect(calcTileType(7, 8)).toBe('top-right');
  expect(calcTileType(56, 8)).toBe('bottom-left');
  expect(calcTileType(63, 8)).toBe('bottom-right');
});

test('Тестируем стороны игрового поля', () => {
  expect(calcTileType(2, 8)).toBe('top');
  expect(calcTileType(16, 8)).toBe('left');
  expect(calcTileType(15, 8)).toBe('right');
  expect(calcTileType(62, 8)).toBe('bottom');
});

test('Тестируем центр игрового поля', () => {
  expect(calcTileType(17, 8)).toBe('center');
  expect(calcTileType(38, 8)).toBe('center');
});

// test('Тестируем уровень здоровья', () => {
//   expect(calcHealthLevel(10)).toBe('critical');
//   expect(calcHealthLevel(40)).toBe('normal');
//   expect(calcHealthLevel(69)).toBe('high');
// });
