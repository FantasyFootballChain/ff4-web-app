import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FootballDataService {

	PLAYER_POSITION_GOALKEEPER = 1;
	PLAYER_POSITION_DEFENDER = 2;
	PLAYER_POSITION_MIDFIELDER = 3;
	PLAYER_POSITION_ATTACKER = 4;

	constructor(
		public http: HttpClient
	) {}
	  
	/**
	 * Returns all available leagues
	 */
	leagues(): Observable<any> {
		return this.http.get(`${env.apiUrl}/leagues`);
	}

	/**
	 * Returns all players by league id
	 */
	players(leagueId): Observable<any> {
		return this.http.get(`${env.apiUrl}/players`, {params: {league_id: leagueId}});
	}

}
