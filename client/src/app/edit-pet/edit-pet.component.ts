import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  errors_list:any;
  pet:any;
  constructor(
    private _petsService:PetsService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit() {
    this.pet = {};
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
  updateOnePet(){
    console.log("called with",this.pet);
    this._petsService.updateOnePet(this.pet._id,this.pet).subscribe(data => {
      if(data["errors"]){
        console.log("error",data["errors"]);
        this.onError(data["errors"]);
      }else{
        this._router.navigate(["/pets"]);
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
