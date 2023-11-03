import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  private getPokemon(id: any): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/' + id);

  }

  private getType(type: any): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/type/' + type);

  }

  private getGen(gen: number): Observable<any> {
    return this.http.get('https://pokeapi.co/api/v2/type/' + gen);

  }

  getPokemonListN(n: number): Observable<Pokemon[]> {
    let observables: Observable<Pokemon>[] = [];

    for (let i = 1; i <= n; i++) {
      let observable = this.getPokemon(i).pipe(
        map((data: any) => ({
          image: data.sprites.other['official-artwork'].front_default,
          name: data.name,
          nPokedex: data.id,
          types: data.types.map((types: any) => types.type.name),
        }))
      );

      observables.push(observable);
    }

    return forkJoin(observables).pipe(
      map((pokemonList: Pokemon[]) =>
        pokemonList
      )
    );
  }



}