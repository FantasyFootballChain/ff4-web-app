import { Component, OnInit } from '@angular/core';

import { BlockchainService, Web3Service } from '../shared/services';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	isOracle = false;

	constructor(
		public blockchainService: BlockchainService,
		public web3Service: Web3Service
	) {}

	ngOnInit() {
		this.checkConnection();
		this.checkOracle();
	}

	/**
	 * Checks whether user is logged in into metamask
	 */
	checkConnection() {
		this.web3Service.getConnectionError().subscribe(error => {
			if(error == this.web3Service.CONNECTION_NO_PROVIDER) alert("Please install Metamask");
			if(error == this.web3Service.CONNECTION_NOT_LOGGED_IN) alert("Please login into your Metamask account");
		})
	}

	/**
	 * Checks whether current account is oracle
	 */
	checkOracle() {
		let sub;
		if(this.blockchainService.isInitialized) {
			sub = this.blockchainService.isOracle();
		} else {
			sub = this.blockchainService.init.pipe(switchMap(() => this.blockchainService.isOracle()));
		}
		sub.subscribe(
			isOracle => {
				this.isOracle = isOracle;
			}
		);
	}

}
