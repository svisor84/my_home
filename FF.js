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
                        friendsResult.innerHTML = template;
                        resolve();
                    }
                });
        })
    }).then(function(){
        // добавляем друга в список избарнных
        function addFriend(e){

            if(e.target.parentNode.classList.contains('myFriend')){
                document.getElementById(e.target.parentNode.id).setAttribute('my-attr-moved','moved');// устанавливаем атрибут, когджа элемент переместился
                var addingFriend = document.createElement('div'); //создаем див для друга
                addingFriend.className = "sFriend"; //присваиваем класс
                addingFriend.setAttribute('my-attr-id',e.target.parentNode.id); //создаем атрибут для дальнейшего обращения к элементу
                addingFriend.setAttribute('my-attr-arrival','arrival');
                addingFriend.innerHTML = e.target.parentNode.innerHTML; // забираем HTML родителя
                selectedFriends.appendChild(addingFriend); // добавляем блок в выбранные друзья
                e.target.parentNode.style.display = 'none'; // ставим текущему блоку display=none
            }
        }
        var friendsResultField = document.getElementById('friendsResult'); // определяемся, что слушаем
        friendsResultField.addEventListener('click', addFriend);// слушаем события в блоке с друзьями

        // функция удаления друзей из избранных
        function removeFromSelectedFriends(e){
            if(e.target.parentNode.classList.contains('sFriend')){
                var toVisual = e.target.parentNode.getAttribute('my-attr-id'); // берем атрибут для показа скрытого элемента
                var friendBack = document.getElementById(toVisual); // получаем родителя
                friendBack.style.display = ''; // открываем скрытый элемент в друзьях
                friendBack.setAttribute('my-attr-moved', ''); // снимаем атрибут moved, когда элемент вернулся
// удаляем узел из избранного
                var bigParent = e.target.parentNode.parentNode;
                bigParent.removeChild(e.target.parentNode)
            }
        }
        var removeF = document.getElementById('selected');// определяемся, что слушаем
        removeF.addEventListener('click', removeFromSelectedFriends); // слушаем события в блоке избранных друзей

        //делаем функцию поиска среди друзей
        function friendSearch(){
            var friendsNames = document.getElementsByClassName('FIO') //забираем все имена
            for(var friend of friendsNames){
                if(friend.parentNode.parentNode.classList.value == 'myFriend'){
                    if(!friend.innerHTML.toLowerCase().includes(searchField.value.toLowerCase())){ // сравниваем имя с тем, что ввели в поле поиска
                        friend.parentNode.parentNode.style.display = 'none'; //прячем все, что не подходит под поиск
                    }else{
                        var moved = document.getElementById(friend.parentNode.parentNode.id);
                        if(moved.getAttribute('my-attr-moved') != 'moved') // проверяем элемент, не был ли он перемещен ранее
                            friend.parentNode.parentNode.style.display = ''; // выводим все, что подходит под поиск
                    }
                }
            }
        }
        searchField.addEventListener('keyup',friendSearch);

        //делаем функцию поиска среди избранных
        function selectedFriendSearch(){
            var selectedFriendsNames = document.getElementsByClassName('FIO') //забираем все имена
            for(var friend of selectedFriendsNames){
                if(friend.parentNode.parentNode.classList.value == 'sFriend'){
                    if(!friend.innerHTML.toLowerCase().includes(searchFieldSelected.value.toLowerCase())){ // сравниваем имя с тем, что ввели в поле поиска
                        friend.parentNode.parentNode.style.display = 'none'; //прячем все, что не подходит под поиск
                    }else{
                        var arrival = document.getElementById(friend.parentNode.parentNode.getAttribute('my-attr-id'));
                        if(arrival.getAttribute('my-attr-moved') == 'moved') // проверяем элемент, не был ли он перемещен ранее
                            friend.parentNode.parentNode.style.display = ''; // выводим все, что подходит под поиск
                    }
                }
            }
        }
        searchFieldSelected.addEventListener('keyup',selectedFriendSearch);

//Делаем сохранение с LocalStorage

        saveButton.addEventListener('click',function () {
            localStorage.removeItem('toSave');
            localStorage.removeItem('selected');
            //var vkFriends = b64EncodeUnicode(document.getElementById('friendsResult'));
            var friendsResult = document.getElementById('toSave');
            var selected = document.getElementById('selected');
            localStorage.setItem('toSave', friendsResult.outerHTML);
            if(selected.length >0)
            {
                localStorage.setItem('selected', selected.outerHTML);
            }
        });



//TODO сделать сохранение в локал сторадж (до этого шифруем все в base64)

        // Делаем D&D
        var myFriend = document.querySelector('.friendsResult');
        var activeElement;
        var offsetX = 0;
        var offsetY = 0;

        var mDown = (e) => {
            if(e.target.classList.contains('myFriend')) {
                activeElement = e.target;
                offsetX = e.offsetX;
                offsetY = e.offsetY;
                document.addEventListener('mouseup', mUp);
                document.addEventListener('mousemove', mMove);
            }
        };

        var mUp = (e) => {
            activeElement = null;
            document.removeEventListener('mouseup', mUp);
            document.removeEventListener('mousemove', mMove);
        };

        var mMove = (e) => {
            if (activeElement) {
                activeElement.style.top = (e.clientY - offsetY) + 'px';
                activeElement.style.left = (e.clientX - offsetX) + 'px';
            }
        };

        document.addEventListener('mousedown', mDown);

}).catch(function(e) {
        alert('Ошибка: ' + e.message);
    });



// убить авторизацию в браузере VK.Auth.revokeGrants();