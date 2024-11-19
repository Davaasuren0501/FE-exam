import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    email: string = '';
    password: string = ''; 

    login() {

        if( !this.email || !this.password) {
            alert('Please fill out all fields!');
            return;
        }

        const loginPayload = { email: this.email, password: this.password };

        console.log( loginPayload );
        
    }
}
