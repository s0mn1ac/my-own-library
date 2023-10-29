/* Angular */
import { Component, EventEmitter, Input, Output } from '@angular/core';

/* Animations */
import { fadeInOut, fadeSlideHeightInOut, fadeSlideInOut } from '../../animations/animations.config';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [fadeSlideInOut, fadeSlideHeightInOut, fadeInOut]
})
export class NavigationBarComponent {

  @Input() leftActionIcon: string | null = null;
  @Input() title!: string;
  @Input() rightActionIcon: string | null = null;

  @Output() leftActionEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() rightActionEvent: EventEmitter<void> = new EventEmitter<void>();


  /* ----- On click methods ------------------------------------------------------------------------------------------------------------- */

  public onClickLeftActionButton(): void {
    this.leftActionEvent.emit();
  }

  public onClickRightActionButton(): void {
    this.rightActionEvent.emit();
  }

}
