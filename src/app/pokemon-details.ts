import { Pokemon } from "./pokemon";

export interface PokemonDetails extends Pokemon {
  imageShiny: string;
  info: string;
  weight: number;
  height: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  gifShiny: string
}
