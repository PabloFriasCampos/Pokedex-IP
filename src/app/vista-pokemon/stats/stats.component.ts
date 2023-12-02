import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { PokemonDetails } from '../../model/pokemon-details';
import * as jsonColores from '../../../assets/json/pokemon-colors.json';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnChanges {

  @Input()
  pokemon: PokemonDetails = new PokemonDetails;

  listaColores: any = jsonColores;

  chart: any;

  labels = ['HP', 'DEFENSE', 'SPECIAL DEFENSE', 'SPEED', 'SPECIAL ATTACK', 'ATTACK']

  constructor(private translation: TranslationService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pokemon.attack != 0) {
      Chart.getChart(this.chart)?.destroy();
      this.labels = this.labels.map((label: string) => this.translation.getTranslation(label))
      this.createChart();

    }

  }

  createChart() {
    this.chart = new Chart("statsPoke", {
      type: 'radar',

      data: {
        labels: this.labels,
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
              color: 'rgba(0, 0, 0, 0.7)',
            },
            angleLines: {
              color: 'rgba(0, 0, 0, 0.7)',
            },
            pointLabels: {
              color: 'rgba(0, 0, 0, 1)',
            }
          },
        },
        color: 'rgba(255, 255, 255, 0.7)',
      },
    });
  }

}