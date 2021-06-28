import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { Block } from '../models/block';
import { MsgThread } from '../models/msgthread';
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
    private notif: MatSnackBar,
    private router: Router) { }

  user: User;
  to: string;
  type: number;
  subject: string;
  content: string;
  real_estate: RealEstate;
  block: Block;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || (this.user != null && this.user.type != 1 && this.user.type != 2))
      this.router.navigate(['/pageNotFound']);
    this.real_estate = JSON.parse(localStorage.getItem('viewRealEstate'));
    if (this.real_estate != null) {
      this.to = this.real_estate.owner;
      this.subject = this.real_estate.name;
      this.userService.getAllBlocksService().subscribe((data: Block[]) => {
        if (data.find(b => b.blocker == this.user.username && b.blocked == this.to)) {
          this.block = new Block();
          this.block.blocker = this.user.username;
          this.block.blocked = this.to;
        }
        if (data.find(b => b.blocker == this.to && b.blocked == this.user.username)) {
          this.block = new Block();
          this.block.blocker = this.to;
          this.block.blocked = this.user.username;
        }
      })
    }
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  send(): void {
    if (this.to == this.user.username ||
      this.to == "" ||
      this.to == null ||
      (this.to == 'Agencija' && this.user.type == 2))
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

          let sender: string;
          if (this.user.type == 1) 
            sender = this.user.username;
          else
          sender = 'Agencija';

          this.msgService.sendMessageService(
            null,
            this.subject,
            real_estate_id,
            this.to,
            sender,
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


  unblockUser(): void {
    this.userService.unblockUserService(this.user.username, this.to).subscribe(
      response => {
        this.msgService.getAllThreadsService(this.user.username).subscribe((data: MsgThread[]) => {
          data = data.filter(t =>
            (t.user1 == this.user.username && t.user2 == this.to) ||
            (t.user2 == this.user.username && t.user1 == this.to));
          for (let i: number = 0; i < data.length; i++)
            this.msgService.archiveThreadService(data[i]._id, true).subscribe();
        });
        this.notif.open("Korisnik je uspešno odblokiran.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
      },
      error => {
        this.notif.open("Korisnik nije uspešno odblokiran! Pokušajte ponovo.", "OK");
      });
  }


}
