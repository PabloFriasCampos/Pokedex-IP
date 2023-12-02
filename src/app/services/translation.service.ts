import { Injectable } from '@angular/core';
import * as jsonTranslations from '../../assets/json/translation.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  translations: any = jsonTranslations;

  private language: string = localStorage.getItem('language') || 'en'

  constructor() { }

  getLanguage(): string {
    return this.language;
  }

  switchLanguage(lang: string) {
    this.language = lang
  }

  getTranslation(key: string): string {
    return this.translations[this.language][key] || key;
  }

}
