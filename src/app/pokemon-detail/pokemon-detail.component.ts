import { Component, inject, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {

  @Input() pokemon: any;

  pokemonService = inject(PokemonService);
  constructor() {}

  updatePokemon(): void {
    this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
      alert('Pokémon updated successfully!');
    });
  }
}
