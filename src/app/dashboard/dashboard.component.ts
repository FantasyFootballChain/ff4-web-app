import { Component, OnInit } from '@angular/core';

import { BlockchainService, Web3Service } from '../shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(
		public blockchainService: BlockchainService,
		public web3Service: Web3Service
	) {}

	ngOnInit() {
		this.checkConnection();
	}

	checkConnection() {
		this.web3Service.getConnectionError().subscribe(error => {
			if(error == this.web3Service.CONNECTION_NO_PROVIDER) alert("Please install Metamask");
			if(error == this.web3Service.CONNECTION_NOT_LOGGED_IN) alert("Please login into your Metamask account");
		})
	}

}
