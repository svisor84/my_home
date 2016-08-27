// Делаем D&D

var myFriend = document.querySelector('.friendsResult');

var activeElement;

var offsetX = 0;

var offsetY = 0;


var mDown = (e) => {

    if(e.target.classList.contains('myFriend')) {
console.log(e);
        activeElement = e.target.closest('.myFriend');

        if (!activeElement) return; // не нашли, клик вне myFriend-объекта

        offsetX = e.offsetX;

        offsetY = e.offsetY;

        activeElement.style.zIndex = 99999;

        activeElement.style.position = 'absolute';

        activeElement.style.width = '350px';

        document.addEventListener('mouseup', mUp);

        document.addEventListener('mousemove', mMove);
    }
};

var mUp = (e) => {
    var elem = document.elementFromPoint(e.clientX, e.clientY);// определяем область по координатам
//console.log(elem.querySelector('#selectedFriends'));
  //  console.log(e.target);
    activeElement = null;

    document.removeEventListener('mouseup', mUp);

    document.removeEventListener('mousemove', mMove);
};

var mMove = (e) => {

    if (activeElement) {

        activeElement.style.top = (e.pageY - offsetY - 126) + 'px';

        activeElement.style.left = (e.pageX - offsetX + 13) + 'px';
    }
};

document.addEventListener('mousedown', mDown);