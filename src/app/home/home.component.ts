import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Employee } from '../employee';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

_employeelist : Employee[];
id : number;
title = 'appBootstrap';
closeResult: string;

isdeleted = false;
  constructor(private _service:SignupService,private _route:Router,private _activatedRoute:ActivatedRoute,private modalService: NgbModal) { 
    
  }

  ngOnInit() {
    this.fetchData();
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  fetchData(){
    this._service.fetchEmployeeFromRemote().subscribe(
      data =>{
        
        console.log("Response received"),
        this._employeelist = data;
      },
      error => console.log("Exception occured")
    )
  }


  goToAddEmployee(){
    this._route.navigate(['/add']);
  }
  gotoupdate(id:number){
    this._route.navigate(['/update',id]);
    
  }
  
  deleteEmployee(id:number){
    this._service.deleteEmployeeByIdFromRemote(id).subscribe(
      data =>{
        console.log("Deleted Successfully"),
        this.fetchData();
      },
      error => console.log(error)
    )
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

  logout(){
    this._route.navigate(['/login']);
  }

}
