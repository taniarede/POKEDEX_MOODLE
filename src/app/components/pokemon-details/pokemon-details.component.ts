import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { EventManagerService } from '../../services/event-manager.service';
import { Subscription, of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  pokemonName!: string;
  pokemon!: Pokemon;
  private pokemonSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getPokemonDetails(' ');
  }

  //}  ngOnInit(): void {
  //  this.pokemonSubscription = this.route.paramMap.pipe(
  //    switchMap((params: ParamMap): Observable<Pokemon | null> => {
  //      const name = params.get('name');
  //      if (name) {
  //        this.pokemonName = name;
  //        return this.pokemonService.getPokemonByName(name);
  //      } else {
  //        console.error('No name parameter found in the route.');
  //        // Return an observable that emits null or a default Pokemon object
  //        return of<Pokemon | null>(null);
  //      }
  //    })
  //  ).subscribe((pokemon: Pokemon | null) => {
  //    if (pokemon) {
  //      this.pokemon = pokemon;
  //    }
  //  });
  //}

  getPokemonDetails(name: string): void {
    this.pokemonService.getPokemonByName(name)
      .subscribe((pokemon: Pokemon) => {
        this.pokemon = pokemon;
      });
  }

  ngOnDestroy(): void {
    if (this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }
}
