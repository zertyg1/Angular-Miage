import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  constructor (private authService:AuthService, private router:Router,private assignmentsService:AssignmentsService ){}
  
  /*bd(){
    this.assignmentsService.peuplerBD();
  }*/
}
