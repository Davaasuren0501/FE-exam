import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule
        , CommonModule
    ],
    providers: [AuthService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    email: string = '';
    password: string = ''; 
    errorMessage: string = ''; 
    loading: boolean = false;
    constructor( private authService: AuthService, private router: Router ) {}

    login() {
        if( this.loading ) {
            return;
        }
        if( !this.email || !this.password) {
            this.errorMessage = 'Please fill out all fields!';
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            this.errorMessage = 'Please enter a valid email address!';
            return;
        }

        this.errorMessage = ""
        console.log( { email: this.email, password: this.password } );
        
        this.loading = true
        this.authService.login( this.email, this.password ).subscribe(
            (responseData) => {
                console.log('ResponseData:', responseData);
                if (responseData.success ) {

                    if( responseData.token ) {
                        localStorage.setItem('token', responseData.token);
                    } else {
                        console.error('Token is undefined');
                    }
                    
                    this.authService.enable2fa( ).subscribe(
                        (responseDataEnable2fa) => {
                            this.loading = false
                            console.log('responseDataEnable2fa:', responseDataEnable2fa);
                            this.router.navigate(['/auth/verify-otp']);
                        },
                        (errorDataEnable2fa) => {
                            console.log( 'Enable2fa:' );
                            console.log( errorDataEnable2fa );
                            console.log( errorDataEnable2fa.error?.message );
                            this.loading = false
                            this.errorMessage = errorDataEnable2fa?.error?.message;
                        }
                    )
                } else {
                    this.loading = false
                    this.errorMessage = 'Login failed. Please try again.';
                }
            },
            (errorData) => {
                this.loading = false
                console.log( 'ErrorData:' );
                console.log( errorData );
                console.log( errorData.error?.message );
                this.errorMessage = errorData?.error?.message;
            }
        )
        
    }
}
