class PubSub {

    subIds: number;

    subscriptions: any;

    constructor () {
      this.subIds = 0;
      this.subscriptions = {}
    }
    
    subscribe (topic: string, fn: Function) {
      if(!this.subscriptions[topic]) this.subscriptions[topic] = {}
      const token = ++this.subIds;
      this.subscriptions[topic][token] = fn;
    }
    
    publish (topic: string, args: object) {
      const subs = this.subscriptions[topic];
      if(!subs) return false
      const values = Object.keys(subs).map(key => subs[key]);
      values.forEach(sub => sub(args))
    }
    
    unsubscribe (topic: string, token: string) {
      if(!token) delete this.subscriptions[topic]; // Delete all subscriptions for the topic
      this.subscriptions[topic] && (delete this.subscriptions[topic][token]); // Delete specific subscription
    }
  }
  
  export default new PubSub();