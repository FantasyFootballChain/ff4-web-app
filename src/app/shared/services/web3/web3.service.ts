import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

@Injectable({
  	providedIn: 'root'
})
export class Web3Service {

	/**
	 * Connection errors
	 */
	CONNECTION_NO_ERROR = 0;
	CONNECTION_NO_PROVIDER = 1;
	CONNECTION_NOT_LOGGED_IN = 2;

	constructor() {}
	  
	/**
	 * Returns accounts for current user
	 */
	getAccounts(): Observable<string[]> {
		return from(web3.eth.getAccounts());
	}

	/**
	 * Checks that browser is connected to ethereum provider and returns error code
	 */
	getConnectionError(): Observable<number> {
		// check that user has metamask/mist or other provider
		if(!web3.currentProvider) return of(this.CONNECTION_NO_PROVIDER);
		// check that user has accounts available
		return Observable.create((observer) => {
			this.getAccounts().subscribe(
				(accounts) => {
					observer.next(accounts.length > 0 ? this.CONNECTION_NO_ERROR : this.CONNECTION_NOT_LOGGED_IN);
				},
				(err) => { observer.error(err); },
				() => { observer.complete(); }
			);
		});
	}

	/**
	 * Returns a new contract instance
	 * @param abi 
	 * @param address 
	 */
	getContract(abi, address): any {
		return new web3.eth.Contract(abi, address);
	}

	/**
	 * Returns current network name
	 */
	getNetworkName(): Observable<string> {
		return from(web3.eth.net.getId()).pipe(
			switchMap(networkId => {
				let networkName = "development";
				if(networkId == 1) networkName = "main";
				if(networkId == 3) networkName = "ropsten";
				if(networkId == 4) networkName = "rinkeby";
				if(networkId == 42) networkName = "kovan";
				return of(networkName);
			})
		);
	}


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
