/**
 * Created by Stas on 11.08.2016.
 */
new Promise(function(resolve) {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.onload = resolve;
    }
}).then(function() {
        //запрашиваем авторизацию
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: 5568346
            });
            VK.Auth.login(response => {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    }).then(function() {
//Возвращаем Имя Фамилию проскланенную
        return new Promise(function(resolve, reject) {
            VK.api('users.get', {'name_case': 'gen'}, response => {
                    if (response.error) {
                        reject(new Error(response.error.error_msg));
                    } else {
                        var userData = response.response[0];
                        headerInfo.textContent = `Друзья ${userData.first_name} ${userData.last_name}`;
                        resolve();
                    }
                });
        })
    }).then(function() {
        return new Promise(function(resolve, reject) {
            VK.api('friends.get', {'fields':'bdate,photo_50'},
                function(response) {
                    if (response.error) {
                        reject(new Error(response.error.error_msg));
                    } else {

                        var myFriends = [];
                        var curDate = new Date();

//делаю корректную дату
                        var trueDate = {
                            day: curDate.getDate(),
                            month: curDate.getMonth()+1,
                            year: curDate.getFullYear()
                        };
//вычисляем возраст
                        function yearBDay(bdate) {
                            if(!bdate) return "";

                            var [,,year] = bdate.split('.');
                            if(!year)
                                return "";
                            else
                                return trueDate.year - year;
                        }

// перебираем пришедшие данные
                        for(var item = 0; item < response.response.length; item++){
                            myFriends[myFriends.length] = {
                                first_name : response.response[item].first_name,
                                last_name  : response.response[item].last_name,
                                photo_50  : response.response[item].photo_50,
                                bdate      : response.response[item].bdate,
                                year       : yearBDay(response.response[item].bdate)
                            }
                        }

                        var noBday = [],
                            afterBday = [],
                            beforeBday = [];

//сортируем людей, у которых указан ДР
                        var friendWithBday = myFriends.filter(function(elem){
                            if(elem.bdate !== undefined){
                                return elem;
                            }else{
                                noBday[noBday.length] = elem;
                            }
                        }).sort(function(a,b){
                            var [aDay,aMonth,] = a.bdate.split('.');
                            var [bDay, bMonth,] = b.bdate.split('.');

                             if(+aMonth > +bMonth) return 1;
                             else if(+aMonth < +bMonth) return -1;

                             if(+aDay >= +bDay) return 1;
                             else if(+aDay < +bDay) return -1;

                            /*return (+aMonth > +bMonth) ?  1 : ((+aMonth < +bMonth) ? -1 : ''),
                                (+aDay >= +bDay) ?  1 : ((+aDay < +bDay) ? -1 : '');*/



                        });

// сортируем людей , в зависимости от текущей даты по дате рождения
                        friendWithBday.map(function(elem){
                            var [aDay, aMonth] = elem.bdate.split('.');
                            if(aMonth > trueDate.month) return afterBday[afterBday.length] = elem;
                            else if(aMonth < trueDate.month) return beforeBday[beforeBday.length] = elem;

                            if(aDay >= trueDate.day) return afterBday[afterBday.length] = elem;
                            else if(aDay < trueDate.day) return beforeBday[beforeBday.length] = elem;

                        });
                        var source = friendsItemTemplate.innerHTML;
                        var templateFn = Handlebars.compile(source);
                        var template = templateFn({list: [].concat(afterBday,beforeBday, noBday)});
                        result.innerHTML = template;
                        resolve();
                    }
                });
        })
    }).catch(function(e) {
        alert('Ошибка: ' + e.message);
    });
// убить авторизацию в браузере VK.Auth.revokeGrants();