// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventCallback = (...args: any[]) => any;

export enum EventNames {
  drag = 'drag',
  drop = 'drop',
  escape = 'escape',
  moveInCanvas = 'mousemove:incanvas',
  moveOutCanvas = 'mousemove:outcanvas',
  clickInCanvas = 'click:incanvas',
  scoreAdd = 'score:add',
  gameOver = 'game:over',
  enemyPassed = 'game:enemypassed',
  fpsUpdated = 'game:fpsupdated',
}

export class EventBus {
  private static instance: EventBus;

  private readonly callbacks: { [key: string]: EventCallback[] } = {};

  constructor() {
    if (EventBus.instance) {
      return EventBus.instance;
    }

    EventBus.instance = this;
  }

  clearAll(): void {
    Object.keys(this.callbacks).forEach((event) => {
      this.callbacks[event] = [];
    });
  }

  on(event: string, callback: EventCallback): void {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit(event: string, ...args: any[]): void {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }
}
