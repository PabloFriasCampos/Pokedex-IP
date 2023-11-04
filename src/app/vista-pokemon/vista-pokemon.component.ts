import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokeapiService } from '../pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-vista-pokemon',
  templateUrl: './vista-pokemon.component.html',
  styleUrls: ['./vista-pokemon.component.css']
})
export class VistaPokemonComponent implements OnInit {

  pokemon: any;

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
