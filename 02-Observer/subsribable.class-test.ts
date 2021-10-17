import { Subscribable } from './Subscribable-class';

const sub = new Subscribable<string>();

const unsub = sub.subscribe(console.log);

sub.publish('Hello');
sub.publish('Hi');
unsub();
sub.publish('Goodbye');

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }
  setValue(v: number) {
    this.value = v;
    this.publish(v);
  }
}

const dc = new DataClass(5);

const dcUnsub = dc.subscribe((v) => console.log(`DC: ${v}`));
const dcUnsu2b = dc.subscribe((v) => console.log(`DC2: ${v}`));
dc.setValue(42);
dcUnsub();
