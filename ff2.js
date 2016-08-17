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

                if(moved.getAttribute('data-my-attr-moved') != 'moved') // проверяем элемент, не был ли он перемещен ранее

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

                var arrival = document.getElementById(friend.parentNode.parentNode.getAttribute('data-my-attr-id'));

                if(arrival.getAttribute('data-my-attr-moved') == 'moved') // проверяем элемент, не был ли он перемещен ранее

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