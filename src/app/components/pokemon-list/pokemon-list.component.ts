import { Component, OnDestroy } from '@angular/core';
import { Pokemon } from '../../pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { EventManagerService } from '../../services/event-manager.service';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
import { PokemonDetailsComponent } from './../../components/pokemon-details/pokemon-details.component';


//import { PokemonTypeTagPipe } from './pokemon-type-tag.pipe';




@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})


export class PokemonListComponent{
  pokemons: Pokemon[] = [];
  totalPokemons!: number;
  private searchSubscription: Subscription | undefined;
  page!: number;
 

  constructor(
    private eventManager: EventManagerService,
    private pokemonService: PokemonService,
    private router: Router )
    {
    this.searchSubscription = eventManager.searchEvent.subscribe(this.filterSearch.bind(this));
  }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe(); // Unsubscribe from the search query subscription
    }
  }

  getAllPokemons(): void {
    this.pokemonService.getAllPokemon()
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.totalPokemons = pokemons.length;

        //this.totalPages = Math.ceil(this.totalPokemons / this.itemsPerPage);

        //// Update the list of pokemons to display for the current page
        //this.updateDisplayedPokemons();
      }
    );
  }
  
  showPokemonDetails(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon-details']); // Navigate to details page
  }



  filterSearch(query: string) {
    console.log("Pokemon list received " + query);
    query = query.toLowerCase().trim(); // Convert query to lowercase and trim whitespace

    this.pokemonService.getAllPokemon()
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons.filter(pokemon =>
          pokemon.id.toString() == query || // Filter by ID
          pokemon.name.toLowerCase().includes(query) || // Filter by name
          pokemon.types.some(type => type.toLowerCase().includes(query)) // Filter by type
        );
        this.totalPokemons = this.pokemons.length; // Update totalPokemons count
      });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalPokemons / 20); // Assuming 20 pokemons per page
  }

  get displayedPokemons(): Pokemon[] {
    const startIndex = (this.page - 1) * 20;
    const endIndex = Math.min(startIndex + 20, this.totalPokemons);
    return this.pokemons.slice(startIndex, endIndex);
  }

}
