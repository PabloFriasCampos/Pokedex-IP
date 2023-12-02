import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translation: TranslationService) { }

  transform(key: string): string {
    return this.translation.getTranslation(key);
  }

}
