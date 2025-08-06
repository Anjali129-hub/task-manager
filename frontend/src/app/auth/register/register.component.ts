import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      is_manager: [false]
    });
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
  this.errorMessage = null;

  if (this.registerForm.valid) {
    const { fullName, contact, password, is_manager } = this.registerForm.value;

    const payload = {
      username: contact,
      full_name: fullName,
      email: contact,
      password: password,
      is_manager: is_manager
    };

    this.http.post('http://127.0.0.1:8000/api/register/', payload).subscribe({
      next: (res) => {
        console.log('Registered:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // ✅ Yahan error message ko dhang se show karo
        if (err.error?.non_field_errors?.[0]) {
          this.errorMessage = err.error.non_field_errors[0];
        } else if (err.error?.email?.[0]) {
          this.errorMessage = err.error.email[0];
        } else {
          this.errorMessage = 'Registration failed. Try again.';
        }
        console.error('Registration error:', err);
      }
    });
  }
}

}
