import { Component, OnInit } from '@angular/core';
import {CotisationsService} from '../../services/cotisations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppDataState, DataStateEnum} from '../../state/membres.state';
import {Membres} from '../../model/membres.model';
import {Cotisations} from '../../model/cotisations.model';
import {catchError, map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-cotisation-by-membre',
  templateUrl: './cotisation-by-membre.component.html',
  styleUrls: ['./cotisation-by-membre.component.css']
})
export class CotisationByMembreComponent implements OnInit {

  cotisationsByMbre$:Observable<AppDataState<Cotisations[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;

  membreId: number;

  public thePageNumber: number=1;
  public thePageSize: number=3;
  public theTotalElements: number=0;

  constructor(private cotisationService:CotisationsService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {
    this.membreId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.onGetCotisationsByMbre();
  }

  onGetCotisationsByMbre(){
    //this.currentAction='all';
    this.cotisationsByMbre$= this.cotisationService.getCotisationsByMbre(this.membreId,this.thePageNumber-1,this.thePageSize).pipe(
      map((data)=>{
        this.thePageSize=data['page'].size;
        this.thePageNumber=data['page'].number+1;
        this.theTotalElements=data['page'].totalElements;
        console.log(data);
        return ({dataState:DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }


  onDeleteCotisation(cotisation: Cotisations) {
    let conf= confirm("Voulez-vous vraiment supprimer cette cotisation?");
    if(conf==true)
      this.cotisationService.deleteCotisation(cotisation.id)
        .subscribe(data=>{
          alert("Cotisation supprimée avec succès");
          this.onGetCotisationsByMbre();
        })
  }

  onEditCotisation(m: any) {

  }

  onSearchCotisation(value: any) {

  }
  onCotisationAdd(membreId: number) {
    this.router.navigateByUrl('/cotisationAdd/'+membreId);

  }
}
