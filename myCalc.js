///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//решение на ES5

/*function Calculator(firstNumber) {
    this.initial = firstNumber;
}

Calculator.prototype.sum = function () {
    var res = 0;
    for (var i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }
    return res + this.initial;
};

Calculator.prototype.dif = function () {
    var res = 0;
    for (var i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }
    return this.initial - res;
};

Calculator.prototype.div = function () {
    try {
        var res = 0;
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] == 0) {
                throw new arguments.error
            }
            res += arguments[i];
        }
        return this.initial / res;
    }
    catch (e) {
        console.log('Ошибка ' + e.name + ": на 0 делить нельзя");
    }
};

Calculator.prototype.mul = function () {
    var res = 0;
    for (var i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }
    return this.initial * res;
};

function SqlCalc(value){
    Calculator.call(this, value);
    this.initial = value;
}

SqlCalc.prototype = Object.create(Calculator.prototype);

SqlCalc.prototype.sum = function () {
    var res = Calculator.prototype.sum.call(this);
    return res*res
};
SqlCalc.prototype.dif = function (){
   var res = Calculator.prototype.dif.apply(this,arguments);
    return res * res;
};
SqlCalc.prototype.div = function (){
    var res = Calculator.prototype.div.apply(this,arguments);
    return res * res;
};
SqlCalc.prototype.mul = function (){
    var res = Calculator.prototype.mul.apply(this,arguments);
    return res * res;
};

var myCalculator = new SqlCalc(100);
console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(myCalculator.dif(10, 20)); //вернет 4 900
console.log(myCalculator.div(2, 2)); //вернет 625
console.log(myCalculator.mul(2, 2)); //вернет 160 000*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Решение ES6

'use strict';

class Calculator {
    constructor(initial) {
        this.initial = initial;
    }

    sum() {
        var res = 0;
        for (var i = 0; i < arguments.length; i++) {
            res += arguments[i];
        }
        return res + this.initial;
    }

    dif() {
        var res = 0;
        for (var i = 0; i < arguments.length; i++) {
            res += arguments[i];
        }
        return this.initial - res;
    }

    div() {
        try {
            var res = 0;
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == 0) {
                    throw new arguments.error
                }
                res += arguments[i];
            }
            return this.initial / res;
        }
        catch (e) {
            console.log('Ошибка ' + e.name + ": на 0 делить нельзя");
        }
    }

    mul() {
        var res = 0;
        for (var i = 0; i < arguments.length; i++) {
            res += arguments[i];
        }
        return this.initial * res;
    }
}

class SqlCalc extends Calculator{
    constructor(initial){
        super(initial);
        this.initial = initial;
    }
    sum(){
        var res = super.sum(...arguments);
       return res * res;
    }
    dif(){
        var res = super.dif(...arguments);
        return res * res;
    }
    div(){
        var res = super.div(...arguments);
        return res * res;
    }
    mul(){
        var res = super.mul(...arguments);
        return res * res;
    }

}



var myCalculator = new SqlCalc(100);
console.log(myCalculator.sum(1, 2, 3)); //вернет 11 236 (100 + 1 + 2 + 3 = 106 * 106)
console.log(myCalculator.dif(10, 20)); //вернет 4 900
console.log(myCalculator.div(2, 2)); //вернет 625
console.log(myCalculator.mul(2, 2)); //вернет 160 000
