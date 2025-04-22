type EventCallback<T = any> = (data: T) => void;

/**
 * Simple event bus implementation using the Observer pattern
 */
class EventBus {
  private events: Record<string, EventCallback[]> = {};

  /**
   * Subscribe to an event
   * @param eventName The event name to subscribe to
   * @param callback The callback to execute when the event is triggered
   * @returns A function to unsubscribe from the event
   */
  subscribe<T>(eventName: string, callback: EventCallback<T>): () => void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback as EventCallback);

    // Return unsubscribe function
    return () => {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    };
  }

  /**
   * Emit an event with optional data
   * @param eventName The event name to emit
   * @param data Optional data to pass to the event callbacks
   */
  emit<T>(eventName: string, data?: T): void {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName].forEach(callback => {
      callback(data);
    });
  }

  /**
   * Clear all subscribers for an event
   * @param eventName The event name to clear
   */
  clear(eventName?: string): void {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
}

// Export a singleton instance
export const eventBus = new EventBus();

// Export event name constants
export const EVENTS = {
  CITY_SELECTED: 'CITY_SELECTED',
  WEATHER_UPDATED: 'WEATHER_UPDATED',
  FORECAST_UPDATED: 'FORECAST_UPDATED',
  WEATHER_ERROR: 'WEATHER_ERROR',
};
