import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FootballDataService {

	constructor(
		public http: HttpClient
	) {}
	  
	/**
	 * Returns all available leagues
	 */
	leagues(): Observable<any> {
		return this.http.get(`${env.apiUrl}/leagues`);
	}

}
