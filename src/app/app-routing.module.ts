import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { TeamManagementComponent } from './team-management/team-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' }, // Default route
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent }, // Route for Pokémon detail
  { path: 'teams', component: TeamManagementComponent },
  { path: '**', redirectTo: '/pokemons' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
