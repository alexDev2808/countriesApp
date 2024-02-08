import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiURL: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore =  {
        byCapital: { term : '', countries: [] },
        byCountries: { term : '', countries: [] },
        byRegion: { region : '', countries: [] },
    }

    constructor( private httpClient: HttpClient ) { }

    private getCountriesRequest( url : string ) : Observable<Country[]> {
        return this.httpClient.get<Country[]>( url )
            .pipe(
                catchError( () => of([])),
                delay( 2000 ),
            )
    }

    searchCountryByAlphaCode( code: string ) : Observable<Country | null> {
        const url = `${ this.apiURL }/alpha/${ code }`;
        
        return this.httpClient.get<Country[]>( url )
            .pipe(
                map( countries => countries.length > 0 ? countries[0] : null ),
                catchError( error => of(null))
            )
    }

    searchCapital( term: string ) : Observable<Country[]> {
        const url = `${ this.apiURL }/capital/${ term }`;
        
        return this.getCountriesRequest( url )
            .pipe(
                tap( countries => this.cacheStore.byCapital = { term, countries } )
            )
    }

    searchByCountry( term : string ) : Observable<Country[]> {
        const url = `${ this.apiURL }/name/${ term }`

        return this.getCountriesRequest( url )
            .pipe(
                tap( countries => this.cacheStore.byCountries = { term, countries } )
            )
    }

    searchByRegion( region : Region ) : Observable<Country[]> {
        const url = `${ this.apiURL }/region/${ region }`

        return this.getCountriesRequest( url )
            .pipe(
                tap( countries => this.cacheStore.byRegion = { region, countries } )
            )
    }
    
}