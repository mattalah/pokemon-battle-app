import { Component, inject, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {

  @Input() pokemon: any;

  constructor(private pokemonService:PokemonService) {}

  updatePokemon(): void {
    this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
      alert('Pokémon updated successfully!');
    });
  }
}
