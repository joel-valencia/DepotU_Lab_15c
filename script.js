/// <reference path="typings/browser.d.ts" /> ```
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vehicle = (function () {
    function Vehicle() {
        this.speed = 1;
        this.damagePts = 0;
        this.baseAnimationDuration = 2000;
    }
    Vehicle.prototype.insert = function () {
        var newVehicle = $('<div class= "vehicle ' + this.type + '" id=' + this.id + '></div>');
        $('.container').append(newVehicle);
        var left = Math.floor(Math.random() * document.documentElement.clientWidth);
        var top = Math.floor(Math.random() * document.documentElement.clientHeight);
        $('#' + this.id).css("left", left);
        $('#' + this.id).css("top", top);
        this.color = 'rgb(' + randomNum() + ',' + randomNum() + ',' + randomNum() + ')';
        $('#' + this.id).css("background-color", this.color);
        var newDirectionIndex = Math.floor(Math.random() * this.directions.length);
        var newDirection = this.directions[newDirectionIndex];
        this.currentDirection = newDirection;
        this.currentDegrees = this.degrees[newDirectionIndex];
        this.currentAnimate = this.animate[newDirectionIndex];
        this.move();
    };
    Vehicle.prototype.move = function () {
        console.log("moving", this.type, this.currentDirection);
        var duration = this.baseAnimationDuration / this.speed;
        var options = {
            step: function () {
                if (detectCollisions(this.id)) {
                    $('#' + this.id).stop();
                }
            },
            duration: duration
        };
        $('#' + this.id).css("transform", "rotate(" + this.currentDegrees + "deg)");
        $('#' + this.id).animate(this.currentAnimate, options);
    };
    Vehicle.prototype.damage = function () {
    };
    Vehicle.prototype.totaled = function () {
    };
    return Vehicle;
}());
;
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        _super.call(this);
        this.directions = ["W", "E"];
        this.degrees = [0, 180];
        this.animate = [{ left: "-=400" }, { left: "+=400" }];
        this.type = "car";
    }
    Car.prototype.reverse = function () {
        var duration = this.baseAnimationDuration / this.speed;
        var options = {
            step: function () {
                if (detectCollisions(this.id)) {
                    $('#' + this.id).stop();
                }
            },
            duration: duration
        };
        if (this.currentDirection == "W") {
            $('#' + this.id).css('border-spacing', 0);
            this.currentDirection = "E";
            $('#' + this.id).animate({ borderSpacing: 180 }, {
                step: function (now, fx) {
                    $(this).css('transform', 'rotate(' + now + 'deg)');
                },
                duration: 'slow'
            }, 'linear');
            $('#' + this.id).animate({ left: "+=400" }, options);
            return;
        }
        if (this.currentDirection == "E") {
            $('#' + this.id).css('border-spacing', 180);
            this.currentDirection = "W";
            $('#' + this.id).animate({ borderSpacing: 360 }, {
                step: function (now, fx) {
                    $(this).css('transform', 'rotate(' + now + 'deg)');
                },
                duration: 'slow'
            }, 'linear');
            $('#' + this.id).animate({ left: "-=400" }, options);
            return;
        }
    };
    return Car;
}(Vehicle));
var CopCar = (function (_super) {
    __extends(CopCar, _super);
    function CopCar() {
        _super.call(this);
        this.directions = ["N", "S"];
        this.degrees = [90, -90];
        this.animate = [{ top: "-=400" }, { top: "+=400" }];
        this.sirenOn = false;
        this.type = "copCar";
    }
    CopCar.prototype.siren = function () {
        if (this.sirenOn == false) {
            this.sirenOn = true;
            allSirens[this.id] = setInterval('blink(' + this.id + ', "' + this.color + '")', 500);
            return;
        }
        if (this.sirenOn == true) {
            clearInterval(allSirens[this.id]);
            this.sirenOn = false;
            return;
        }
    };
    return CopCar;
}(Car));
var Motorcycle = (function (_super) {
    __extends(Motorcycle, _super);
    function Motorcycle() {
        _super.call(this);
        this.speed = 2;
        this.directions = ["NW", "NE", "SW", "SE"];
        this.degrees = [45, 135, -45, -135];
        this.animate = [
            { left: "-=300", top: "-=300" },
            { left: "+=300", top: "-=300" },
            { left: "-=300", top: "+=300" },
            { left: "+=300", top: "+=300" }
        ];
        this.type = "motorcycle";
    }
    return Motorcycle;
}(Vehicle));
var Tank = (function (_super) {
    __extends(Tank, _super);
    function Tank() {
        _super.call(this);
        this.speed = 0.5;
        this.directions = ["N", "S", "W", "E", "NW", "NE", "SW", "SE"];
        this.degrees = [90, -90, 0, 180, 45, 135, -45, -135];
        this.animate = [
            { top: "-=400" },
            { top: "+=400" },
            { left: "-=400" },
            { left: "+=400" },
            { left: "-=300", top: "-=300" },
            { left: "+=300", top: "-=300" },
            { left: "-=300", top: "+=300" },
            { left: "+=300", top: "+=300" }
        ];
        this.type = "tank";
    }
    return Tank;
}(Vehicle));
var allVehicles = [];
var allSirens = [];
var addCar = function () {
    allVehicles.push(new Car());
    var lastIndex = allVehicles.length - 1;
    allVehicles[lastIndex].id = lastIndex;
    allVehicles[lastIndex].insert();
    $('#' + lastIndex).click(function () {
        allVehicles[this.id].reverse();
    });
};
var addCopCar = function () {
    allVehicles.push(new CopCar());
    var lastIndex = allVehicles.length - 1;
    allVehicles[lastIndex].id = lastIndex;
    allVehicles[lastIndex].insert();
    $('#' + lastIndex).click(function () {
        allVehicles[this.id].siren();
    });
};
var addMotorcycle = function () {
    var lastIndex = allVehicles.length - 1;
    allVehicles.push(new Motorcycle());
    allVehicles[lastIndex].id = lastIndex;
    allVehicles[lastIndex].insert();
    $('#' + lastIndex).click(function () {
        allVehicles[this.id].move();
    });
};
var addTank = function () {
    allVehicles.push(new Tank());
    var lastIndex = allVehicles.length - 1;
    allVehicles[allVehicles.length - 1].id = lastIndex;
    allVehicles[allVehicles.length - 1].insert();
    $('#' + lastIndex).click(function () {
        allVehicles[this.id].move();
    });
};
function randomNum() {
    return Math.floor((Math.random() * 150)) + 50;
}
function blink(id, color) {
    $('#' + id).css('background-color', 'yellow');
    setTimeout(function () {
        $('#' + id).css('background-color', color);
    }, 100);
}
function detectCollisions(id) {
    console.log("vehicle " + id + ", top " + $('#' + id).css("top") + ", left " + $('#' + id).css("left"));
    for (var i in allVehicles) {
        var myTop = parseInt($('#' + id).css("top"), 10);
        var myLeft = parseInt($('#' + id).css("left"), 10);
        var otherTop = parseInt($('#' + i).css("top"), 10);
        var otherLeft = parseInt($('#' + i).css("left"), 10);
        var topDiff = Math.abs(myTop - otherTop);
        var leftDiff = Math.abs(myLeft - otherLeft);
        var collisionThreshold = 75;
        if (i !== id && topDiff < collisionThreshold && leftDiff < collisionThreshold) {
            console.log("collision! vehicle " + id + " hit vehicle " + i);
            var myOptions = {
                done: function () {
                    $('#' + id).remove();
                }
            };
            var otherOptions = {
                done: function () {
                    $('#' + id).remove();
                }
            };
            $('#' + id).hide(myOptions);
            $('#' + i).hide(otherOptions);
            clearInterval(allSirens[id]);
            clearInterval(allSirens[i]);
            delete allVehicles[id];
            delete allVehicles[i];
            return true;
        }
    }
}
$(document).ready(function () {
    $('#btnCar').click(function () {
        addCar();
    });
    $('#btnCopCar').click(function () {
        addCopCar();
    });
    $('#btnMotorcycle').click(function () {
        addMotorcycle();
    });
    $('#btnTank').click(function () {
        addTank();
    });
    $('.container').css("width", document.documentElement.clientWidth - 20);
    $('.container').css("height", document.documentElement.clientHeight - 100);
    // $('body').click(function() {
    //     console.log('------------------');
    //     for (var i in allVehicles) {
    //         console.log("vehicle " + i + ", top " + $('#'+i).css("top") + ", left " + $('#'+i).css("left"));
    //     }
    // });
});
