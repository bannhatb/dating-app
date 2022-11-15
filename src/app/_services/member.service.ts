import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = "https://localhost:7161/api/members/get-list-member";

  constructor( private httpClient: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}`);
  }
  getMemberByUsername(username: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/${username}`);
  }

}
