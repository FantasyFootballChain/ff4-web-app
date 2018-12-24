import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquadStatePipe } from './pipes';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		SquadStatePipe
	],
	exports: [
		SquadStatePipe
	]
})
export class SharedModule { }