import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from '../messages.service';
import { Block } from '../models/block';
import { Message } from '../models/message';
import { MsgThread } from '../models/msgthread';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-msgthread',
  templateUrl: './msgthread.component.html',
  styleUrls: ['./msgthread.component.css']
})
export class MsgthreadComponent implements OnInit {

  constructor(
    private msgService: MessagesService,
    private userService: UserService,
    private notif: MatSnackBar) { }

  thread: MsgThread;
  loggedUser: User;
  otherUser: string;
  owner: boolean;
  messages: Message[];
  content: string;
  block: Block;

  ngOnInit(): void {
    this.thread = JSON.parse(localStorage.getItem('currentThread'));
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    let myRealEstate: Array<string> = JSON.parse(localStorage.getItem('myRealEstate'));
    this.owner = myRealEstate.includes(this.thread.realestate);
    this.block = null;

    if (this.thread.user1 == this.loggedUser.username ||
        this.thread.user1 == 'Agencija' && this.loggedUser.type == 2) {
      this.msgService.readMessageService(this.thread._id, true, false).subscribe();
      this.otherUser = this.thread.user2;
    } else {
      this.msgService.readMessageService(this.thread._id, false, true).subscribe();
      this.otherUser = this.thread.user1;
    }

    this.msgService.getAllMessagesService(this.thread._id).subscribe((data: Message[]) => {
      this.messages = data;
    });

    this.userService.getAllBlocksService().subscribe((data: Block[]) => {
      if (data.find(b => b.blocker == this.loggedUser.username && b.blocked == this.otherUser)) {
        this.block = new Block();
        this.block.blocker = this.loggedUser.username;
        this.block.blocked = this.otherUser;
      }
      if (data.find(b => b.blocker == this.otherUser && b.blocked == this.loggedUser.username)) {
        this.block = new Block();
        this.block.blocker = this.otherUser;
        this.block.blocked = this.loggedUser.username;
      }
    })
  }

  send(): void {
    this.msgService.sendMessageService(
      this.thread._id,
      this.thread.subject,
      null,
      this.otherUser,
      this.loggedUser.username,
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

  blockUser(): void {
    this.userService.blockUserService(this.loggedUser.username, this.otherUser).subscribe(
      response => {
        this.msgService.getAllThreadsService(this.loggedUser.username).subscribe((data: MsgThread[]) => {
          data = data.filter(t =>
            (t.user1 == this.loggedUser.username && t.user2 == this.otherUser) ||
            (t.user2 == this.loggedUser.username && t.user1 == this.otherUser));
          for (let i: number = 0; i < data.length; i++)
            this.msgService.archiveThreadService(data[i]._id, false).subscribe();
          this.thread.active = false;
          localStorage.setItem('currentThread', JSON.stringify(this.thread));
        });
        this.notif.open("Korisnik je uspešno blokiran.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
      },
      error => {
        this.notif.open("Korisnik nije uspešno blokiran! Pokušajte ponovo.", "OK");
      });
  }

  unblockUser(): void {
    this.userService.unblockUserService(this.loggedUser.username, this.otherUser).subscribe(
      response => {
        this.msgService.getAllThreadsService(this.loggedUser.username).subscribe((data: MsgThread[]) => {
          data = data.filter(t =>
            (t.user1 == this.loggedUser.username && t.user2 == this.otherUser) ||
            (t.user2 == this.loggedUser.username && t.user1 == this.otherUser));
          for (let i: number = 0; i < data.length; i++)
            this.msgService.archiveThreadService(data[i]._id, true).subscribe();
          this.thread.active = true;
          localStorage.setItem('currentThread', JSON.stringify(this.thread));
        });
        this.notif.open("Korisnik je uspešno odblokiran.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
      },
      error => {
        this.notif.open("Korisnik nije uspešno odblokiran! Pokušajte ponovo.", "OK");
      });
  }

}
