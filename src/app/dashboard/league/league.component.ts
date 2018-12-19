import { Component, OnInit } from '@angular/core';

import { FootballDataService } from '../../shared';

@Component({
	selector: 'app-league',
	templateUrl: './league.component.html',
	styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

	leagues: any = [];

	constructor(
		public footballDataService: FootballDataService
	) {}

	ngOnInit() {
		this.footballDataService.leagues().subscribe(
			leagues => {
				this.leagues = leagues;
			}
		);
	}

	/**
	 * Creates a new squad
	 */
	createSquad(league) {
		console.log('create squad');
		console.log(league);
	}

}
