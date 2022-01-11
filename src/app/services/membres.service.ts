import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Membres} from '../model/membres.model';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {host} from '@angular-devkit/build-angular/src/test-utils';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root' } )
export class MembresService {
  public host= environment.host;
  constructor(private http: HttpClient) {
  }

  getMembresPage(page: number, size: number): Observable <Membres[]> {
    let host = this.host;
    return this.http.get<Membres[]>(host + '/membres?page='+page+'&size='+size)
  }
  getMembres(page: number, size: number): Observable <Membres[]> {
      let host = this.host;
      return this.http.get<Membres[]>(host + '/membres?page='+page+'&size='+size);
    }

  deleteMembre(membreId: number): Observable<void> {
    let host = this.host;
    return this.http.delete<void>(host+'/membres/'+membreId);
  }

  getMembre(membreId: number): Observable<Membres> {
    let host = this.host;
    return this.http.get<Membres>(host+'/membres/'+membreId);
  }

  updateMembre(membre: Membres): Observable<Membres> {
    let host = this.host;
    return this.http.put<Membres>(host+'/membres/'+membre.id, membre);
  }

  addMembre(membre: Membres): Observable<Membres> {
    let host = this.host;
    return this.http.post<Membres>(host+'/membres', membre);
  }

  getMembresMen(page: number, size: number): Observable<Membres[]> {
    let host = this.host;
    let mc= 'Homme';
    return this.http.get<Membres[]>(host + '/membres/search/byGenre?mc='+mc+'&?page='+page+'&size='+size);
  }

  getMembresWomen(page: number, size: number): Observable<Membres[]> {
    let host = this.host;
    let mc= 'Femme';
    return this.http.get<Membres[]>(host + '/membres/search/byGenre?mc='+mc+'&?page='+page+'&size='+size);
  }

  getSearchMembre(keyword,page:number,size:number): Observable<Membres[]> {
    let host = this.host;
    return this.http.get<Membres[]>(host+'/membres/search/byNomPrenomNumMbrePage?mc='+keyword+'&?page='+page+'&size='+size);
  }

  uploadPhoto(file: File, idMbre: number): Observable<HttpEvent<{}>> {
    let formdata: FormData= new FormData();
    formdata.append('file',file);
    const req= new  HttpRequest('POST', this.host+'/uploadPhoto/'+idMbre,formdata,{
      reportProgress: true,
      responseType:'text'
    });
    return  this.http.request(req);
  }


  getMembresNg(page: number, size: number): Observable <Membres[]> {
    let host = this.host;
    return this.http.get<Membres[]>(host + '/membres?page='+page+'&size='+size)
  }

  getMembresMenNg(page: number, size: number): Observable<Membres[]> {
    let host = this.host;
    let mc= 'Homme';
    return this.http.get<Membres[]>(host + '/membres/search/byGenre?mc='+mc+'&page='+page+'&size='+size);
  }

  getMembresWomenNg(page: number, size: number): Observable<Membres[]> {
    let host = this.host;
    let mc= 'Femme';
    return this.http.get<Membres[]>(host + '/membres/search/byGenre?mc='+mc+'&page='+page+'&size='+size);
  }


}

interface GetResponseMembers{
  _embedded:{
    membres: Membres[];
  }
  page:{
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}
