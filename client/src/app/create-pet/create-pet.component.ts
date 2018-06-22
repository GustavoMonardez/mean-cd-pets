import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css']
})
export class CreatePetComponent implements OnInit {
  errors_list:any;
  pet:any;
  constructor(
    private _petsService:PetsService,
    private _router:Router
  ) { }

  ngOnInit() {
    this.pet = {};
  }
  createOnePet(){
    this._petsService.createOnePet(this.pet).subscribe(data => {
      if(data["errors"]){
        console.log("error",data["errors"]);
        this.onError(data["errors"]);
      }else{
        this.onSuccess(data);console.log("success",data);
      }
    });
  }
  private onSuccess(pet){
    this._router.navigate(["/pets"]);
  }
  private onError(errors){
    this.errors_list = [];
    for(let key in errors){
      this.errors_list.push(errors[key].message);
    }
  }
}
