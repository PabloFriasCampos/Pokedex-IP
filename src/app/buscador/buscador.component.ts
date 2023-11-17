import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';


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

export class BuscadorComponent {

  constructor(private http: HttpClient) {
    this.listaColores = this.http.get('assets/pokemon-colors.json').subscribe((data: any) => {
      this.listaColores = data;

    });
  }

  listaColores: any;

  @Output()
  textFilterEvent = new EventEmitter();
  @Output()
  typeFilterEvent = new EventEmitter();
  @Output()
  genFilterEvent = new EventEmitter();

  textFilter: string = '';

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
    { gen: 1, isChecked: true },
    { gen: 2, isChecked: false },
    { gen: 3, isChecked: false },
    { gen: 4, isChecked: false }
  ];

  enviaTexto() {
    this.textFilterEvent.emit({ textFilter: this.textFilter });

  }

  enviaTipos() {
    this.typeFilterEvent.emit({ typesSelected: this.typesSelected.filter(t => t.isChecked).map(t => t.name) });

  }

  enviaGen() {
    this.genFilterEvent.emit({ genSelected: this.gensSelected.filter(g => g.isChecked).map(g => g.gen) });

  }

}