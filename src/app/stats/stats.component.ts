import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { PokemonDetails } from '../pokemon-details';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnChanges {

  @Input()
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

  @Input()
  listaColores: any;

  chart: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pokemon.attack != 0) {
      this.createChart();

    }

  }

  createChart() {
    this.chart = new Chart("statsPoke", {
      type: 'radar',

      data: {
        labels: ['HP', 'DEFENSE', 'SPECIAL DEFENSE', 'SPEED', '     SPECIAL ATTACK', 'ATTACK'],
        datasets: [
          {
            data: [this.pokemon.hp, this.pokemon.defense, this.pokemon.specialDefense, this.pokemon.speed, this.pokemon.specialAttack, this.pokemon.attack],
            backgroundColor: this.listaColores[this.pokemon.types[0]],
            borderColor: this.listaColores[this.pokemon.types[0]],
            borderWidth: 2,
            fill: true,
            pointBackgroundColor: this.listaColores[this.pokemon.types[0]],
          },
          {
            data: [0, 0, 0, 0, 0, 250],
            borderWidth: 0,
            fill: true,
            pointRadius: 0
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            grid: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            angleLines: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            pointLabels: {
              color: 'rgba(255, 255, 255, 1)',
            }
          },
        },
        color: 'rgba(255, 255, 255, 0.7)',
      },
    });
  }


}
