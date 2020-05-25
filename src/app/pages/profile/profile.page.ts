import { Component, OnInit } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { AuthService } from './../../services/auth.service';
import { ToastService } from './../../services/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpService } from './../../services/http.service';
import { StorageService } from './../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
   
  public authUser: any;
  public profileForm =new FormGroup ({ userId: new FormControl(), address: new FormControl()});
  public item : any;

  postData = {
    user_id: '',
    token: ''
  };
  constructor(
    private auth: AuthService,private httpservice : HttpService,
    private toastService: ToastService,private formBuilder: FormBuilder

  ) {
   this.profileForm = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]]
   });
      }

  ngOnInit() {
    this.auth.userData$.subscribe((res: any) => {
      this.authUser = res;
    });
    this.httpservice.post("myprofile.php",{"userId":this.authUser.ID}).subscribe((response)=>{this.item = response;console.log(response);});
  }

refresh(){
let upload_details = {
"password":this.profileForm.get('password').value,
"address":this.profileForm.get('address').value,
"userId":this.authUser.ID,
"name":this.profileForm.get('name').value,
"profile_pic":"http://acupace.co.in/videoconfwebservice/upload_image/avatar.png"
}; 
this.httpservice.post("update_user.php",upload_details).subscribe((response)=>{this.item = response;console.log(response);});

}


}
