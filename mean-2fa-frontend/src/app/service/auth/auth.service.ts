import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse }    from '../../model/loginResponse/login-response';


const baseUrl = "http://localhost:8000/api/v1/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}
    private readonly key_token = 'token';

    getToken(): string | null {
        return localStorage.getItem( this.key_token );
    }

    verifyOTP(otp: string) {
        console.log( "call" );

        const token = this.getToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
            , 'token': token !== null ? token : ""
        });
        return this.http.post(
            `${baseUrl}/verify-opt` 
            , { 
                otp
            } 
            , { 
                headers
            }
        )
    }
    
    login( email:string, password:string ):Observable<LoginResponse> {
        console.log( "call login" );
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<LoginResponse>(
            `${baseUrl}/login` 
            , { 
                email
                , password
            } 
            , { 
                headers
            }
        )
    }
    enable2fa() {
        // console.log( "call enable2fa" );
        
        const token = this.getToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
            , 'token': token !== null ? token : ""
        });

        return this.http.get(
            `${baseUrl}/enable-2fa`  
            , { 
                headers
            }
        )
    }
}
