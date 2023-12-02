import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  imagen: string = "../../../assets/languages/" + localStorage.getItem('language') + ".png"

  constructor(private translation: TranslationService) { }

  switchLanguage() {
    if (this.translation.getLanguage() == 'es') {
      this.translation.switchLanguage('en');
      localStorage.setItem('language', 'en')
      this.imagen = this.imagen.replace('es', 'en')
      window.location.reload()

    } else {
      this.translation.switchLanguage('es');
      localStorage.setItem('language', 'es')
      this.imagen = this.imagen.replace('en', 'es')
      window.location.reload()

    }

  }

}
