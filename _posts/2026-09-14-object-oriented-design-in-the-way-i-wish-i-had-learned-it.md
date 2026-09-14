---
title: "Object-oriented design in the way I wish I had learned it"
description: "A tutorial on object-oriented design for ML systems: who owns which responsibility, what encapsulation is really for, and when inheritance earns its place."
date: 2026-09-14
kind: article
tags: [ml-engineering, tutorial]
toc: true
math: false
# updated: 2026-09-14          # set when you revise a published post
# series: some-series-key   # must exist in _data/series.yml
# series_part: 1
# image: /assets/posts/object-oriented-design-in-the-way-i-wish-i-had-learned-it/hero.png
# image_alt: "What the image shows, for screen readers and when it fails to load."
# youtube_id: dQw4w9WgXcQ   # bare ID, not a URL
# youtube_title: "Title of the companion video"
# canonical_url:            # only if this appeared somewhere else first
# featured: true            # pin to the curated list
---


Given my main professional background, Industrial Engineering, I usually tend to formulate everything as a process. As a result, thinking in graph terminologies, the connection (or relationship) between entities and the interaction part are, for me, the most important and trickiest aspects. That's why I have always been fascinated by supply chains — this fascinating invention of humankind that is like the vessels of the modern human lifestyle.

That said, building and maintaining major ML systems are like managing an entire supply chain, with the big difference that one or a few people can see, and even better, control all of its layers in a very transparent way. This is the first motivation to write about Object-Oriented Design (OOD).

The second motivation is about code agents. Needless to say, the way we code will never be the same as before, the age without LLMs and these coding agents. In this era, the bottleneck is us, not writing the code itself. We, and the way we perceive and communicate about what we want to build, are the real limitation. As a result, reading code, based on first principles and a system design perspective, is much more important than writing it blindly. Proper reading is the main prerequisite of a right evaluation mechanism, which is necessary to control the scope of a project that can go wild without knowing how to read and criticize the product of a code agent.

I will try to write more about new emerging paradigms on coding and programming in general but for now, on this coldish Sunday night, I was thinking of refreshing my memories and knowledge on OOD and decided to turn this journey into a learning tutorial, first for myself, and hopefully for you!

## What we will build and what you need to know

This tutorial is intended for readers who know basic Python functions and classes but have not studied software design formally.

By the end, you should be able to:

- distinguish an object from a class;
- assign responsibilities to objects;
- protect business rules through encapsulation;
- connect components through composition and interfaces;
- decide when inheritance is appropriate;
- recognize common design problems in ML and RL systems.

I will not try to cover every design pattern. The goal is to build a reliable way of thinking before studying individual patterns.

## Procedural Coding

The simplest way of programming is to just write code, and repeat every intention in a set of variables and operators. This is the way we may code if we started programming just two days ago. The next level, after coming across the redundancy concept, is procedural code: data sits in structures, and separate functions reach in and manipulate it.


```python
# Procedural style
account = {"balance": 100}

def deposit(acct, amount):
    acct["balance"] += amount

def withdraw(acct, amount):
    if amount > acct["balance"]:
        raise ValueError("Insufficient funds")
    acct["balance"] -= amount
```
Nothing stops some other part of the codebase from doing account["balance"] = -500 directly. This is important because many real-world applications have many interconnected constraints and one needs to model all the constraints and relationships in a proper way to, again, avoid redundancy and increase modularity, maintainability and scalability. As a result, we need a new mindset: "data + the behavior that operates on it, together". This is one of the ways we invented to formulate real-world problems in a machine-understandable way: Object-Oriented Design.

Before we start, we need to clarify the boundaries between object-oriented design and object-oriented programming. These two terminologies can be used interchangeably, but I would love to emphasize the design aspect here. Design is concerned more with thinking and reasoning about a system than with implementation. Concretely: **Object-Oriented Design is the practice of deciding which real-world responsibilities belong to which objects** — what each object should know, what it should be allowed to do, and what rules it must protect — before any of that gets translated into classes and methods. Object-Oriented Programming is just the implementation of those decisions in a language that supports classes and objects. You can do good OOD in a language with no classes at all, using functions and modules that respect the same boundaries; you can also write technically-OOP code, classes everywhere, that has terrible design, because the responsibilities sit in the wrong place.

