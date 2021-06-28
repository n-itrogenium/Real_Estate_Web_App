import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { MsgThread } from '../models/msgthread';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(
    private msgService: MessagesService,
    private realEstateService: RealEstateService,
    private notif: MatSnackBar,
    private router: Router) { }

  currentTab: string;
  user: User;
  threads: MsgThread[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || (this.user != null && this.user.type != 1 && this.user.type != 2))
      this.router.navigate(['/pageNotFound']);
    localStorage.removeItem('viewRealEstate');
    this.currentTab = "active";
    this.threads = null;

    this.realEstateService.getAllRealEstateService().subscribe((data: RealEstate[]) => {
      if (this.user.type == 1)
        data = data.filter(re => re.owner == this.user.username);
      else 
        data = data.filter(re => re.owner == "Agencija");

      let myRealEstate = new Array<string>();
      for (let i: number = 0; i < data.length; i++) 
        myRealEstate.push(data[i]._id);
      localStorage.setItem('myRealEstate', JSON.stringify(myRealEstate));
    });

    if (this.user.type == 1)
    this.msgService.getAllThreadsService(this.user.username).subscribe((data: MsgThread[]) => {
      this.threads = data.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      });
    });

    if (this.user.type == 2)
      this.msgService.getAllThreadsService('Agencija').subscribe((data: MsgThread[]) => {
        this.threads = data.sort((a, b) => {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        });
      });
      
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
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
