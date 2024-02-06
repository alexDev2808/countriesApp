import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @Output()
  public onValue : EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder : string = '';

  emitInput( inputValue : string ) {
    this.onValue.emit( inputValue )
  }

}
