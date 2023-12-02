import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // Verificar si la clave "language" existe en el localStorage
    const language = localStorage.getItem('language');

    // Si no existe, establecerla en "en"
    if (!language) {
      localStorage.setItem('language', 'en');
    }

  }

}
