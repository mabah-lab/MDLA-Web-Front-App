import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AppDataState, DataStateEnum} from '../../state/membres.state';
import {Membres} from '../../model/membres.model';
import {MembresService} from '../../services/membres.service';
import {Router} from '@angular/router';
import {catchError, map, startWith} from 'rxjs/operators';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-the-members',
  templateUrl: './the-members.component.html',
  styleUrls: ['./the-members.component.css']
})
export class TheMembersComponent implements OnInit {

  membres$:Observable<AppDataState<Membres[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;

  /*public currentPage: number=0;
  public size: number=3;
  public totalPages: number=0;
  public pages:Array<number>;*/

  public thePageNumber: number=1;
  public thePageSize: number=3;
  public theTotalElements: number=0;

  public currentKeyword: string="";
  private editPhoto: boolean;
  private currentMembre: Membres;
  private selectedFile ;
  private progress: number;
  private currentFileUpload: any;
  public currentAction: string='all';

  constructor(private membreService: MembresService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetMembresNg();
  }



  onDeleteMembre(membre: Membres) {
    let conf= confirm("Voulez-vous vraiment supprimer ce membre?");
    if(conf==true)
      this.membreService.deleteMembre(membre.id)
        .subscribe(data=>{
          alert("Membre supprimé avec succès");
          this.onGetMembresNg();
        })
  }

  onEditMembre(membre: Membres) {
    this.router.navigateByUrl('/editMembre/'+membre.id);

  }

  onEditPhoto(m: any) {
    this.currentMembre=m;
    this.editPhoto= true;
  }

  onSelectedFile(event) {
    this.selectedFile= event.target.files;
  }

  onUploadPhoto() {
    this.progress=0;
    this.currentFileUpload= this.selectedFile.item(0);
    this.membreService.uploadPhoto(this.currentFileUpload,this.currentMembre.id).subscribe(event=>{
      if(event.type===HttpEventType.UploadProgress){
        this.progress=Math.round(100*event.loaded/event.total);
      }else if (event instanceof HttpResponse){
        alert("Données chargées avec succès");
        this.onGetMembresNg();
      }
    }, error=>{
      alert("problème de chargement"+JSON.parse(error.error).message);
    })
  }

  onGetMembresNg(){
    this.currentAction='all';
    this.membres$= this.membreService.getMembres(this.thePageNumber-1,this.thePageSize).pipe(
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
  onGetMembresMenNg(){
    this.currentAction='men';
    this.membres$= this.membreService.getMembresMenNg(this.thePageNumber-1,this.thePageSize).pipe(
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
  onGetMembresWomenNg() {
    this.currentAction='women';
    this.membres$= this.membreService.getMembresWomenNg(this.thePageNumber-1,this.thePageSize).pipe(
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
  onSearchMembresNg(value: any) {
    this.thePageNumber=1;
    this.currentKeyword=value.keyword;
    this.searchMembresNg();
  }
  onPageMembreNg() {
   // this.thePageNumber=i;
    if(this.currentAction=='all'){
      this.onGetMembresNg();
    }else if(this.currentAction=='men'){
      this.onGetMembresMenNg();
    }else{
      this.onGetMembresWomenNg();
    }

  }
  searchMembresNg() {
    this.membres$= this.membreService.getSearchMembre(this.currentKeyword,this.thePageNumber-1,this.thePageSize).pipe(
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

  onCotisationByMembre(membre: Membres) {
    this.router.navigateByUrl('/cotisationByMbre/'+membre.id);

  }
  onMembreDetails(membre: Membres) {
    this.router.navigateByUrl('/membreDetails/'+membre.id);

  }




}
