import { Component, OnDestroy, Output } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from '../model/pokemon-details';
import { Subscription } from 'rxjs';
import * as jsonColores from '../../assets/json/pokemon-colors.json';

@Component({
  selector: 'app-vista-pokemon',
  templateUrl: './vista-pokemon.component.html',
  styleUrls: ['./vista-pokemon.component.css']
})
export class VistaPokemonComponent implements OnDestroy {

  @Output()
  pokemon: PokemonDetails = new PokemonDetails;

  @Output()
  listaColores: any = jsonColores;

  $unsubs: Subscription | null = null;

  chart: any;

  constructor(
    private pokeApi: PokeapiService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.$unsubs = this.activatedRoute.params.subscribe(data => {
      this.initComponent(data['nPokedex'])
    })
  }


  ngOnDestroy() {
    this.$unsubs?.unsubscribe();
  }

  initComponent(nPokedex: number): void {

    this.loadPokemon(nPokedex);

    window.scrollTo({ top: 0 });

  }

  loadPokemon(nPokedex: number) {

    this.pokeApi.getPokemonDetails(nPokedex).subscribe((data: PokemonDetails) => {
      this.pokemon = data;

      this.setBackground();

      this.setScrollbar();

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

    });

  }

  setBackground() {
    let container = document.getElementById('container');

    if (container) {
      container.style.backgroundImage = 'url(./assets/typesBackground/' + this.pokemon.types[0] + 'Background.png)';

    }

  }

  setScrollbar() {
    document.body.style.setProperty('--type-color', this.listaColores[this.pokemon.types[0]]);

  }

}