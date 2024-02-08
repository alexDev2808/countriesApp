import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Output()
  public onValue : EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder : string = '';

  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    
   this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime( 1000 )
      )
      .subscribe( value => {
        this.onDebounce.emit( value )
      })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  emitInput( inputValue : string ) {
    this.onValue.emit( inputValue )
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm )
  }

}
