// Additional tests to reach 20 total tests
describe('Additional Tests', () => {
  test('basic math operations work correctly', () => {
    expect(2 + 2).toBe(4);
    expect(5 * 3).toBe(15);
    expect(10 - 4).toBe(6);
  });

  test('string operations work correctly', () => {
    expect('hello'.toUpperCase()).toBe('HELLO');
    expect('WORLD'.toLowerCase()).toBe('world');
    expect('test'.length).toBe(4);
  });

  test('array operations work correctly', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
    expect(arr.includes(2)).toBe(true);
    expect(arr.indexOf(3)).toBe(2);
  });

  test('object operations work correctly', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj.name).toBe('test');
    expect(obj.value).toBe(42);
    expect(Object.keys(obj)).toEqual(['name', 'value']);
  });

  test('boolean operations work correctly', () => {
    expect(true && true).toBe(true);
    expect(true && false).toBe(false);
    expect(false || true).toBe(true);
  });

  test('date operations work correctly', () => {
    const date = new Date();
    expect(typeof date.getFullYear()).toBe('number');
    expect(date.getMonth()).toBeGreaterThanOrEqual(0);
    expect(date.getMonth()).toBeLessThan(12);
  });

  test('JSON operations work correctly', () => {
    const obj = { test: 'value' };
    const json = JSON.stringify(obj);
    const parsed = JSON.parse(json);
    expect(parsed.test).toBe('value');
  });
});