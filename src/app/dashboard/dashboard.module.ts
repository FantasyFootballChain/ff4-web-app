import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FinanceComponent } from './finance';
import { HomeComponent } from './home';
import { LeagueComponent } from './league';
import { PrimengCustomModule, SharedModule } from '../shared';
import { SquadBuilderComponent } from './squad-builder';

@NgModule({
  	declarations: [
		DashboardComponent,
		FinanceComponent,
		HomeComponent, 
		LeagueComponent, 
		SquadBuilderComponent
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		FormsModule,
		PrimengCustomModule,
		RouterModule,
		SharedModule
	]
})
export class DashboardModule { }
