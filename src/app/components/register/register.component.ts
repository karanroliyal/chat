import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormValidationComponent } from '../../utility/form-validation/form-validation.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { globalRouting } from '../../services/global-routing';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormValidationComponent , ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private GS: globalRouting , private router: Router){}

  registrationForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z ]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10) , Validators.maxLength(10) , Validators.pattern(/^[0-9]{10}$/)]),
    profile: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8) , Validators.maxLength(15) ,Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)])

  })

  file:any;

  fileUplaod(event:any){
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Convert file to Base64
      reader.onload = () => {
        this.file = reader.result; // Save file as base64 string
      };
    }
  }

  registration(){
    this.registrationForm.markAllAsTouched();

    const formData = {
      ...this.registrationForm.value,
      profile: this.file // Add the file data to the payload
    };

    // if(this.registrationForm.valid){
      this.GS.api('registartion','',formData).subscribe((res:any)=>{
        if(res.statusCode == 200){
          this.GS.toast(res.message)
          this.router.navigate(['/chat']);
        }else{
          this.GS.toast(res.message , 'danger')
        }
      })
    // }

  }

}



