import { Component, OnInit } from '@angular/core';
import {CotisationsService} from '../../services/cotisations.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, NgForm} from '@angular/forms';
import NumberFormat = Intl.NumberFormat;
import DateTimeFormat = Intl.DateTimeFormat;
import {stringify} from 'querystring';
import {Observable} from 'rxjs';
import {Cotisations} from '../../model/cotisations.model';

@Component({
  selector: 'app-cotisation-add',
  templateUrl: './cotisation-add.component.html',
  styleUrls: ['./cotisation-add.component.css']
})
export class CotisationAddComponent implements OnInit {
  private membreId: number;
  private mois: number=1;
  private annee:number=2021;
  private montant: number=5;
  //private nbreMois: any= new FormControl('');
  public paie: boolean;
  private nMois: number=5;

  private startYear: number=5;
  private startMonth: string;
  cotis: Cotisations;

  cotisationYear: number[]=[];
  cotisationMonth: number[]=[];

  constructor(private cotisationService: CotisationsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.membreId=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {

    this.onLastCotisationMbre();
    this.onInitYearAndMonth();


  }

  counter(i: number) {
    return new Array(i);
  }
  onLastCotisationMbre(){
    this.cotisationService.getLastCotisationByMbre(this.membreId).subscribe(
      data =>{
        this.startYear=Number(data.annee);
        this.startMonth=data.mois;
        this.cotis=data;
        //console.log(this.cotis);
        console.log(this.startMonth);
        console.log(this.startYear);
      },error=>{
        console.log(error)
      }
    );
  }

  onGetNbreMois(form: NgForm) {
    this.nMois=Number(form.value['nbreMois']);
    console.log(this.nMois);
    this.paie=true;
  }

  onInitYearAndMonth():void{
   // const startYear: number= new Date().getFullYear();
    const startMonth: number=1;
    console.log("year: "+this.cotis);

    this.cotisationService.getCotisationAnnee(this.cotis.annee).subscribe(
      data=>{
        console.log("Les annees"+JSON.stringify(data));
        this.cotisationYear=data;
      }
    );
    this.cotisationService.getCotisationMois(startMonth).subscribe(
      data =>{
        console.log("les mois: "+JSON.stringify(data));
        this.cotisationMonth=data;
      }
    )
  }

}
