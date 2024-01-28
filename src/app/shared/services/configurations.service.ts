/* Angular */
import { Injectable } from '@angular/core';
import { deleteDoc, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';

/* Firebase */
import { collection, CollectionReference, DocumentData, DocumentSnapshot } from '@firebase/firestore';

/* Services */
import { DispatcherService } from './dispatcher.service';
import { LocalStorageService } from './local-storage.service';

/* Interfaces */
import { FirestoreConfigurationInterface } from '../interfaces/firestore-configuration.interface';
import { ConfigurationInterface } from '../interfaces/configuration.interface';
import { User } from '@angular/fire/auth';

/* Enums */
import { LanguageEnum } from '../enums/language.enum';
import { ThemeEnum } from '../enums/theme.enum';


/* Constants */
import { ConfigurationsCollection } from '../constants/collections.constants';
import { Language, Theme } from '../constants/local-storage.constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {

  private _configuration!: ConfigurationInterface | undefined;
  private _currentLanguage!: LanguageEnum;
  private _currentTheme!: ThemeEnum;

  private readonly configurationsCollection!: CollectionReference;

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly firestore: Firestore,
    private readonly localStorageService: LocalStorageService
  ) {
    this.configurationsCollection = collection(this.firestore, ConfigurationsCollection);
  }


  /* ----- Getters & Setters ------------------------------------------------------------------------------------------------------------ */

  get configuration(): ConfigurationInterface | undefined {
    return this._configuration;
  }

  set configuration(configuration: ConfigurationInterface | undefined) {
    this._configuration = configuration;
  }

  get currentLanguage(): LanguageEnum {
    return this._currentLanguage;
  }

  set currentLanguage(currentLanguage: LanguageEnum) {
    this._currentLanguage = currentLanguage;
  }

  get currentTheme(): ThemeEnum {
    return this._currentTheme;
  }

  set currentTheme(currentTheme: ThemeEnum) {
    this._currentTheme = currentTheme;
  }


  /* ----- Get Configuration ------------------------------------------------------------------------------------------------------------ */

  public getConfiguration(user: User | null): Promise<void | ConfigurationInterface | undefined> | undefined {

    if (user === null) {
      this.loadConfiguration(undefined);
      return;
    }

    return getDoc(doc(this.firestore, ConfigurationsCollection, user.uid))
      .then((documentSnapshot: DocumentSnapshot) => this.loadConfiguration(this.mapConfigurationFromDocumentSnapshot(documentSnapshot)))
      .catch(() => console.log('TODO: ERROR'));
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

  private loadConfiguration(configuration: ConfigurationInterface | undefined): void {

    if (configuration === undefined) {
      this.loadConfigurationFromLocalStorage();
      return;
    }

    this.configuration = configuration;

    this.setLanguage(this.configuration.language);
    this.setTheme(this.configuration.theme);
  }

  private loadConfigurationFromLocalStorage(): void {
    this.setLanguage((this.localStorageService.get(Language) as LanguageEnum) ?? null);
    this.setTheme((this.localStorageService.get(Theme) as ThemeEnum) ?? null);
  }

  private setLanguage(language: LanguageEnum | null): void {

    if (language === null || language === this.currentLanguage) {
      return;
    }

    this.dispatcherService.changeLanguageLoad(language);
  }

  private setTheme(theme: ThemeEnum | null): void {

    if (theme === null || theme === this.currentTheme) {
      return;
    }

    this.dispatcherService.changeThemeLoad(theme);
  }

}
