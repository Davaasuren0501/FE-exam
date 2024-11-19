import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-verify-otp',
    standalone: true,
    imports: [
        FormsModule
        , CommonModule
        , HttpClientModule
    ],
    providers: [AuthService],
    templateUrl: './verify-otp.component.html',
    styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {

    

    otp: string = ''; 
    constructor(private authService: AuthService) {} // Inject AuthService

    verify() {
        console.log('OTP Submitted:', this.otp);
        this.authService.verifyOTP(this.otp).subscribe({
            next: (response) => {
              console.log('OTP verified successfully:', response);
              // Handle successful response
            },
            error: (err) => {
              console.error('OTP verification failed:', err);
              // Handle error
            }
          });
    }
}
