import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokemonDetails } from '../../model/pokemon-details';

@Component({
  selector: 'app-pokemon-data',
  templateUrl: './pokemon-data.component.html',
  styleUrls: ['./pokemon-data.component.css']
})
export class PokemonDataComponent implements OnChanges {

  @Input()
  pokemon: PokemonDetails = new PokemonDetails;

  @Input()
  listaColores: any;

  shiny: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        const flecha = document.getElementById('scroll-hint');
        if (flecha) {
          flecha.style.display = 'none'
        }
      }
    })

    const flecha = document.getElementById('scroll-hint');
    if (flecha) {
      flecha.style.display = 'block'
    }

    if (this.shiny) {
      this.changeImage()
    }

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