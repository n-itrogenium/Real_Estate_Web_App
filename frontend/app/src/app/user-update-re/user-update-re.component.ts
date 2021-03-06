import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-user-update-re',
  templateUrl: './user-update-re.component.html',
  styleUrls: ['./user-update-re.component.css']
})
export class UserUpdateReComponent implements OnInit {

  constructor(
    private notif: MatSnackBar,
    private realEstateService: RealEstateService,
    private router: Router) { }

  real_estate: RealEstate;
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || this.user != null && this.user.type != 1)
      this.router.navigate(['/pageNotFound']);
    this.real_estate = JSON.parse(localStorage.getItem('viewRealEstate'));
    this.alreadyPushed = false;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  updateRealEstate(): void {
    if (
      this.real_estate.name == null ||
      this.real_estate.address == null ||
      this.real_estate.city == null ||
      this.real_estate.municipality == null ||
      this.real_estate.type == null ||
      this.real_estate.height == null ||
      this.real_estate.squaremeters == null ||
      this.real_estate.rooms == null ||
      this.real_estate.furnished == null ||
      this.real_estate.sale == null ||
      this.real_estate.price == null
    ) {
      this.notif.open("Sva polja su obavezna!", "OK");
      return;
    }

    this.realEstateService.updateRealEstateService(this.real_estate).subscribe(response => {
        this.notif.open("Vaša nekretnina je uspešno ažurirana.", "OK");
        localStorage.setItem('viewRealEstate', JSON.stringify(this.real_estate));
        setTimeout(() => { window.location.reload(); }, 1500);
    }, 
    error => {
      this.notif.open("Nekretnina nije uspešno ažurirana! Pokušajte ponovo.", "OK");
    })
  }

  alreadyPushed: boolean;

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if (this.alreadyPushed) this.real_estate.gallery.pop();
        this.real_estate.gallery.push(event.target.result as string);
        this.alreadyPushed = true;
      }
    }
  }

}
