import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notif: MatSnackBar,
    private router: Router) { }

  passwordRegex: RegExp;
  emailRegex: RegExp;

  ngOnInit(): void {
    localStorage.clear();
    this.passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,24}$");
    this.emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
  }
  
  type: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  password_2: string;
  avatar: string;
  mail: string;
  city: string;
  country: string;

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.avatar = event.target.result as string;
      }
    }
  }

  register() {
    if(
      this.name == null ||
      this.surname == null ||
      this.username == null ||
      this.password == null || 
      this.password_2 == null ||
      this.mail == null ||
      this.city == null ||
      this.country == null ||
      this.type == null) {
        this.notif.open("Sva polja su obavezna!", "OK");
        return;
    }

    if(this.passwordRegex.exec(this.password) == null || this.password.match(/(.)\1*/g).sort((a,b)=>b.length-a.length)[0].length > 3) {
      this.notif.open("Lozinka mora da sadrži između 8 i 24 karaktera, od toga bar jedno veliko slovo, jedno malo slovo, jedan broj i jedan specijalni karakter, i ne sme sadržati tri ista uzastopna karaktera!", "OK");
      return;
    }

    if(this.password != this.password_2) {
      this.notif.open("Lozinke se ne poklapaju! Pokušajte ponovo.", "OK");
      return;
    }

    if(this.emailRegex.exec(this.mail) == null) {
      this.notif.open("E-mail adresa je u pogrešnom formatu! Pokušajte ponovo.", "OK");
      return;
    }

    if (this.avatar == null) {
      this.avatar = "../../assets/default-avatar.png"
    }

    this.userService.registerUserService(
      this.name,
      this.surname,
      this.username, 
      this.password,
      this.avatar, 
      this.mail, 
      this.city,
      this.country,
      parseInt(this.type)).subscribe(response => {
        this.notif.open("Vaš zahtev za registraciju je uspešno poslat.", "OK");
        this.router.navigate(['']);
    }, 
    error => {
      this.notif.open("Korisnik već postoji!", "OK");
    })
  }

}
