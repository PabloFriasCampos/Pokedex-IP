import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { PokemonDetails } from '../model/pokemon-details';
import { Evolution } from '../model/evolution';
import { PokeTrigger } from '../model/poke-trigger';
import { Trigger } from '../model/trigger';
import { Movements } from '../model/movements';
import { Move } from '../model/move';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<Pokemon> {

    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id).pipe(
      map((data: any) => {

        return {
          image: data.sprites.other["official-artwork"].front_default,
          gif: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
          name: data.name,
          nPokedex: data.id,
          types: data.types.map((types: any) => types.type.name)
        }
      })
    );

  }

  getPokemonListN(n: number): Observable<Pokemon[]> {
    let pokemons: Observable<Pokemon>[] = [];

    for (let i = 1; i <= n; i++) {
      pokemons.push(this.getPokemon(i));
    }

    return forkJoin(pokemons);
  }

  getPokemonDetails(id: number): Observable<PokemonDetails> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id).pipe(
      switchMap((data: any) => {
        let pokemonDetails: PokemonDetails = {
          nPokedex: data.id,
          name: data.name,
          types: data.types.map((type: any) => type.type.name),
          image: data.sprites.other['official-artwork'].front_default,
          imageShiny: data.sprites.other['official-artwork'].front_shiny,
          gif: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
          gifShiny: data.sprites.versions["generation-v"]["black-white"].animated.front_shiny,
          info: '',
          weight: data.weight / 10,
          height: data.height / 10,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          specialAttack: data.stats[3].base_stat,
          specialDefense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        };

        return this.getDescription(id).pipe(
          map((description: string) => {
            pokemonDetails.info = description;
            return pokemonDetails;
          })
        );

      })
    );
  }

  getDescription(id: number): Observable<string> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/' + id).pipe(
      map((data: any) => {
        const flavorTextEntry = data.flavor_text_entries.find((entry: any) => {
          return entry.language.name === 'en' && entry.version.name === 'platinum';
        });

        if (flavorTextEntry) {
          return flavorTextEntry.flavor_text;
        } else {
          return 'No description found';
        }
      }));

  }

  getEvolutionChainUrl(id: number): Observable<string> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon-species/' + id).pipe(
      map((data: any) => {
        return data.evolution_chain.url;
      })
    )
  }

  getEvolutionChain(url: string): Observable<Evolution> {
    return this.http.get(url).pipe(
      map((data: any) => {
        const chain: Evolution = {
          pokeTrigger: new PokeTrigger,
          evolution1: [],
          evolution2: []
        }
        let id = data.chain.species.url.split('/')[6];
        this.getPokemon(id).subscribe((data: any) => {
          chain.pokeTrigger.pokemon = data;

        });

        for (let evo1 of data.chain.evolves_to) {
          let pokemon1: Pokemon = new Pokemon;
          let pokemon2: Pokemon = new Pokemon;

          let id = evo1.species.url.split('/')[6];
          if (id <= 493) {
            this.getPokemon(id).subscribe((data: any) => {
              pokemon1 = data;
              chain.evolution1?.push({
                pokemon: pokemon1,
                trigger: this.triggerData(evo1.evolution_details[0])
              });
              chain.evolution1?.sort((a, b) => a.pokemon.nPokedex - b.pokemon.nPokedex);

              for (let evo2 of evo1.evolves_to) {
                let id = evo2.species.url.split('/')[6];
                if (id <= 493) {
                  this.getPokemon(id).subscribe((data: any) => {
                    pokemon2 = data;
                    chain.evolution2?.push({
                      pokemon: pokemon2,
                      trigger: this.triggerData(evo2.evolution_details[0])
                    });
                    chain.evolution2?.sort((a, b) => a.pokemon.nPokedex - b.pokemon.nPokedex);

                  });

                }
              }

            });

          }

        }

        return chain;
      })
    )
  }

  triggerData(triggers: any): Trigger[] {
    let triggersFiltered: Trigger[] = [];

    for (let trigger in triggers) {
      let value = triggers[trigger];
      if (value !== null && value !== '' && value !== false) {
        let triggerToAdd = new Trigger;
        if (trigger == 'gender' && value == 1) {
          triggerToAdd = {
            triggerName: trigger,
            triggerValue: 'female'
          };

        } else if (trigger == 'gender' && value == 2) {
          triggerToAdd = {
            triggerName: trigger,
            triggerValue: 'male'
          };

        } else {
          triggerToAdd = {
            triggerName: trigger,
            triggerValue: value.name ? value.name : value
          };

        }
        triggersFiltered.push(triggerToAdd);
      }
    }

    return triggersFiltered.reverse();
  }

  getMovements(id: number): Observable<Movements> {

    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id).pipe(
      map((data: any) => {

        const movements: Movements = new Movements;

        data.moves
          .filter((move: any) => move.version_group_details.some((detail: any) =>
            detail.move_learn_method.name === 'level-up' && detail.version_group.name === 'platinum'))
          .map((move: any) => this.http.get(move.move.url).subscribe((moveData: any) => {
            const mov: Move = {
              name: moveData.name,
              type: moveData.type.name,
              cattegory: moveData.damage_class.name,
              accuracy: moveData.accuracy,
              power: moveData.power,
              machine: '',
              lvl: move.version_group_details[0].level_learned_at
            }
            movements.lvlMovements.push(mov);
            movements.lvlMovements.sort((a, b) => a.lvl - b.lvl)

          })),

          data.moves
            .filter((move: any) => move.version_group_details.some((detail: any) =>
              detail.move_learn_method.name === 'machine' && detail.version_group.name === 'platinum'))
            .map((move: any) => this.http.get(move.move.url).subscribe((moveData: any) => {
              const mov: Move = {
                name: moveData.name,
                type: moveData.type.name,
                cattegory: moveData.damage_class.name,
                accuracy: moveData.accuracy,
                power: moveData.power,
                machine: '',
                lvl: 0
              }
              this.http.get(moveData.machines.filter((detail: any) => detail.version_group.name == 'platinum')[0].machine.url)
                .subscribe((data: any) => {
                  mov.machine = data.item.name
                })

              movements.machineMovements.push(mov);
            }))

        return movements;
      })
    );
  }

}