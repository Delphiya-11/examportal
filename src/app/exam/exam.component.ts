import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Question } from '../question';
import { Answer } from '../answer';
import { Result } from '../result';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  questions: Question[];
  result: Result;
  selected=false;
  updated=false;
  inserted=false;
  ans=null;
  corans=null;
  r=1;
  mk;
  //res=0;
  v=0;
  m: number;
  resl = new Array(10);
  i=0;
  Op=null;
  //selectedAnswer: Answer = {roll: 1, marks: null};

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // this.apiService.readQuestions(1).subscribe((questions: Question[])=>{
    //   this.questions = questions;
    //   console.log(questions);
    // })
    this.selectQuestion(1);
    this.resl.fill(0, 0, 1);
  }

  selectQuestion(qid: number){
    this.apiService.selectQuestion(qid).subscribe((questions: Question[])=>{
      this.questions = questions;
      this.i = qid;
      this.corans = questions[0].corop;
      console.log(questions);
      console.log(this.corans);
    })
    this.selected=true;
  }

  //valueMap=new Map();
  //ansarr: Array<any>;

  /*myFunc(qid: number){
    this.selectQuestion(qid);
    this.selectCorans(qid);
  }*/

  updateAnswer(answer: Answer){
    this.ans = answer;
    //this.ansarr = this.valueMap.get(answer);
    if(this.ans!=null){
      console.log("Answer entered");
    }
    else
      console.log("Answer not entered");
    this.updated=true;
    /*if(this.ans==this.corans){
      this.res=this.res+1;
    }*/
    this.i=this.questions[0].qid;
    if(this.resl[this.i-1]==0)
    {
      if(this.ans==this.corans)
      {
        this.resl[this.i-1]=1;
      }
      else
      {
        this.resl[this.i-1]=-1;
      }
    }
    else
    {
      this.resl[this.i-1]=0;
      if(this.ans==this.corans)
      {
        this.resl[this.i-1]=1;
      }
      else
      {
        this.resl[this.i-1]=-1;
      }
    }
    console.log(this.resl);
    const cloneArr = Object.assign([], this.resl);
    for(this.i=0;this.i<cloneArr.length;this.i++)
    {
      if(cloneArr[this.i]==-1)
      {
        cloneArr[this.i]=0;
      }
    }
    this.mk=cloneArr.reduce(function(a,b){ return a + b; });
    this.m=this.mk;
    console.log(this.m);
    //this.m=this.res;
    //console.log(this.m);
    this.result = {roll: 1, marks: this.m};
  }

  /*selectCorans(qid: number){
    this.apiService.selectCorans(qid).subscribe((questions: Question[])=>{
      this.questions = questions;
      this.i = qid;
      this.corans = questions[0].corop;
      //if(this.corans!=null && this.ans!=null){
        console.log(this.i);
        console.log(this.corans);
      //}
    })
    this.selected=true;
  }*/

  storeMarks(){
    this.apiService.storeMarks(this.result).subscribe((result: Result)=>{
      result.roll=this.r;
      result.marks=this.m;
      /*for (this.i=1; this.i<=2; this.i++){
        this.marks = this.marks+this.res[this.i];
      }*/
      console.log("Inserted");
    })
    this.inserted=true;
  }

  reset(){
    this.Op=null;
  }

}
