import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RealEstate } from '../models/real-estate';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-user-my-re',
  templateUrl: './user-my-re.component.html',
  styleUrls: ['./user-my-re.component.css']
})
export class UserMyReComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService,
    private router: Router,
    private notif: MatSnackBar) { }

  my_real_estate: RealEstate[]

  ngOnInit(): void {
    let owner = JSON.parse(localStorage.getItem('loggedUser'));
    this.realEstateService.getAllRealEstateService().subscribe((data:RealEstate[]) => {
      this.my_real_estate = data.filter(re => re.owner == owner.username);
      for ( let i: number = 0; i < data.length; i++) {
        if (this.my_real_estate[i].gallery != null) {
          let random_img: number = Math.floor(Math.random() * this.my_real_estate[i].gallery.length);
          let help: string;
          help = this.my_real_estate[i].gallery[0];
          this.my_real_estate[i].gallery[0] = this.my_real_estate[i].gallery[random_img];
          this.my_real_estate[i].gallery[random_img] = help;
        }
      }
    })
  }

  openPage(selectedRealEstate): void {
    localStorage.setItem('viewRealEstate', JSON.stringify(selectedRealEstate));
    this.router.navigate(['/realestate']);
  }

  updateRealEstate(selectedRealEstate): void {
    localStorage.setItem('viewRealEstate', JSON.stringify(selectedRealEstate));
    this.router.navigate(['/user/updateRealEstate']);
  }

  deleteRealEstate(selectedRealEstate): void {
    this.realEstateService.deleteRealEstateService(selectedRealEstate._id).subscribe(response => {
      this.notif.open("Nekretnina je uspešno uklonjena.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
    error => {
      this.notif.open("Nekretnina nije uklonjena! Pokušajte ponovo.", "OK");
    })
  }

}
