import { Pokemon } from "./pokemon";

export interface PokemonDetails extends Pokemon {
  imageShiny: string;
  info: string;
  typesVs:
  {
    typesWeak: string[],
    typesVeryWeak: string[],
    typesInvulnerable: string[],
    typesStrong: string[]
  }
  weight: number;
  height: number;
  stats?: number[];
}
