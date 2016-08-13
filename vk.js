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
            VK.api('friends.get', {'order':'random','fields':'nickname,bdate,city,photo_50'},
                function(response) {
                    if (response.error) {
                        reject(new Error(response.error.error_msg));
                    } else {
                        function mySort(a, b) {
                            if(a.bdate && b.bdate){
                                var [bDateF, bMonthF,] = a.bdate.split('.'),
                                    [bDateS, bMonthS,] = b.bdate.split('.');
                                var curDate = new Date();
                                if (bDateF > bDateS) return 1;
                                if (bDateF < bDateS) return -1;
                            }
                        }
                        var res = response.response.sort(mySort);
                        var source = friendsItemTemplate.innerHTML;
                        var templateFn = Handlebars.compile(source);
                        var template = templateFn({list: res});
                        result.innerHTML = template;
                        resolve();
                    }
                });
        })
    }).catch(function(e) {
        alert('Ошибка: ' + e.message);
    });
