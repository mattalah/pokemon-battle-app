import { Component, inject, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {

  @Input() pokemon: any;

  constructor(private pokemonService:PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPokemonById();
  }

  private getPokemonById(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.pokemonService.getPokemonById(id).subscribe(pokemon => {
        this.pokemon = pokemon;
      });
    }
  }

  updatePokemon(): void {
    this.pokemonService.updatePokemon(this.pokemon).subscribe(() => {
      alert('Pokémon updated successfully!');
    });
  }
}
