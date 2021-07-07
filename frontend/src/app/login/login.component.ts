
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { FormBuilder,Validators} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={username:'',password:''}

  constructor(private _auth: AuthService,private _router:Router,private fb:FormBuilder) { }
 
  ngOnInit() {
  }

  loginUser () {
    this._auth.loginUser(this.user)
    .subscribe(
      res => {
        
        localStorage.setItem('token', res.token)
        localStorage.setItem('role', res.role)
        Swal.fire('successfully logined').then(() => {
          this._router.navigate(['/']);
        });
        
        

      },
      err => {
        Swal.fire('your login failed').then(() => {
          this._router.navigate(['/login']);
        });
      }
    ) 
  }

}

