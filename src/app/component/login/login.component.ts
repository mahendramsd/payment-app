import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Constants } from 'src/app/utils/constants';

declare let iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private authService : AuthService) {}

  ngOnInit(): void {
    localStorage.removeItem(Constants.LOCAL_STORE_RESOURSES.TOKEN);
    this.initValidation();
  }

  public initValidation() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit() {
    this.submitted = true;

    // Check form is invalid
    if (this.f.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe({
      next: (res : any) => {
          this.router.navigate([
            Constants.URL.PAYMENT,
        ]);
      }, error: error => {
        this.loading = false;
        iziToast.error({
          title: "Error !",
          position: "topRight",
          message: "Username or password incorrect !",
      });
      }
    })
  }
}
