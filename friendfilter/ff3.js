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

        activeElement.style.position = 'absolute';

        activeElement.style.width = '350px';

        activeElement.style.top = (e.clientY - offsetY) + 'px';

        activeElement.style.left = (e.clientX - offsetX) + 'px';
    }
};

document.addEventListener('mousedown', mDown);