import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa' | 'Americas'| 'Asia'| 'Europe'| 'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading = false;

  constructor( private countriesService: CountriesService ) { }

  searchByRegion( region : Region ) {

    this.selectedRegion = region;
    this.isLoading = true;

    this.countriesService.searchByRegion( region )
      .subscribe(countries => {
        this.countries = countries
        this.isLoading = false;
      })
  }

}
