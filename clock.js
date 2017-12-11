$(document).ready(function() {
    var handle = $('#rotate-point');
    var angle = 0;
    var minAngle = 0;
    var maxAngle = 360;
    var count = 0;

    var ringTemp = count;

    var turnSound = new Howl({
        urls: ['turnSound.wav'],
        volume: 0.4
    });

    // var tickSound = new Howl({
    //     urls: ['tickSound.wav'],
    //     volume: 0.5,
    // });

    var ringSound = new Howl({
        urls: ['ringSound.wav'],
        volume: 0.6
    });

    function infoAlert() {
        alert('Move your mouse over the handle and use your mousewheel to set the timer');
    }

    //    setTimeout(infoAlert, 2000);

    var counter = setInterval(setTimer, 1000);

    function moveHandle(direction) {
        if(direction === 'up') {
            if((angle + 2) <= maxAngle) {
                angle += 2;
                count = Math.round((angle/360)* 60) * 60;
                ringTemp = count;
                setAngle();
                // tickSound.stop();
                turnSound.play();
            }
        }
        else if(direction === 'down') {
            if((angle - 2) >= minAngle) {
                angle -= 2;
                count = Math.round((angle/360)* 60) * 60;
                setAngle();
                // tickSound.stop();
            }
        }
    }

    function setAngle() {
        handle.css({
            '-moz-transform':'rotate('+ angle + 'deg)',
            '-webkit-transform':'rotate('+ angle + 'deg)',
            '-o-transform':'rotate('+ angle + 'deg)',
            '-ms-transform':'rotate(' + angle + 'deg)',
            'transform':'rotate(' + angle + 'deg)'
        });
    }

    function setTimer() {
        if(count <= 0) {
            ringTemp--;
            // tickSound.stop();
            clearInterval(counter);
            counter = setInterval(setTimer, 1000);
            return;
        }
        if(ringTemp === 1) {
            ringTemp--;
            ringSound.play();
        }
        count -= 1;
        ringTemp--;
        angle = (count/60) * 6;
        setAngle();
        // tickSound.stop();
        // tickSound.play();
    }

    handle.bind('DOMMouseScroll', function(e) {
        if(e.originalEvent.detail > 0) {
            moveHandle('down');
        } else {
            moveHandle('up');
        }
        return false;
    });

    handle.bind('mousewheel', function(e) {
        if(e.originalEvent.wheelDelta < 0) {
            moveHandle('down');
        } else {
            moveHandle('up');
        }
        return false;
    });
});
