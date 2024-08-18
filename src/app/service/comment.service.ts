import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(postId: number, postedBy: string, content: string): Observable<any> {
    // Create HttpParams object to add query parameters
    let params = new HttpParams().set('postId', postId.toString()).set('postedBy', postedBy);

    // Send POST request with 'content' in the body and 'postId' + 'postedBy' in query parameters
    return this.http.post<any>(BASIC_URL + 'api/comments/create', { content }, { params });
  }

  getAllCommentsByPost(postId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/comments/${postId}`);
  }
}
