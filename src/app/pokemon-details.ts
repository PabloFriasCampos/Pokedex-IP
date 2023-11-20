import { Pokemon } from "./pokemon";

export interface PokemonDetails extends Pokemon {
  imageShiny: string;
  info: string;
  weight: number;
  height: number;
  hp: number;
  veryWeak: string[],
  weak: string[],
  x0: string[],
  strong: string[],
  veryStrong: string[],
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  gifShiny: string
}
