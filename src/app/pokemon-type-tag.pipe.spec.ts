import { PokemonTypeTagPipe } from './pokemon-type-tag.pipe';

describe('PokemonTypeTagPipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonTypeTagPipe();
    expect(pipe).toBeTruthy();
  });
});
