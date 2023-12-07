import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  light: boolean = false;

  imagenLight: string = "../../../assets/items/light.png";
  imagenDark: string = "../../../assets/items/dark.png"
  imagen: string = "";

  constructor(private translation: TranslationService) {
    if (localStorage.getItem('language')) {
      this.imagen = "../../../assets/languages/" + localStorage.getItem('language') + ".png"

    } else {
      this.imagen = "../../../assets/languages/en.png"

    }

    if (localStorage.getItem('theme') == 'light' && !document.body.classList.contains('light-theme')) {
      this.light = true;
      document.body.classList.toggle('light-theme');

    }

  }

  switchLanguage() {
    if (this.translation.getLanguage() == 'es') {
      this.translation.switchLanguage('en');
      localStorage.setItem('language', 'en');
      window.location.reload();

    } else {
      this.translation.switchLanguage('es');
      localStorage.setItem('language', 'es');
      window.location.reload();

    }

  }

  toggleLightTheme() {
    document.body.classList.toggle('light-theme');
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
      this.light = !this.light;
    } else {
      localStorage.setItem('theme', 'dark');
      this.light = !this.light;
    }

  }

}
