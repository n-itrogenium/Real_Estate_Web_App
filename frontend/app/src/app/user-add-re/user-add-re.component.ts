import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-user-add-re',
  templateUrl: './user-add-re.component.html',
  styleUrls: ['./user-add-re.component.css']
})
export class UserAddReComponent implements OnInit {

  constructor(
    private notif: MatSnackBar,
    private realEstateService: RealEstateService,
    private router: Router) { }

  new_re: RealEstate;
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || this.user != null && this.user.type != 1)
      this.router.navigate(['/pageNotFound']);
    this.new_re = new RealEstate;
    this.new_re.gallery = new Array;
    this.alreadyPushed = false;
    let owner = JSON.parse(localStorage.getItem('loggedUser'));
    this.new_re.owner = owner.username;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  alreadyPushed: boolean;

  onFileSelected(event) {
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

    this.realEstateService.addRealEstateService(this.new_re).subscribe(response => {
        this.notif.open("Vaš zahtev za dodavanje nekretnine je uspešno poslat.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
    }, 
    error => {
      this.notif.open("Nekretnina nije uspešno dodata! Pokušajte ponovo.", "OK");
    })

  }

}
