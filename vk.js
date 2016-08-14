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
                        var curDate = new Date();

//формируем три массива для разных друзей
                        var noBday      = [],
                            afterBday   = [],
                            beforeBday  = [];

// вычисляем возраст
                        function yearBDay(bdate) {
                            if(!bdate) return "";
                            var [,,bYear] = bdate.split('.');
                            if(!bYear) return "";
                            else return curDate.getFullYear() - bYear;
                        }

//сортируем людей, у которых указан ДР
                        var friendWithBday = response.response.filter(function(elem){
                            if(elem.bdate !== undefined)
                            {
                                elem.age = yearBDay(elem.bdate);
                                return elem;
                            }
                            else
                                noBday[noBday.length] = elem;
                        }).sort(function(a,b){
                            var [aDay,aMonth,] = a.bdate.split('.');
                            var [bDay, bMonth,] = b.bdate.split('.');

//обязательно приводим к числу
                             if(+aMonth > +bMonth) return 1;
                             else if(+aMonth < +bMonth) return -1;

                             if(+aDay >= +bDay) return 1;
                             else if(+aDay < +bDay) return -1;
                        });

// сортируем людей , в зависимости от текущей даты по дате рождения
                        friendWithBday.map(function(elem){
                            var [aDay, aMonth] = elem.bdate.split('.');
                            if(aMonth > curDate.getMonth()+1) return afterBday[afterBday.length] = elem;
                            else if(aMonth < curDate.getMonth()+1) return beforeBday[beforeBday.length] = elem;

                            if(aDay >= curDate.getDate()) return afterBday[afterBday.length] = elem;
                            else if(aDay < curDate.getDate()) return beforeBday[beforeBday.length] = elem;

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