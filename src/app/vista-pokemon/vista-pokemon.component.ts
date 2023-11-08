import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokeapiService } from '../pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vista-pokemon',
  templateUrl: './vista-pokemon.component.html',
  styleUrls: ['./vista-pokemon.component.css']
})
export class VistaPokemonComponent implements OnInit {

  pokemon: Pokemon = {
    image: '',
    imageShiny: '',
    name: '',
    nPokedex: 0,
    types: [],
    weight: 0,
    height: 0,
  };

  listaColores: any;

  shiny: boolean = false;

  constructor(
    private pokeApi: PokeapiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient

  ) {
    this.listaColores = this.http.get('assets/pokemon-colors.json').subscribe((data: any) => {
      this.listaColores = data;

    });

    setTimeout(() => {
      const content = document.getElementById('pokemon-data');
      if (content) {
        content.style.visibility = 'visible';
      }
    }, 200);

  }

  ngOnInit(): void {
    const nPokedex = this.activatedRoute.snapshot.paramMap.get('nPokedex') as unknown as number;

    this.pokeApi.getPokemonAll(nPokedex).subscribe((data: any) => {
      this.pokemon = data;

      this.pokeApi.getDescription(nPokedex).subscribe((descripcion: any) => {
        this.pokemon.info = descripcion;

      });

      this.pokeApi.getTypesVs(this.pokemon).subscribe((updatedPokemon: Pokemon) => {
        this.pokemon = updatedPokemon;
      });

    });

  }

  cambiaImagen() {
    this.shiny = !this.shiny;
  }

}
