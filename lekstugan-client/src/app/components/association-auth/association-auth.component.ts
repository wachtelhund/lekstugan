import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssociationService} from 'src/app/services/association.service';
import {IAssociation} from 'src/app/types/IAssociation';

@Component({
  selector: 'app-association-auth',
  templateUrl: './association-auth.component.html',
  styleUrls: ['./association-auth.component.scss'],
})
/**
 * AssociationAuthComponent
 */
export class AssociationAuthComponent {
  associationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  allAssociations: IAssociation[] = [];

  /**
   * Constructor.
   */
  constructor(private associationService: AssociationService) {}

  /**
   * On init.
   */
  ngOnInit(): void {
    this.associationService.getAssociations().subscribe((associations) => {
      this.allAssociations = associations;
    });
  }

  /**
   * On submit.
   */
  onSubmit() {
    const association = {
      name: this.associationForm.value.name?.toLowerCase().trim(),
      email: this.associationForm.value.email?.toLowerCase().trim(),
    } as IAssociation;

    this.associationService.postAssociation(association).subscribe(() => {
      this.allAssociations.push(association);
      this.associationForm.reset();
    });
  }

  /**
   * On delete.
   *
   * @param {IAssociation} association - The association to delete.
   */
  onDelete(association: IAssociation) {
    this.associationService.deleteAssociation(association).subscribe(() => {
      this.allAssociations = this.allAssociations.filter((a) => {
        return a.id !== association.id;
      });
    });
  }
}
