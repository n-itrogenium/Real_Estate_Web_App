import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private realEstateService: RealEstateService,
    private notif: MatSnackBar,
    private router: Router) { }

  passwordRegex: RegExp;
  emailRegex: RegExp;

  new_re: RealEstate;
  alreadyPushed: boolean;
  users: User[];
  reg_users: User[];

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user == null) alert('user null');
    if (user != null && user.type != 0) alert('ovo drugo');
    if (user == null || (user != null && user.type != 0))
      this.router.navigate(['/pageNotFound']);
    this.new_re = new RealEstate;
    this.new_re.gallery = new Array;
    this.alreadyPushed = false;
    this.passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,24}$");
    this.emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    this.userService.getAllUsersFromService().subscribe((data:User[]) => {
      this.users = data.filter(user => user.username != "admin");
      this.reg_users = data.filter(user => user.type == 1 && user.active == true);
    })
  }

  logOut(): void { 
    localStorage.clear();
    this.router.navigate(['']);
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

  onFileSelectedAvatar(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.avatar = event.target.result as string;
      }
    }
  }

  onFileSelectedGallery(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if (this.alreadyPushed) this.new_re.gallery.pop();
        this.new_re.gallery.push(event.target.result as string);
        this.alreadyPushed = true;
      }
    }
  }

  addUser() {
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

    if(this.passwordRegex.exec(this.password) == null|| this.password.match(/(.)\1*/g).sort((a,b)=>b.length-a.length)[0].length > 3) {
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

    if (this.avatar == "") {
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
        this.adminService.grantAccessService(this.username).subscribe(response => {},
      error => {
        this.notif.open("Aktiviranje naloga nije uspelo! Pokušajte ponovo.", "OK");
      })
      this.notif.open("Korisnik je uspešno dodat u sistem.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    }, 
    error => {
      this.notif.open("Korisnik već postoji!", "OK");
    })

  }

  addRealEstate(): void {
    if (
      this.new_re.name == null ||
      this.new_re.address == null ||
      this.new_re.city == null ||
      this.new_re.municipality == null ||
      this.new_re.type == null ||
      this.new_re.height == null ||
      this.new_re.squaremeters == null ||
      this.new_re.rooms == null ||
      this.new_re.furnished == null ||
      this.new_re.sale == null ||
      this.new_re.price == null
    ) {
      this.notif.open("Sva polja su obavezna!", "OK");
      return;
    }

    this.new_re.approved = true;

    this.realEstateService.addRealEstateService(this.new_re).subscribe(response => {
        this.notif.open("Nekretnina je uspešno dodata.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
    }, 
    error => {
      this.notif.open("Nekretnina nije uspešno dodata! Pokušajte ponovo.", "OK");
    })

  }
}
