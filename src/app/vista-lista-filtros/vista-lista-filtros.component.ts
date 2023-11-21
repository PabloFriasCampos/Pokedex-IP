import { Component, Input, Output } from '@angular/core';
import { Pokemon } from '../model/pokemon';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-vista-lista-filtros',
  templateUrl: './vista-lista-filtros.component.html',
  styleUrls: ['./vista-lista-filtros.component.css']
})
export class VistaListaFiltrosComponent {

  private generations: number[] = [0, 151, 251, 386, 493] //0, Gen1, Gen2, Gen3, Gen4 ...

  listaPokemon: Pokemon[] = [];

  @Input()
  textFilter: string = '';
  @Input()
  typesSelected: string[] = [];
  @Input()
  genSelected: number[] = [1];

  @Output()
  listaMostrada: Pokemon[] = [];

  constructor(private pokeApi: PokeapiService) { }


  ngOnInit(): void {
    this.loadList();

  }

  loadList() {
    this.pokeApi.getPokemonListN(this.generations[this.generations.length - 1]).subscribe((pokemonList: Pokemon[]) => {
      this.listaPokemon = pokemonList;
      this.applyFilters()

    });

  }

  applyFilters() {
    this.applyFilterGen();
    this.applyFilterType();
    this.applyFilterText();

  }


  applyFilterText() {
    this.listaMostrada = this.listaMostrada.filter(pokemon => pokemon.name.includes(this.textFilter.toLowerCase()) || pokemon.nPokedex === +this.textFilter);

  }

  applyFilterType() {
    if (this.typesSelected.length > 0) {
      this.listaMostrada = this.listaMostrada.filter(pokemon => {
        return this.typesSelected.includes(pokemon.types[0]) || this.typesSelected.includes(pokemon.types[1]);

      });

    }

  }

  applyFilterGen() {
    if (this.genSelected.length > 0) {
      let listaAux: Pokemon[] = [];
      for (let gen of this.genSelected) {
        listaAux = listaAux.concat(this.listaPokemon.slice(this.generations[gen - 1], this.generations[gen]));

      }
      this.listaMostrada = listaAux;

    } else {
      this.listaMostrada = this.listaPokemon;

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
