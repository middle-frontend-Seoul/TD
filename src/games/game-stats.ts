import { EventBus, EventNames } from 'games/event-bus';
import { GameUIAction, GameUIState } from 'games/typing';

export class GameStats {
  protected event: () => EventBus;

  private balance: number;

  private hp: number;

  private setUIState: React.Dispatch<GameUIAction>;

  constructor(
    initialUIState: GameUIState,
    setUIState: React.Dispatch<GameUIAction>
  ) {
    const event = new EventBus();
    this.event = () => event;

    this.balance = initialUIState.score;
    this.hp = initialUIState.lives;

    this.setUIState = setUIState;
    this.setUIState({ type: 'setScore', payload: this.balance });
    this.setUIState({ type: 'setLives', payload: this.hp });

    this.event().on(EventNames.scoreAdd, (amount: number) => {
      this.add(amount);
    });
    this.event().on(EventNames.enemyPassed, (damage: number) => {
      this.enemyPassed(damage);
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
    this.hp -= damage;
    this.setUIState({ type: 'setLives', payload: this.hp });
    if (this.hp <= 0) {
      this.event().emit(EventNames.gameOver);
    }
  }
}
