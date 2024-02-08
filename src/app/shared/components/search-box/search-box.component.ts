import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>();

  @Output()
  public onValue : EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder : string = '';

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime( 1000 )
      )
      .subscribe( value => {
        this.onDebounce.emit( value )
      })
  }

  emitInput( inputValue : string ) {
    this.onValue.emit( inputValue )
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm )
  }

}
