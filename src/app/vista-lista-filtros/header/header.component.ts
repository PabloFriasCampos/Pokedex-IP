import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private translation: TranslationService) { }

  switchLanguage() {
    if (this.translation.getLanguage() == 'es') {
      this.translation.switchLanguage('en');
      localStorage.setItem('language', 'en')
      window.location.reload()

    } else {
      this.translation.switchLanguage('es');
      localStorage.setItem('language', 'es')
      window.location.reload()

    }

  }

}
