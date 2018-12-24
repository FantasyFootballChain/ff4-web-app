import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment as env } from '../../../../environments/environment';
import { Web3Service } from '../web3/web3.service';

@Injectable({
	providedIn: 'root'
})
export class BlockchainService {

	contractAbis: any;
	fantasyFootballChainContract: any;

	constructor(
		public http: HttpClient,
		public web3Service: Web3Service
	) {
		this.initContracts();
	}

	/**
	 * Initializes contracts
	 */
	initContracts() {
		forkJoin(
			this.http.get('assets/contracts/FantasyFootballChain.json')
		).subscribe(
			data => {
				this.contractAbis = data;
				const contractAddress = env.production ? env.fantasyFoootballChainAddress.kovan : env.fantasyFoootballChainAddress.development;
				this.fantasyFootballChainContract = this.web3Service.getContract(this.contractAbis[0].abi, contractAddress);
			}
		);
	}

	//=============
	// User methods
	//=============

	/**
	 * Creates and funds new squad
	 * @param seasonId 
	 * @param leagueId 
	 * @param roundId 
	 * @param playerIds 
	 * @param benchPlayerIds 
	 * @param captainId 
	 * @param valueInWei 
	 */
	createAndFundSquad(seasonId, leagueId, roundId, playerIds = [], benchPlayerIds = [], captainId, valueInWei): any {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				return this.fantasyFootballChainContract.methods.createAndFundSquad(seasonId, leagueId, roundId, playerIds, benchPlayerIds, captainId).send({from: accounts[0], value: valueInWei});
			})
		);
	}

}
