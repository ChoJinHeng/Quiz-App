import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizManagement {
  private cmsBaseUrl = environment.cmsBaseUrl; 
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {} // Use constructor injection instead of inject()

  // Get all quizzes
  getQuizzes(): Observable<any> {
    return this.http.get(`${this.cmsBaseUrl}/quizzes`, { headers: this.headers });
  }

  // Get single quiz by ID
  getQuiz(id: number): Observable<any> {
    return this.http.get(`${this.cmsBaseUrl}/quizzes/${id}`, {
      headers: this.headers,
    });
  }

  // Create new quiz
  createQuiz(quizData: any): Observable<any> {
    return this.http.post(`${this.cmsBaseUrl}/quizzes`, quizData, {
      headers: this.headers,
    });
  }

  // Update quiz
  updateQuiz(id: number, quizData: any): Observable<any> {
    return this.http.put(`${this.cmsBaseUrl}/quizzes/${id}`, quizData, {
      headers: this.headers,
    });
  }

  // Delete quiz
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.cmsBaseUrl}/quizzes/${id}`, {
      headers: this.headers,
    });
  }
}
