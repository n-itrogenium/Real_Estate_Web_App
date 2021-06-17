import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllThreadsService(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/msg/getAllThreads`, data);
  }

  getAllMessagesService(thread_id) {
    const data = {
      thread_id: thread_id
    }
    return this.http.post(`${this.uri}/msg/getAllMessages`, data);
  }

  sendMessageService(thread, subject, realestate, to, from, timestamp, content) {
    const data = {
      thread: thread,
      subject: subject,
      realestate: realestate,
      to: to,
      from: from,
      timestamp: timestamp,
      content: content
    }
    return this.http.post(`${this.uri}/msg/sendMessage`, data);
  }

  readMessageService(thread, user1, user2) {
    const data = {
      thread: thread,
      user1: user1,
      user2: user2
    }
    return this.http.post(`${this.uri}/msg/readMessage`, data);
  }

  archiveThreadService(thread, active) {
    const data = {
      thread: thread,
      active: active
    }
    return this.http.post(`${this.uri}/msg/archiveThread`, data);
  }


}
