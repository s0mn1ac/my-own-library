/* Angular */
import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, getDoc, setDoc, updateDoc, where } from '@angular/fire/firestore';

/* Firebase */
import { collection, CollectionReference, query, Query, DocumentSnapshot, DocumentData, QuerySnapshot, QueryDocumentSnapshot } from '@firebase/firestore';

/* Interfaces */
import { FirestoreConfigurationInterface } from '../interfaces/firestore-configuration.interface';

/* Constants */
import { ConfigurationsCollection } from '../constants/collections.constants';
import { Observable } from 'rxjs';
import { ConfigurationInterface } from '../interfaces/configuration.interface';
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';
import { LibraryInterface } from '../interfaces/library.interface';

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

  public async getConfiguration(id: string): Promise<ConfigurationInterface | undefined> {
    let configuration: ConfigurationInterface | undefined = undefined;
    await getDoc(doc(this.firestore, ConfigurationsCollection, id))
      .then((documentSnapshot: DocumentSnapshot) => configuration = this.mapConfigurationFromDocumentSnapshot(documentSnapshot))
      .catch(() => console.log('TODO: ERROR'));
    return configuration;
  }


  /* ----- Create Configuration --------------------------------------------------------------------------------------------------------- */

  public createConfiguration(uid: string, configuration: FirestoreConfigurationInterface): Promise<void> {
    return setDoc(doc(this.firestore, ConfigurationsCollection, uid), configuration);
  }


  /* ----- Update Configuration --------------------------------------------------------------------------------------------------------- */

  public async updateLanguage(id: string, language: string): Promise<boolean> {
    let isLanguageUpdated: boolean = false;
    await updateDoc(doc(this.firestore, ConfigurationsCollection, id), { language: language })
      .then((): boolean => isLanguageUpdated = true)
      .catch(() => console.log('TODO: ERROR'));
    return isLanguageUpdated;
  }

  public async updateTheme(id: string, theme: string): Promise<boolean> {
    let isThemeUpdated: boolean = false;
    await updateDoc(doc(this.firestore, ConfigurationsCollection, id), { theme: theme })
      .then((): boolean => isThemeUpdated = true)
      .catch(() => console.log('TODO: ERROR'));
    return isThemeUpdated;
  }


  /* ----- Delete Configuration --------------------------------------------------------------------------------------------------------- */

  public deleteConfiguration(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, ConfigurationsCollection, id));
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private mapConfigurationFromDocumentSnapshot(documentSnapshot: DocumentSnapshot): ConfigurationInterface | undefined {
    const documentSnapshotData: DocumentData | undefined = documentSnapshot.data();
    return documentSnapshotData === undefined
      ? undefined
      : {
        id: documentSnapshot.id,
        language: documentSnapshotData['language'] as LanguageEnum,
        theme: documentSnapshotData['theme'] as ThemeEnum
      };
  }

}
