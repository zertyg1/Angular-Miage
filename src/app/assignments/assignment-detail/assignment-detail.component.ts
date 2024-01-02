import { Component, Input, OnInit } from "@angular/core";
import { Assignment } from "../assignment.model";
import { AssignmentsService } from "src/app/shared/assignments.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../shared/auth.service";
import { inject } from "@angular/core";

@Component({
  selector: "app-assignment-detail",
  templateUrl: "./assignment-detail.component.html",
  styleUrls: ["./assignment-detail.component.css"],
})
export class AssignmentDetailComponent implements OnInit {
  /*@Input()*/ assignementTransmis!: Assignment;
  authService = inject(AuthService);

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.assignementTransmis = {} as Assignment;
  }
  ngOnInit(): void {
    this.getAssignment();
    if (!this.authService.isLogged()) {
      this.router.navigate(["/home"]);
    }
  }

  onAssignmentRendu() {
    if (this.authService.isUser()) {
      this.router.navigate(["/home"]);
    } else {
      this.assignementTransmis.rendu = true;
      this.assignmentsService
        .updateAssignment(this.assignementTransmis)
        .subscribe((reponse) => {
          console.log(reponse.message);
          this.router.navigate(["/home"]);
        });
      //this.router.navigate(["/home"]);
    }
  }

  deleteEtem() {
    if (
      !this.authService.isAdmin() ||
      !this.authService.isLogged() ||
      this.authService.isUser()
    ) {
      this.router.navigate(["/home"]);
    } else {
      this.assignmentsService
        .deleteAssignment(this.assignementTransmis).subscribe((reponse) => {
          console.log(reponse.message);
          this.router.navigate(["/home"]);
        });
      //this.router.navigate(["/home"]);
    }
  }
  getAssignment() {
    const id = +this.route.snapshot.params["id"];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (assignment) {
        this.assignementTransmis = assignment;
      }
    });
  }
  onClickEdit() {
    this.router.navigate(["/assignment", this.assignementTransmis.id, "edit"], {
      queryParams: { nom: this.assignementTransmis.nom },
      fragment: "editing",
    });
    this.route.queryParams.subscribe((params) => console.log(params));
    this.route.fragment.subscribe((fragment) => console.log(fragment));
  }
  isAdmin(): boolean {
    return this.authService.loggedIn;
  }
}
