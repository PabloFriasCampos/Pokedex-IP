import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { Evolution } from '../../model/evolution';
import * as jsonColores from '../../../assets/json/pokemon-colors.json';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.css']
})

export class EvolutionChainComponent implements OnChanges {

  @Input()
  nPokedex: number = 0;
  @Input()
  type: string = ''

  listaColores: any = jsonColores;

  chain: Evolution = new Evolution;

  url: string = '';

  constructor(
    private pokeApi: PokeapiService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.nPokedex != 0) {
      this.pokeApi.getEvolutionChainUrl(this.nPokedex).subscribe((data: string) => {
        this.url = data;

        this.pokeApi.getEvolutionChain(this.url).subscribe((data: Evolution) => {
          this.chain = data;
        })

      })
    }
  }

}
