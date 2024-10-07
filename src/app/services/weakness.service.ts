import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weakness } from '../models/weakness.model';

@Injectable({
  providedIn: 'root'
})
export class WeaknessService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllWeaknesses(): Observable<Weakness[]> {
    return this.http.get<Weakness[]>(this.apiUrl);
  }
}
