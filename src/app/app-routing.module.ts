import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaListaFiltrosComponent } from './vista-lista-filtros/vista-lista-filtros.component';
import { VistaPokemonComponent } from './vista-pokemon/vista-pokemon.component';

const routes: Routes = [
  { path: 'pokemonList', component: VistaListaFiltrosComponent },
  { path: 'pokemon/:nPokedex', component: VistaPokemonComponent },
  { path: '', redirectTo: '/pokemonList', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
