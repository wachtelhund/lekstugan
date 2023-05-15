import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AssociationService} from 'src/app/services/association.service';
import {IAssociation} from 'src/app/types/IAssociation';

@Component({
  selector: 'app-keygen',
  templateUrl: './keygen.component.html',
  styleUrls: ['./keygen.component.scss'],
})
/**
 * KeygenComponent
 */
export class KeygenComponent {
  key = '';
  allAssociations: IAssociation[] = [];
  association = new FormGroup({
    name: new FormControl('', Validators.required),
  });

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
   * When the user clicks the generate key button.
   */
  onGenerateKey() {
    console.log(this.association.value);
    if (this.association.invalid) {
      throw new Error('Invalid association');
    }
    console.log(this.allAssociations);
    const foundAssociation = this.allAssociations.find((association) => {
      console.log(association);
      return association.name === this.association.value.name;
    }) as IAssociation;
    this.associationService.getNewKey(foundAssociation)
        .subscribe((key) => {
          this.key = key;
        });
  }
}
