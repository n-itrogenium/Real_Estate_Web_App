import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private notif: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  username: string;
  password: string;

  user: any;

  signIn(): void{
    this.userService.signInService(this.username, this.password).subscribe((user:User)=>{
      if(user){
        this.user = user;
        localStorage.setItem('loggedUser', JSON.stringify(this.user));
        if (!user.active) {
          this.notif.open("Vaš nalog još uvek nije odobren. Molimo pokušajte kasnije.", "OK");
          this.router.navigate(['']);
        } else {
            localStorage.setItem('loggedUser', JSON.stringify(this.user));

            if (user.type == 0) {
              this.router.navigate(['admin']); 
            }
            if (user.type == 1) {
              this.router.navigate(['user']);
            } 
            if (user.type == 2) {
              this.router.navigate(['agent']);
            }
        }
      }
      else{
        this.notif.open("Neispravni kredencijali! Pokušajte ponovo.", "OK");
        this.router.navigate(['']); 
      }
    })
  }

}
