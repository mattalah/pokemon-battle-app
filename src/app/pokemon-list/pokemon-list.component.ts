import { Component, inject } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  pokemons: Pokemon[] =  [
    {
      id: 1,
      name: 'Pikachu',
      image: 'https://example.com/pikachu.png',
      type: 1,
      power: 55,
      life: 35,
    },
    {
      id: 2,
      name: 'Charmander',
      image: 'https://example.com/charmander.png',
      type: 1,
      power: 52,
      life: 39,
    },
    // Add more Pokémon as needed
  ];


  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe(data => {
      this.pokemons = data;
    });
  }

}
