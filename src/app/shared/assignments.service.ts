import { Injectable, OnInit } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { Assignment } from "../assignments/assignment.model";
import { LoggingService } from "./logging.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AssignmentsService {
  assignments: Assignment[] = [];
  url = "https://api-miage-back.onrender.com/api/assignments";

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}
  getAssignments(): Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http
      .get<Assignment[]>(this.url)
      .pipe(
        catchError(this.handleError<any>("### catchError : getAssignments"))
      );
  }

  addAssignment(assignment: Assignment): Observable<any> {
    //this.assignments.push(assignment);
    this.loggingService.log(assignment.nom, "ajouté");
    //return of('Assignment ajouté');
    return this.http.post<Assignment>(this.url, assignment).pipe(
      tap((a) => {
        console.log(`tap : nom=${a.nom}`);
      }, catchError(this.handleError<any>("### catchError : Add Assignment ")))
    );
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, "Modifié");
    return this.http.put<Assignment>(this.url, assignment).pipe(
      tap((a) => {
        console.log(`tap : nom=${a.nom}`);
      }, catchError(this.handleError<any>("### catchError : Update Assignment")))
    );
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, "supprimé");
    return this.http.delete<Assignment>(this.url + "/" + assignment._id).pipe(
      tap((a) => {
        console.log(`tap : nom=${a.nom}`);
      }, catchError(this.handleError<any>("### catchError : Delete Assignment")))
    );
  }
  getAssignment(id: number): Observable<Assignment | undefined> {
    //const a:Assignment|undefined = this.assignments.find(a =>a.id === id);
    //return of(a);
    return this.http.get<Assignment>(this.url + "/" + id).pipe(
      tap((a) => {
        console.log(`tap : nom=${a.nom}`);
      }, catchError(this.handleError<any>("### catchError : getAssignment by id avec id = " + id)))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation + " à échoué " + error.message);
      return of(result as T);
    };
  }
}
