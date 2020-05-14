import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { AuthService } from './../../services/auth.service';
import { ToastService } from './../../services/toast.service';
import { AuthConstants } from '../../config/auth-constants';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
   
  public authUser: any;

  postData = {
    user_id: '',
    token: ''
  };
  constructor(
    private auth: AuthService,
    private feedSerive: FeedService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
    });
  }




}
