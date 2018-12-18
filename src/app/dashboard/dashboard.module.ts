import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home';
import { LeagueComponent } from './league';

@NgModule({
  	declarations: [
		DashboardComponent,
		HomeComponent, 
		LeagueComponent
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		RouterModule
	]
})
export class DashboardModule { }
