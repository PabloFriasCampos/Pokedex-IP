import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../model/pokemon';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.listaColores = this.http.get('assets/json/pokemon-colors.json').subscribe((data: any) => {
      this.listaColores = data;

    });

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

  @Input()
  listaMostrada: Pokemon[] = [];

  listaColores: any;

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

}
