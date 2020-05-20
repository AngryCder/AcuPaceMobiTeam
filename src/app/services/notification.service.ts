import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  api: any = 'http://acupace.co.in';
  apiUrlv1: any = this.api + '/videoconfwebservice/';
  loader: any;
  headers;
  data: any;
  constructor(
    private http: HttpClient,

    private router: Router
  ) {}

  public AddInvitation(bodystring) {
    return new Promise((resolve) => {
      this.http
        .post(
          this.apiUrlv1 + 'add_invitation_details.php',
          bodystring,
          this.headers
        )
        //  .map(res => res.json())
        .subscribe(
          (data) => {
            //   this.loader.dismissAll();
            this.data = data;
            console.log(JSON.stringify(data));
            resolve(this.data);
          },
          (err) => {
            console.log(err);
            if (400) {
              resolve(err);
              console.log(err);
              // this.showAlert("Ooops!! Some problem is there.");
              // this.loader.dismissAll();
            } else {
              console.log(
                'Invitation sent Sucessfully on the mail of attendee'
              );
              // this.showAlert("Ooops!! Some problem is there.");
              // this.loader.dismissAll();
            }
          }
        );
    });
  }

  public notificationList(bodystring){

   return new Promise((resolve) => {
      this.http
        .post(
          this.apiUrlv1 + 'invitation_notificationlist.php',
          bodystring,
          this.headers
        )
        //  .map(res => res.json())
        .subscribe(
          (data) => {
            //   this.loader.dismissAll();
            this.data = data;
            console.log(JSON.stringify(data));
            resolve(this.data);
          },
          (err) => {
            console.log(err);
            this.loader.dismissAll();
            if (400) {
              resolve(err);
              console.log(err);
              // this.showAlert("Ooops!! Some problem is there.");
              // this.loader.dismissAll();
            } else {
              console.log(
                'List retrived'
              );
              // this.showAlert("Ooops!! Some problem is there.");
              // this.loader.dismissAll();
            }
          }
        );
    });


  }
}