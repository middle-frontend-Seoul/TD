type EventCallback = (...args: any[]) => any;

export class EventBus {
  private static instance: EventBus;

  private readonly callbacks: { [key: string]: EventCallback[] } = {};

  constructor() {
    if (EventBus.instance) {
      return EventBus.instance;
    }

    EventBus.instance = this;
  }

  on(event: string, callback: EventCallback): void {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }

    this.callbacks[event].push(callback);
  }

  emit(event: string, ...args: any[]): void {
    const callbacks = this.callbacks[event];

    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }
}