We want to think in an object-oriented way so what comes below is the mindset I am trying to set on how to think when it comes to reading a large codebase. That said, let's start from definitions.



## Objects and Classes

A class is a blueprint. An object is a thing built from that blueprint. Imagine we have a concept of Dog class, but we can have many independent dogs.


```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

fido = Dog("Fido", "Corgi")
rex  = Dog("Rex", "Husky")

fido.name  # "Fido"
rex.name   # "Rex" — same class, separate state
```
We'll build on this throughout — every class below still boils down to a blueprint (the class) and the specific things built from it (the objects) — but the more interesting design question is what that blueprint should be responsible for. That's where we go next.


## The real subject is responsibility

The first question we ask in object-oriented design is:

> Which part of the system should know this information, make this decision, or protect this rule?

Take `Dog` from a moment ago: should `Dog` know whether it's hungry, or should the calling code decide that on its own by checking `dog.energy < 3` from the outside? Put that way, the answer feels obvious — `Dog` should own that knowledge and expose something like `is_hungry()`. The same question, asked about a distributed inventory system, is a lot easier to get wrong. That's the question we'll keep coming back to.

Imagine that a retailer operates several warehouses. Every day, the system must forecast demand and decide whether inventory should be moved. At first, the workflow sounds simple:

```text
load data -> build features -> predict demand -> choose transfers -> publish decisions
```

It is tempting to create a class named `InventoryMLPipeline` and put each step inside it. Before writing that class, however, I would ask four questions:

```text
1. Who should perform each operation?
2. What must remain true at all times?
3. How are the parts related?
4. Which parts can change independently?
```

The first question assigns responsibility. The second reveals invariants, which are the rules or constraints our objects must protect. The third helps us choose between composition, inheritance, and interfaces. The fourth tells us where stable boundaries are useful.

For our inventory system, a few answers appear quickly. A demand forecast should know its horizon and predicted quantities. A transfer action should know its source, destination, product, and quantity. A constraint checker should decide whether a proposed action is feasible. A policy should choose an action from a decision context. A repository should retrieve or store information, but it should not decide how much inventory to move.

This way of thinking changes class design. We stop treating classes as folders that hold related functions. Each class receives a job and the authority required to perform that job.

In the initial phases of designing a system, the following responsibility card is a useful design tool:

```text
Object:         TransferAction
Knows:          source, destination, product, quantity
Does:           reports its movement and operational cost
Protects:       quantity > 0 and source != destination
Collaborates:   InventoryPosition, ConstraintChecker
Does not know:  databases, model files, APIs, training code
```

If this format feels familiar, it's a close cousin of **CRC cards** — Class, Responsibility, Collaborator — a design technique from the late 1980s, older than most of the languages we use today. I've just adapted it slightly for ML/business objects. That "Collaborates" line, by the way, is composition — one object holding a reference to another and delegating to it. We'll define composition properly a few sections down; for now, read it as "the other objects `TransferAction` talks to."

If I cannot complete this card in a few clear sentences, the proposed object is probably vague, overloaded, or unnecessary.

## Objects should carry business meaning

An object combines attributes and behavior under a meaningful name. The attributes describe the object; the behavior lets it answer questions or perform actions while preserving its rules. In other words, attributes are the nouns — what the object knows right now:

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name       # instance attribute — unique per object
        self.breed = breed

    species = "Canis familiaris"  # class attribute — shared by all dogs
```

But behaviors are actions (methods in code). Methods are the verbs — what the object does, usually by acting on its own attributes.

```python
class Dog:
    def __init__(self, name):
        self.name = name
        self.energy = 10

    def bark(self):
        return f"{self.name} says Woof!"

    def play(self):
        self.energy -= 1
        return f"{self.name} is playing (energy: {self.energy})"
```

Let's see a more practical example, a small demand forecast:

```python
from dataclasses import dataclass
from datetime import datetime


