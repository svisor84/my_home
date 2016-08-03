/**
 * Created by Stas on 10.07.2016.
 */
/*let sum = function(){
    let result = 0;
    for(let i =0; i < arguments.length; i++){
        result += arguments[i];
    }
    return result;
}
let sum2 = sum;
let res = sum2(4,5);
console.log(res);*/

/*
function filter(source, fn){
    let result = [];

    for (let i = 0; i < source.length; i++){
     if(fn(source[i])){
         result.push(source[i]);
     }
    }
    return result;
}
function greaterThan4(value){
    return value > 4;
}
let array = [1,2,3,4,5,6,7,8];
let res = filter(array, greaterThan4);
console.log(res);*/

/*
function func1(a){
    let b = 10;
    function func2(d){
        let c = 100;
        return a + b + c + d;
    }

    return func2;
}

let res = func1(1);
console.log(res(10));*/
//стрелочная функция
/*
let sum = source => {
    let result = 0;

    for(let i=0; i<source.length; i++){
        result += source[i];
    }
    return result;
};

let array = [1,2,3];
console.log(sum(array));*/

//let array = [2,3,4];
/*let array2 = array.map(function(number){
    return number * number;
});*/
//let array2 = array.map(number => number * number);
//console.log(array);
//console.log(array2);

/*
function sum(){
    var result = 0;

    var f1 = () => {
        for(var i=0; i<arguments.length; i++){
            result += arguments[i];
        }
        return result;
    };
    return f1();
}
console.log(sum(1,2,3,4));*/

/*
var obj1 ={
    name: 'Стас',
    lastname: 'Мухин',
    length: 180,
    */
/*valueOf: function(){
        return this.length;
    },*//*

    toString(){
        return `[${this.name}] - [${this.lastname}]`

    }
};
    console.log(obj1.toString());
*//*
 var obj1 = {
     name: 'Stas',
     lastName: 'Mukhin',
     length: 200
};
Object.defineProperty(obj1, 'fullName',{
    //value: 'Hello!',
    get(){
        return `${this.name} ${this.lastname}`
    },
    set(value){
        [name, lastName] = value.split(' ');
        this.name = name
        this.lastName = lastname;
    }
});

obj1.fullName = 'Иван Петров';

console.log(obj1.fullName);*/

/*
var array = ['Stas', 'Mukhin',200];
array[array.length] = '1111';
array.splice(-1,0,1,2,3,4,5);
console.log(array);*/
//дз по функциям
/*(function(){
    var array = ['я','умею','писать','рекурсивные','функции'];
    var n = 0;
    function consoleRec(array,position){

        console.log(array[n]);
        n = n+1;
        if(n <= array.length-1){
            consoleRec(array,n)
        }
    };
    consoleRec(array,n);
}());*/

/*function isAllTrue(source,filterFn){
    try {
        if (!Array.isArray(source) || source.length == 0) {throw new source.error};
            for (var i = 0; i < source.length; i++) {
                if(!filterFn(source[i])){
                    return false;
                }
            }
            return true;
    }
    catch(e){
            console.log('Ошибка ' + e.name + ": не массив или он пуст" );
        }
}
var allNumbers = [1, 2, 4, 5, 6, 7, 8],
    someNumbers = [1, 2, 'привет', 4, 5, 'loftschool', 6, 7, 8],
    noNumbers = ['это', 'массив', 'без', 'чисел'],
    noArray = 'пусто',
    emptyArray = [];

function isNumber(val) {
    return isFinite(+val);
}

console.log(isAllTrue(allNumbers, isNumber)); //вернет true
console.log(isAllTrue(someNumbers, isNumber)); //вернет false
console.log(isAllTrue(noNumbers, isNumber)); //вернет false
console.log(isAllTrue(noArray, isNumber)); //вернет исключение
console.log(isAllTrue(emptyArray, isNumber)); //вернет исключение*/

/*
function isSomeTrue(source, filterFn) {
try {
    if (!Array.isArray(source) || source.length == 0) {throw new source.error};
    for (var i = 0; i < source.length; i++) {
        if (filterFn(source[i])) {
            return true;
        }
    }
    return false;
}
catch (e) {
    console.log('Ошибка ' + e.name + ": не массив или он пуст");
}
}
var allNumbers = [1, 2, 4],
    someNumbers = ['привет', 4,'loftschool'],
    noNumbers = ['это', 'массив', 'без', 'чисел'];

function isNumber(val) {
    return isFinite(+val);
}

console.log(isSomeTrue(allNumbers, isNumber)); //вернет true
console.log(isSomeTrue(someNumbers, isNumber)); //вернет true
console.log(isSomeTrue(noNumbers, isNumber)); //вернет false*/

