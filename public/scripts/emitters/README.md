# Emitters

Emitters are objects that periodically emit particles.

## Creating an Emitter

The constructor for Emitters takes its position, emit rate, angle, a factory to create the particles, and an optional list of modifiers. Check out that signature:

```javascript
var Emitter = function(position, emitRate, angle, factory, decorators)
```

The factory function must accept a position `vector`, a velocity `vector`, and the number of seconds ago the particle should have spawned. This last parameter allows for timing to look right, even if your emitter's function runs later than the time it should have emitted a particle.

So what's this look like in practice?

```javascript
var emitter = new Emitter(
    new Vector(this.width / 2, this.height / 2),
    0.1,  // emit a particle once ever 0.1 seconds
    0,    // particle direction is 0 radians (i.e. to the right)

    // this is the factory that gets called to create every particle
    function(position, velocity, fromTime) {

      var newParticle = new MyParticle(
        position, velocity.scale(MyParticle.SPEED)
      );

      // update the actor based on the time it was spawned
      newParticle.update(fromTime, gameState);

      // Add newParticle to your list of actors
    }
);
```

This assumes your have a class that called `MyParticle` that extends `Actor` and has a constant called `SPEED`. A few things to note here:
* This will spawn 1 bullet every 0.1 seconds, and it will be heading to the right of the screen. This is determined by the 2nd and 3rd arguments to the Emitter constructor.
* Your factory function should definitely call update on the object you create, giving `fromTime` as the deltaTime.

## Modifying the Emitter's Behavior

So the example above is pretty weak. You can see that we could change the static frequency of particle emissions, or we could change the static angle they are fired at, but that's about it. But what if we want to dynamically change the angle it fires at? Or emit 20 particles at a time.

To allow for more advanced emitting, you can use `EmitterDecorator`s to modify the particle emission. Typically, the entire modification is determined when the modifier is created. For example:
```javascript
// using the emitter we initialized above...
emitter.addDecorator(new Swinger(4, 1));
emitter.addDecorator(new Splitter(3, Math.PI / 2));
```
This adds two EmitterDecorators. Each time the emitter would emit a particle, it first processes each of the EmitterDecorators. The poorly named `Swinger` is a modifier that changes the direction of the emitted particle so that it swings back and forth. In this example, it moves at 4 radians per second, and swings within a range of 1 radian. The `Splitter` here 'splits' each particle into 3 particles that are emitted in a range of PI / 2.



### `Splitter`
Splitters allow for multiple particles to be emitted simultaneously. The first argument to its constructor should be the number of particles to emit. The second parameter is the range over which they will be spread. If only one argument is passed, the `Splitter` spreads the particles over a whole circle.

### `Rotator`
Rotators are used to alter the angle at which a particle is emitted. The first argument to the constructor is the speed at which to rotate, and the second argument is the angle offset.

### `Swinger`
The Swinger 'swings' back and forth within a range, determining a particle's angle.

### `SoftSwinger`
The SoftSwinger is similar to the Swinger, but it uses a sin wave to allow for smoother behavior when changing directions.

### `Mirrorer`
The Mirrorer mirrors a particle emission along a given line. Its constructor takes a single argument: the angle along which the emission should be mirrored.
