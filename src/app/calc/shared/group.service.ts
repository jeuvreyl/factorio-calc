import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from './Group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor() {}

  getGroups(): Observable<Group[]> {
    return of([
      {
        name: 'test',
        iconUrl: 'https://wiki.factorio.com/images/Factorio-icon.png',
        subGroups: ['test']
      } as Group
    ]);
  }
}
