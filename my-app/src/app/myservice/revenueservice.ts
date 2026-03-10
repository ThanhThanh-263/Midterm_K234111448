import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Revenueservice {
  private apiUrl = 'http://localhost:3002/api';

  constructor(private http: HttpClient) {}

  getRevenue(year?: number, month?: number): Observable<any> {
    let url = `${this.apiUrl}/revenue`;

    const params: any = {};
    
    if (year) params['year'] = year;
    if (month) params['month'] = month;

    return this.http.get(url, { params });
  }

  getRevenueByYear(year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/revenue/year/${year}`);
  }

  getTopCustomers(limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/revenue/top-customers`, {
      params: { limit: limit.toString() }
    });
  }

  getRevenueStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/revenue/stats`);
  }
}
