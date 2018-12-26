// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	apiUrl: 'http://localhost:3000',
	fantasyFoootballChainAddress: {
		"main": "",
		"ropsten": "",
		"kovan": "0xe8a79098310db49d6f91d35cbac7e107650ad1a3",
		"rinkeby": "",
		"development": "0xb48b714c0f746f6618ef389fba1db9273f620813"
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
