import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from 'src/app/services/auth.service';
import {AdminAuthenticatorComponent} from './admin-authenticator.component';
import {Observable, of} from 'rxjs';
import {MatDividerModule} from '@angular/material/divider';

describe('AdminAuthenticatorComponent', () => {
  let component: AdminAuthenticatorComponent;
  let fixture: ComponentFixture<AdminAuthenticatorComponent>;
  let mockAuthService: {
    getAdmins: { and: { returnValue: (arg0: Observable<string[]>) => void; }; };
  };

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj([
      'getAdmins',
      'deleteAdmin',
      'addAdmin',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDividerModule,
      ],
      declarations: [AdminAuthenticatorComponent],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
      ],
    })
        .compileComponents();

    fixture = TestBed.createComponent(AdminAuthenticatorComponent);
    component = fixture.componentInstance;
  });

  it('should call getAdmins on init', () => {
    mockAuthService
        .getAdmins
        .and
        .returnValue(of(['admin1@test.com', 'admin2@test.com']));

    fixture.detectChanges();

    expect(mockAuthService.getAdmins).toHaveBeenCalled();
    expect(component.admins.length).toBe(2);
    expect(component.admins).toContain('admin1@test.com');
    expect(component.admins).toContain('admin2@test.com');
  });
});
