import {Component, OnInit} from '@angular/core';
import {Membres} from '../../model/membres.model';
import {Observable, of} from 'rxjs';
import {MembresService} from '../../services/membres.service';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../state/membres.state';
import {Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-list-membres',
  templateUrl: './list-membres.component.html',
  styleUrls: ['./list-membres.component.css']
})
export class ListMembresComponent implements OnInit {
  membres$:Observable<AppDataState<Membres[]>> |null=null;
  readonly DataStateEnum=DataStateEnum;

  public currentPage: number=0;
  public size: number=5;
  public pages:Array<number>;
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
    this.onGetMembres();
  }
  onGetMembres(){
    this.currentAction='all';
    this.membres$= this.membreService.getMembres(this.currentPage,this.size).pipe(
    map((data)=>{
      this.pages=new Array<number>(data['page'].totalPages);
      return ({dataState:DataStateEnum.LOADED, data: data})
    }),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }
  onGetMembresMen(){
    this.currentAction='men';
    this.membres$= this.membreService.getMembresMen(this.currentPage,this.size).pipe(
      map((data)=>{
        this.pages=new Array<number>(data['page'].totalPages);
        return ({dataState:DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }
  onGetMembresWomen() {
    this.currentAction='women';
    this.membres$= this.membreService.getMembresWomen(this.currentPage,this.size).pipe(
      map((data)=>{
        this.pages=new Array<number>(data['page'].totalPages);
        return ({dataState:DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }

  onDeleteMembre(membre: Membres) {
    let conf= confirm("Voulez-vous vraiment supprimer ce membre?");
    if(conf==true)
    this.membreService.deleteMembre(membre.id)
      .subscribe(data=>{
        alert("Membre supprimé avec succès");
        this.onGetMembres();
      })
  }

  onEditMembre(membre: Membres) {
    this.router.navigateByUrl('/editMembre/'+membre.id);

  }


  searchMembres() {
    this.membres$= this.membreService.getSearchMembre(this.currentKeyword,this.currentPage,this.size).pipe(
      map((data)=>{
        this.pages=new Array<number>(data['page'].totalPages);
        return ({dataState:DataStateEnum.LOADED, data: data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }
  onSearchMembres(value: any) {
    this.currentPage=0;
    this.currentKeyword=value.keyword;
    this.searchMembres();

  }

  onPageMembre(i: number) {
    this.currentPage=i;
    if(this.currentAction=='all'){
      this.onGetMembres();
    }else if(this.currentAction=='men'){
      this.onGetMembresMen();
    }else{
      this.onGetMembresWomen();
    }

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
        this.onGetMembres();
      }
    }, error=>{
      alert("problème de chargement"+JSON.parse(error.error).message);
    })
  }
}
