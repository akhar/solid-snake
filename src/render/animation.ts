import { interval, Subscription } from 'rxjs'
import { ANIMATION_FREQ } from '../cfg'

export interface AnimationClock {
  animationStream: Subscription
  start(render: Function): void
  stop(): void
}

export class AnimationClock implements AnimationClock {
  private animationIntrval: number = 1000 / ANIMATION_FREQ // from Hz to intrval of milliseconds

  public animationStream: Subscription

  public start(render): void {
    this.animationStream = interval(this.animationIntrval).subscribe(render)
  }

  public stop(): void {
    this.animationStream.unsubscribe()
  }
}
