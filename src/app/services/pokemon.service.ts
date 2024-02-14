import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pokemon } from '../pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonDataURL = 'http://softwium.com/api/pokemons';
  private pokemonPngURL = 'http://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  getAllPokemon(): Observable<Pokemon[]> {
    return this.http.get<any[]>(this.pokemonDataURL).pipe(
      tap(data => console.log('Fetched Pokemon data:', data)),
      map((data: any[]) => data.map(item => this.mapToPokemon(item))),
      catchError(error => {
        console.error('Error fetching Pokemon data:', error);
        throw error;
      })
    );
  }

  mapToPokemon(data: any): Pokemon {
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types,
      image: this.pokemonPngURL + data.id + ".png"
    };
  }
   

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.pokemonDataURL}/${name}`).pipe(
      map((data: any) => this.mapToPokemon(data)),
      catchError(error => {
        console.error(`Error fetching Pokemon by name "${name}":`, error);
        return throwError(error);
      })
    );
  }

}
