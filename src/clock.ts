import { GAME_FREQ, ANIMATION_FREQ } from './cfg'
import { interval, Subscription, Observable } from 'rxjs'

export class Clock {
  private gameIntrval: number = 1000 / GAME_FREQ // from Hz to intrval of milliseconds
  private animationIntrval: number = 1000 / ANIMATION_FREQ // from Hz to intrval of milliseconds

  public animationStream: Subscription

  public startAnimation(observer): void {
    this.animationStream = interval(this.animationIntrval).subscribe(observer)
  }

  public stopAnimation(): void {
    this.animationStream.unsubscribe()
  }
}
