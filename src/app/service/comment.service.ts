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
    let params = new HttpParams().set('postId', postId.toString()).set('postedBy', postedBy);
  
    const formattedContent = `${content}`;
    console.log('Formatted Content:', formattedContent);
  
    return this.http.post<any>(BASIC_URL + 'api/comments/create', { content: formattedContent }, { params });
  }
 
  getAllCommentsByPost(postId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/comments/${postId}`);
  }
}
