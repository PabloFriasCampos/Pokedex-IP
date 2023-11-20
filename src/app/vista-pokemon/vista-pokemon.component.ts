import { Component, OnInit, Output } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from '../pokemon-details';

@Component({
  selector: 'app-vista-pokemon',
  templateUrl: './vista-pokemon.component.html',
  styleUrls: ['./vista-pokemon.component.css']
})
export class VistaPokemonComponent implements OnInit {

  @Output()
  pokemon: PokemonDetails = {
    image: '',
    imageShiny: '',
    gif: '',
    gifShiny: '',
    name: '',
    nPokedex: 0,
    types: [],
    weight: 0,
    height: 0,
    info: '',
    hp: 0,
    atack: 0,
    defense: 0,
    specialAtack: 0,
    specialDefense: 0,
    speed: 0
  };

  @Output()
  listaColores: any;
  @Output()
  tablaTipos: any;

  constructor(
    private pokeApi: PokeapiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    const content = document.getElementById('pokemon-data');
    const animation = document.getElementById('overlay');

    if (content) {
      content.style.visibility = 'hidden';
      setTimeout(() => {
        content.style.visibility = 'visible';
      }, 400);

    }

    if (animation) {
      animation.style.display = ''
      setTimeout(() => {
        animation.style.display = 'none';
      }, 900);

    }


    this.listaColores = this.http.get('assets/pokemon-colors.json').subscribe((data: any) => {
      this.listaColores = data;

    });

    this.tablaTipos = this.http.get('assets/table-type.json').subscribe((data: any) => {
      this.tablaTipos = data;
      this.loadPokemon();

    });

    window.scrollTo({ top: 0 });

  }

  loadPokemon() {
    const nPokedex = this.activatedRoute.snapshot.paramMap.get('nPokedex') as unknown as number;

    this.pokeApi.getPokemonDetails(nPokedex).subscribe((data: any) => {
      this.pokemon = data;

      this.setBackground();

    });

  }

  setBackground() {
    let container = document.getElementById('container');

    if (container) {
      container.style.backgroundImage = 'url(./assets/typesBackground/' + this.pokemon.types[0] + 'Background.png)';

    }

  }

  calcularColor(stat: number): string {

    let color;

    if (stat > 100) {
      color = '#E62CDF'
    }
    else if (stat > 75) {
      color = "#28E543"
    }
    else if (stat > 50) {
      color = "#E1FB1D"

    } else {
      color = "#FA2C25"
    }

    return color;

  }

}