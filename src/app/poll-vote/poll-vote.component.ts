import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ApexCharts from 'apexcharts';
import { PollVote } from '../types';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.scss']
})
export class PollVoteComponent implements AfterViewInit {
  voteForm:FormGroup;
  @Input() voted:boolean;
  @Input()  options:string[];
  @Input() results:number[];
  @Input() question:string;
  @Input()id:number;

  @Output() pollVoted:EventEmitter<PollVote>= new EventEmitter();
 // options=["AAP","Congress","BJP"];
  constructor(private fb:FormBuilder) {

    this.voteForm=this.fb.group({
      selected:this.fb.control('',[Validators.required]),
    });
   }

  ngAfterViewInit(): void {
    this.generateChart();
  }
  submitForm(){
    const pollVoted:PollVote={
      id:this.id,
      vote:this.voteForm.get('selected').value,
    }
    this.pollVoted.emit(pollVoted);
    console.log(this.voteForm.value);
  }

  generateChart(){
    const options: ApexCharts.ApexOptions = {
      series: [ {
        //data: [0, 0, 0],
        data: this.results,
      },
    ],
      chart: {
        height : 350,
        type: 'bar',
      },
      plotOptions: {
        bar:{
          columnWidth: '45%',
          distributed: true,
        }
      },
      legend: {
        show:false,
      },
      xaxis:{
        //categories:['AAP','BJP','Congress'],
        categories:this.options,
      },
    };


    const chart = new ApexCharts(document.getElementById('poll-results'),options);
    chart.render()
  }

}
