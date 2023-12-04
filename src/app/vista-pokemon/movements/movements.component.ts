import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Movements } from 'src/app/model/movements';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import * as jsonColores from '../../../assets/json/pokemon-colors.json';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnChanges {

  @Input()
  nPokedex: number = 0;

  moves: Movements = new Movements;

  listaColores: any = jsonColores;

  constructor(private pokeApi: PokeapiService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.nPokedex != 0) {
      this.pokeApi.getMovements(this.nPokedex).subscribe((data: Movements) => {
        this.moves = data;

      })
    }

  }

}