@dataclass(frozen=True)
class DemandForecast:
    product_id: str
    location_id: str
    generated_at: datetime
    horizon_days: int
    p10: float
    p50: float
    p90: float

    def __post_init__(self) -> None:
        if self.horizon_days <= 0:
            raise ValueError("Forecast horizon must be positive")

        if not 0 <= self.p10 <= self.p50 <= self.p90:
            raise ValueError("Forecast quantiles must be nonnegative and ordered")

    def uncertainty_width(self) -> float:
        return self.p90 - self.p10

    def covers(self, actual_demand: float) -> bool:
        return self.p10 <= actual_demand <= self.p90
```

The attributes are facts about the forecast. The methods represent behavior that naturally belongs beside those facts. Most important, the object refuses to exist in an invalid form.

Without this protection, crossed quantiles can travel surprisingly far. A malformed row may be written to a table, returned by an API, displayed in a dashboard, and only noticed by an analyst the next morning. If validation lives in the object constructor, the error appears close to its origin (which is the most important rule in avoiding error propagation).

This leads to one of my favorite design rules:

> Make invalid states difficult to represent.

The `frozen=True` option also matters. A forecast is a value produced at a particular time. If a calibration step needs to change its numbers, it should create a new forecast rather than silently modify the old one. This is one of the most important concepts in data engineering and software design: immutability, which is the quality or state of being unchangeable or unable to be modified after it is created. Immutability gives us a clean audit trail and makes concurrent code easier to reason about.

Professional developers often distinguish between value objects and entities. A `DemandForecast` is usually a value object. Its meaning comes from its values. A training run is an entity because it has an identity that survives changes in status:

```python
from dataclasses import dataclass, field
from enum import Enum


class RunStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


@dataclass
class TrainingRun:
    run_id: str
    model_name: str
    status: RunStatus = field(default=RunStatus.PENDING, init=False)

    def start(self) -> None:
        if self.status is not RunStatus.PENDING:
            raise RuntimeError(f"Cannot start a run in state {self.status}")
        self.status = RunStatus.RUNNING

    def complete(self) -> None:
        if self.status is not RunStatus.RUNNING:
            raise RuntimeError(f"Cannot complete a run in state {self.status}")
        self.status = RunStatus.COMPLETED
```

The run owns its state transitions. Calling code says `run.start()` instead of changing two or three fields by hand. This is a practical version of the object-oriented advice known as *Tell, Don't Ask*. When an operation has business rules, tell the responsible object what happened and let it preserve those rules.

There is no benefit in turning every row or NumPy array into a rich object. A pure feature calculation is often clearer as a function:

```python
def calculate_inventory_gap(
    available_units: float,
    expected_demand: float,
) -> float:
    return available_units - expected_demand
```

I use a class when identity, state, lifecycle, polymorphism, or protected rules justify one. For a deterministic transformation from input to output, a function may be the better design.

## A public interface is a promise

Encapsulation is another important term in object-oriented design. Encapsulation is often taught as hiding fields by making them private. That explanation is incomplete. The real purpose is to give callers a small, stable interface while the object keeps control of its internal representation and invariants.

Consider a model registry:

```python
class ModelRegistry:
    def __init__(self) -> None:
        self.models: dict[str, object] = {}
```

Any caller can now do this:

```python
registry.models.clear()
registry.models["production"] = None
```

The object has no authority over its own contents. A better version exposes meaningful operations:

```python
class ModelRegistry:
    def __init__(self) -> None:
        self._models: dict[str, object] = {}

    def register(self, version: str, model: object) -> None:
        if not version:
            raise ValueError("A model version is required")
        if model is None:
            raise ValueError("A model artifact is required")
        if version in self._models:
            raise ValueError(f"Model version already exists: {version}")

        self._models[version] = model

    def load(self, version: str) -> object:
        try:
            return self._models[version]
        except KeyError:
            raise LookupError(f"Unknown model version: {version}") from None
```

In Python, the leading underscore (`_models`) is a convention rather than a locked door. It tells callers that `_models` is an implementation detail. They should use `register()` and `load()` as the public interface.

That small public interface gives the registry room to evolve. The dictionary could later be replaced with object storage or a remote model registry. We could add checksums, access control, caching, or audit records. Calling code would still ask the same two questions: register this model, or load that version.


## Separate the model from the business use case

A trained model is only one component of a business system. It accepts a numerical representation and produces an output. The business use case begins earlier and ends later.

```text
Business request
      |
      v
