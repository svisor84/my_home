/**
 * Created by Stas on 03.09.2016.
 */
var fs = require('fs');
var startDir = './nodejs';
var scan = function(startDir){
    var dirs = fs.readdirSync(startDir);

    console.log(dirs);

    for(var dir of dirs){
    dir = startDir + '/' +dir;
        var stat = fs.statSync(dir);
        if(!stat.isFile()){
            console.log(dir,(stat.size/1024).toFixed(5) + ' kb');
            scan(dir);
        }else{
            console.log(dir,(stat.size/1024).toFixed(3) + ' kb');
        }

    }
};
scan(startDir);


