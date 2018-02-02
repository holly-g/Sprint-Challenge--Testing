## In Mocha, what are the differences between `before` `after` `beforeEach` `afterEach`? When do they run? What are they used for?  
'before' hook is run once before all the tests in a describe
'after' hook is run once after all the tests in a describe
'beforeEach' hook is run before *each* test in a describe
'afterEach' hook is run after *each* test.

## What is the point of Test Driven Development? What do you personally think about this approach?
Test-Driven Development makes it possible to have a very high percentage (often 90-100%) of code tested automatically. It reduces the probability of having bugs in your tests. I personally like this approach. It'll take more initial effort, but it's worth it for the preventative measures and will ultimately save me more time.

## What is a `spy` in `sinon`? How do we use it to effectively test a `callback`?
Spies are primarily used to gather information about function calls. One can use spy for testing callback functions by passing to the function that will be handling the callback. 