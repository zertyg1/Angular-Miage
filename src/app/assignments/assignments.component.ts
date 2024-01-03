import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  initializationMessage: string = '';
  titre = 'Mon application assignments';
  ajoutActive = false;
  nomDevoir = '';
  dateRendu!: Date;
  assignementSelectionne!: Assignment;
  formVisible = false;
  assignments:Assignment[] =[];
  page!: number;
  limit!: number;
  totalDocs!: number;
  totalPages!: number;
  hasPrevPage!: boolean;
  prevPage!: number;
  hasNextPage!: boolean;
  nextPage!: number;
 

  dataSource = new MatTableDataSource<Assignment>();

  constructor(private assignmentsService:AssignmentsService) {}
  onSubmit() {
    console.log(this.nomDevoir + ' Date de rendu =' + this.dateRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu?this.dateRendu:new Date();
    newAssignment.rendu = false;
    this.assignments.push(newAssignment);
  }

  ngOnInit(): void {
    //this.assignmentsService.getAssignments().subscribe(assignments=>this.assignments=assignments);
    this.getAssignments();
  }
  getAssignments(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
     .subscribe(data => {
       this.assignments = data.docs;
       this.page = data.page;
       this.limit = data.limit;
       this.totalDocs = data.totalDocs;
       this.totalPages = data.totalPages;
       this.hasPrevPage = data.hasPrevPage;
       this.prevPage = data.prevPage;
       this.hasNextPage = data.hasNextPage;
       this.nextPage = data.nextPage;
       console.log("données reçues", this.assignments);
     });
  }

  assignmentClique(assignment: Assignment) {
    this.assignementSelectionne = assignment;
    console.log(assignment);
  }


  changePage(event: any) {
    this.assignmentsService.getAssignmentsPagine(event.pageIndex,event.pageSize)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
      });
  }
}
  