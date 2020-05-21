import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
import { FormBuilder, FormsModule,FormControl,Validators, FormGroup ,ReactiveFormsModule} from '@angular/forms';
  

@Component({ 
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit { 

  public loginForm: FormGroup;
  public submitAttempt: boolean = false;


  // postData = {
  //   mobileno: '',
  //   password: ''
  // };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    public formBuilder: FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      mobileno: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
      password: ['',Validators.compose([Validators.required])]
   });    

  }   

  ngOnInit() {}


  // validateInputs() {
  //   console.log(this.loginForm);
  //   let mobileno = this.loginForm.mobileno.trim();
  //   let password = this.loginForm.password.trim();
  //   return ( 
  //     this.loginForm.mobileno &&
  //     this.loginForm.password &&
  //     mobileno.length <= 10 &&
  //     password.length > 0
  //   );
  // }

  loginAction() {

    this.submitAttempt = true;


    // if (this.validateInputs()) {
      
      if(this.loginForm.valid){  

        let bodystring={
          "mobileno": this.loginForm.get('mobileno').value,
          "password": this.loginForm.get('password').value,
     }; 

      this.authService.login(bodystring).subscribe(
        (res: any) => { 
          console.log('logged data',JSON.stringify(res));

          let data=JSON.stringify(res); 

          console.log('login res -> ', res['result']); 
         
          if(res['result']!='No Record'){
            // Storing the User data.
            this.storageService
              .store(AuthConstants.AUTH, res.result)
              .then(res => {
                this.router.navigate(['home']);
              });
          } else {
            this.toastService.presentToast('Incorrect username and password.');
          }
        },
        (error: any) => {
          this.toastService.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter mobileno or password.'
      );
    }
  }
}
