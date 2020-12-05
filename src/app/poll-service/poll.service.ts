import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Poll, PollForm } from '../types';
import{delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  getPolls(): Observable<Poll[]>{
    return of([
      {
      id:1,
      thumbnail:'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      question:'vote',
      results:[0, 5, 7, 1],
      options:['AAP','BJP','Congress'],
      voted:true,
    },
    {
      id:2,
     thumbnail:'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
     question:'vote',
     results:[0, 5, 7, 1],
     options:['AAP','BJP','Congress'],
     voted:false,
   }
  ]).pipe(delay(2000));
  }

  vote(pollId:number, voteNumber:number){
    console.log(pollId,voteNumber);
  }
  createPoll(poll:PollForm){
    console.log(poll);
  }
}
