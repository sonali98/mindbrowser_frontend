import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  employee = new Employee();
  msg='';
  constructor(private _service : SignupService, private _route : Router) { }

  ngOnInit(): void {
  }

  addEmployee(){
    this._service.addEmployeeFromRemote(this.employee).subscribe(
      data => {
        console.log("Response received");
        this.msg = "Employee Added !!";
        this._route.navigate(['home']);
      },
      error => {
      console.log("Exception occured");
      this.msg = "Unable to add employee";
      }
    )
  }

  gotolist(){
    this._route.navigate(['home']);
  }
}
