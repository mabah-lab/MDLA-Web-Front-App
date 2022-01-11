import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Membres} from '../model/membres.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Cotisations} from '../model/cotisations.model';

@Injectable({
  providedIn: 'root'
})
export class CotisationsService {

  public host= environment.host;

  constructor(private http: HttpClient) { }

  getCotisations(page: number, size: number): Observable <Membres[]> {
    let host = this.host;
    return this.http.get<Membres[]>(host + '/cotisations?page='+page+'&size='+size);
  }
  getCotisationsByMbre(idMbre:number,page: number, size: number): Observable <Cotisations[]> {
    let host = this.host;
    return this.http.get<Cotisations[]>(host + '/cotisations/search/byMembre?idMbre='+idMbre+'&page='+page+'&size='+size);
  }

  deleteCotisation(cotisationId: number): Observable<void> {
    let host = this.host;
    return this.http.delete<void>(host+'/cotisations/'+cotisationId);
  }

  getCotisation(cotisationId: number): Observable<Cotisations> {
    let host = this.host;
    return this.http.get<Cotisations>(host+'/cotisations/'+cotisationId);
  }

  updateMembre(cotisation: Cotisations): Observable<Cotisations> {
    let host = this.host;
    return this.http.put<Cotisations>(host+'/cotisations/'+cotisation.id, cotisation);
  }
  getLastCotisationByMbre(idMbre:number):Observable<Cotisations>{
    return this.http.get<Cotisations>(this.host+"/cotisations/search/lastCotisByMbreId?idMbre="+idMbre);
  }

  getCotisationMois(startMonth:number): Observable<number[]>{
    let data: number []=[];
    for(let theMonth=startMonth; theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data);
  }
  getCotisationAnnee(startYear: number):Observable<number[]>{
    let data: number[]=[];
    const endYear: number= new Date().getFullYear();
    for (let theYear= startYear; theYear<endYear+2;theYear++ ){
      data.push(theYear);
    }
    return of(data);
  }

}
