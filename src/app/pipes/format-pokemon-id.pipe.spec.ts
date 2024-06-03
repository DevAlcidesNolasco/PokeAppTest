import { FormatPokemonIdPipe } from './format-pokemon-id.pipe';

describe('FormatPokemonIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatPokemonIdPipe();
    expect(pipe).toBeTruthy();
  });
});
