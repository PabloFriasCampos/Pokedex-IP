import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokeapiService } from '../pokeapi.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-vista-lista-filtros',
  templateUrl: './vista-lista-filtros.component.html',
  styleUrls: ['./vista-lista-filtros.component.css']
})
export class VistaListaFiltrosComponent {

  numPokemons = 493;

  listaPokemon: Pokemon[] = [];

  @Input()
  textFilter = '';

  @Output()
  listaMostrada: Pokemon[] = [];

  constructor(private pokeApi: PokeapiService) { }


  ngOnInit(): void {
    this.loadList();

  }

  loadList() {
    this.pokeApi.getPokemonListN(this.numPokemons).subscribe((pokemonList: Pokemon[]) => {
      this.listaPokemon = pokemonList;
      this.listaMostrada = pokemonList;

    });

  }


  /*loadList() {
    for (let i = 1; i <= this.numPokemons; i++) {

      this.pokeApi.getPokemon(i).subscribe((data: any) => {
        let pokemon: Pokemon = {
          image: data.sprites.other["official-artwork"].front_default,
          name: data.name,
          nPokedex: data.id,
          types: data.types.map((types: any) => types.type.name)
        };
        this.listaPokemon.push(pokemon);
        this.listaPokemon.sort((a, b) => a.nPokedex - b.nPokedex);
        this.listaMostrada.push(pokemon);
        this.listaMostrada.sort((a, b) => a.nPokedex - b.nPokedex);

      });
    }

  }*/


  applyFilter() {
    this.listaMostrada = this.listaPokemon.filter(pokemon => pokemon.name.includes(this.textFilter));

  }

  //Para los tipos puedes hacer pokemon.types.includes(tipo)

  //Para las generaciones aun debemos ver

  actualizarTextFilter(event: any) {
    this.textFilter = event.textFilter;
    this.applyFilter();

  }

}
