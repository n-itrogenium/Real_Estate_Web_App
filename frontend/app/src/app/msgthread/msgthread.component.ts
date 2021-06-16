import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from '../messages.service';
import { Message } from '../models/message';
import { MsgThread } from '../models/msgthread';

@Component({
  selector: 'app-msgthread',
  templateUrl: './msgthread.component.html',
  styleUrls: ['./msgthread.component.css']
})
export class MsgthreadComponent implements OnInit {

  constructor(
    private msgService: MessagesService,
    private notif: MatSnackBar) { }

  thread: MsgThread;
  loggedUser: string;
  otherUser: string;
  messages: Message[];
  content: string;

  ngOnInit(): void {
    this.thread = JSON.parse(localStorage.getItem('currentThread'));
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser')).username;
    
    if (this.thread.user1 == this.loggedUser) {
      this.msgService.readMessageService(this.thread._id, true, false).subscribe();
      this.otherUser = this.thread.user2;
    } else {
      this.msgService.readMessageService(this.thread._id, false, true).subscribe();
      this.otherUser = this.thread.user1;
    }

    this.msgService.getAllMessagesService(this.thread._id).subscribe((data:Message[]) => {
      this.messages = data;
    });
  }

  send(): void {
      this.msgService.sendMessageService(
        this.thread._id,
        this.thread.subject,
        this.otherUser,
        this.loggedUser, 
        new Date(),
        this.content).subscribe(response => {
          this.notif.open("Poruka je uspešno poslata.", "OK");
          setTimeout(() => { window.location.reload(); }, 1500);
      },
      error => {
        this.notif.open("Poruka nije poslata! Pokušajte ponovo.", "OK");
      });
  }

  archiveThread(): void {
    if (this.thread.active)
      this.msgService.archiveThreadService(this.thread._id, false).subscribe(
        response => {
          this.thread.active = false;
          localStorage.setItem('currentThread', JSON.stringify(this.thread));
          this.notif.open("Poruka je uspešno arhivirana.", "OK");
          setTimeout(() => { window.location.reload(); }, 1500);
        },
        error => {
          this.notif.open("Poruka nije arhivirana! Pokušajte ponovo.", "OK");
        });
    else
      this.msgService.archiveThreadService(this.thread._id, true).subscribe(
        response => {
          this.thread.active = true;
          localStorage.setItem('currentThread', JSON.stringify(this.thread));
          this.notif.open("Poruka je uspešno vraćena iz arhive.", "OK");
          setTimeout(() => { window.location.reload(); }, 1500);
        },
        error => {
          this.notif.open("Poruka nije vraćena iz arhive! Pokušajte ponovo.", "OK");
        });
  }

}
