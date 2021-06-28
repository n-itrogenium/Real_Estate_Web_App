import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Contract } from '../models/contract';
import { Offer } from '../models/offer';
import { Percentage } from '../models/percentage';
import { RealEstate } from '../models/real-estate';
import { Rent } from '../models/rent';
import { User } from '../models/user';
import { OfferService } from '../offer.service';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-agent-manage-re',
  templateUrl: './agent-manage-re.component.html',
  styleUrls: ['./agent-manage-re.component.css']
})
export class AgentManageReComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService,
    private offerService: OfferService,
    private adminService: AdminService,
    private notif: MatSnackBar,
    private router: Router) { }

  user: User;
  real_estate: RealEstate[];
  rents: Rent[];
  offers: Offer[];
  contracts: Contract[];
  income: number = 0;

  requestsFlag: boolean = true;
  activeFlag: boolean = false;
  contractInfoFlag: boolean = false;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
    if (this.user == null || (this.user != null && this.user.type != 2))
      this.router.navigate(['/pageNotFound']);

    this.realEstateService.getAllRealEstateService().subscribe((data: RealEstate[]) => {
      this.real_estate = data;
      for ( let i: number = 0; i < data.length; i++) {
        if (this.real_estate[i].gallery != null) {
          let random_img: number = Math.floor(Math.random() * this.real_estate[i].gallery.length);
          let help: string;
          help = this.real_estate[i].gallery[0];
          this.real_estate[i].gallery[0] = this.real_estate[i].gallery[random_img];
          this.real_estate[i].gallery[random_img] = help;
        }
      }
      this.offerService.getAllContractsService().subscribe((data: Contract[]) => {
        this.contracts = data;
        this.adminService.getPercentageService().subscribe((percentage: Percentage) => {
          for (let i = 0; i < data.length; i++) {
            let re = this.real_estate.find(re => re._id == data[i].realestate);
            let factor: number;
            if (re.sale == 0) {
              factor = (re.owner == 'Agencija') ? 1 : (percentage.rent / 100);
            }
            else {
              factor = (re.owner == 'Agencija') ? 1 : (percentage.sale / 100);
            }
            this.income += data[i].price * factor;
          }
        })
      });
    });
    this.realEstateService.getRentsService().subscribe((data: Rent[]) => {
      this.rents = data.filter(r => r.valid == false);
    });
    this.offerService.getAllOffersService().subscribe((data: Offer[]) => {
      this.offers = data.filter(o => o.valid == false && o.accepted == true);
    });
    
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }

  requests(): void {
    this.requestsFlag = true;
    this.activeFlag = false;
    this.contractInfoFlag = false;
  }

  active(): void {
    this.requestsFlag = false;
    this.activeFlag = true;
    this.contractInfoFlag = false;
  }

  contractInfo(): void {
    this.requestsFlag = false;
    this.activeFlag = false;
    this.contractInfoFlag = true;
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

  promoteRealEstate(re): void {
    this.realEstateService.promoteRealEstateService(re._id).subscribe(response => {
      this.notif.open("Nekretnina je uspešno dodata u promovisane.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
      error => {
        this.notif.open("Nekretnina nije dodata u promovisane! Pokušajte ponovo.", "OK");
      })
  }

  removeFromPromoted(re): void {
    this.realEstateService.removeFromPromotedService(re._id).subscribe(response => {
      this.notif.open("Nekretnina je uspešno uklonjena iz promovisanih.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    },
      error => {
        this.notif.open("Nekretnina nije uklonjena iz promovisanih! Pokušajte ponovo.", "OK");
      })
  }

  openPage(selectedRealEstate): void {
    localStorage.setItem('viewRealEstate', JSON.stringify(selectedRealEstate));
    this.router.navigate(['/realestate']);
  }

  validateOffer(offer): void {
    let re = this.real_estate.find(re => re._id == offer.realestate);
    this.offerService.validateOfferService(offer._id).subscribe(response => {
      this.realEstateService.sellRealEstateService(
        offer.realestate,
        offer.owner,
        offer.client,
        offer.amount,
        re.sale
      ).subscribe(response => {
        this.notif.open("Ugovorena prodaja je uspešno odobrena.", "OK");
        setTimeout(() => { window.location.reload(); }, 1500);
      }, error => {
        this.notif.open("Ugovorena prodaja nije uspešno odobrena! Pokušajte ponovo.", "OK");
      });
    }, error => {
      this.notif.open("Ugovorena prodaja nije uspešno odobrena! Pokušajte ponovo.", "OK");
    });
  }

  deleteOffer(offer): void {
    this.offerService.deleteOfferService(offer._id, offer.realestate).subscribe(response => {
      this.notif.open("Ugovorena prodaja je uspešno odbačena.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    }, error => {
      this.notif.open("Ugovorena prodaja nije uspešno odbačena! Pokušajte ponovo.", "OK");
    });
  }

  validateRent(rent): void {
    let startdate = new Date(rent.startdate);
    let enddate = new Date(rent.enddate);
    let re = this.real_estate.find(re => re._id == rent.realestate);
    let price = Math.ceil((enddate.getTime() - startdate.getTime()) / (1000 * 3600 * 24 * 30)) * re.price;
    
    this.realEstateService.validateRentService(
      rent._id,
      rent.realestate,
      re.owner,
      rent.client,
      price).subscribe(response => {
      for (let i = 0; i < this.rents.length; i++) {
        if (this.rents[i]._id != rent._id) {
          let i_startdate = new Date(this.rents[i].startdate);
          let i_enddate = new Date(this.rents[i].enddate);
          if (i_startdate > startdate && i_startdate < enddate ||
            i_enddate > startdate && i_enddate < enddate ||
            i_startdate <= startdate && i_enddate >= enddate) {
            this.realEstateService.deleteRentService(this.rents[i]._id).subscribe();
          }
        }
      }
      this.notif.open("Rezervacija je uspešno odobrena.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    }, error => {
      this.notif.open("Rezervacija nije uspešno odobrena! Pokušajte ponovo.", "OK");
    });
  }

  deleteRent(rent): void {
    this.realEstateService.deleteRentService(rent._id).subscribe(response => {
      this.notif.open("Rezervacija je uspešno odbačena.", "OK");
      setTimeout(() => { window.location.reload(); }, 1500);
    }, error => {
      this.notif.open("Rezervacija nije uspešno odbačena! Pokušajte ponovo.", "OK");
    });
  }

}
