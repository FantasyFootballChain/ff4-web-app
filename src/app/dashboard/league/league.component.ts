import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FootballDataService } from '../../shared';

@Component({
	selector: 'app-league',
	templateUrl: './league.component.html',
	styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

	leagues: any = [];

	constructor(
		public footballDataService: FootballDataService,
		public router: Router
	) {}

	ngOnInit() {
		this.footballDataService.leagues().subscribe(
			leagues => {
				this.leagues = leagues;
			}
		);
	}

	/**
	 * Redirect to squad builder
	 */
	openSquadBuilder(league) {
		this.router.navigate([`/dashboard/squad-builder/${league.season_id}/${league.id}`]);
	}

}
