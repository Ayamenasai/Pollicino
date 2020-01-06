export class EventFactory {
    constructor(game) {
        this.game = game;
        this.events = [];
    }

    add(eventId, eventName, args) {
        let event;
        if (eventName == 'onKill') {
            event = new OnKillEvent(this.game, eventId, args.sprite, args.execute);
        }
        else if (eventName == 'time') {
            event = new TimeEvent(this.game, eventId, args.timeInSeconds, args.execute);
        }
        else {
            return;
        }
        this.events.push(event);
    }

    update() {
        for (let i = 0; i < this.events.length; i++) {
            let event = this.events[i];
            event.update();
            if (event.hasExecuted) {
                this.events.splice(i, 1);
            }
        }
    }
}

class Event {
    constructor(game, eventId) {
        this.game = game;
        this.eventId = eventId;
        this.hasExecuted = false;
        this.execute = function () { };
    }

    checkCondition() {
        return false;
    }

    update() {
        if (this.checkCondition()) {
            this.execute.call();
            this.hasExecuted = true;
        }
    }
}

class OnKillEvent extends Event {
    constructor(game, eventId, sprite, execute) {
        super(game, eventId);
        this.sprite = sprite;
        this.execute = execute;
    }
    checkCondition() {
        let condition = !this.sprite.alive;
        return condition;
    }
}

class TimeEvent extends Event{
    constructor(game, eventId, timeInSeconds, execute) {
        super(game, eventId);
        this.timeInSeconds = timeInSeconds;
        this.execute = execute;
        this.executionTime = game.time.totalElapsedSeconds() + timeInSeconds;
    }

    checkCondition() {
        let condition = game.time.totalElapsedSeconds() >= this.executionTime;
        return condition;
    }

}