import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found';

const routes: Routes = [
	{ 
		path: '', 
		redirectTo: 'dashboard', 
		pathMatch: 'full' 
	},
	{
		path: '404',
		component: PageNotFoundComponent
	},
	{
		path: '**',
		redirectTo: '/404'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
