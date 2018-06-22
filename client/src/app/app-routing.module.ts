import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { DetailsPetComponent } from './details-pet/details-pet.component';

const routes: Routes = [
    {path:"", component:PetsComponent},
    {path:"pets", component:PetsComponent},
    {path:"pets/new",component:CreatePetComponent},
    {path:"pets/:id",component:DetailsPetComponent},
    {path:"pets/:id/edit",component:EditPetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
