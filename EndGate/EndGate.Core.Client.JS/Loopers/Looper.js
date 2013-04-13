var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Loopers) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = [];
                }
                Looper.prototype.AddCallback = function (timedCallback) {
                    this._callbacks.push(timedCallback);
                    timedCallback.Active = true;
                    if(this._running) {
                        this.Loop(timedCallback);
                    }
                };
                Looper.prototype.RemoveCallback = function (timedCallback) {
                    for(var i = 0; i < this._callbacks.length; i++) {
                        if(this._callbacks[i].ID === timedCallback.ID) {
                            window.clearTimeout(timedCallback.TimeoutID);
                            timedCallback.Active = false;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };
                Looper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };
                Looper.prototype.Run = function () {
                    for(var i = 0; i < this._callbacks.length; i++) {
                        this.Loop(this._callbacks[i]);
                    }
                };
                Looper.prototype.Loop = function (timedCallback) {
                    var that = this, msTimer = 1000 / timedCallback.Fps;
                    timedCallback.Callback();
                    if(timedCallback.Active) {
                        timedCallback.TimeoutID = window.setTimeout(function () {
                            that.Loop(timedCallback);
                        }, msTimer);
                    }
                };
                Looper.prototype.Dispose = function () {
                    for(var i = this._callbacks.length - 1; i >= 0; i--) {
                        this.RemoveCallback(this._callbacks[i]);
                    }
                    this._callbacks = [];
                    this._running = false;
                };
                return Looper;
            })();
            Loopers.Looper = Looper;            
        })(Core.Loopers || (Core.Loopers = {}));
        var Loopers = Core.Loopers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));