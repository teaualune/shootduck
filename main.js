(function () {

    var stageWidth = 800,
        stageHeight = 400,
        waterHeight = stageHeight * 0.6,
        fps = 16,
        speedFactor = 10,
        score = 0,
        timeCounter = 0,
        timeRange = 30,

        // update score
        updateScore = function (color) {
            if (color === 'duck2.png') {
                score = score + 10;
            } else {
                score = score + 1;
            }
            $('.score').html(score);
        }

        // new duck creator
        duck = function (config) {
            var template = '<img src="duck{color}.png"/>',
                newDuck;
            if (config.color === 'y') {
                template = template.replace('{color}', '1');
            } else if (config.color === 'p') {
                template = template.replace('{color}', '2');
            }
            newDuck = $(template);
            newDuck.css('bottom', config.y);
            if (config.flip) {
                newDuck.addClass('flip');
                newDuck.css('left', stageWidth);
                newDuck.attr('speed', -config.speed);
            } else {
                newDuck.css('left', 0);
                newDuck.attr('speed', config.speed);
            }
            return newDuck;
        },

        // random number generator from 0 to range
        rand = function (range) {
            return Math.floor(Math.random() * (range + 1));
        },

        // random duck generator
        addDuck = function () {
            var color = (rand(10) === 10) ? 'p' : 'y';
            duck({
                y: rand(waterHeight),
                flip: rand(1),
                color: color,
                speed: (color === 'p') ? 160 : rand(40) + 10
            }).appendTo('.stage');
        },

        updateInterval = null,

        resetGame = function (argument) {
            clearInterval(updateInterval);
            $('.stage img').remove();
            score = 0;
        },

        update = function () {

            // update ducks
            $('.stage img').each(function () {
                var speed = $(this).attr('speed'),
                    left = $(this).position().left;
                if (left < -80 || left > stageWidth) {
                    $(this).remove();
                } else {
                    $(this).css('left', left + speed / speedFactor);
                }
            });

            // update timer
            timeCounter = timeCounter + 1;
            if (timeCounter % fps === 0) {
                timeRange = timeRange - 1;
                $('.countdown').html(timeRange);
                if (timeRange === 0) {
                    resetGame();
                }
            }

            // add duck
            if (timeCounter % (fps / 2) === 0) {
                addDuck();
            }
        },

        startGame = function () {
            $('.score').html(0);
            $('.countdown').html(timeRange);
            updateInterval = setInterval(update, 1000 / fps);
        };

    // start game
    $('.start').click(function () {
        resetGame();
        startGame();
    });

    $('.reset').click(function () {
        resetGame();
    })

    $('.stage').delegate('img', 'mousedown', function (e) {
        $(this).remove();
        updateScore($(this).attr('src'));
    });
})();
