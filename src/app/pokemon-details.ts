import { Pokemon } from "./pokemon";

export interface PokemonDetails extends Pokemon {
  imageShiny: string;
  info: string;
  weight: number;
  height: number;
  hp: number;
  atack: number;
  defense: number;
  specialAtack: number;
  specialDefense: number;
  speed: number;
  gifShiny: string
}
