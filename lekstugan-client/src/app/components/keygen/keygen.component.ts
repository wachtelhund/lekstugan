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
  loading = false;

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
    this.associationService.associationAdded.subscribe((association) => {
      this.allAssociations.push(association);
    });
    this.associationService.associationDeleted.subscribe((association) => {
      this.allAssociations = this.allAssociations.filter((a) => {
        return a.id !== association.id;
      });
    });
  }

  /**
   * When the user clicks the generate key button.
   */
  onGenerateKey() {
    if (this.association.invalid) {
      throw new Error('Invalid association');
    }
    this.loading = true;
    const foundAssociation = this.allAssociations.find((association) => {
      return association.name === this.association.value.name;
    }) as IAssociation;
    this.associationService.getNewKey(foundAssociation)
        .subscribe((key) => {
          this.key = key;
          setTimeout(() => {
            this.key = '';
          }, 10000);
          this.loading = false;
        });
  }
}
