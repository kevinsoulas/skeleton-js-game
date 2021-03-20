const Engine = function(time_step, update, render) {

    this.counter                    = 0;
    this.accumulated_time           = 0;
    this.animation_frame_request    = undefined;
    this.time                       = undefined;
    this.time_step                  = time_step;

    this.updated = false;
    this.update = update;
    this.render = render;

    this.freeze_count = 0;

    this.run = function(time_stamp) {

        this.accumulated_time += time_stamp - this.time;
        this.time = time_stamp;
        this.counter += 1;

        while(this.accumulated_time >= this.time_step) {
            this.accumulated_time -= this.time_step;
            this.update(time_stamp);
            this.updated = true;
        }

        if (this.updated) {

            this.updated = false;
            this.render(time_stamp);

        }

        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);

    };

    this.start = function() {

        console.log("engine start");
        this.accumulated_time = this.time_step;
        this.time = window.performance.now();
        this.animation_frame_request = window.requestAnimationFrame(this.handleRun);

    };

    this.stop = function() { 
        
        console.log("engine stop");
        window.cancelAnimationFrame(this.animation_frame_request);
    
    };

    this.freeze = function(count = 1) {

        this.freeze_count = count;

    };

    this.frozen = function() {

        return this.freeze_count > 0;

    }

    this.unfreeze = function(count = 1) {

        this.freeze_count = Math.max(0, this.freeze_count - count);

    }

    this.handleRun = (time_step) => { this.run(time_step); };

};

Engine.prototype = {

    constructor: Engine

};