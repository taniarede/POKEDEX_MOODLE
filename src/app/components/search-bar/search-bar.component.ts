import { Component } from '@angular/core';
import { EventEmitter, Injectable } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { EventManagerService } from '../../services/event-manager.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent {
  query: string = ''; // Initialize query property

  constructor(
    private eventManagerService: EventManagerService
  ) { }

  onSearch(): void {
    console.log("Searchbar query:" + this.query);
    this.eventManagerService.searchEvent.emit(this.query);
  }

  }
