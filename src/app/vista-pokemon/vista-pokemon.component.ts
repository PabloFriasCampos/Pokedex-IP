import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokeapiService } from '../pokeapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-pokemon',
  templateUrl: './vista-pokemon.component.html',
  styleUrls: ['./vista-pokemon.component.css']
})
export class VistaPokemonComponent implements OnInit {

  pokemon: Pokemon = {
    image: '',
    name: '',
    nPokedex: 0,
    types: [],
    info: '',
    weight: 0,
    height: 0,
  };

  constructor(
    private pokeApi: PokeapiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const nPokedex = this.activatedRoute.snapshot.paramMap.get('nPokedex') as unknown as number;

    this.pokeApi.getPokemon(nPokedex).subscribe((data: any) => {
      this.pokemon = data;

    });

  }

}
