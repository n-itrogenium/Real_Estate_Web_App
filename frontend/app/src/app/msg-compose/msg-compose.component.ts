import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from '../messages.service';
import { Block } from '../models/block';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-msg-compose',
  templateUrl: './msg-compose.component.html',
  styleUrls: ['./msg-compose.component.css']
})
export class MsgComposeComponent implements OnInit {

  constructor(
    private msgService: MessagesService,
    private userService: UserService,
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
    if (this.to == this.user.username || this.to == "" || this.to == null)
      this.notif.open("Neispravan primalac!", "OK");

    else if (this.subject == "" || this.subject == null)
      this.notif.open("Unesite naslov poruke!", "OK");

    else {
      this.userService.getAllBlocksService().subscribe((data: Block[]) => {
        if (data.find(b => b.blocker == this.to && b.blocked == this.user.username)) {
          this.notif.open("Slanje poruke nije moguće jer vas je korisnik blokirao.", "OK");
        }
        else if (data.find(b => b.blocker == this.user.username && b.blocked == this.to)) {
          this.notif.open("Slanje poruke nije moguće jer ste blokirali korisnika.", "OK");
        }
        else {
          let real_estate_id: string;
          if (this.real_estate != null)
            real_estate_id = this.real_estate._id;
          else real_estate_id = null;

          this.msgService.sendMessageService(
            null,
            this.subject,
            real_estate_id,
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
      })
    }
  }


}