/*
function calculator(firstNumber) {
       return var obj = {
            sum: function sum() {
                var res = 0;
                for (var i = 0; i < arguments.length; i++) {
                    res += arguments[i];
                }
                return res + firstNumber;
            },
            dif: function dif() {
                var res = 0;
                for (var i = 0; i < arguments.length; i++) {
                    res += arguments[i];
                }
                return firstNumber - res;
            },
            div: function div() {
                try {
                    var res = 0;
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] == 0) {
                            throw new arguments.error
                        }
                        ;
                        res += arguments[i];
                    }
                    return firstNumber / res;
                }
                catch (e) {
                    console.log('Ошибка ' + e.name + ": на 0 делить нельзя");
                }
            },
            mul: function mul() {
                var res = 0;
                for (var i = 0; i < arguments.length; i++) {
                    res += arguments[i];
                }
                return firstNumber * res;
            }
        }
    }
var myCalculator = calculator(100);


console.log(myCalculator.sum(1, 2, 3)); //вернет 106
console.log(myCalculator.dif(10, 20)); //вернет 70
console.log(myCalculator.div(2, 2)); //вернет 25
console.log(myCalculator.mul(2, 2)); //вернет 400*/




/*var arr = [1, -1, 2, -2, 3];

var positiveArr = arr.filter(function(number) {
    return number > 0;
});

console.log( positiveArr ); // 1,2,3

function isSomeTrue(source, filterFn) {

        if (!Array.isArray(source) || source.length == 0) {throw new source.error};
        for (var i = 0; i < source.length; i++) {
            if (filterFn(source[i])) {
                return true;
            }
        }
        return false;
}
var allNumbers = [1, 2, 4],
    someNumbers = ['привет', 4,'loftschool'],
    noNumbers = ['это', 'массив', 'без', 'чисел'];

function isNumber(val) {
    return isFinite(+val);
}

console.log(isSomeTrue(allNumbers, isNumber)); //вернет true
console.log(isSomeTrue(someNumbers, isNumber)); //вернет true
console.log(isSomeTrue(noNumbers, isNumber)); //вернет false*/


/*function myFuncs() {
    var obj = {
        newForeach: function newForeach(source) {
            if (!Array.isArray(source) || source.length == 0) {throw new SyntaxError("Ошибка в данных, не массив!")};
            var startNum = 0;
            var mySource = source;
            function consoleRec(array,position){
                console.log(array[startNum]);
                startNum = startNum+1;
                if(startNum <= array.length-1){
                    consoleRec(array,startNum)
                }
            }
            consoleRec(mySource,startNum);
        },
        newFilter: function newFilter(source,fn) {
            if (!Array.isArray(source) || source.length == 0) {throw new SyntaxError("Ошибка в данных, не массив!")};
            if (!fn) {throw new SyntaxError("Функция не определена!")};
            var mySource = source;
            var myFn = fn;
            var result = [];
            for(var i = 0; i < mySource.length; i++){
                if(myFn(mySource[i])){
                    result += mySource[i] + ', ';
                }
            }
            return result;
        },
        newMap: function newMap(source, fn) {
            if (!Array.isArray(source) || source.length == 0) {throw new SyntaxError("Ошибка в данных, не массив!")};
            if (!fn) {throw new SyntaxError("Функция не определена!")};
            var mySource = source;
            var myFn = fn;
            var result = [];
            for(var i = 0; i < mySource.length; i++){
                if(myFn(mySource[i])){
                    result[i] = true;
                }else{
                    result[i] = false;}
            }
            return result;
        },
        newSlice: function newSlice(source,start, end) {
            if (!Array.isArray(source) || source.length == 0) {throw new SyntaxError("Ошибка в данных, не массив!")};

            var result = [];

            if(start){var myStart = start;}else{ var myStart = 0}

            if(end){var myEnd = end-1;}else{ var myEnd = source.length}

            if(end < 0){myEnd = source.length + end - 1}

            for (var i = myStart; i < source.length; i++) {
                if(i<=myEnd)
                {
                    result.push(source[i])
                }
            }
            return result;
        },
        newReduce: function newReduce(source,fn,initialValue) {
            if (!Array.isArray(source) || source.length == 0) {throw new SyntaxError("Ошибка в данных, не массив!")}
            if (!fn) {throw new SyntaxError("Функция не определена!")}
            var myFn = fn;
            var mySource = source;
            var myPreviousValue = initialValue;
            var sum = 0;
            var result = 0;
            for(var i = 0; i < source.length; i++){
                if(myPreviousValue != 0)
                {
                    result = myFn(myPreviousValue,source[i], i, mySource);
                    myPreviousValue = 0;
                }
                else
                {
                    sum = 0;ahj
                    result += myFn(sum,source[i], i, mySource)
                }
            }
            return result;
        }
    }
    return obj;
}
var arr = [1,2,3,4,5];
var myFuncs = myFuncs();*/
/*console.log(myFuncs.newForeach(arr));*/
/*console.log(myFuncs.newFilter(arr, value => value > 2 ));*/
/*console.log(myFuncs.newMap(arr, value => value > 2 ));*/
/*console.log(myFuncs.newSlice(arr,2,-5));*/
/*console.log(myFuncs.newReduce(arr,function(sum, current){ return sum + current},5));*/

///////////////////////////////////////////

function timer(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    });
};
timer(3000).then(() => console.log('я вывелась через 3 секунды'));



