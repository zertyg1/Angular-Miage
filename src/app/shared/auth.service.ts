import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public users = [
    { username: "user", password: "user", role: "user" },
    { username: "admin", password: "admin", role: "admin" },
  ];

  loggedIn = false;
  currentUser: any;

  logIn(username: string, password: string) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
  }

  isLogged(): boolean {
    return this.loggedIn;
  }

  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.currentUser.role === "admin") {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  isUser(): boolean {
    return this.currentUser.role === "user";
  }

  getRole(): string {
    return this.currentUser.role;
  }
  constructor() {
    this.loggedIn = false;
  }
}
