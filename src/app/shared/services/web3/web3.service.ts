import { Injectable } from '@angular/core';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

@Injectable({
  	providedIn: 'root'
})
export class Web3Service {

	constructor() {}
	  
	/**
	 * Converts value from wei to ether
	 * @param value 
	 * @param unit 
	 */
	fromWei(value, unit) {
		return web3.utils.fromWei(value, unit);
	}

	/**
	 * Converts value to unit
	 * @param value 
	 * @param unit 
	 */
	toWei(value, unit) {
		return web3.utils.toWei(value, unit);
	}

}
