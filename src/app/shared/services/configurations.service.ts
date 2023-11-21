/* Angular */
import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc, where } from '@angular/fire/firestore';

/* Firebase */
import { collection, CollectionReference, query, Query } from '@firebase/firestore';

/* Interfaces */
import { FirestoreConfigurationInterface } from '../interfaces/firestore-configuration.interface';

/* Constants */
import { ConfigurationsCollection } from '../constants/collections.constants';
import { Observable } from 'rxjs';
import { ConfigurationInterface } from '../interfaces/configuration.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  private readonly configurationsCollection!: CollectionReference;

  constructor(
    private readonly firestore: Firestore
  ) {
    this.configurationsCollection = collection(this.firestore, ConfigurationsCollection);
  }


  /* ----- Get Configuration ------------------------------------------------------------------------------------------------------------ */

  public getConfigurationSubscription(uid: string): Observable<ConfigurationInterface[]> {
    const configurationsQuery: Query = query(collection(this.firestore, ConfigurationsCollection), where('owner', '==', uid));
    return collectionData(configurationsQuery, { idField: 'id' }) as Observable<ConfigurationInterface[]>;
  }

  // public getConfiguration(id: string): Promise<DocumentSnapshot> {
  //   return getDoc(doc(this.firestore, ConfigurationsCollection, id));
  // }


  /* ----- Create Configuration --------------------------------------------------------------------------------------------------------- */

  public createConfiguration(uid: string, configuration: FirestoreConfigurationInterface): Promise<void> {
    return setDoc(doc(this.firestore, ConfigurationsCollection, uid), configuration);
  }


  /* ----- Update Configuration --------------------------------------------------------------------------------------------------------- */

  public updateLanguage(id: string, language: string): Promise<void> {
    return updateDoc(doc(this.firestore, ConfigurationsCollection, id), { language: language });
  }

  public updateTheme(id: string, theme: string): Promise<void> {
    return updateDoc(doc(this.firestore, ConfigurationsCollection, id), { theme: theme });
  }


  /* ----- Delete Configuration --------------------------------------------------------------------------------------------------------- */

  public deleteConfiguration(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, ConfigurationsCollection, id));
  }

}
