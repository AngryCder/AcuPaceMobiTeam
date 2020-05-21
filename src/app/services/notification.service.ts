import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private httpservice : HttpService,
    private router: Router
  ) {}

  public AddInvitation(bodystring) {
 return this.httpservice.post("add_invitation_details.php",bodystring);
  }

  public notificationList(bodystring){
  return this.httpservice.post("invitation_notificationlist.php",bodystring);
  }
}