import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css'],
})
export class TeamManagementComponent implements OnInit {
  teams: any[] = [];
  newTeam: any = {
    pokemon1: null,
    pokemon2: null,
    pokemon3: null,
    pokemon4: null,
    pokemon5: null,
    pokemon6: null,
  };
  pokemons: Pokemon[] = [];

  constructor(
    private teamService: TeamService,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.loadTeams();
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe((data) => {
      this.pokemons = data;
    });
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe((data: Team[]) => {
      this.teams = data.map((team: any) => {
        const {id, ...rest} = team;
        team.total_power = this.calculateTeamPower(rest);
        return team;
      });
    });
  }

  addTeam(): void {
    this.teamService.insertTeam(this.newTeam).subscribe(() => {
      alert('Team added successfully!');
      this.loadTeams();
    });
  }

  calculateTeamPower(team: Team): number {
    const pokemonIds = [
      team.pokemon1,
      team.pokemon2,
      team.pokemon3,
      team.pokemon4,
      team.pokemon5,
      team.pokemon6,
    ];
  
    return pokemonIds.reduce((totalPower, pokemonId) => {
      const pokemon = this.pokemons.find((p) => p.id === pokemonId);
      return totalPower + (pokemon ? pokemon.power : 0);
    }, 0);
  }
}
