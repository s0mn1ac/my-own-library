/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, take, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/user/user.selectors';
import { selectLibraries } from '../../state/libraries/libraries.selectors';

/* Services */
import { DispatcherService } from '../../shared/services/dispatcher.service';
import { LibrariesService } from '../../shared/services/libraries.service';
import { ModalService } from '../../shared/services/modal.service';

/* Components */
import { ConfigurationDialogComponent } from '../../shared/dialogs/configuration-dialog/configuration-dialog.component';
import { LibraryDialogComponent } from '../../shared/dialogs/library-dialog/library-dialog.component';

/* Interfaces */
import { UserInterface } from '../../shared/interfaces/user.interface';
import { LibraryInterface } from '../../shared/interfaces/library.interface';
import { LibraryDialogOutputDataInterface } from '../../shared/dialogs/library-dialog/interfaces/library-dialog-output-data.interface';
import { ConfigurationDialogOutputDataInterface } from '../../shared/dialogs/configuration-dialog/interfaces/configuration-dialog-output-data.interface';
import { GameInterface } from '../../shared/interfaces/game.interface';
import { GamesService } from '../../shared/services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  public readonly destroy$: Subject<boolean> = new Subject<boolean>();

  public readonly user$: Observable<UserInterface | null> = this.store.select(selectUser);

  public user!: UserInterface | null;

  public games!: GameInterface[];

  constructor(
    private readonly dispatcherService: DispatcherService,
    private readonly gamesService: GamesService,
    private readonly librariesService: LibrariesService,
    private readonly modalService: ModalService,
    private readonly store: Store
  ) { }


  /* ----- Life cycle methods ----------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {
    this.getGames().then();
    this.initStoreSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickAddLibrary(): void {

    this.modalService.showCustomModal(LibraryDialogComponent).onClose
      .pipe(take(1))
      .subscribe((dialogOutputData: LibraryDialogOutputDataInterface | undefined) => console.log(dialogOutputData));
  }


  /* ----- Store related Methods -------------------------------------------------------------------------------------------------------- */

  private initStoreSubscriptions(): void {

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface | null): UserInterface | null => this.user = user);
  }


  /* ----- Other private methods -------------------------------------------------------------------------------------------------------- */

  private async getGames(): Promise<void> {
    this.games = await this.gamesService.getGames();
    console.log(this.games);
  }

}
