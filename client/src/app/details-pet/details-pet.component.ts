import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details-pet',
  templateUrl: './details-pet.component.html',
  styleUrls: ['./details-pet.component.css']
})
export class DetailsPetComponent implements OnInit {
  errors_list:any;
  pet:any;
  isDisabled:any;
  constructor(
    private _petsService:PetsService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
    this.pet = {};
    this.isDisabled = false;
    this._route.params.subscribe((params:Params) => this.readOnePet(params["id"]));
  }
  readOnePet(id){
    this._petsService.readOnePet(id).subscribe(data => {
      if(data["errors"]){
        console.log("error",data["errors"]);
        this.onError(data["errors"]);
      }else{
        console.log("success");
        this.onSuccess(data);
      }
    })
  }
  deleteOnePet(){
    this._petsService.deleteOnePet(this.pet._id).subscribe(data => {
      if(data["errors"]){
        console.log("error",data["errors"]);
        this.onError(data["errors"]);
      }else{
        console.log("success");
        this._router.navigate(["/pets"]);
      }
    });
  }
  likeOnePet(){
    this.isDisabled = true;
    this._petsService.likeOnePet(this.pet._id).subscribe(data => {
      if(data["errors"]){
        console.log("error",data["errors"]);
        this.onError(data["errors"]);
        //this.isDisabled = false;
      }else{
        console.log("success");
        this.readOnePet(this.pet._id);
        //this.isDisabled = false;
      }
    });
  }
  private onSuccess(pet){
    console.log("pet",pet);
    this.pet = pet;
  }
  private onError(errors){
    this.errors_list = [];
    for(let key in errors){
      this.errors_list.push(errors[key].message);
    }
  }
}
