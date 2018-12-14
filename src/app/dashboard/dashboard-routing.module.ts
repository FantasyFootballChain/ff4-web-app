import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { LeagueComponent } from './league';

const routes: Routes = [
	{	
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			{
				path: '',
				redirectTo: 'league',
				pathMatch: 'full'
			},
			{
				path: 'league',
				component: LeagueComponent
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