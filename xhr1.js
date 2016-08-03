export function timer(time){
    return new Promise(
        function (resolve, reject) {
            setTimeout(resolve, time);}
    );
};
timer(3000).then(() => console.log('привет, прошло 3 секунды'));
