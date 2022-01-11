import { Component, OnInit } from '@angular/core';
import {Membres} from '../../model/membres.model';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {catchError, map, startWith} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-cotisation',
  templateUrl: './cotisation.component.html',
  styleUrls: ['./cotisation.component.css']
})
export class CotisationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}
