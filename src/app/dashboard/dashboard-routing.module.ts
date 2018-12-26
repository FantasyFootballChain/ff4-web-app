import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { FinanceComponent } from './finance';
import { HomeComponent } from './home';
import { LeagueComponent } from './league';
import { OracleComponent } from './oracle';
import { SquadBuilderComponent } from './squad-builder';

const routes: Routes = [
	{	
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full'
			},
			{
				path: 'finance',
				component: FinanceComponent
			},
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'league',
				component: LeagueComponent
			},
			{
				path: 'oracle',
				component: OracleComponent
			},
			{
				path: 'squad-builder/:season_id/:league_id',
				component: SquadBuilderComponent
			}
		]
	}
];

@NgModule({
	imports: [
	  RouterModule.forChild(routes)
	],
	exports: [
	  RouterModule
	]
  })
  export class DashboardRoutingModule {}