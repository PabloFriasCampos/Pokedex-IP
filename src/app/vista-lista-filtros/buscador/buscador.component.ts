import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as jsonColores from '../../../assets/json/pokemon-colors.json';


type Tipos = {
  name: string,
  isChecked: boolean
}

type Gens = {
  gen: number,
  isChecked: boolean
}

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})

export class BuscadorComponent implements OnInit {

  listaColores: any = jsonColores;

  @Output()
  textFilterEvent = new EventEmitter();
  @Output()
  typeFilterEvent = new EventEmitter();
  @Output()
  genFilterEvent = new EventEmitter();

  textFilter: string = '';

  show: boolean = false;

  typesSelected: Tipos[] = [
    { name: 'normal', isChecked: false },
    { name: 'fire', isChecked: false },
    { name: 'water', isChecked: false },
    { name: 'grass', isChecked: false },
    { name: 'electric', isChecked: false },
    { name: 'ice', isChecked: false },
    { name: 'fighting', isChecked: false },
    { name: 'poison', isChecked: false },
    { name: 'ground', isChecked: false },
    { name: 'flying', isChecked: false },
    { name: 'psychic', isChecked: false },
    { name: 'bug', isChecked: false },
    { name: 'rock', isChecked: false },
    { name: 'ghost', isChecked: false },
    { name: 'dragon', isChecked: false },
    { name: 'dark', isChecked: false },
    { name: 'steel', isChecked: false },
    { name: 'fairy', isChecked: false }
  ];

  gensSelected: Gens[] = [
    { gen: 1, isChecked: false },
    { gen: 2, isChecked: false },
    { gen: 3, isChecked: false },
    { gen: 4, isChecked: false }
  ];


  ngOnInit(): void {
    this.showBuscador()
  }


  showBuscador() {
    let buscador = document.getElementById('buscador');
    if (buscador) {
      buscador.style.backgroundImage = 'url("assets/buscadorBackground.png")';
    }
  }

  enviaTexto() {
    this.textFilterEvent.emit({ textFilter: this.textFilter });

  }

  enviaTipos() {
    this.typeFilterEvent.emit({ typesSelected: this.typesSelected.filter(t => t.isChecked).map(t => t.name) });

  }

  enviaGen() {
    this.genFilterEvent.emit({ genSelected: this.gensSelected.filter(g => g.isChecked).map(g => g.gen) });

  }

  showFilters() {
    const gens = document.getElementById('gen-selection');
    const types = document.getElementById('type-selection');

    if (gens && types) {
      if (this.show) {
        gens.style.display = 'none';
        types.style.display = 'none';

      } else {
        gens.style.display = 'grid';
        types.style.display = 'grid';

      }

    }

    this.show = !this.show;

  }

}