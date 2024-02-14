import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { EventManagerService } from './services/event-manager.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PokemonService } from './services/pokemon.service';
import { CreditsComponent } from './components/credits/credits.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonTypeTagPipe } from './pokemon-type-tag.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { httpInterceptorProviders } from './interceptors/httpInterceptorProvider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    SearchBarComponent,
    CreditsComponent,
    HomeComponent,
    PokemonTypeTagPipe,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    EventManagerService,
    PokemonService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
