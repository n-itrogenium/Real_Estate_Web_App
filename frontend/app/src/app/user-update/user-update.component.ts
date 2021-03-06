import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { Block } from '../models/block';
import { MsgThread } from '../models/msgthread';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(
    private userService: UserService,
    private msgService: MessagesService,
    private notif: MatSnackBar,
    private router: Router) { }

  passwordRegex: RegExp;
  emailRegex: RegExp;
  user: User;
  blocks: Block[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || this.user != null && this.user.type != 1)
      this.router.navigate(['/pageNotFound']);
    this.passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,24}$");
    this.emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");

    this.userService.getAllBlocksService().subscribe((data: Block[]) => {
      this.blocks = data.filter(b => b.blocker == this.user.username);
    })
  }

  logOut(): void { 
    localStorage.clear();
    this.router.navigate(['']);
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.user.avatar = event.target.result as string;
      }
    }
  }

  updateUser(): void {
    if(
      this.user.name == null ||
      this.user.surname == null ||
      this.user.mail == null ||
      this.user.city == null ||
      this.user.country == null ||
      this.user.type == null) {
        this.notif.open("Sva polja su obavezna!", "OK");
        return;
    }

    if(this.emailRegex.exec(this.user.mail) == null) {
      this.notif.open("E-mail adresa je u pogre??nom formatu! Poku??ajte ponovo.", "OK");
      return;
    }

    this.userService.updateUserService(
      this.user.name,
      this.user.surname,
      this.user.username,
      this.user.avatar,
      this.user.mail,
      this.user.city,
      this.user.country,
      this.user.type
    ).subscribe(reponse => {
      this.notif.open("Podaci su uspe??no a??urirani.","OK");
    },
    error => {
      this.notif.open("Podaci nisu ispravno a??urirani! Poku??ajte ponovo.", "OK");
    })
    
    localStorage.setItem('loggedUser', JSON.stringify(this.user));
    setTimeout(() => { window.location.reload(); }, 1500);

  }

  old_password: string;
  new_password: string;
  new_password_2: string;

  changePassword(): void {
    if (
      this.old_password == null ||
      this.new_password == null ||
      this.new_password_2 == null) {
        this.notif.open("Sva polja su obavezna!", "OK");
        return;
    }

    if(this.old_password != this.user.password) {
      this.notif.open("Stara lozinka nije ispravna! Poku??ajte ponovo.", "OK");
      return;
    }

    if(this.passwordRegex.exec(this.new_password) == null || this.new_password.match(/(.)\1*/g).sort((a,b)=>b.length-a.length)[0].length > 3) {
      this.notif.open("Lozinka mora da sadr??i izme??u 8 i 24 karaktera, od toga bar jedno veliko slovo, jedno malo slovo, jedan broj i jedan specijalni karakter, i ne sme sadr??ati tri ista uzastopna karaktera!", "OK");
      return;
    }

    if(this.new_password != this.new_password_2) {
      this.notif.open("Lozinke se ne poklapaju! Poku??ajte ponovo.", "OK");
      return;
    }

    this.user.password = this.new_password;

    this.userService.changePasswordService(this.user.username, this.user.password).subscribe(response => {
      this.notif.open("Lozinka je uspe??no promenjena.", "OK");
    },
    error => {
      this.notif.open("Lozinka nije uspe??no promenjena! Poku??ajte ponovo.", "OK");
    })

    this.logOut();

  }

  unblockUser(blocked): void {
    this.userService.unblockUserService(this.user.username, blocked).subscribe(
      response => {
        this.msgService.getAllThreadsService(this.user.username).subscribe((data: MsgThread[]) => {
          data = data.filter(t =>
            (t.user1 == this.user.username && t.user2 == blocked) ||
            (t.user2 == this.user.username && t.user1 == blocked));
          for (let i: number = 0; i < data.length; i++)
            this.msgService.archiveThreadService(data[i]._id, true).subscribe();
        });
        this.notif.open("Korisnik je uspe??no odblokiran.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
      },
      error => {
        this.notif.open("Korisnik nije uspe??no odblokiran! Poku??ajte ponovo.", "OK");
      });
  }

}