Validate request
      |
      v
Retrieve point-in-time features
      |
      v
Run model or policy
      |
      v
Apply constraints and business rules
      |
      v
Record, publish, and monitor the decision
```

One of the most costly design mistakes in ML code is giving the model responsibility for this complete path:

```python
class DemandModel:
    def predict_for_store(self, store_id):
        connection = open_database_connection()
        rows = run_sql(connection, store_id)
        features = build_features(rows)
        predictions = self.booster.predict(features)
        write_predictions_to_database(predictions)
        send_message_to_queue(predictions)
        return predictions
```

This method combines infrastructure, feature policy, numerical inference, persistence, and publishing. Testing it requires too much setup. Reusing the model for offline evaluation may also write production data or send a message by accident.

There's a name for the discipline being violated here: the **Single Responsibility Principle** — a class or function should have one reason to change. `DemandModel.predict_for_store` has at least five: database schema, feature logic, model architecture, storage format, and messaging infrastructure. That's exactly why it's fragile. Splitting it, as below, gives each reason to change its own home.

The model should usually operate on already prepared inputs:

```python
class DemandPredictor:
    def __init__(self, booster) -> None:
        self._booster = booster

    def predict(self, features: "FeatureVector") -> "RawForecast":
        values = self._booster.predict(features.to_array())
        return RawForecast.from_array(values)
```

An application service coordinates the business use case:

```python
class ForecastApplicationService:
    def __init__(
        self,
        feature_provider,
        predictor,
        calibrator,
        forecast_repository,
    ) -> None:
        self._feature_provider = feature_provider
        self._predictor = predictor
        self._calibrator = calibrator
        self._forecast_repository = forecast_repository

    def generate_forecast(
        self,
        product_id: str,
        location_id: str,
        as_of: datetime,
    ) -> DemandForecast:
        features = self._feature_provider.get_features(
            product_id=product_id,
            location_id=location_id,
            as_of=as_of,
        )
        raw = self._predictor.predict(features)
        forecast = self._calibrator.calibrate(
            product_id=product_id,
            location_id=location_id,
            generated_at=as_of,
            raw=raw,
        )
        self._forecast_repository.save(forecast)
        return forecast
```

This service contains little mathematical intelligence. Its responsibility is orchestration: it tells the right objects to act in the right order. This is the part where we connect the dots and the relationships appear.

This is an **application service**: an object whose entire job is orchestration. It holds no domain logic itself — no opinion about what makes a forecast valid or how calibration works. It just knows the *order* in which the real domain objects (`FeatureProvider`, `Predictor`, `Calibrator`, `ForecastRepository`) need to be called, and calls them in that order. If you know layered or hexagonal architecture, this is the layer between "someone asked for a forecast" and the domain objects that actually know how to produce one.

Notice the `as_of` argument. In a business forecasting system, time is part of the contract which means the accuracy, relevance, and validity of a prediction depend entirely on strict adherence to a specific temporal framework, frequency, and sequence. A feature provider that returns the latest available data may leak future information during backtesting. By requiring `as_of`, we make point-in-time correctness visible at the boundary rather than leaving it as an unwritten expectation.

A quick definition, since this trips people up: **backtesting** means running a model against historical data to see how it would have performed. **Point-in-time correctness** means that when you backtest for, say, March 1st, the features you feed the model only contain information that was actually available on March 1st — nothing from March 2nd onward. Get this wrong and your backtest silently uses information the model wouldn't have had in production, and your accuracy numbers become fiction.

This is one place where OOD for ML differs from examples about animals or geometric shapes. Our core objects often need to represent lineage, event time, model version, uncertainty, and the conditions under which a result was produced. Those are parts of the domain, not metadata to scatter across log messages.


## Composition is the default assembly mechanism

Composition means building an object from other objects. The `ForecastApplicationService` has a feature provider, predictor, calibrator, and repository. This is composition. Each capability is supplied to the service instead of created inside it. As a result, composition is a `has-a`.

```text
ForecastApplicationService
    |
    +-- has a FeatureProvider
    +-- has a Predictor
    +-- has a Calibrator
    +-- has a ForecastRepository
