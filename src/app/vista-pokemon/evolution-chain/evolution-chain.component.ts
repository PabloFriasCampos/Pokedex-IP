import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { Evolution } from '../../model/evolution';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.css']
})

export class EvolutionChainComponent implements OnChanges {

  @Input()
  nPokedex: number = 0;
  @Input()
  listaColores: any;

  chain: Evolution = new Evolution;

  url: string = '';

  constructor(
    private pokeApi: PokeapiService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.nPokedex != 0) {
      this.pokeApi.getEvolutionChainUrl(this.nPokedex).subscribe((data: any) => {
        this.url = data;

        this.pokeApi.getEvolutionChain(this.url).subscribe((data: any) => {
          this.chain = data;
        })

      })
    }
  }

}
