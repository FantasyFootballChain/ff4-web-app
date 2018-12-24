import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'squadState' })
export class SquadStatePipe implements PipeTransform {

	transform(stateId) {
		stateId = +stateId;
		switch(stateId) {
			case 0: return "ToBeValidated";
			case 1: return "InvalidSeasonId";
			case 2: return "InvalidLeagueId";
			case 3: return "InvalidRoundId";
			case 4: return "InvalidNumberOfPlayersFromTheSameClub";
			case 5: return "InvalidPlayerLeague";
			case 6: return "InvalidNumberOfTotalPoints";
			case 7: return "InvalidFormation";
			case 8: return "InvalidTimeAfterDeadline";
			case 9: return "Validated";
			case 10: return "Lose";
			case 11: return "Win";
			case 12: return "Redeemed";
			default:  return "State not found"
		}
	}

}
