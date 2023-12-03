import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    const language = localStorage.getItem('language');

    if (!language) {
      localStorage.setItem('language', 'en');
    }

  }

}
