import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetsComponent } from './pets/pets.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { DetailsPetComponent } from './details-pet/details-pet.component';

import { FormsModule } from '@angular/forms';

import { PetsService } from './pets.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    EditPetComponent,
    CreatePetComponent,
    DetailsPetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
