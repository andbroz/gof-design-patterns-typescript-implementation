# Observer Pattern

Also known as Publisher & Subscriber Pattern

You subscribe a callback to publisher to observe data change.
When data changes observer run all registered callbacks to inform subsribers about data change.

## Class version

- create Subscribable class
- add to this class private list of subscribers
- provide a subscribe function that will regiter subscriber callback to the list
- return "unsubscribe" function from subscribe
- add publish method that will call each subscriber callback

## Function version

- create function createSubscribable which return all methods
- add in closure subscribers list
- provide subscribe method
- from subscribe return unsubscribe
- add publish method
