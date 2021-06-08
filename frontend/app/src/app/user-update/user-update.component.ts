import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private notif: MatSnackBar,
    private router: Router) { }

  passwordRegex: RegExp;
  emailRegex: RegExp;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    this.passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,24}$");
    this.emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
  }

  logOut(): void { 
    localStorage.clear();
    this.router.navigate(['']);
  }

  user: User;

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
      this.notif.open("E-mail adresa je u pogrešnom formatu! Pokušajte ponovo.", "OK");
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
      this.notif.open("Podaci su uspešno ažurirani.","OK");
    },
    error => {
      this.notif.open("Podaci nisu ispravno ažurirani! Pokušajte ponovo.", "OK");
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
      this.notif.open("Stara lozinka nije ispravna! Pokušajte ponovo.", "OK");
      return;
    }

    if(this.passwordRegex.exec(this.new_password) == null || this.new_password.match(/(.)\1*/g).sort((a,b)=>b.length-a.length)[0].length > 3) {
      this.notif.open("Lozinka mora da sadrži između 8 i 24 karaktera, od toga bar jedno veliko slovo, jedno malo slovo, jedan broj i jedan specijalni karakter, i ne sme sadržati tri ista uzastopna karaktera!", "OK");
      return;
    }

    if(this.new_password != this.new_password_2) {
      this.notif.open("Lozinke se ne poklapaju! Pokušajte ponovo.", "OK");
      return;
    }

    this.user.password = this.new_password;

    this.userService.changePasswordService(this.user.username, this.user.password).subscribe(response => {
      this.notif.open("Lozinka je uspešno promenjena.", "OK");
    },
    error => {
      this.notif.open("Lozinka nije uspešno promenjena! Pokušajte ponovo.", "OK");
    })

    this.logOut();

  }

}
