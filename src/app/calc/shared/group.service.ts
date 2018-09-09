import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from './Group.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>('./assets/dataset/groups.json');
  }
}
