import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetails } from '../pokemon-details';

@Component({
  selector: 'app-pokemon-data',
  templateUrl: './pokemon-data.component.html',
  styleUrls: ['./pokemon-data.component.css']
})
export class PokemonDataComponent implements OnInit {

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

  shiny: boolean = false;

  constructor() { }

  ngOnInit(): void {

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        const flecha = document.getElementById('scroll-hint');
        if (flecha) {
          flecha.style.display = 'none'
        }
      }
    })

  }

  changeImage() {
    this.shiny = !this.shiny

    const shinyGif = document.getElementById('shinyGif');
    const normalGif = document.getElementById('normalGif');

    if (shinyGif && normalGif) {
      if (this.shiny) {
        shinyGif.style.opacity = '1';
        normalGif.style.opacity = '0.6';
      } else {
        shinyGif.style.opacity = '0.6';
        normalGif.style.opacity = '1';
      }
    }
  }

  scrollDown() {
    window.scrollTo({ top: 300, behavior: 'smooth' });

    const flecha = document.getElementById('scroll-hint');
    if (flecha) {
      flecha.style.display = 'none'
    }
  }

}