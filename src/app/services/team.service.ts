import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams`);
  }

  getTeamById(teamId: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${teamId}`);
  }
  
  insertTeam(team: Team): Observable<any> {
    return this.http.post(`${this.apiUrl}/teams`, team);
  }
}
