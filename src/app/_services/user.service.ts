import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
//import { map } from "rxjs/operators";
import { Observable } from "rxjs";
//import { Friends } from "../interface/friends";
//import { contact } from "../interface/contacts";
import { Fitness } from "../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component";
import { Contact } from "../contact-us/contact-us.component";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({ providedIn: "root" })
export class UserService {
  public static BaseUrl = "http://localhost:6565/";

  userData: Fitness;

  constructor(private http: HttpClient) {}
  postfitnessdata(data) {
    return this.http.post(
      UserService.BaseUrl + "allfriends",
      data,
      httpOptions
    );
  }
  getfitnessdata(): Observable<Fitness[]> {
    return this.http.get<Fitness[]>(
      UserService.BaseUrl + "allfriends",
      httpOptions
    );
    //.pipe(map((response: Response) => response.json()));
  }

  postContactdata(data: Contact) {
    return this.http.post(UserService.BaseUrl + "contacts", data, httpOptions);
  }

  deletefitnessdata(id: number): Observable<Fitness> {
    return this.http.delete<Fitness>(
      UserService.BaseUrl + "allfriends/" + id,
      httpOptions
    );
  }

  editfitnessdata(data, id) {
    return this.http.put(
      UserService.BaseUrl + "allfriends/" + id,
      data,
      httpOptions
    );
  }
}
