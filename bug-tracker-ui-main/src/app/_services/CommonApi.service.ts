import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, map, Observable } from "rxjs";

import { environment } from "../../environment";
import { Response } from "../_models/response.model";

@Injectable({ providedIn: "root" })
export class CommonApiService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<Response>(`${environment.apiUrl}/user/users`).pipe(
      first(),
      map((data: Response) => data)
    );
  }

  createUser(form: any) {
    console.log(form)
    debugger
    return this.http
      .post<any>(`${environment.apiUrl}/user/signup`,{...form})
      .pipe(
        first(),
        map((data: any) => data)
      );
  }

  enableuser(form: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/user/enableuser`, { useremail:form })
      .pipe(
        first(),
        map((data: Response) => data)
      );
  }
  disableuser(form: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/user/disableuser`, { useremail:form})
      .pipe(
        first(),
        map((data: Response) => data)
      );
  }

  createBug(form: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/bug/create`, { ...form })
      .pipe(
        first(),
        map((data: Response) => data)
      );
  }

  updateBug(form: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/bug/update`, { ...form })
      .pipe(
        first(),
        map((data: Response) => data)
      );
  }

  getAllBug(): Observable<any> {
    return this.http.get<Response>(`${environment.apiUrl}/bug/all`).pipe(
      first(),
      map((data: Response) => data)
    );
  }

  deletBug(form: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/bug/delete`, { _id:form._id })
      .pipe(
        first(),
        map((data: Response) => data)
      );
  }
}
