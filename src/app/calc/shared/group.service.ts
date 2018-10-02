import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from './Group.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroups(): Observable<{[name: string]: Group}> {
    return this.http.get<{[name: string]: Group}>('./assets/dataset/groups.json');
  }
}
