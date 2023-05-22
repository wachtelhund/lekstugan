import {HttpClient} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {AuthService} from './auth.service';
import {Observable, tap} from 'rxjs';
import {IAssociation} from '../types/IAssociation';

@Injectable({
  providedIn: 'root',
})
/**
 * AssociationService
 */
export class AssociationService {
  serverUrl = `${environment.apiURL}/associations`;
  associations: IAssociation[] = [];
  associationAdded = new EventEmitter<IAssociation>();
  associationDeleted = new EventEmitter<IAssociation>();
  /**
   * Constructor.
   */
  constructor(private http: HttpClient, private auth: AuthService) {}

  /**
   * Get associations.
   *
   * @return {Observable<IAssociation[]>} - The associations.
   */
  getAssociations(): Observable<IAssociation[]> {
    return this.http.get<IAssociation[]>(this.serverUrl,
        // eslint-disable-next-line
        {headers: {'Authorization': 'Bearer ' +
          localStorage.getItem('token')}});
  }

  /**
   * Delete association.
   *
   * @param {IAssociation} association - The association to delete.
   * @return {Observable<void>} - The response.
   */
  deleteAssociation(association: IAssociation): Observable<void> {
    return this.http.delete<void>(`${this.serverUrl}/${association.id}`,
        // eslint-disable-next-line
        {headers: {'Authorization': 'Bearer ' +
          localStorage.getItem('token')}}).pipe(
        tap(() => {
          this.associationDeleted.emit(association);
        })
    );
  }

  /**
   * Post a new association.
   *
   * @param {IAssociation} association - The association to post.
   * @return {Observable<string>} - The response.
   */
  postAssociation(association: IAssociation): Observable<string> {
    return this.http.post<string>(this.serverUrl, association,
        // eslint-disable-next-line
        {headers: {'Authorization': 'Bearer ' +
          localStorage.getItem('token')}}).pipe(
        tap((res) => {
          association.id = res;
          this.associationAdded.emit(association);
        })
    );
  }

  /**
   * Get new key.
   *
   * @param {IAssociation} association - The association to get a key for.
   * @return {Observable<string>} - The key.
   */
  getNewKey(association: IAssociation): Observable<string> {
    return this.http.get<string>(`${this.serverUrl}/${association.id}/key`,
        // eslint-disable-next-line
        {headers: {'Authorization': 'Bearer ' +
          localStorage.getItem('token')}});
  }
}
