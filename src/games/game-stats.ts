import { EventBus, EventNames } from 'games/event-bus';
import { GameUIAction, GameUIState } from 'games/typing';

export class GameStats {
  protected eventBus: EventBus;

  private fps: number;

  private balance: number;

  private hp: number;

  private setUIState: React.Dispatch<GameUIAction>;

  constructor(
    initialUIState: GameUIState,
    setUIState: React.Dispatch<GameUIAction>
  ) {
    this.eventBus = new EventBus();

    this.fps = initialUIState.fps;
    this.balance = initialUIState.score;
    this.hp = initialUIState.lives;

    this.setUIState = setUIState;
    this.setUIState({ type: 'setFps', payload: this.fps });
    this.setUIState({ type: 'setScore', payload: this.balance });
    this.setUIState({ type: 'setLives', payload: this.hp });

    this.eventBus.on(EventNames.ScoreAdd, (amount: number) => {
      this.add(amount);
    });
    this.eventBus.on(EventNames.EnemyPassed, (damage: number) => {
      this.enemyPassed(damage);
    });
    this.eventBus.on(EventNames.FpsUpdated, (fps: number) => {
      this.updateFps(fps);
    });
  }

  add(amount: number) {
    this.balance += amount;
    this.setUIState({ type: 'setScore', payload: this.balance });
  }

  canWithdraw(amount: number) {
    return this.balance - amount >= 0;
  }

  withdraw(amount: number) {
    if (this.canWithdraw(amount)) {
      this.balance -= amount;
      this.setUIState({ type: 'setScore', payload: this.balance });
    }
  }

  enemyPassed(damage: number) {
    if (this.hp > 0) {
      this.hp -= damage;
    }
    this.setUIState({ type: 'setLives', payload: this.hp });
    if (this.hp === 0) {
      this.eventBus.emit(EventNames.GameOver);
    }
  }

  updateFps(fps: number) {
    this.setUIState({ type: 'setFps', payload: fps });
  }
}
