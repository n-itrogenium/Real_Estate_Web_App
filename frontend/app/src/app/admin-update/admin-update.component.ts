import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private notif: MatSnackBar,
    private router: Router) { }

  emailRegex: RegExp;

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user == null || (user != null && user.type != 0))
      this.router.navigate(['/pageNotFound']);
    this.emailRegex = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    this.userService.getAllUsersFromService().subscribe((data:User[]) => {
      this.users = data.filter(u => u.username != 'admin' && u.active == true);
    })
    this.updateDataFlag = false;
  }

  logOut(): void { 
    localStorage.clear();
    this.router.navigate(['']);
  }

  selectedUser: User;
  selectedUsername: string;
  updateDataFlag: boolean;

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.selectedUser.avatar = event.target.result as string;
      }
    }
  }

  requestUpdateData() {
    this.selectedUser = this.users.find(found => found.username==this.selectedUsername);
    this.updateDataFlag = true;
  }

  updateUser(): void {
    if(
      this.selectedUser.name == null ||
      this.selectedUser.surname == null ||
      this.selectedUser.mail == null ||
      this.selectedUser.city == null ||
      this.selectedUser.country == null ||
      this.selectedUser.type == null) {
        this.notif.open("Sva polja su obavezna!", "OK");
        return;
    }

    if(this.emailRegex.exec(this.selectedUser.mail) == null) {
      this.notif.open("E-mail adresa je u pogre??nom formatu! Poku??ajte ponovo.", "OK");
      return;
    }

    this.userService.updateUserService(
      this.selectedUser.name,
      this.selectedUser.surname,
      this.selectedUser.username,
      this.selectedUser.avatar,
      this.selectedUser.mail,
      this.selectedUser.city,
      this.selectedUser.country,
      this.selectedUser.type
    ).subscribe(reponse => {
      this.notif.open("Podaci su uspe??no a??urirani.","OK");
      this.updateDataFlag = false;
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Podaci nisu ispravno a??urirani! Poku??ajte ponovo.", "OK");
    })

  }
  
  deleteUser(): void {
    this.adminService.deleteUserService(this.selectedUsername).subscribe(response => {
      this.notif.open("Korisnik je obrisan iz sistema.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Korisnik nije obrisan! Poku??ajte ponovo.", "OK");
    })
  }

  users: User[];
}
