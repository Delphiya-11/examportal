import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from  './question';
import { Answer } from './answer';
import { Result } from './result';
import { Observable, from } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  PHP_API_SERVER = "http://localhost";

  readQuestions(qid: number): Observable<Question[]>{
    return this.httpClient.get<Question[]>(this.PHP_API_SERVER + '/backend/php/api/read.php/?qid='+qid);
  }

  selectQuestion(qid: number): Observable<Question[]>{
    return this.httpClient.get<Question[]>(this.PHP_API_SERVER + '/backend/php/api/read.php/?qid='+qid);
  }
  
  /*updateAnswer(answer: Answer){
    return this.httpClient.post<Answer>(this.PHP_API_SERVER + '/backend/php/api/updateAnswers.php', answer);   
  }*/

  /*selectCorans(qid: number): Observable<Question[]>{
    return this.httpClient.get<Question[]>(this.PHP_API_SERVER + '/backend/php/api/readans.php/?qid='+qid);
  }*/

  storeMarks(result: Result): Observable<Result>{
    return this.httpClient.post<Result>(this.PHP_API_SERVER + '/backend/php/api/insertMarks.php', result);
  }
}