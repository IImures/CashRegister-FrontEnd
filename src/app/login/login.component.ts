import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AuthResponse} from "../interfaces/authResponse";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const data = this.loginForm.value;

    this.authService.login(data.email, data.password).subscribe(
      {
        next: (data : AuthResponse) => {
          this.localStorage.setTokens(data);
          this.router.navigate(['/edit']);
        }
      }
    );
  }
}
