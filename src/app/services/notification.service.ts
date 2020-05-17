import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private httpService: HttpService,
    private storageService: StorageService,
    private router: Router) { }

  NotifArrange(postData : any): Observable<any> {
      return this.httpService.post('add_invitation_details.php',postData);
  }
}
