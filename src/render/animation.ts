import { ANIMATION_FREQ } from '../cfg'
import { interval, Subscription } from 'rxjs'

export interface Animation {
  animationStream: Subscription
  start(observer): void
  stop(): void
}

export class Animation implements Animation {
  private animationIntrval: number = 1000 / ANIMATION_FREQ // from Hz to intrval of milliseconds

  public animationStream: Subscription

  public start(observer): void {
    this.animationStream = interval(this.animationIntrval).subscribe(observer)
  }

  public stop(): void {
    this.animationStream.unsubscribe()
  }
}
