import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
opened=false;
title = 'Application de gestion des devoirs à rendre (Assignments)';
  constructor (private authService:AuthService, private router:Router){}
  log(){
    return this.authService.isLogged();
  }

  seDeconnecter(){
    this.authService.logOut();
  }
}