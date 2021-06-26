import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  grantAccessService(username) {
    const data = { username: username }
    return this.http.post(`${this.uri}/admin/grantAccess`, data)
  }

  deleteUserService(username) {
    const data = { username: username }
    return this.http.post(`${this.uri}/admin/deleteUser`, data)
  }

  setSalePercentageService(percentage) {
    const data = { percentage: percentage }
    return this.http.post(`${this.uri}/admin/setSalePercentage`, data)
  }

  setRentPercentageService(percentage) {
    const data = { percentage: percentage }
    return this.http.post(`${this.uri}/admin/setRentPercentage`, data)
  }

  getPercentageService() {
    return this.http.get(`${this.uri}/admin/getPercentage`)
  }

}
