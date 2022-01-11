import { Component, OnInit } from '@angular/core';
import {MembresService} from '../../services/membres.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Membres} from '../../model/membres.model';

@Component({
  selector: 'app-membre-edit',
  templateUrl: './membre-edit.component.html',
  styleUrls: ['./membre-edit.component.css']
})
export class MembreEditComponent implements OnInit {
  membreFormGrp?: FormGroup;
  membreId: number;
  submitted: boolean=false;
  constructor(private membreService: MembresService,
              private membreFb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.membreId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.membreService.getMembre(this.membreId)
      .subscribe(membre=>{
        this.membreFormGrp=this.membreFb.group({
          id:[membre.id,Validators.required],
          nom:[membre.nom,Validators.required],
          prenom:[membre.prenom,Validators.required],
          numMbre:[membre.numMbre,Validators.required],
          dateNais:[membre.dateNais,Validators.required],
          telephone:[membre.telephone,Validators.required],
          adresse:[membre.adresse,Validators.required],
          sexe:[membre.sexe,Validators.required]
        })
      })
  }

  onUpdateMembre() {
    this.submitted=true;
    if(this.membreFormGrp?.invalid) return;
    this.membreService.updateMembre(this.membreFormGrp?.value)
      .subscribe(data=>{
        alert("Le membre a été mis à jour avec succès");
        this.router.navigateByUrl('/theMembers');
      },error => {
        console.log(error);
      })

  }
}
