import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FootballDataService, Web3Service } from '../../shared';

@Component({
	selector: 'app-squad-builder',
	templateUrl: './squad-builder.component.html',
	styleUrls: ['./squad-builder.component.css']
})
export class SquadBuilderComponent implements OnInit {

	availablePlayers = [];
	benchPlayers = [];
	captainId: number;
	leagueId: number;
	mainSquadPlayers = [];
	seasonId: number;
	stakeInEth = 0;
	teamPrice = 0;

	emptyPlayer = {
		id: null,
		full_name: '',
		photo_url: 'assets/images/misc/no_photo.png',
		price: null
	};

	constructor(
		public activatedRoute: ActivatedRoute,
		public footballDataService: FootballDataService,
		public web3Service: Web3Service
	) {}

	ngOnInit() {

		this.activatedRoute.params.subscribe(params => {
			this.seasonId = params['season_id'];
			this.leagueId = params['league_id'];
		});

		this.footballDataService.players(this.leagueId).subscribe(
			availablePlayers => {
				this.availablePlayers = availablePlayers;
			}
		);

		this.initPlayers();
	}

	/**
	 * Adds player to bench
	 */
	addPlayerToBench(index) {
		for(let i = 0; i < 4; i++) {
			if(!this.benchPlayers[i].id) {
				this.benchPlayers[i].id = this.mainSquadPlayers[index].id;
				this.benchPlayers[i].full_name = this.mainSquadPlayers[index].full_name;
				this.benchPlayers[i].photo_url = this.mainSquadPlayers[index].photo_url;
				this.benchPlayers[i].position_id = this.mainSquadPlayers[index].position_id;
				this.benchPlayers[i].price = this.mainSquadPlayers[index].price;
				this.removePlayerFromSquad(index);
				this.teamPrice += this.benchPlayers[i].price;
				break;
			}
		}
	}

	/**
	 * Adds player to squad
	 */
	addPlayerToSquad(player) {
		let added = false;

		let startIndex, endIndex;

		if(player.position_id == this.footballDataService.PLAYER_POSITION_GOALKEEPER) {
			startIndex = 0;
			endIndex = 1;
		}

		if(player.position_id == this.footballDataService.PLAYER_POSITION_DEFENDER) {
			startIndex = 1;
			endIndex = 5;
		}

		if(player.position_id == this.footballDataService.PLAYER_POSITION_MIDFIELDER) {
			startIndex = 5;
			endIndex = 8;
		}

		if(player.position_id == this.footballDataService.PLAYER_POSITION_ATTACKER) {
			startIndex = 8;
			endIndex = 11;
		}

		let prevIds = [];
		for(let i = startIndex; i < endIndex; i++) {
			if(!this.mainSquadPlayers[i].id && !prevIds.includes(player.id)) {
				this.mainSquadPlayers[i].id = player.id;
				this.mainSquadPlayers[i].full_name = player.full_name;
				this.mainSquadPlayers[i].photo_url = player.photo_url || 'assets/images/misc/no_photo.png';
				this.mainSquadPlayers[i].position_id = player.position_id;
				this.mainSquadPlayers[i].price = player.price;
				added = true;
				this.teamPrice += player.price;
				break;
			}
			prevIds.push(this.mainSquadPlayers[i].id);
		}

		return added;
	}

	/**
	 * Initializes empty arrays of players
	 */
	initPlayers() {
		// init main squad players
		for(let i = 0; i < 11; i++) {
			this.mainSquadPlayers.push({
				id: null,
				full_name: '',
				photo_url: 'assets/images/misc/no_photo.png',
				position_id: null,
				price: null
			});
		}
		// init players on a bench
		for(let i = 0; i < 4; i++) {
			this.benchPlayers.push({
				id: null,
				full_name: '',
				photo_url: 'assets/images/misc/no_photo.png',
				position_id: null,
				price: null
			});
		}
	}

	/**
	 * Moves player from bench to squad
	 */
	movePlayerToSquad(index) {
		if(this.addPlayerToSquad(this.benchPlayers[index])) {
			this.removePlayerFromBench(index);
		}
	}

	/**
	 * Removes player from a bench
	 */
	removePlayerFromBench(index) {
		this.teamPrice -= this.benchPlayers[index].price;

		this.benchPlayers[index].id = null;
		this.benchPlayers[index].full_name = '';
		this.benchPlayers[index].photo_url = 'assets/images/misc/no_photo.png';
		this.benchPlayers[index].position_id = null;
		this.benchPlayers[index].price = null;
	}

	/**
	 * Removes player from squad
	 */
	removePlayerFromSquad(index) {
		this.teamPrice -= this.mainSquadPlayers[index].price;

		this.mainSquadPlayers[index].id = null;
		this.mainSquadPlayers[index].full_name = '';
		this.mainSquadPlayers[index].photo_url = 'assets/images/misc/no_photo.png';
		this.mainSquadPlayers[index].position_id = null;
		this.mainSquadPlayers[index].price = null;
	}

	/**
	 * Saves squad to blockchain
	 */
	saveSquad() {
		let playerIds = [];
		let benchPlayerIds = [];
		this.mainSquadPlayers.map(player => { playerIds.push(player.id) });
		this.benchPlayers.map(player => { benchPlayerIds.push(player.id) });
		const stakeInWei = this.web3Service.toWei(String(this.stakeInEth), "ether");
		const roundId = 1;
		
		console.log(this.seasonId);
		console.log(this.leagueId);
		console.log(roundId);
		console.log(playerIds);
		console.log(benchPlayerIds);
		console.log(this.captainId);
		console.log(stakeInWei);
	}

}
