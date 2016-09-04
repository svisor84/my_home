var Model = {
    login: function(appId, perms) {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi: function(method, params) {
        return new Promise(function(resolve, reject) {
            VK.api(method, params, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getUser: function() {
        return this.callApi('users.get', {});
    },
    getMusic: function() {
        return this.callApi('audio.get', {});
    },
    getFriends: function() {
        return this.callApi('friends.get', {fields: 'photo_100'});
    },
    getNews: function() {
        return this.callApi('newsfeed.get', {filters: 'post', count: 20});
    },
    getGroups: function() {
        return this.callApi('groups.get', {extended: "1", fields:'photo_100', v:5.3});
    },
    getPhotos: function() {
        return this.callApi("execute",'photo.getAlbums', { v:5.53}).then((albums)=>{
           var photos = [];
            console.log (albums);
            albums.item.forEach((e)=>{
                this.callApi('photos.get',{extended: "1", album_id:e.id,v:5.3}).then((photo)=>{
                    photo.items.forEach((e)=>{
                        photos.push(e);
                    })
                })
            });
            return photos;
        });
    }
};
