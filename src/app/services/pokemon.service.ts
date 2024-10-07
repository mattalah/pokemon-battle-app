import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemons`);
  }

  updatePokemon(pokemon: Pokemon): Observable<any> {
    return this.http.put(`${this.apiUrl}/pokemons/${pokemon.id}`, pokemon);
  }
}
