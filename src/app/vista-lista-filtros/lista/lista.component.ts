import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../model/pokemon';
import { HttpClient } from '@angular/common/http';
import * as jsonColores from '../../../assets/json/pokemon-colors.json';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input()
  listaMostrada: Pokemon[] = [];

  listaColores: any = jsonColores;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    window.addEventListener('scroll', () => {
      const flecha = document.getElementById('goTop');
      if (window.scrollY > 500) {
        if (flecha) {
          flecha.style.visibility = 'visible'

        }

      }

      if (window.scrollY < 500) {
        if (flecha) {
          flecha.style.visibility = 'hidden'

        }

      }

    })

    document.body.style.setProperty('--type-color', 'rgb(47, 45, 45)');
  }

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

}
