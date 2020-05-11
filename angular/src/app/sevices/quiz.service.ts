import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiUrl = environment.backendUrl + '/api';

  constructor(private http: HttpClient) {}
  getQuiz(type: string) {
    const headers = new HttpHeaders();
    const params = new HttpParams().set('difficulty', type);
    headers.set('Content-Type', 'application/json');
    return this.http.get(this.apiUrl + '/getQuiz', { headers, params});
  }
}
