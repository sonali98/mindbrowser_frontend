import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { User } from '../user';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User();
  msg='';
  constructor(private _service : SignupService, private _route : Router) { }

  ngOnInit(): void {
  }

  signupUser(){
    this._service.signupUserFromRemote(this.user).subscribe(
      data => {
        console.log("Response received");
        this.msg = "Registration Successful !!";
        this._route.navigate(['/login']);
      },
      error => {
      console.log("Exception occured");
      this.msg = "User with this emailId is already exist!!";
      }
    )
  }
}
