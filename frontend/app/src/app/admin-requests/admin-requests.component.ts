import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private realEstateService: RealEstateService,
    private notif: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('loggedUser'));
    if (user == null || (user != null && user.type != 0))
      this.router.navigate(['/pageNotFound']);
    this.userService.getAllUsersFromService().subscribe((data:User[]) => {
      this.users = data.filter(user => user.active == false);
    });
    this.realEstateService.getAllRealEstateService().subscribe((data:RealEstate[]) => {
      this.real_estate = data.filter(re => re.approved == false);
    });
  }

  logOut(): void { 
    localStorage.clear();
    this.router.navigate(['']);
  }

  grantAccess(username): void {
    this.adminService.grantAccessService(username).subscribe(response => {
      this.notif.open("Zahtev je uspešno odobren.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Zahtev nije uspešno odobren! Pokušajte ponovo.", "OK");
    })

  }
  
  deleteUser(username): void {
    this.adminService.deleteUserService(username).subscribe(response => {
      this.notif.open("Zahtev je uspešno odbačen.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Zahtev nije uspešno odbačen! Pokušajte ponovo.", "OK");
    })
  }

  approveRealEstate(re): void {
    this.realEstateService.approveRealEstateService(re._id).subscribe(response => {
      this.notif.open("Nekretnina je uspešno odobrena.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Nekretnina nije uspešno odobrena! Pokušajte ponovo.", "OK");
    })
  }

  deleteRealEstate(re): void {
    this.realEstateService.deleteRealEstateService(re._id).subscribe(response => {
      this.notif.open("Zahtev je uspešno odbačen.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Zahtev nije uspešno odbačen! Pokušajte ponovo.", "OK");
    })
  }

  users: User[];
  real_estate: RealEstate[];
}

