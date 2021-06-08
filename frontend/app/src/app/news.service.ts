import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAllNewsFromService() {
    return this.http.get(`${this.uri}/news/getAllNews`);
  }

  addComment(id, text) {
    const data = {
      id: id,
      text: text
    }

    return this.http.post(`${this.uri}/news/addComment`, data);
  }
}
