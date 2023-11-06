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

  private generations: number[] = [493, 151, 251, 386, 493] //Total, Gen1, Gen2, Gen3, Gen4 ...

  listaPokemon: Pokemon[] = [];

  @Input()
  textFilter: string = '';
  @Input()
  typesSelected: string[] = [];
  @Input()
  genSelected: number = 0;

  @Output()
  listaMostrada: Pokemon[] = [];

  constructor(private pokeApi: PokeapiService) { }


  ngOnInit(): void {
    this.loadList();

  }

  loadList() {
    this.pokeApi.getPokemonListN(this.generations[this.generations.length - 1]).subscribe((pokemonList: Pokemon[]) => {
      this.listaPokemon = pokemonList;
      this.listaMostrada = pokemonList;

    });

  }

  applyFilters() {
    this.applyFilterGen();
    this.applyFilterType();
    this.applyFilterText();

  }


  applyFilterText() {
    this.listaMostrada = this.listaMostrada.filter(pokemon => pokemon.name.includes(this.textFilter.toLowerCase()));

  }

  applyFilterType() {
    if (this.typesSelected.length > 0) {
      this.listaMostrada = this.listaMostrada.filter(pokemon => {
        return this.typesSelected.includes(pokemon.types[0]) || this.typesSelected.includes(pokemon.types[1]);

      });

    }

  }

  applyFilterGen() {
    if (this.genSelected == 1) {
      this.listaMostrada = this.listaPokemon.slice(0, this.generations[this.genSelected]);

    } else {
      this.listaMostrada = this.listaPokemon.slice(this.generations[this.genSelected - 1], this.generations[this.genSelected]);

    }

  }

  actualizarTextFilter(event: any) {
    this.textFilter = event.textFilter;
    this.applyFilters();

  }

  actualizarTypesSelected(event: any) {
    this.typesSelected = event.typesSelected;
    this.applyFilters();


  }

  actualizarGenSelected(event: any) {
    this.genSelected = event.genSelected;
    this.applyFilters();

  }

}
