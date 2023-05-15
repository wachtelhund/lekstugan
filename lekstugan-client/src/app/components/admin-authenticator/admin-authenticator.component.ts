import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {IUser} from 'src/app/types/IUser';

@Component({
  selector: 'app-admin-authenticator',
  templateUrl: './admin-authenticator.component.html',
  styleUrls: ['./admin-authenticator.component.scss'],
})
/**
 * The admin authenticator component. Used to create
 * and delete admins.
 */
export class AdminAuthenticatorComponent {
  admins: string[] = [];
  addAdminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  /**
   * Constructor.
   */
  constructor(private auth: AuthService) {}

  /**
   * On init.
   */
  ngOnInit() {
    this.auth.getAdmins().subscribe((admins) => {
      this.admins.push(...admins);
    });
  }

  /**
   * On delete.
   *
   * @param {string} adminMail The event.
   */
  onDelete(adminMail: string) {
    this.auth.deleteAdmin(adminMail).subscribe(() => {
      this.admins = this.admins.filter((admin) => admin !== adminMail);
    });
  }

  /**
   * On add.
   */
  onAdd() {
    if (this.addAdminForm.invalid) {
      throw new Error('Invalid form');
    }
    this.auth.addAdmin(this.addAdminForm.value as IUser).subscribe((res) => {
      this.admins.push((this.addAdminForm.value as IUser).email);
    });
  }
}
