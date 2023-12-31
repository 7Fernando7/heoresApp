import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor( private heroService: HeroesService) {}

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroService.getSuggestions( value )
    .subscribe( heroes => this.heroes = heroes );
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent ): void {
    if( !event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;
  }

}
