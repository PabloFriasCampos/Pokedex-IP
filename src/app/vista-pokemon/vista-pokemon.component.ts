import { Component, OnInit } from '@angular/core';
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

  pokemon: PokemonDetails = {
    image: '',
    imageShiny: '',
    gif: '',
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

  veryWeak: string[] = [];
  weak: string[] = [];
  x0: string[] = [];
  strong: string[] = [];
  veryStrong: string[] = [];

  listaColores: any;

  tablaTipos: any;

  shiny: boolean = false;

  constructor(
    private pokeApi: PokeapiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      const content = document.getElementById('pokemon-data');
      if (content) {
        content.style.visibility = 'visible';
      }
    }, 400);

    setTimeout(() => {
      const animation = document.getElementById('overlay');
      if (animation) {
        animation.style.display = 'none';
      }
    }, 900);

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

      this.calcularTiposRecibir(this.pokemon.types[0], this.pokemon.types[1]);

      this.setBackground();

    });

  }

  setBackground() {
    let container = document.getElementById('container');

    if (container) {
      container.style.backgroundImage = 'url(./assets/typesBackground/' + this.pokemon.types[0] + 'Background.png)';

    }

  }

  changeImage() {
    this.shiny = !this.shiny

  }

  scrollDown() {
    window.scrollTo({ top: 200, behavior: 'smooth' });

  }

  calcularTiposRecibir(type1: string, type2: string) {

    if (type2) {

      for (let tipoEnTabla in this.tablaTipos) {

        if (this.tablaTipos[type1][tipoEnTabla] == 0 || this.tablaTipos[type2][tipoEnTabla] == 0) {
          this.x0.push(tipoEnTabla);
        }
        else if (this.tablaTipos[type1][tipoEnTabla] == 2 && this.tablaTipos[type2][tipoEnTabla] == 2) {
          this.veryWeak.push(tipoEnTabla);
        }

        else if (this.tablaTipos[type1][tipoEnTabla] == 0.5 && this.tablaTipos[type2][tipoEnTabla] == 0.5) {
          this.veryStrong.push(tipoEnTabla);
        }

        else if ((this.tablaTipos[type1][tipoEnTabla] == 2 && this.tablaTipos[type2][tipoEnTabla] != 0.5) || (this.tablaTipos[type2][tipoEnTabla] == 2 && this.tablaTipos[type1][tipoEnTabla] != 0.5)) {
          this.weak.push(tipoEnTabla);
        }

        else if ((this.tablaTipos[type1][tipoEnTabla] == 0.5 && this.tablaTipos[type2][tipoEnTabla] != 2) || (this.tablaTipos[type2][tipoEnTabla] == 0.5 && this.tablaTipos[type1][tipoEnTabla] != 2)) {
          this.strong.push(tipoEnTabla);
        }

      }

    } else {
      for (let tipoEnTabla in this.tablaTipos) {

        if (this.tablaTipos[type1][tipoEnTabla] == 2) {
          this.weak.push(tipoEnTabla);

        }

        else if (this.tablaTipos[type1][tipoEnTabla] == 0) {
          this.x0.push(tipoEnTabla);

        }

        else if (this.tablaTipos[type1][tipoEnTabla] == 0.5) {
          this.strong.push(tipoEnTabla);

        }

      }

    }

  }

}