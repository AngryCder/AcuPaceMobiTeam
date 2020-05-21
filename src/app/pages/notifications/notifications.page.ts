import { Component, OnInit } from '@angular/core';
import { Directive, Renderer2, ElementRef} from '@angular/core';
import { NavController } from '@ionic/angular';
import { NotificationService } from './../../services/notification.service';
import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {MessagesPage} from '../messages/messages.page';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public authUser: any;
  public inviteForm: FormGroup;
  public list : any;
  public submitAttempt: boolean = false;

  bodystring: any;
  constructor(
    private renderer: Renderer2,
    public formBuilder: FormBuilder,
    private webservice: NotificationService,
    private auth: AuthService,
    public data : DataService    
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
  ngOnInit() {  
      this.auth.userData$.subscribe((res: any) => {this.authUser = res;console.log(typeof this.authUser);});
      let email = {"attendee_email" : this.authUser.user_email} ;
      this.webservice.notificationList(email).subscribe((res: any) => {this.list = res.result; console.log(this.list);});
    }
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
       this.webservice.AddInvitation(bodystring).subscribe();
    }
    else{
    console.log("error");
    }
  }
  goTo(channel_name) {
  this.data.setData(channel_name);
  console.log(channel_name);
  }


}