import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/api/pokemons';

  constructor(private http: HttpClient) {}

  getAllPokemons(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getPokemonById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getPokemonsByIds(ids: number[]): Observable<Pokemon[]> {
    const requests = ids.map(id => this.http.get<Pokemon>(`${this.apiUrl}/${id}`));
    return forkJoin(requests);
  }

  updatePokemon(pokemon: Pokemon): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pokemon.id}`, pokemon);
  }
}
