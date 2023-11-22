import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PokemonDetails } from '../model/pokemon-details';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vista-pokemon',
  templateUrl: './vista-pokemon.component.html',
  styleUrls: ['./vista-pokemon.component.css']
})
export class VistaPokemonComponent implements OnDestroy, OnInit {

  @Output()
  pokemon: PokemonDetails = new PokemonDetails;

  @Output()
  listaColores: any;
  @Output()
  tablaTipos: any;

  $unsubs: Subscription | null = null;

  chart: any;

  constructor(
    private pokeApi: PokeapiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
    this.$unsubs = this.activatedRoute.params.subscribe(data => {
      this.initComponent(data['nPokedex'])
    })

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
  }

  initComponent(nPokedex: number): void {

    this.listaColores = this.http.get('assets/json/pokemon-colors.json').subscribe((data: any) => {
      this.listaColores = data;

    });

    this.tablaTipos = this.http.get('assets/json/table-type.json').subscribe((data: any) => {
      this.tablaTipos = data;
      this.loadPokemon(nPokedex);

    });

    window.scrollTo({ top: 0 });

  }

  ngOnDestroy() {
    this.$unsubs?.unsubscribe();
  }

  loadPokemon(nPokedex: number) {

    this.pokeApi.getPokemonDetails(nPokedex).subscribe((data: PokemonDetails) => {
      this.pokemon = data;

      this.setBackground();

      this.setScrollbar()

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