import { Component, OnInit, Output } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from '../pokemon-details';
import { Chart } from 'chart.js';

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
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0
  };

  @Output()
  listaColores: any;
  @Output()
  tablaTipos: any;

  chart: any;

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

      this.createChart()

    });

  }

  setBackground() {
    let container = document.getElementById('container');

    if (container) {
      container.style.backgroundImage = 'url(./assets/typesBackground/' + this.pokemon.types[0] + 'Background.png)';

    }

  }

  createChart() {
    this.chart = new Chart("statsPoke", {
      type: 'radar',

      data: {
        labels: ['hp', 'defense', 'attack', 'specialAttack', 'specialDefense', 'speed'],
        datasets: [
          {
            label: 'Stats de ' + this.pokemon.name,
            data: [this.pokemon.hp, this.pokemon.defense, this.pokemon.attack, this.pokemon.specialAttack, this.pokemon.specialDefense, this.pokemon.speed],
            backgroundColor: '#67db86',
          },
          {
            label: '',
            data: [250, 250, 250, 250, 250, 250]
          }
        ]
      },
      options: {
        aspectRatio: 4
      }

    });
  }

}