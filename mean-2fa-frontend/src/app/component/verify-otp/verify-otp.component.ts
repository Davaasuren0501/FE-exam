import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../service/auth/auth.service';

@Component({
    selector: 'app-verify-otp',
    standalone: true,
    imports: [
        FormsModule
        , CommonModule
    ],
    providers: [AuthService],
    templateUrl: './verify-otp.component.html',
    styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {

    otp: string = ''; 
    errorMessage: string = '';
    responseStatus: boolean = false;
    constructor(private authService: AuthService) {}

    verify() {
        console.log('OTP Submitted:', this.otp);
        this.errorMessage = "";
        this.responseStatus = false;
        this.authService.verifyOTP(this.otp).subscribe(
            (responseData) => {
                console.log('ResponseData:', responseData);
                this.responseStatus = true
            },
            (errorData) => {
                console.log( 'ErrorData:' );
                console.log( errorData.error.message );
                this.errorMessage = errorData.error.message || 'Sorry. Please try again.';
            }
        )
    }
}
