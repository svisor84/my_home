// Делаем D&D

var myFriend = document.querySelector('.friendsResult');

var activeElement;

var offsetX = 0;

var offsetY = 0;


var mDown = (e) => {

    if(e.target.classList.contains('myFriend')) {

        activeElement = e.target.closest('.myFriend');

        if (!activeElement) return; // не нашли, клик вне myFriend-объекта

        offsetX = e.offsetX;

        offsetY = e.offsetY;

        activeElement.style.zIndex = 99999;

        document.addEventListener('mouseup', mUp);

        document.addEventListener('mousemove', mMove);
    }
};

var mUp = (e) => {
    var elem = document.elementFromPoint(e.clientX, e.clientY);// определяем область по координатам

    activeElement = null;

    document.removeEventListener('mouseup', mUp);

    document.removeEventListener('mousemove', mMove);
};

var mMove = (e) => {

    if (activeElement) {

        activeElement.style.position = 'absolute';

        activeElement.style.width = '350px';

        activeElement.style.top = (e.clientY - offsetY) + 'px';

        activeElement.style.left = (e.clientX - offsetX) + 'px';
    }
};

document.addEventListener('mousedown', mDown);