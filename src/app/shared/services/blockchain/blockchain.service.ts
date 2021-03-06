import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { forkJoin, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment as env } from '../../../../environments/environment';
import { Web3Service } from '../web3/web3.service';

@Injectable({
	providedIn: 'root'
})
export class BlockchainService {

	// squad state constants
	SQUAD_STATE_WIN = 11;

	@Output() init: EventEmitter<any> = new EventEmitter();

	contractAbis: any;
	fantasyFootballChainContract: any;
	isInitialized = false;

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
		let networkName = null;
		this.web3Service.getNetworkName().pipe(
			switchMap((name) => {
				networkName = name;
				return forkJoin(
					this.http.get('assets/contracts/FantasyFootballChain.json')
				);
			})
		).subscribe(
			data => {
				this.contractAbis = data;
				const contractAddress = env.fantasyFoootballChainAddress[networkName];
				this.fantasyFootballChainContract = this.web3Service.getContract(this.contractAbis[0].abi, contractAddress);
				this.init.emit();
				this.isInitialized = true;
			}
		);
	}

	//====================
	// Contract properties
	//====================

	/**
	 * Returns oracle address
	 */
	oracleAddress(): any {
		return this.fantasyFootballChainContract.methods.oracleAddress().call();
	}

	//===============
	// Oracle methods
	//===============

	/**
	 * Marks squad as lose
	 * @param squadIndex 
	 */
	autoMarkLose(squadIndex): any {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				return this.fantasyFootballChainContract.methods.autoMarkLose(squadIndex).send({from: accounts[0]});
			})
		);
	}

	/**
	 * Marks squad as valid
	 * @param squadIndex 
	 */
	autoMarkValid(squadIndex): any {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				return this.fantasyFootballChainContract.methods.autoMarkValid(squadIndex).send({from: accounts[0]});
			})
		);
	}

	/**
	 * Marks squad as win
	 * @param squadIndex 
	 */
	autoMarkWin(squadIndex): any {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				return this.fantasyFootballChainContract.methods.autoMarkWin(squadIndex).send({from: accounts[0]});
			})
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

	/**
	 * Returns squad indexes for user in particular season and league
	 * @param seasonId 
	 * @param leagueId 
	 */
	getUserSquadIndexes(seasonId, leagueId): any {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				return this.fantasyFootballChainContract.methods.getUserSquadIndexes(accounts[0], seasonId, leagueId).call({from: accounts[0]});
			})
		);
	}

	/**
	 * Withdraws win sum
	 * @param squadIndex 
	 */
	withdrawWinSum(squadIndex): any {
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				return this.fantasyFootballChainContract.methods.withdrawWinSum(squadIndex).send({from: accounts[0]});
			})
		);
	}

	//===============
	// Helper methods
	//===============

	/**
	 * Returns squad info by index
	 * @param index 
	 */
	getSquadInfo(index): any {
		return forkJoin(
			this.fantasyFootballChainContract.methods.getSquadFinanceInfo(index).call(),
			this.fantasyFootballChainContract.methods.getSquadPlayersInfo(index).call(),
			this.fantasyFootballChainContract.methods.getSquadSystemInfo(index).call(),
			this.fantasyFootballChainContract.methods.getSquadTimeInfo(index).call()
		).pipe(switchMap(data => {
			let squadInfo = {
				index: index,
				stake: data[0][0],
				winSumInWei: data[0][1],
				platformFeeInWei: data[0][2],
				captainId: data[1][0],
				playerIds: data[1][1],
				benchPlayerIds: data[1][2],
				seasonId: data[2][0],
				leagueId: data[2][1],
				roundId: data[2][2],
				userAddress: data[2][3],
				state: data[2][4],
				initialized: data[2][5],
				createdAt: data[3][0],
				lastUpdatedAt: data[3][1]
			};
			return of(squadInfo);
		}));
	}

	/**
	 * Checks whether current account is oracle
	 */
	isOracle(): any {
		let currentAccount = null;
		return this.web3Service.getAccounts().pipe(
			switchMap(accounts => {
				currentAccount = accounts[0];
				return this.oracleAddress();
			}),
			switchMap(oracleAddress => {
				return oracleAddress == currentAccount ? of(true) : of(false);
			})
		);
	}

}
