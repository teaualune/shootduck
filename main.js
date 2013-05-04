(function () {

    var stageWidth = 800,
        stageHeight = 400,
        waterHeight = stageHeight * 0.6,
        fps = 30,
        speedFactor = 10,
        score = 0,

        // update score
        updateScore = function (color) {
            if (color === 'p') {
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
            }).appendTo('.stage').mousedown(function () {
                $(this).remove();
                updateScore(color);
            });
        },

        update = function () {
            $('.stage img').each(function () {
                var speed = $(this).attr('speed'),
                    left = $(this).position().left;
                if (left < -80 || left > stageWidth) {
                    $(this).remove();
                } else {
                    $(this).css('left', left + speed / speedFactor);
                }
            });
        },

        addDuckInterval = null,
        countdownInterval = null,
        updateInterval = null,

        resetGame = function (argument) {
            clearInterval(addDuckInterval);
            clearInterval(countdownInterval);
            clearInterval(updateInterval);
            $('.stage img').remove();
            score = 0;
        }

        startGame = function (time) {
            var startTime = time;
            $('.score').html(0);
            $('.countdown').html(startTime);
            countdownInterval = setInterval(function () {
                startTime = startTime - 1;
                $('.countdown').html(startTime);
                if (startTime === 0) {
                    resetGame();
                }
            }, 1000);
            addDuckInterval = setInterval(addDuck, 500);
            updateInterval = setInterval(update, 1000 / fps);
        };

    // start game
    $('.start').click(function () {
        resetGame();
        startGame(30);
    });

    $('.reset').click(function () {
        resetGame();
    })

    // water background
    setInterval(function () {
        $('div p').toggleClass('w1');
    }, 1000);

})();