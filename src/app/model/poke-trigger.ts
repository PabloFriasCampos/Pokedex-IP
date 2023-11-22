import { Pokemon } from "./pokemon";
import { Trigger } from "./trigger";

export class PokeTrigger {
  pokemon: Pokemon = {
    image: "",
    name: "",
    nPokedex: 0,
    types: []
  };
  trigger?: Trigger[];
}
