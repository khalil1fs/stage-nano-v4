import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../controller/service/Auth.service';
import {User} from '../controller/model/User.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    active: boolean = true;
    active2: boolean = true;

    mail: string = '';
    phone: string = '';

    ngOnInit(): void {
        // this.time();
        // this.timeout();
    }

    // this.selectedInput = ana ; 
    // this.selectedHya = ana ; 
    // this.selectedDate = ana ;
    
    time() {
        setInterval(e => {
        console.log('inter');
    }, 1000);
    }
    //
    // timeout() {
    //    let timeoutI = setTimeout(e => (

    //     ), 500);
    // }

    registerForm = new FormGroup({
        username: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required)
    });


    constructor(private authService: AuthService) {
    }

    submit() {
        const formValues = this.registerForm.value;
        const { username, password, confirmPassword,email,phone } = formValues;
        this.user.username = username;
        this.user.phone = phone;
        this.user.password = password;
        this.user.email = email;
        if(password === confirmPassword) {
            this.authService.register();
        }else {
            window.alert('password did not match');
        }

    }


    verifyEmail(email: string) {
        var regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/

        this.active = !regex.test(email);
    }

    verifyPhone(phone: string) {
        var regex = /\+?\d{9,20}/

        this.active2 = !regex.test(phone);
    }

    // var regex = /\+?[0-9]{10,20}/




    // checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    //     let pass = password.value;
    //     let confirmPass = group.get('confirmPassword').value
    //     return pass === confirmPass ? null : { notSame: true }
    // }

    get user(): User {
        return this.authService.user;
    }

    set user(value: User) {
        this.authService.user = value;
    }



    /*
    var regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/
    * */


    // result() : boolean {
    //     return !(!this.active && !this.active2);
    // }
}
