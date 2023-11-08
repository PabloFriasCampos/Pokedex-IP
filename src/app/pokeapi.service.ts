import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Pokemon } from './pokemon';
import { PokemonDetails } from './pokemon-details';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  getPokemon(id: any): Observable<Pokemon> {

    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id).pipe(
      map((data: any) => {

        return {
          image: data.sprites.other["official-artwork"].front_default,
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

  getPokemonDetails(id: any): Observable<Pokemon> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id).pipe(
      map((data: any) => {

        return {
          image: data.sprites.other["official-artwork"].front_default,
          imageShiny: data.sprites.other["official-artwork"].front_shiny,
          name: data.name,
          nPokedex: data.id,
          types: data.types.map((types: any) => types.type.name),
          weight: data.weight / 10,
          height: data.height / 10

        }

      })
    );

  }

  getDescription(id: any): Observable<String> {
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

  getTypesVs(pokemon: PokemonDetails): Observable<PokemonDetails> {
    return this.http.get('https://pokeapi.co/api/v2/type/' + pokemon.types[0]).pipe(
      map((data: any) => {
        pokemon = pokemon;
        pokemon.typesVs = {
          typesWeak: data.damage_relations.double_damage_from.map((type: any) => type.name),
          typesInvulnerable: data.damage_relations.no_damage_from.map((type: any) => type.name),
          typesStrong: data.damage_relations.double_damage_to.map((type: any) => type.name),
          typesVeryWeak: []
        };
        return pokemon;
      })
    );
  }

}