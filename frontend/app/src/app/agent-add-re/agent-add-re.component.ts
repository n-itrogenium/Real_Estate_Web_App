import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RealEstate } from '../models/real-estate';
import { User } from '../models/user';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-agent-add-re',
  templateUrl: './agent-add-re.component.html',
  styleUrls: ['./agent-add-re.component.css']
})
export class AgentAddReComponent implements OnInit {

  constructor(
    private notif: MatSnackBar,
    private realEstateService: RealEstateService,
    private router: Router) { }

  new_re: RealEstate;
  alreadyPushed: boolean;

  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || (this.user != null && this.user.type != 2))
      this.router.navigate(['/pageNotFound']);
    this.new_re = new RealEstate;
    this.new_re.gallery = new Array;
    this.alreadyPushed = false;
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
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
    this.new_re.owner = "Agencija";

    this.realEstateService.addRealEstateService(this.new_re).subscribe(response => {
        this.notif.open("Nekretnina je uspešno dodata.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
    }, 
    error => {
      this.notif.open("Nekretnina nije uspešno dodata! Pokušajte ponovo.", "OK");
    })

  }

}
