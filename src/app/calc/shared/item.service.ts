import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor() {}

  getItems(): Observable<Item[]> {
    return of([
      {
        id: 'test',
        name: 'test item',
        iconUrl: 'https://wiki.factorio.com/images/Factorio-icon.png'
      }
    ] as Item[]);
  }
}
