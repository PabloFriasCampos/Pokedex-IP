import { Component, EventEmitter, Output } from '@angular/core';


type Tipos = {
  name: string,
  isChecked: boolean
}

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})

export class BuscadorComponent {

  @Output()
  textFilterEvent = new EventEmitter();
  @Output()
  typeFilterEvent = new EventEmitter();

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

  enviaTexto() {
    this.textFilterEvent.emit({ textFilter: this.textFilter });
    this.typesSelected.forEach(element => {
      element.isChecked = false;
    });

  }

  enviaTipos() {
    this.typeFilterEvent.emit({ typesSelected: this.typesSelected.filter(t => t.isChecked).map(t => t.name) });
    this.textFilter = '';

  }

}