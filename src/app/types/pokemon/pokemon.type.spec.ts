import { Pokemon } from './pokemon.type';

describe('Pokemon', () => {
  it('should create an instance', () => {
    expect(new Pokemon()).toBeTruthy();
  });
});
