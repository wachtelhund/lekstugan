import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {IUser} from 'src/app/types/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
/**
 * The login component.
 */
export class LoginComponent {
  invalid = false;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  /**
   * Constructor.
   */
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * On Submit.
   */
  onSubmit() {
    if (this.loginForm.invalid) {
      throw new Error('Invalid form');
    }
    this.loginForm.value.email = this.loginForm.value.email?.toLowerCase();
    this.auth.login(this.loginForm.value as IUser).subscribe((res) => {
      if (res === null) {
        this.invalid = true;
        return;
      } else {
        this.invalid = false;
        this.router.navigate(['/admin']);
      }
    }, (err) => {
      console.error(err);
    });
  }
}
