import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit {
  teams: any[] = [];
  newTeam: any = { pokemon1: null, pokemon2: null, pokemon3: null, pokemon4: null, pokemon5: null, pokemon6: null };

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe(data => {
      this.teams = data;
    });
  }

  addTeam(): void {
    this.teamService.insertTeam(this.newTeam).subscribe(() => {
      alert('Team added successfully!');
      this.loadTeams();
    });
  }
}
