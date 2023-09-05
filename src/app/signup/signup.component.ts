import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFunctionsService } from '../services/global-functions.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../login/login.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private fb: FormBuilder, public globalFunctions: GlobalFunctionsService){
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {
  }

  signupForm!: FormGroup;
  showErrors: boolean = false

  isPasswordMatch(): boolean {
    return this.signupForm.get('cpassword')?.value === this.signupForm.get('password')?.value;
  }
}
