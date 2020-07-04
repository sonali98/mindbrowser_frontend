import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { SignupService } from '../signup.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  employee = new Employee();
  msg='';
  isupdated=false;
  dialog: any;
  title = 'appBootstrap';
  closeResult: string;

  constructor(private _service : SignupService, private _route : Router,private _activatedRoute:ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit() {
    let id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this._service.fetchEmployeeByIdFromRemote(id).subscribe(
      data => {
        console.log("Response received");
        console.log(id);
        console.log(data);
        this.employee = data;
      },
      error => {
      console.log("Exception occured");
      }
    )
  }
  updateEmployee(){
    this._service.addEmployeeFromRemote(this.employee).subscribe(
      data => {
        console.log("Employee Added !!");
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
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  

}
