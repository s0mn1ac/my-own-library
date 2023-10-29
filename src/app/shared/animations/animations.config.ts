/* Angular */
import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const fadeSlideInOut: AnimationTriggerMetadata = trigger('fadeSlideInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(36px)' }),
    animate('150ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('150ms', style({ opacity: 0, transform: 'translateY(36px)' })),
  ]),
]);

export const fadeSlideHeightInOut: AnimationTriggerMetadata = trigger('fadeSlideHeightInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(36px)', height: '0' }),
    animate('150ms', style({ opacity: 1, transform: 'translateY(0)', height: 'auto' })),
  ]),
  transition(':leave', [
    animate('150ms', style({ opacity: 0, transform: 'translateY(36px)', height: '0' })),
  ]),
]);

export const fadeInOut: AnimationTriggerMetadata = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('150ms', style({ opacity: 0 })),
  ]),
]);
