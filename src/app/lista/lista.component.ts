import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';

type Pokemon = {
  image: string;
  name: string;
  nPokedex: number;
  types: string[];
}

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
    for (let i = 1; i <= 493; i++) {

      this.pokeApi.getPokemon(i).subscribe((data: any) => {
        let pokemon: Pokemon = {
          image: data.sprites.other["official-artwork"].front_default,
          name: data.name,
          nPokedex: data.id,
          types: data.types.map((types: any) => types.type.name)
        };
        this.listaPokemon.push(pokemon);
        this.listaPokemon.sort((a, b) => a.nPokedex - b.nPokedex);

      });

    }

  }

}
