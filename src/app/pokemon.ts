export interface Pokemon {
  image: string;
  imageShiny?: string;
  name: string;
  nPokedex: number;
  types: string[];
  info?: string;
  typesVs?:
  {
    typesWeak: string[],
    typesVeryWeak?: string[],
    typesInvulnerable?: string[],
    typesVeryStrong?: string[],
    typesStrong: string[]
  }
  weight?: number;
  height?: number;
  stats?: { [atack: string]: number };

}
