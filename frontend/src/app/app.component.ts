import {RouterModule} from '@angular/router';
import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProductManagement';
  constructor(public _auth:AuthService,private _router:Router){}
  logoutUser() {
  localStorage.removeItem('token')
  Swal.fire('we will miss you').then(() => {
    this._router.navigate(['/login']);
  });
  }
  loggedUser() {
    this._router.navigate(['/books'])
  }
}

