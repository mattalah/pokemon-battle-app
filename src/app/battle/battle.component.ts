import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { PokemonService } from '../services/pokemon.service';
import { TeamService } from '../services/team.service';
import { Weakness } from '../models/weakness.model';
import { WeaknessService } from '../services/weakness.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
})
export class BattleComponent implements OnInit {
  team1: any | null = null;
  team2: any | null = null;
  winner: string = '';
  battleLog: string[] = [];
  weaknesses: Weakness[] = [];
  pokemons: Pokemon[] = [];

  constructor(
    private teamService: TeamService,
    private pokemonService: PokemonService,
    private weaknessService: WeaknessService
  ) {}

  ngOnInit(): void {
    this.loadWeaknesses();
    this.loadPokemons();
    this.loadTeams();
  }

  loadWeaknesses(): void {
    this.weaknessService.getAllWeaknesses().subscribe((data: Weakness[]) => {
      this.weaknesses = data;
    });
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe((teams: Team[]) => {
      if (teams.length >= 2) {
        this.team1 = teams[0];
        this.team2 = teams[1];
        this.loadTeamPokemons(this.team1);
        this.loadTeamPokemons(this.team2);
      } else {
        console.error('Not enough teams available for battle.');
      }
    });
  }

  loadTeamPokemons(team: any): void {
    const pokemonIds = [
      team.pokemon1,
      team.pokemon2,
      team.pokemon3,
      team.pokemon4,
      team.pokemon5,
      team.pokemon6,
    ];

    this.pokemonService
      .getPokemonsByIds(pokemonIds)
      .subscribe((pokemonData) => {
        team.pokemons = pokemonData;
        if (this.team1 && this.team2) {
          this.startBattle();
        }
      });
  }

  startBattle(): void {
    const battle = new Battle(
      this.team1,
      this.team2,
      this.weaknesses,
      this.pokemons
    );
    this.battleLog = battle.startBattle(this.logBattle.bind(this));
    this.winner = battle.determineWinner();
  }

  logBattle(message: string): void {
    this.battleLog.push(message);
  }

  loadPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe((data) => {
      this.pokemons = data;
    });
  }
}

class Battle {
  private pokemons: Pokemon[];
  private typeFactors: { [key: string]: { [key: string]: number } } = {};

  constructor(
    private team1: any,
    private team2: any,
    private weaknesses: Weakness[],
    pokemons: Pokemon[]
  ) {
    this.loadTypeFactors();
    this.pokemons = pokemons;
  }

  private loadTypeFactors(): void {
    for (const weakness of this.weaknesses) {
      const type1 = weakness.type1.toString();
      const type2 = weakness.type2.toString();
      this.typeFactors[type1] = this.typeFactors[type1] || {};
      this.typeFactors[type1][type2] = weakness.factor;
    }
  }

  startBattle(log: (message: string) => void): string[] {
    const logs: string[] = [];
    let round = 1;
    let currentPokemon1 = this.getNextPokemon(this.team1);
    let currentPokemon2 = this.getNextPokemon(this.team2);

    while (currentPokemon1 && currentPokemon2) {
      logs.push(`--- Round ${round} ---`);
      logs.push(`${currentPokemon1.name} vs ${currentPokemon2.name}`);

      while (currentPokemon1.life > 0 && currentPokemon2.life > 0) {
        this.battleRound(currentPokemon1, currentPokemon2, logs);
      }

      if (currentPokemon1.life <= 0) {
        logs.push(`${currentPokemon1.name} is defeated!`);
        currentPokemon1 = this.getNextPokemon(this.team1);
      }
      if (currentPokemon2.life <= 0) {
        logs.push(`${currentPokemon2.name} is defeated!`);
        currentPokemon2 = this.getNextPokemon(this.team2);
      }
      round++;
    }

    return logs;
  }

  private battleRound(
    pokemon1: Pokemon,
    pokemon2: Pokemon,
    logs: string[]
  ): void {
    const typeFactor1 = this.typeFactors[pokemon1.type]
      ? this.typeFactors[pokemon1.type][pokemon2.type] || 1
      : 1;
    const typeFactor2 = this.typeFactors[pokemon2.type]
      ? this.typeFactors[pokemon2.type][pokemon1.type] || 1
      : 1;

    pokemon1.life -= pokemon2.power * typeFactor2;
    pokemon2.life -= pokemon1.power * typeFactor1;

    logs.push(`${pokemon1.name} remaining life: ${Math.max(0, pokemon1.life)}`);
    logs.push(`${pokemon2.name} remaining life: ${Math.max(0, pokemon2.life)}`);
  }

  private getNextPokemon(team: Team): Pokemon | null {
    const pokemons = [
      team.pokemon1,
      team.pokemon2,
      team.pokemon3,
      team.pokemon4,
      team.pokemon5,
      team.pokemon6,
    ]
      .map((id) => this.getPokemonById(id))
      .filter((pokemon) => pokemon && pokemon.life > 0);

    return pokemons[0] || null;
  }

  private getPokemonById(id: number): Pokemon | null {
    return this.pokemons.find((pokemon) => pokemon.id === id) || null;
  }

  determineWinner(): string {
    const team1Alive = this.team1.pokemons.some((p: Pokemon) => p.life > 0);
    const team2Alive = this.team2.pokemons.some((p: Pokemon) => p.life > 0);

    if (team1Alive && !team2Alive) {
      return 'Team 1 wins!';
    } else if (!team1Alive && team2Alive) {
      return 'Team 2 wins!';
    } else {
      return "It's a draw!";
    }
  }
}
