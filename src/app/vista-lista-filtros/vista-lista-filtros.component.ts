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
  @Input()
  typesSelected: string[] = [];

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


  applyFilterText() {
    this.listaMostrada = this.listaPokemon.filter(pokemon => pokemon.name.includes(this.textFilter));

  }

  applyFilterType() {
    this.listaMostrada = this.listaPokemon.filter(pokemon => {
      return this.typesSelected.includes(pokemon.types[0]) || this.typesSelected.includes(pokemon.types[1])

    });

  }

  actualizarTextFilter(event: any) {
    this.textFilter = event.textFilter;
    this.applyFilterText();

  }

  actualizarTypesSelected(event: any) {
    this.typesSelected = event.typesSelected;
    this.applyFilterType();
    if (this.typesSelected.length == 0) {
      this.listaMostrada = this.listaPokemon;

    }

  }

}
