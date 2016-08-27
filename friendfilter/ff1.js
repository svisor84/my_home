// добавляем друга в список избарнных
function addFriend(e){
    if(e.target.classList.contains('addF')){

        document.getElementById(e.target.parentNode.id).setAttribute('data-my-attr-moved','moved');// устанавливаем атрибут, когджа элемент переместился

        var addingFriend = document.createElement('div'); //создаем див для друга

        addingFriend.className = "sFriend"; //присваиваем класс

        addingFriend.setAttribute('data-my-attr-id',e.target.parentNode.id); //создаем атрибут для дальнейшего обращения к элементу

        addingFriend.setAttribute('data-my-attr-arrival','arrival');

        addingFriend.innerHTML = e.target.parentNode.innerHTML; // забираем HTML родителя

        selectedFriends.appendChild(addingFriend); // добавляем блок в выбранные друзья

        e.target.parentNode.removeAttribute('style');// удаляем стили после перемещения

        e.target.parentNode.style.display = 'none'; // ставим текущему блоку display=none
    }
}

function dropFriend(e){

      document.getElementById(e.id).setAttribute('data-my-attr-moved','moved');// устанавливаем атрибут, когджа элемент переместился

        var addingFriend = document.createElement('div'); //создаем див для друга

        addingFriend.className = "sFriend"; //присваиваем класс

        addingFriend.setAttribute('data-my-attr-id',e.id); //создаем атрибут для дальнейшего обращения к элементу

        addingFriend.setAttribute('data-my-attr-arrival','arrival');

        addingFriend.innerHTML = e.querySelector('.addF').parentNode.innerHTML;// забираем HTML родителя

        selectedFriends.appendChild(addingFriend); // добавляем блок в выбранные друзья

        e.style = '';// удаляем стили после перемещения

        e.style.display = 'none'; // ставим текущему блоку display=none
}

var friendsResultField = document.getElementById('friendsResult');
friendsResultField.addEventListener('click', addFriend);

// функция удаления друзей из избранных
function removeFromSelectedFriends(e){

    if(e.target.classList.contains('addF')){

        var toVisual = e.target.parentNode.getAttribute('data-my-attr-id'); // берем атрибут для показа скрытого элемента

        var friendBack = document.getElementById(toVisual); // получаем элемент

        friendBack.style.display = ''; // открываем скрытый элемент в друзьях

        friendBack.setAttribute('data-my-attr-moved', ''); // снимаем атрибут moved, когда элемент вернулся

// удаляем узел из избранного

        var bigParent = e.target.parentNode.parentNode;

        bigParent.removeChild(e.target.parentNode)
    }
}

// определяемся, что слушаем избранных друзей
var removeF = document.getElementById('selected');
removeF.addEventListener('click', removeFromSelectedFriends);