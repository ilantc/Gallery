/**
 * Created by User on 4/6/14.
 */

// initial pics
var p1 = 'http://www.fontplay.com/freephotos/seventeen/fpx012211-01.jpg';
var p2 = 'http://www.fontplay.com/freephotos/seventeen/fpx041611-19.jpg';
var p3 = 'http://www.fontplay.com/freephotos/seventeen/fpx013011-06.jpg';

addPic(p1);
addPic(p2);
addPic(p3);

// button handlers
fileInput = document.getElementById('input');
fileInput.onchange = onFileSelect;

function clearDialog() {
    document.getElementById('urlInput').value = '';
    document.getElementById('addDialog').style.visibility = 'hidden';
}

document.getElementById('cancelUrlAdd').onclick = clearDialog;

document.getElementById('OKUrlAdd').onclick = function () {
    addPic(document.getElementById('urlInput').value);
    clearDialog();
};

// set text change listener
setInterval(function () {
    document.getElementById('OKUrlAdd').disabled = document.getElementById('urlInput').value == '';
}, 100);

document.getElementById('urlAdd').onclick = function () {
    document.getElementById('addDialog').style.visibility = 'visible';
    document.getElementById('OKUrlAdd').disabled = true;
    document.getElementById('urlInput').focus();
};

function addPic(pic) {
    var picContainer = document.createElement("div");
    picContainer.setAttribute('class', 'picContainer');

    var imgToAdd = new Image(); //document.createElement("img");
    imgToAdd.setAttribute('src', pic);
    imgToAdd.onload = function () {
        // check if this pic is tall or streched
        if (imgToAdd.height > imgToAdd.width) {
            imgToAdd.setAttribute('class', 'tall pic');
        }
        else {
            imgToAdd.setAttribute('class', 'wide pic');
        }
        document.getElementById('GallerySection').appendChild(picContainer).appendChild(imgToAdd);
    }
}

function onFileSelect() {
    var filesSelected = document.getElementById("input").files;
    if (filesSelected.length > 0) {
        file = filesSelected[0];
        if (file.type.match("image.*")) {
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                addPic(fileLoadedEvent.target.result);
            };
            fileReader.readAsDataURL(file);
        }
    }
}
