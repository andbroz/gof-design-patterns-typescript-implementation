import { createSubscribable } from './Subscribable-function';

const sub = createSubscribable<string>();

const unsub = sub.subscribe(console.log);

sub.publish('Hello');
sub.publish('Hi');
unsub();
sub.publish('Goodbye');
