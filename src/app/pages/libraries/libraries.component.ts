/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectLibraries } from '../../state/libraries/libraries.selectors';

/* Interfaces */
import { LibraryInterface } from '../../shared/interfaces/library.interface';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss']
})
export class LibrariesComponent implements OnInit, OnDestroy {

  protected readonly destroy$: Subject<boolean> = new Subject<boolean>();

  protected readonly libraries$: Observable<LibraryInterface[]> = this.store.select(selectLibraries);

  public libraries!: LibraryInterface[];

  constructor(
    private readonly router: Router,
    private readonly store: Store
  ) { }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickAddLibrary(): void {

    // this.router.navigate(['/library']).then();
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.libraries$
      .pipe(takeUntil(this.destroy$))
      .subscribe((libraries: LibraryInterface[]) => this.onChangeLibraries(libraries));
  }

  private onChangeLibraries(libraries: LibraryInterface[]): void {
    this.libraries = libraries;
  }

}
