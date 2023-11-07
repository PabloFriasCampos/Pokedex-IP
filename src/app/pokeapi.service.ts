import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  getPokemon(id: any): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id);

  }

  getPokemonListN(n: number): Observable<Pokemon[]> {
    const pokemons: Observable<Pokemon>[] = [];

    for (let i = 1; i <= n; i++) {
      let pokemon = this.getPokemon(i).pipe(
        map((data: any) => ({
          //image: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
          image: data.sprites.other["official-artwork"].front_default,
          name: data.name,
          nPokedex: data.id,
          types: data.types.map((types: any) => types.type.name),
        })),
      );

      pokemons.push(pokemon);
    }

    return forkJoin(pokemons).pipe(map((pokemonList: Pokemon[]) => pokemonList));
  }

}