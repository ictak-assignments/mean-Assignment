import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}
  private Url = 'http://localhost:3000/register';
  passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;


  ngOnInit(): void {}
  user = {
    username: '',
    email: '',
    password: '',
  };

  registerForm = this.fb.group({
    email: [
      '',
      [
        Validators.pattern('^[a-z0-9.%+]+@[a-z09.-]+.[a-z]{2,4}'),
        Validators.required,
      ],
    ],
    password: ['', [Validators.minLength(6),Validators.pattern(this.passwordReg), Validators.required]],
  });

  newUser(item: any) {
    return this.http.post(this.Url, { "user": item });
  }

  registerUser() {
    this.newUser(this.registerForm.value).subscribe((response) => {
      if (response) {
        Swal.fire('Successfully Added', '', 'success').then(() => {
          this.router.navigate(['/']);
        });
      } else {
        console.log('Network Error');
        Swal.fire('Network Error', 'Please do after sometime ', 'error').then(
          () => {
            this.router.navigate(['/register']);
          }
        );
      }
    });
  }
}
