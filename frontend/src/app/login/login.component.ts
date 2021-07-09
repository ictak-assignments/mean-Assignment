import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' };

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {}

  // loginUser() {
  //   this._auth.loginUser(this.user).subscribe(
  //     (res) => {
  //       localStorage.setItem('token', res.token);
  //       localStorage.setItem('role', res.role);
  //       Swal.fire('successfully logined').then(() => {
  //         this._router.navigate(['/home']);
  //       });
  //     },
  //     (err) => {
  //       Swal.fire('Authentication failed').then(() => {
  //         this._router.navigate(['/login']);
  //       });
  //     }
  //   );
  // }
  loginUser() {
    this._auth.loginUser(this.user)
      .subscribe(
        response => {
          if (response.status) {
            localStorage.setItem('token', response.token)
            console.log(response.token)
            localStorage.setItem('role', response.role)
            this._router.navigate(['/books']);
          } else {
            Swal.fire(
              'Warning!!',
              'User not found!',
              'error')
              .then (
                refresh =>{
                  window.location.reload();
              }) 
          }
        })

      }
}
