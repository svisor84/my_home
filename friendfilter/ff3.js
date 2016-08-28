// Делаем D&D

var myFriend = document.querySelector('.friendsResult');

var activeElement;

var offsetX = 0;

var clientY = 0;


var mDown = (e) => {

    if(e.target.classList.contains('myFriend')) {

        activeElement = e.target.closest('.myFriend');

        if (!activeElement) return; // не нашли, клик вне myFriend-объекта

        //document.body.appendChild(activeElement);

        offsetX = e.offsetX;

        clientY = e.clientY;

        activeElement.style.zIndex = 99999;

        activeElement.style.position = 'absolute';

        activeElement.style.width = '350px';

        document.addEventListener('mouseup', mUp);

        document.addEventListener('mousemove', mMove);
    }
};

var mUp = (e) => {

    activeElement.hidden = true;

    var elem = document.elementFromPoint(e.clientX, e.clientY);// определяем область по координатам

    activeElement.hidden = false;

    if(elem.id == 'selected')
        dropFriend(activeElement); //добавляем друга перетаскиванием
    else
        activeElement.style = '';

    activeElement = null;

    document.removeEventListener('mouseup', mUp);

    document.removeEventListener('mousemove', mMove);
};

var mMove = (e) => {

    if (activeElement) {
        activeElement.style.top = (e.clientY - clientY) + 'px';

        activeElement.style.left = (e.clientX - offsetX) + 'px';
    }
};

document.addEventListener('mousedown', mDown);