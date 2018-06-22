import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  errors_list:any;
  all_pets:any;
  constructor(
    private _petsService:PetsService,
    private _router:Router
  ) { }

  ngOnInit() {
    this._router.navigate(["/pets"]);
    this.getAllPets();
  }
  getAllPets(){
    this._petsService.getAllPets().subscribe(data => {
      if(data["errors"]){
        this.onError(data["errors"]);
      }else{
        this.onSuccess(data);
      }
    });
  }
  private onSuccess(pets){
     this.all_pets = pets;
  }
  private onError(errors){
    this.errors_list = [];
    for(let key in errors){
      this.errors_list.push(errors[key].message);
    }
  }
}
