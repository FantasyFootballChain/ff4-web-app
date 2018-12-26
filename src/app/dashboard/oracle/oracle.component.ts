import { Component, OnInit } from '@angular/core';

import { BlockchainService } from '../../shared';

@Component({
	selector: 'app-oracle',
	templateUrl: './oracle.component.html',
	styleUrls: ['./oracle.component.css']
})
export class OracleComponent implements OnInit {

	squadIndexToMarkLose = null;
	squadIndexToMarkValid = null;
	squadIndexToMarkWin = null;

	constructor(
		public blockchainService: BlockchainService
	) {}

	ngOnInit() {
	}

	/**
	 * Marks squad as lose
	 */
	markLose() {
		this.blockchainService.autoMarkLose(this.squadIndexToMarkLose).subscribe();
	}

	/**
	 * Marks squad as valid
	 */
	markValid() {
		this.blockchainService.autoMarkValid(this.squadIndexToMarkValid).subscribe();
	}

	/**
	 * Marks squad as win
	 */
	markWin() {
		this.blockchainService.autoMarkWin(this.squadIndexToMarkWin).subscribe();
	}

}
