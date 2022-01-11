import { Component, OnInit } from '@angular/core';
import {MembresService} from '../../services/membres.service';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppDataState, DataStateEnum} from '../../state/membres.state';
import {Membres} from '../../model/membres.model';
import {catchError, map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-membre-details',
  templateUrl: './membre-details.component.html',
  styleUrls: ['./membre-details.component.css']
})
export class MembreDetailsComponent implements OnInit {

  membreId: number;
  membres$:Observable<AppDataState<Membres[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private membreService: MembresService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.membreId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.onGetMembre();
  }
  onGetMembre(){
    this.membres$= this.membreService.getMembre(this.membreId).pipe(
      map((data)=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }

}
