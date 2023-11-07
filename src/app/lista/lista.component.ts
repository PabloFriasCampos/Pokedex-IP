import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {


  constructor(private http: HttpClient) {
    this.listaColores = this.http.get('assets/pokemon-colors.json').subscribe((data: any) => {
      this.listaColores = data;

    });
  }

  @Input()
  listaMostrada: Pokemon[] = [];

  listaColores: any;

  hover: boolean = false;

}
