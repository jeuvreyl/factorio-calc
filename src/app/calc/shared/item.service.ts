import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('./assets/dataset/items.json');
  }
}
