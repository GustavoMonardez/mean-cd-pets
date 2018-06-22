import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(
    private _http:HttpClient
  ) { }
  createOnePet(pet){
    return this._http.post("/api/pets",pet);
  }
  readOnePet(id){
    return this._http.get("/api/pets/"+id);
  }
  updateOnePet(id,pet){
    console.log("service",id,pet);
    return this._http.put("/api/pets/"+id,pet);
  }
  deleteOnePet(id){
    return this._http.delete("/api/pets/"+id);
  }
  getAllPets(){
    return this._http.get("/api/pets");
  }
  likeOnePet(id){
    return this._http.put("/api/pets/like/"+id,{like:1});
  }
}