```

The same service can be assembled differently in production, evaluation, and tests just by changing the objects it receives as input:

```python
production_service = ForecastApplicationService(
    feature_provider=WarehouseFeatureProvider(...),
    predictor=XGBoostDemandPredictor(...),
    calibrator=ConformalCalibrator(...),
    forecast_repository=SqlForecastRepository(...),
)
```

For an offline replay:

```python
replay_service = ForecastApplicationService(
    feature_provider=HistoricalFeatureProvider(...),
    predictor=XGBoostDemandPredictor(...),
    calibrator=ConformalCalibrator(...),
    forecast_repository=InMemoryForecastRepository(),
)
```

For a unit test:

```python
test_service = ForecastApplicationService(
    feature_provider=FixedFeatureProvider(...),
    predictor=ConstantPredictor(p10=10, p50=20, p90=40),
    calibrator=NoOpCalibrator(),
    forecast_repository=RecordingForecastRepository(),
)
```

This practice is called dependency injection. The name sounds more technical than the idea. An object receives the collaborators it needs. It does not quietly construct them.

Composition makes changes local. A team can introduce a neural predictor without changing calibration or persistence. It can replace a message broker without touching the model. Tests can use small fake implementations instead of patching network calls hidden inside constructors.


## Interfaces: describe capability

Interfaces define what each collaborator promises. Python can express this using `Protocol`:

```python
from typing import Mapping, Protocol


class Predictor(Protocol):
    def predict(
        self,
        features: Mapping[str, float],
    ) -> tuple[float, float, float]:
        ...
```

Several unrelated classes can satisfy this contract:


```python
class XGBoostPredictor:
    def predict(self, features):
        ...


class NeuralNetworkPredictor:
    def predict(self, features):
        ...


class ConstantPredictor:
    def predict(self, features):
        return 20.0, 30.0, 100.0
```

They do not need to inherit from Predictor. They only need to provide the promised behavior. This is a *can-do* relationship. There's a name for this you've probably already heard: **duck typing** — "if it walks like a duck and quacks like a duck, it's a duck." `Protocol` is Python's way of making that idea explicit and type-checkable instead of leaving it as an informal convention: a class satisfies the `Predictor` protocol simply by having a matching `predict()` method, with no inheritance required. Keep that in your back pocket — we're about to spend a whole section on actual ducks.

Professional Python design often uses protocols and composition more frequently than large inheritance hierarchies.

## Inheritance

Inheritance expresses an *is-a* relationship. Inheritance is attractive because it seems to remove duplication. In an "is-a" relationship, a subclass extends a base class and inherits its interface and behavior.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h
```

The payoff is what's formally called **polymorphism**: the ability to call the same method name on objects of different types and get each type's own correct behavior, without the caller needing to know which concrete type it's holding. In practice:

```python
shapes = [Circle(3), Rectangle(4, 5)]
for s in shapes:
    print(s.area())   # each shape knows how to compute its own area
```

That's real abstraction — the calling code doesn't need an if `isinstance(...)` chain; it just trusts the contract. Now, the mistake almost every developer makes once — the moment where composition should actually be implemented. Imagine modeling ducks:

```python
class Duck:
    def fly(self):
        return "Flying!"
    def quack(self):
        return "Quack!"

class MallardDuck(Duck):
    pass  # inherits fly() and quack() fine

class RubberDuck(Duck):
    def fly(self):
        return "Can't fly, I'm rubber"   # forced to override
    def quack(self):
        return "Squeak!"                  # forced to override
```

Every new duck type has to remember to override the methods that don't apply to it. Forget one, and a `RubberDuck` silently "flies." This gets worse as the hierarchy grows — behavior is duplicated and scattered across overrides instead of living in one place. This is where composition should be used:

<figure class="diagram">
  <picture>
    <source srcset="{{ '/assets/posts/object-oriented-design-in-the-way-i-wish-i-had-learned-it/inheritance-vs-composition-duck.webp' | relative_url }}" type="image/webp">
    <img src="{{ '/assets/posts/object-oriented-design-in-the-way-i-wish-i-had-learned-it/inheritance-vs-composition-duck.png' | relative_url }}" alt="Two class diagrams side by side. On the left, labelled Inheritance (rigid), a Duck class has two subclasses: MallardDuck, which works as-is, and RubberDuck, which must override. On the right, labelled Composition (flexible), a Duck class holds two pluggable parts, FlyBehavior and QuackBehavior. The left side is marked is-a, the right side has-a">
  </picture>
  <figcaption>The same ducks, assembled two ways: <em>is-a</em> on the left, <em>has-a</em> on the right.</figcaption>
