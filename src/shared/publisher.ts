import { ServerToClientMessage } from '../../server/chat-socket/socket-types';

interface Events {
  'new-message': (message: ServerToClientMessage) => any;
  'message-sent': (message: { content: string; ref: string }) => any;
  'confirm-message': (message: { ref: string; toId: string }) => any;
}

const publisher = {
  list: new Map<keyof Events, ((payload: any) => any)[]>(),
  on<T extends keyof Events>(eventType: T, eventAction: Events[T]) {
    if (!this.list.has(eventType)) this.list.set(eventType, []);
    const subscribers = this.list.get(eventType)!;
    subscribers.push(eventAction);
    return {
      unsubscribe() {
        const index = subscribers.indexOf(eventAction);
        if (index !== -1) subscribers.splice(index);
      },
    };
  },
  emit<T extends keyof Events>(
    eventType: T,
    payload: Parameters<Events[T]>[0]
  ) {
    if (!this.list.get(eventType)) return;

    this.list.get(eventType)!.forEach((callback: Function) => {
      callback(payload);
    });
  },
};

export default publisher;
