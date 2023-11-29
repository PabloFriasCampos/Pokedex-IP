import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './vista-lista-filtros/lista/lista.component';
import { BuscadorComponent } from './vista-lista-filtros/buscador/buscador.component';
import { VistaListaFiltrosComponent } from './vista-lista-filtros/vista-lista-filtros.component';
import { VistaPokemonComponent } from './vista-pokemon/vista-pokemon.component';
import { PokemonDataComponent } from './vista-pokemon/pokemon-data/pokemon-data.component';
import { AttacksReceivedComponent } from './vista-pokemon/attacks-received/attacks-received.component';
import { NgChartsModule } from 'ng2-charts';
import { StatsComponent } from './vista-pokemon/stats/stats.component';
import { EvolutionChainComponent } from './vista-pokemon/evolution-chain/evolution-chain.component';
import { HeaderComponent } from './vista-lista-filtros/header/header.component';
import { FooterComponent } from './vista-lista-filtros/footer/footer.component';
import { MovementsComponent } from './vista-pokemon/movements/movements.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    BuscadorComponent,
    VistaListaFiltrosComponent,
    VistaPokemonComponent,
    PokemonDataComponent,
    AttacksReceivedComponent,
    StatsComponent,
    EvolutionChainComponent,
    HeaderComponent,
    FooterComponent,
    MovementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
