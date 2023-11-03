import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  @Output()
  textFilterEvent = new EventEmitter();

  textFilter: string = '';

  enviaTexto() {
    this.textFilterEvent.emit({ textFilter: this.textFilter });

  }

}