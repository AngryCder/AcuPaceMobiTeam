import { Component, OnInit } from '@angular/core';
import { Directive, Renderer2, ElementRef} from '@angular/core';
import { NotificationService } from './../../services/notification.service';
import { AuthService } from './../../services/auth.service';
import { HttpService } from './../../services/http.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
 public authUser: any;
  public inviteForm: FormGroup;
  public submitAttempt: boolean = false;

  bodystring: any;
  constructor(
  
    public formBuilder: FormBuilder,
    private webservice: NotificationService,
    private auth: AuthService   
  ) {
    this.inviteForm = this.formBuilder.group({
      attendee_email: [
        '',
        Validators.compose([
          Validators.pattern(
            '^[a-zA-Z0-9.]+[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'
          ),
          Validators.required,
        ]),
      ],
      host_meeting_start_time: ['', Validators.compose([Validators.required])],
      host_meeting_end_time: ['', Validators.compose([Validators.required])],
    });
  }
  ngOnInit() {  this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
      let email = {"attendee_email" : this.authUser.user_email} ;
      let list = this.webservice.notificationList(email);
      console.log(list);
    });}
  Invite() {
    this.submitAttempt = true;
    console.log(this.inviteForm);
    if (this.inviteForm.valid) {
      let bodystring = {
        host_id: this.authUser.ID,
        host_name: this.authUser.name,
        host_email: this.authUser.user_email,
        role: 'host',
        host_device_details: "device_name",
        host_meeting_start_time: this.inviteForm.get('host_meeting_start_time')
          .value,
        host_meeting_end_time: this.inviteForm.get('host_meeting_end_time')
          .value,
        attendee_email: this.inviteForm.get('attendee_email').value,
      };
      console.log(bodystring);
      this.webservice.AddInvitation(bodystring).then(
        (response) => {
          let data = JSON.stringify(response);
          // this.webservice.showAlert(response);
          // this.navCtrl.setRoot(LoginPage);
          console.log('data' + data);
        },
        (err) => {
          console.log('Error' + err);
        }
      );
    }
    else{
    console.log("error");
    }
  }

}