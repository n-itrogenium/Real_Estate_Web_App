import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { MsgThread } from '../models/msgthread';
import { User } from '../models/user';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(
    private router: Router,
    private msgService: MessagesService,
    private notif: MatSnackBar) { }

  currentTab: string;
  user: User;
  threads: MsgThread[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.currentTab = "active";
    this.msgService.getAllThreadsService(this.user.username).subscribe((data: MsgThread[]) => {
      this.threads = data;
    });
  }

  changeTab(tab): void {
    this.currentTab = tab;
  }

  openThread(thread): void {
    localStorage.setItem('currentThread', JSON.stringify(thread));
    //this.router.navigate(['/msgthread']);
  }

  archiveThread(thread): void {
    if (thread.active)
      this.msgService.archiveThreadService(thread._id, false).subscribe(
        response => {
          this.notif.open("Poruka je uspešno arhivirana.", "OK");
          setTimeout(() => { window.location.reload(); }, 1500);
        },
        error => {
          this.notif.open("Poruka nije arhivirana! Pokušajte ponovo.", "OK");
        });
    else
      this.msgService.archiveThreadService(thread._id, true).subscribe(
        response => {
          this.notif.open("Poruka je uspešno vraćena iz arhive.", "OK");
          setTimeout(() => { window.location.reload(); }, 1500);
        },
        error => {
          this.notif.open("Poruka nije vraćena iz arhive! Pokušajte ponovo.", "OK");
        });
  }

}
