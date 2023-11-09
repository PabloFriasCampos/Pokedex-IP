import { Pokemon } from "./pokemon";

export interface PokemonDetails extends Pokemon {
  imageShiny: string;
  info: string;
  weight: number;
  height: number;
  stats?: number[];
}
