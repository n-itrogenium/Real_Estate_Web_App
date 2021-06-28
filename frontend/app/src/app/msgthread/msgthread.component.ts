import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { Block } from '../models/block';
import { Message } from '../models/message';
import { MsgThread } from '../models/msgthread';
import { Offer } from '../models/offer';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { OfferService } from '../offer.service';
import { RealEstateService } from '../real-estate.service';
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
    private offerService: OfferService,
    private realEstateService: RealEstateService,
    private notif: MatSnackBar,
    private router: Router) { }

  thread: MsgThread;
  loggedUser: User;
  otherUser: string;
  owner: boolean;
  messages: Message[];
  content: string;
  block: Block;

  realestate: RealEstate;
  offer: Offer;
  amount: number;
  offerMade: boolean;

  ngOnInit(): void {
    this.thread = JSON.parse(localStorage.getItem('currentThread'));
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.loggedUser == null || (this.loggedUser != null && this.loggedUser.type != 1 && this.loggedUser.type != 2))
      this.router.navigate(['/pageNotFound']);
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

    this.offerService.getAllOffersService().subscribe((data: Offer[]) => {
      this.offer = data.find(o => o.realestate == this.thread.realestate &&
        (o.client == this.loggedUser.username || o.client == this.otherUser));

      if (this.offer)
        this.offerMade = true;
      else this.offerMade = false;
    })

    this.realEstateService.getAllRealEstateService().subscribe((data: RealEstate[]) => {
      this.realestate = data.find(r => r._id == this.thread.realestate);
    });
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
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

  makeOffer(): void {
    this.offerService.makeOfferService(
      this.thread.realestate,
      this.otherUser,
      this.loggedUser.username,
      this.amount
    ).subscribe(response => {
      this.content = "Ponuda: " + this.amount + " €";
      this.send();
      this.notif.open("Uspešno ste dali ponudu.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    }, error => {
      this.notif.open("Davanje ponude nije uspelo! Pokušajte ponovo.", "OK");
    });
  }

  acceptOffer(): void {
    this.offerService.acceptOfferService(this.offer._id, this.offer.realestate).subscribe(response => {
      this.content = "Ponuda je prihvaćena.";
      this.send();

      this.offerService.getAllOffersService().subscribe((data: Offer[]) => {

        let others: Offer[] = data.filter(o =>
          o.realestate == this.thread.realestate &&
          o.client != this.loggedUser.username &&
          o.client != this.otherUser);

        let sender: string;
        if (this.loggedUser.type == 1) sender = this.loggedUser.username;
        else {
          sender = "Agencija";
          this.offerService.validateOfferService(this.offer._id).subscribe();          
          this.realEstateService.sellRealEstateService(
            this.thread.realestate,
            this.offer.owner,
            this.offer.client,
            this.offer.amount,
            this.realestate.sale
          ).subscribe();
        }

        this.msgService.getAllThreadsService(sender).subscribe((threads: MsgThread[]) => {
          for (let i = 0; i < others.length; i++) {
            let thr: MsgThread = threads.find(t =>
              t.realestate == this.thread.realestate &&
              (t.user1 == others[i].client || t.user2 == others[i].client));
            this.msgService.sendMessageService(
              thr._id,
              this.thread.subject,
              null,
              others[i].client,
              this.loggedUser.username,
              new Date(),
              "Ponuda je odbijena."
            ).subscribe();
          }
        })
        this.notif.open("Ponuda je uspešno prihvaćena.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
      })
    }, error => {
      this.notif.open("Ponuda nije uspešno prihvaćena! Pokušajte ponovo.", "OK");
    });
  }

  declineOffer(): void {
    this.offerService.declineOfferService(this.offer._id).subscribe(response => {
      this.content = "Ponuda je odbijena.";
      this.send();
      this.notif.open("Ponuda je uspešno odbijena.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    }, error => {
      this.notif.open("Ponuda nije uspešno odbijena! Pokušajte ponovo.", "OK");
    });
  }


}