</figure>

The composition fix in code:

```python
class FlyWithWings:
    def fly(self):
        return "Flying with wings!"

class FlyNoWay:
    def fly(self):
        return "I can't fly"

class Duck:
    def __init__(self, fly_behavior, quack_behavior):
        self.fly_behavior = fly_behavior      # composed in, not inherited
        self.quack_behavior = quack_behavior

    def perform_fly(self):
        return self.fly_behavior.fly()        # delegate

mallard = Duck(FlyWithWings(), None)
rubber  = Duck(FlyNoWay(), None)
```

Now behavior is a plug-in, not a hardcoded override. You can even swap it at runtime — `duck.fly_behavior = FlyWithWings()` — something inheritance can never do, since your class hierarchy is fixed the moment you write class `RubberDuck(Duck)`. This is the exact idea behind the Strategy pattern, and it's why "favor composition over inheritance" is repeated so often — inheritance locks in behavior at compile time; composition keeps it swappable.

Inheritance is attractive because it seems to remove duplication. Let's see a machine learning based example. Suppose we begin with this base class:

```python
class BaseModel:
    def load_data(self): ...
    def train(self): ...
    def predict(self): ...
    def evaluate(self): ...
    def save(self): ...
```

Then we add:

```python
class XGBoostModel(BaseModel): ...
class NeuralNetworkModel(BaseModel): ...
class ReinforcementLearningModel(BaseModel): ...
```

The hierarchy looks tidy. The meaning is weak. A supervised predictor and an RL policy do not necessarily share training data, evaluation semantics, outputs, or deployment lifecycles. Their methods may have the same names while obeying different contracts.

Inheritance is strongest when the child can replace the parent without surprising the caller. This is the substitution test:

```text
If code works with the parent,
will it still behave correctly with any child?
```

Consider a repository abstraction:

```python
from abc import ABC, abstractmethod


class ForecastRepository(ABC):
    @abstractmethod
    def save(self, forecast: DemandForecast) -> None:
        raise NotImplementedError

    @abstractmethod
    def find_latest(
        self,
        product_id: str,
        location_id: str,
    ) -> DemandForecast | None:
        raise NotImplementedError
```

`SqlForecastRepository` and `InMemoryForecastRepository` are reasonable subtypes if they preserve the same observable promises. A `ReadOnlyForecastRepository` whose `save()` method always raises an unsupported-operation error is not a good subtype of this interface. It cannot stand in for its parent.

The formal name for this idea is the `Liskov Substitution Principle`. I find the ordinary question easier to remember: can callers trust every child to keep the parent's promises?

Using inheritance only for code reuse often creates fragile coupling. Conformal calibration, for example, is not a special kind of XGBoost model:

```python
# Awkward relationship
class ConformalXGBoostModel(XGBoostModel):
    ...
```

Calibration is a separate capability applied to raw predictions:

```python
# Clear relationship
service = ForecastApplicationService(
    feature_provider=feature_provider,
    predictor=XGBoostDemandPredictor(booster),
    calibrator=ConformalCalibrator(calibration_scores),
    forecast_repository=repository,
)
```

Abstract classes remain useful when implementations truly share a contract and a small amount of stable behavior. Protocols are often enough when we only need a capability. Composition is usually better when we want to combine behaviors.


## Multiple inheritance

A class inheriting from more than one base class at once. Python and C++ allow it directly; Java and C# deliberately don't, for a reason you're about to see:

<figure class="diagram">
  <picture>
    <source srcset="{{ '/assets/posts/object-oriented-design-in-the-way-i-wish-i-had-learned-it/diamond-problem-multiple-inheritance.webp' | relative_url }}" type="image/webp">
    <img src="{{ '/assets/posts/object-oriented-design-in-the-way-i-wish-i-had-learned-it/diamond-problem-multiple-inheritance.png' | relative_url }}" alt="A diamond-shaped class diagram titled The diamond problem. Class A sits at the top. B and C inherit from it and both override the same method. D inherits from both B and C and is labelled ambiguous">
  </picture>
  <figcaption><code>D</code> inherits the same method from two parents. Which one wins?</figcaption>
