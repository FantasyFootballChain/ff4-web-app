import { Component, OnInit } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { BlockchainService, FootballDataService, Web3Service } from '../../shared/services';

@Component({
	selector: 'app-finance',
	templateUrl: './finance.component.html',
	styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

	squads = [];

	constructor(
		public blockchainService: BlockchainService,
		public footballDataService: FootballDataService,
		public web3Service: Web3Service
	) {}

	ngOnInit() {
		let sub;
		if(this.blockchainService.isInitialized) {
			sub = this.footballDataService.leagues();
		} else {
			sub = this.blockchainService.init.pipe(
				switchMap(() => this.footballDataService.leagues())
			)
		}
		sub.pipe(
			switchMap((leagues: any) => {
				let requests = [];
				leagues.map(league => { requests.push(this.blockchainService.getUserSquadIndexes(league.season_id, league.id)); });
				return forkJoin(requests);
			}),
			switchMap((data: any) => {
				let requests = [];
				// for all leagues
				for(let i = 0; i < data.length; i++) {
					// for all squads
					for(let j = 0; j < data[i].length; j++) {
						requests.push(this.blockchainService.getSquadInfo(data[i][j]));
					}
				}
				return forkJoin(requests);
			})
		).subscribe(squads => {
			this.squads = squads;
		});
	}

	/**
	 * Withdraws win sum to user
	 */
	withdraw(squad) {
		this.blockchainService.withdrawWinSum(squad.index).subscribe();
	}

}
