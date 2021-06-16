import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from '../messages.service';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';

@Component({
  selector: 'app-msg-compose',
  templateUrl: './msg-compose.component.html',
  styleUrls: ['./msg-compose.component.css']
})
export class MsgComposeComponent implements OnInit {

  constructor(
    private msgService: MessagesService,
    private notif: MatSnackBar) { }

  user: User;
  to: string;
  subject: string;
  content: string;
  real_estate: RealEstate;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.real_estate = JSON.parse(localStorage.getItem('viewRealEstate'));
    if (this.real_estate != null) {
      this.to = this.real_estate.owner;
      this.subject = this.real_estate.name;
    }
  }

  send(): void {
    if (this.to == "" || this.to == null)
      this.notif.open("Unesite primaoca!", "OK");

    if (this.subject == "" || this.subject == null)
      this.notif.open("Unesite naslov poruke!", "OK");

      this.msgService.sendMessageService(
        null,
        this.subject,
        this.to,
        this.user.username, 
        new Date(),
        this.content).subscribe(response => {
          this.notif.open("Poruka je uspešno poslata.", "OK");
          setTimeout(() => { window.location.reload(); }, 1500);
      },
      error => {
        this.notif.open("Poruka nije poslata! Pokušajte ponovo.", "OK");
      });
  }


}
