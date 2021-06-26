import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getAllRealEstateService() {
    return this.http.get(`${this.uri}/realestate/getAllRealEstate`);
  }

  addRealEstateService(new_re) {
    if (new_re.approved == null) new_re.approved = false;
    if (new_re.promo == null) new_re.promo = false;
    const data = {
      name: new_re.name, 
      address: new_re.address,
      city: new_re.city,
      municipality: new_re.municipality,
      type: new_re.type,
      height: new_re.height,
      floor: new_re.floor,
      squaremeters: new_re.squaremeters,
      rooms: new_re.rooms,
      furnished: new_re.furnished,
      gallery: new_re.gallery,
      sale: new_re.sale,
      price: new_re.price,
      owner: new_re.owner,
      promo: new_re.promo,
      approved: new_re.approved,
      sold: false
    }

    return this.http.post(`${this.uri}/realestate/addRealEstate`, data);
  }

  updateRealEstateService(real_estate) {
    const data = {
      _id: real_estate._id,
      name: real_estate.name, 
      address: real_estate.address,
      city: real_estate.city,
      municipality: real_estate.municipality,
      type: real_estate.type,
      height: real_estate.height,
      floor: real_estate.floor,
      squaremeters: real_estate.squaremeters,
      rooms: real_estate.rooms,
      furnished: real_estate.furnished,
      gallery: real_estate.gallery,
      sale: real_estate.sale,
      price: real_estate.price,
      owner: real_estate.owner
    }
    return this.http.post(`${this.uri}/realestate/updateRealEstate`, data);
  }

  deleteRealEstateService(_id) {
    const data = { _id: _id }
    return this.http.post(`${this.uri}/realestate/deleteRealEstate`, data)
  }

  approveRealEstateService(_id) {
    const data = { _id: _id }
    return this.http.post(`${this.uri}/realestate/approveRealEstate`, data)
  }

  promoteRealEstateService(_id) {
    const data = { _id: _id }
    return this.http.post(`${this.uri}/realestate/promoteRealEstate`, data)
  }

  removeFromPromotedService(_id) {
    const data = { _id: _id }
    return this.http.post(`${this.uri}/realestate/removeFromPromoted`, data)
  }

  sellRealEstateService(realestate, sale, owner, client, price) {
    const data = { 
      realestate: realestate,
      sale: sale,
      owner: owner,
      client: client,
      price: price
    }
    return this.http.post(`${this.uri}/realestate/sellRealEstate`, data)
  }

  getRentsService() {
    return this.http.get(`${this.uri}/realestate/getRents`);
  }

  reserveService(realestate, client, startdate, enddate) {
    const data = {
      realestate: realestate,
      client: client,
      startdate: startdate,
      enddate: enddate
    }
    return this.http.post(`${this.uri}/realestate/reserve`, data)
  }
}
