import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FootballDataService } from '../../shared';

@Component({
	selector: 'app-squad-builder',
	templateUrl: './squad-builder.component.html',
	styleUrls: ['./squad-builder.component.css']
})
export class SquadBuilderComponent implements OnInit {

	leagueId: number;
	players = [];

	constructor(
		public activatedRoute: ActivatedRoute,
		public footballDataService: FootballDataService
	) {}

	ngOnInit() {

		this.activatedRoute.params.subscribe(params => {
			this.leagueId = params['league_id'];
		});

		this.footballDataService.players(this.leagueId).subscribe(
			players => {
				this.players = players;
				console.log(players);
			}
		);
	}

	/**
	 * Adds player to squad
	 */
	addPlayerToSquad(player) {
		console.log(player);
	}

}
