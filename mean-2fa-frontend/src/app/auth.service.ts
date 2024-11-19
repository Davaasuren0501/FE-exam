import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  verifyOTP(otp: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2I1MmE5M2QzMDY4NGRkNWY5NWUxNyIsImlhdCI6MTczMjAyMjY5MCwiZXhwIjoxNzMyMTA5MDkwfQ.3IuUMZXGK34XhpiUxtmI8q6KrkYYchrzSeAheO1BPjI', 
    });

    this.http.post('http://localhost:8000/api/v1/users/verify-opt', 
                   { otp }, 
                   { headers })
      .subscribe(
        (response: any) => {
          // Store the response value in a variable
          const responseData = response;

          // Print the response to the console
          console.log('Response:', responseData);

          // You can also use the response value in your component
          // For example, assigning to a class variable
          // this.responseVariable = responseData;
        },
        (error) => {
          // Handle errors here
          console.error('Error:', error);
        }
      );
  }
}
