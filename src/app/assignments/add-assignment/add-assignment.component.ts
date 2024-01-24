import { Component, OnInit} from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  ajoutActive = true;
  nomDevoir = '';
  dateRendu!: Date;
  auteur!:string;
  matiere!:string;
  note!:number;
  remarques!:string;

  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    console.log(this.nomDevoir + ' Date de rendu =' + this.dateRendu);
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu ? this.dateRendu : new Date();
    newAssignment.rendu = false;
    newAssignment.auteur = this.auteur;
    newAssignment.matiere = this.matiere;
    newAssignment.note = this.note;
    newAssignment.remarques = this.remarques;
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.router.navigate(['/home']);
      });
  }

  ngOnInit() {
    if (!this.authService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }
}
