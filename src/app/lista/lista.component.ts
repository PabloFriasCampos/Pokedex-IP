import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  listaPokemon: Pokemon[] = [];

  constructor(private pokeApi: PokeapiService) { }


  ngOnInit(): void {
    this.loadList();

  }


  loadList() {
    this.pokeApi.getPokemonListN(493).subscribe((pokemonList: Pokemon[]) => {
      this.listaPokemon = pokemonList;

    });

  }

}