</figure>

`D` inherits `greet()` from both `B` and `C` — which one wins? Python resolves this with the `C3 linearization algorithm`, which you can inspect directly:

```python
class A:
    def greet(self): return "A"

class B(A):
    def greet(self): return "B"

class C(A):
    def greet(self): return "C"

class D(B, C):
    pass

D().greet()          # "B" — leftmost parent wins first
D.__mro__             # (D, B, C, A, object) — the resolution order
```
Python checks `B` before `C` because `B` was listed first in class `D(B, C)`. That's deterministic, but it's easy to get wrong intuitively — which is exactly why Java and C# banned multiple class inheritance and only allow multiple interface implementation instead (an interface has no state and usually no implementation, so there's nothing to be ambiguous about).

The professional-grade pattern for "I need a class with abilities from two places" is *mixins* — small, focused classes designed only to be combined, never used alone:

```python
class SwimMixin:
    def swim(self):
        return "Swimming!"

class FlyMixin:
    def fly(self):
        return "Flying!"

class Duck(SwimMixin, FlyMixin):
    pass

Duck().swim()   # "Swimming!"
Duck().fly()    # "Flying!"
```
Each mixin does one narrow thing and doesn't compete for the same method names, so the diamond problem never actually shows up in practice. This is the industry's answer: prefer composition, and if you must combine multiple types, use small mixins/interfaces — never deep, overlapping inheritance trees.

## What I want to remember

Object-oriented design became easier for me once I stopped thinking mainly about class hierarchies. The central question is ownership. Which object owns this knowledge, this action, this rule, and this part of the lifecycle?

Besides, I would love to keep in memory these four words, which professional developers use as shorthand:

| Pillar | What you just learned | The keeper example |
|---|---|---|
| **Encapsulation** | Hiding details, exposing a public interface | `Account._balance` protected behind `deposit()`/`withdraw()` |
| **Abstraction** | A base class defines *what*, not *how* | `Shape.area()` — every shape answers differently |
| **Inheritance** | is-a, sharing a contract and code | `Circle(Shape)`, `Rectangle(Shape)` |
| **Polymorphism** | Same call, different behavior per object | `for s in shapes: s.area()` — no `if` chains |


The four pillars are the textbook summary. Here's the one specific to what this post actually built:

| Idea | What it means here | Where you saw it |
|---|---|---|
| Objects own responsibilities | Ask who should know a fact or make a decision, not just what data exists | `TransferAction`, `ConstraintChecker` |
| Value objects protect domain meaning | Reject invalid data at construction; don't let it travel | `DemandForecast.__post_init__` |
| Public interfaces express promises | Callers get a small, stable surface, not raw internals | `ModelRegistry.register()` / `.load()` |
| Composition assembles capabilities | Supply collaborators from outside instead of building them inside | `ForecastApplicationService(...)` |
| Inheritance requires safe substitution | A subclass must keep every promise the parent makes | `ForecastRepository` vs. a read-only variant |
| Time, version, and lineage belong in the design | Make correctness-over-time part of the contract, not a comment | `as_of` in `generate_forecast` |


For ML and RL systems, I keep the following summary nearby:

```text
Objects own responsibilities.
Value objects protect domain meaning.
Public interfaces express promises.
Composition assembles capabilities.
Inheritance requires safe substitution.
Policies propose; constraints authorize.
Models estimate; business rules decide.
Infrastructure stays at the boundary.
Time, version, and lineage belong in the design.
```
And the one line that ties composition and inheritance together, worth memorizing word-for-word: "Favor composition over inheritance — reserve inheritance for genuine is-a relationships where the abstraction is stable, and reach for composition whenever behavior needs to vary or swap independently."

I know there are lots of other topics and implementation details in object-oriented design and programming which I cannot cover in this tutorial. As Rumi said, what I did here is like pouring the sea into a jar, which is impossible, but it can give us the real taste of seawater.

What remains unchanged afterward is practice, practice, and practice.
