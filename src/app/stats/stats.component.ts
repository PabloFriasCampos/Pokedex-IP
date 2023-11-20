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
        labels: ['hp', 'defense', 'attack', 'specialAttack', 'specialDefense', 'speed'],
        datasets: [
          {
            label: 'Stats de ' + this.pokemon.name,
            data: [this.pokemon.hp, this.pokemon.defense, this.pokemon.attack, this.pokemon.specialAttack, this.pokemon.specialDefense, this.pokemon.speed],
            backgroundColor: this.listaColores[this.pokemon.types[0]],
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
