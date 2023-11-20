import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './lista/lista.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { VistaListaFiltrosComponent } from './vista-lista-filtros/vista-lista-filtros.component';
import { VistaPokemonComponent } from './vista-pokemon/vista-pokemon.component';
import { PokemonDataComponent } from './pokemon-data/pokemon-data.component';
import { AttacksReceivedComponent } from './attacks-received/attacks-received.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    BuscadorComponent,
    VistaListaFiltrosComponent,
    VistaPokemonComponent,
    PokemonDataComponent,
    AttacksReceivedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
