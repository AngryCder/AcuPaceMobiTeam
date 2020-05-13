import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from './../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { FormBuilder, FormsModule,FormControl,Validators, FormGroup ,ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {

  public registerForm: FormGroup;
  public submitAttempt: boolean = false;
  show: boolean = true;
  bodystring: any;
  lat: any;
  long: any; 
 
  // postData = {
  //   name: '',
  //   username: '',
  //   email: '',
  //   password: ''
  // };

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private router: Router,
    public formBuilder: FormBuilder, 

  ) {

   
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$'), Validators.required])],
      mobile: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])]
    }); 

  }

  ngOnInit() {}

  // validateInputs() {
  //   let username = this.postData.username.trim();
  //   let password = this.postData.password.trim();
  //   let email = this.postData.email.trim();
  //   let name = this.postData.name.trim();
  //   return (
  //     this.postData.name &&
  //     this.postData.username &&
  //     this.postData.password &&
  //     this.postData.email &&
  //     email.length > 0 &&
  //     username.length > 0 &&
  //     email.length > 0 &&
  //     password.length > 0
  //   );
  // }

  signupAction() {

  //   if (this.validateInputs()) { 

    this.submitAttempt = true;

    if (this.registerForm.valid) {
      let bodystring = {
        "name": this.registerForm.get('name').value,
        "email": this.registerForm.get('email').value,
        "mobileno": this.registerForm.get('mobile').value,
        "lat": '',
        "long": '',
        "device_id": '',  
        "device_details": '' 
      };  

      this.authService.signup(bodystring).subscribe(
        (res: any) => {
          if (res) {

            this.toastService.presentToast(res.message);  

            // Storing the User data. 
            
            this.router.navigate(['login']); 
              
          }else {
            // this.toastService.presentToast(
            //   'Data alreay exists, please enter new details.'
            // );  
          }
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter name, email, username or password.'
      );
    }
  }
}
