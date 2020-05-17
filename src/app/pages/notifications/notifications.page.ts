import { Component, OnInit } from '@angular/core';
import { NotificationService } from './../../services/notification.service';
import { AuthService } from './../../services/auth.service';
import { HttpService  } from './../../services/http.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public authUser: any;
  public scheduledTimeStart : string;
  public scheduledTimeEnd : string;
  public reciveEmail : string;

  constructor(private notif:NotificationService,private httpService: HttpService,
  private auth: AuthService,private deviceService: DeviceDetectorService) {         
  }

  addInvite(){
   let bodystring = {
        "host_id":this.authUser.ID,
        "host_name":this.authUser.name,
        "host_email":this.authUser.user_email,
        "role" : "host",
        "host_device_details":"llll",
        "host_meeting_start_time": this.scheduledTimeStart,
        "host_meeting_end_time": this.scheduledTimeEnd,
        "attendee_email": this.reciveEmail,
      };
      this.notif.NotifArrange(bodystring).subscribe();
  }

  ngOnInit() {
   this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
    });
  }

}
