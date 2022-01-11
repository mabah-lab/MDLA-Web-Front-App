import { Component, OnInit } from '@angular/core';
import {MembresService} from '../../services/membres.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Membres} from '../../model/membres.model';

@Component({
  selector: 'app-membre-add',
  templateUrl: './membre-add.component.html',
  styleUrls: ['./membre-add.component.css']
})
export class MembreAddComponent implements OnInit {
  submitted: boolean=false;
  membreFormGrp: FormGroup;

  constructor(private membreService: MembresService,
              private membreFB: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.membreFormGrp= this.membreFB.group({
      nom:["ba",Validators.required],
      prenom:["al",Validators.required],
      numMbre:["D00",Validators.required],
      dateNais:["1970-01-30",Validators.required],
      telephone:[0,Validators.required],
      adresse:["Bruxelles",Validators.required],
      sexe:["Homme",Validators.required]
    })

  }

  onAddMembre() {
    this.submitted=true;
    if(this.membreFormGrp.invalid) return;
    this.membreService.addMembre(this.membreFormGrp.value)
      .subscribe(data=>{
        alert("Membre ajouté avec succès");
        this.router.navigateByUrl('/theMembers');
      },error=>{
        console.log(error);
      })
  }
}
