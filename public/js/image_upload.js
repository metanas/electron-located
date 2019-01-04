"use strict";
"object" != typeof window.CP && (window.CP = {}), window.CP.PenTimer = {
    programNoLongerBeingMonitored: !1,
    timeOfFirstCallToShouldStopLoop: 0,
    _loopExits: {},
    _loopTimers: {},
    START_MONITORING_AFTER: 2e3,
    STOP_ALL_MONITORING_TIMEOUT: 5e3,
    MAX_TIME_IN_LOOP_WO_EXIT: 2200,
    exitedLoop: function (o) {
        this._loopExits[o] = !0
    },
    shouldStopLoop: function (o) {
        if (this.programKilledSoStopMonitoring) return !0;
        if (this.programNoLongerBeingMonitored) return !1;
        if (this._loopExits[o]) return !1;
        var t = this._getTime();
        if (0 === this.timeOfFirstCallToShouldStopLoop) return this.timeOfFirstCallToShouldStopLoop = t, !1;
        var i = t - this.timeOfFirstCallToShouldStopLoop;
        if (i < this.START_MONITORING_AFTER) return !1;
        if (i > this.STOP_ALL_MONITORING_TIMEOUT) return this.programNoLongerBeingMonitored = !0, !1;
        try {
            this._checkOnInfiniteLoop(o, t)
        } catch (o) {
            return this._sendErrorMessageToEditor(), this.programKilledSoStopMonitoring = !0, !0
        }
        return !1
    },
    _sendErrorMessageToEditor: function () {
        try {
            if (this._shouldPostMessage()) {
                var o = {action: "infinite-loop", line: this._findAroundLineNumber()};
                parent.postMessage(JSON.stringify(o), "*")
            } else this._throwAnErrorToStopPen()
        } catch (o) {
            this._throwAnErrorToStopPen()
        }
    },
    _shouldPostMessage: function () {
        return document.location.href.match(/boomerang/)
    },
    _throwAnErrorToStopPen: function () {
        throw"We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@codepen.io."
    },
    _findAroundLineNumber: function () {
        var o = new Error, t = 0;
        if (o.stack) {
            var i = o.stack.match(/boomerang\S+:(\d+):\d+/);
            i && (t = i[1])
        }
        return t
    },
    _checkOnInfiniteLoop: function (o, t) {
        if (!this._loopTimers[o]) return this._loopTimers[o] = t, !1;
        var i = t - this._loopTimers[o];
        if (i > this.MAX_TIME_IN_LOOP_WO_EXIT) throw"Infinite Loop found on loop: " + o
    },
    _getTime: function () {
        return +new Date
    }
}, window.CP.shouldStopExecution = function (o) {
    var t = window.CP.PenTimer.shouldStopLoop(o);
    return t === !0 && console.warn("[CodePen]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. Sorry!"), t
}, window.CP.exitedLoop = function (o) {
    window.CP.PenTimer.exitedLoop(o)
};

function initImageUpload(box) {
    let uploadField = box.querySelector('.image-upload');

    uploadField.addEventListener('change', getFile);

    function getFile(e) {
        let file = e.currentTarget.files[0];
        checkType(file);
    }

    function previewImage(file) {
        let thumb = box.querySelector('.js--image-preview'),
            reader = new FileReader();

        reader.onload = function () {
            thumb.style.backgroundImage = 'url(' + reader.result + ')';
        };
        reader.readAsDataURL(file);
        thumb.className += ' js--no-default';
        // $('#images-flied').last().after("<div class=\"box\">\n" +
        //     "        <div class=\"js--image-preview\"></div>\n" +
        //     "        <div class=\"upload-options\">\n" +
        //     "          <label>\n" +
        //     "            <input type=\"file\" class=\"image-upload\" accept=\"image/*\" />\n" +
        //     "          </label>\n" +
        //     "        </div>\n" +
        //     "      </div>")
    }

    function checkType(file) {
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
            throw 'Datei ist kein Bild';
        } else if (!file) {
            throw 'Kein Bild gewählt';
        } else {
            previewImage(file);
        }
    }

}

// initialize box-scope
var boxes = document.querySelectorAll('.box');

for (let i = 0; i < boxes.length; i++) {
    if (window.CP.shouldStopExecution(1)) {
        break;
    }
    let box = boxes[i];
    initDropEffect(box);
    initImageUpload(box);
}
window.CP.exitedLoop(1);


/// drop-effect
function initDropEffect(box) {
    let area, drop, areaWidth, areaHeight, maxDistance, dropWidth, dropHeight, x, y;

    // get clickable area for drop effect
    area = box.querySelector('.js--image-preview');
    area.addEventListener('click', fireRipple);

    function fireRipple(e) {
        area = e.currentTarget
        // create drop
        if (!drop) {
            drop = document.createElement('span');
            drop.className = 'drop';
            this.appendChild(drop);
        }
        // reset animate class
        drop.className = 'drop';

        // calculate dimensions of area (longest side)
        areaWidth = getComputedStyle(this, null).getPropertyValue("width");
        areaHeight = getComputedStyle(this, null).getPropertyValue("height");
        maxDistance = Math.max(parseInt(areaWidth, 10), parseInt(areaHeight, 10));

        // set drop dimensions to fill area
        drop.style.width = maxDistance + 'px';
        drop.style.height = maxDistance + 'px';

        // calculate dimensions of drop
        dropWidth = getComputedStyle(this, null).getPropertyValue("width");
        dropHeight = getComputedStyle(this, null).getPropertyValue("height");

        // calculate relative coordinates of click
        // logic: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center
        x = e.pageX - this.offsetLeft - (parseInt(dropWidth, 10) / 2);
        y = e.pageY - this.offsetTop - (parseInt(dropHeight, 10) / 2) - 30;

        // position drop and animate
        drop.style.top = y + 'px';
        drop.style.left = x + 'px';
        drop.className += ' animate';
        e.stopPropagation();

    }
}