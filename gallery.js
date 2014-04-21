/**
 * Created by User on 4/6/14.
 */

// initial pics
var p1 = 'http://www.fontplay.com/freephotos/seventeen/fpx012211-01.jpg';
var p2 = 'http://www.fontplay.com/freephotos/seventeen/fpx041611-19.jpg';
var p3 = 'http://www.fontplay.com/freephotos/seventeen/fpx013011-06.jpg';

var imgNum = 0;

addPic(p1);
addPic(p2);
addPic(p3);

// button handlers
fileInput = document.getElementById('input');
fileInput.onchange = onFileSelect;

document.getElementById('cancelUrlAdd').onclick = clearDialog;

document.getElementById('OKUrlAdd').onclick = function () {
    addPic(document.getElementById('urlInput').value);
    clearDialog();
};

document.getElementById('slideShow').onclick = function () {
    debugger;
    if (document.getElementById('GallerySection').children.length > 0) {
        refreshImgView(true, 0, false, false,false);
        setTimeout(function() {slideShow(1)},3000);
    }
}

// set text change listener
setInterval(function () {
    document.getElementById('OKUrlAdd').disabled = document.getElementById('urlInput').value == '';
}, 100);

document.getElementById('urlAdd').onclick = function () {
    document.getElementById('addDialog').style.visibility = 'visible';
    document.getElementById('OKUrlAdd').disabled = true;
    document.getElementById('urlInput').focus();
};

// dispatcher for the pictures
var dispatcher = eventDispatcher(document.getElementById('GallerySection'), 'click');
dispatcher.register('pic', function (e) {
    var target = e.target;
    var el = target.parentNode;
    // find out child index
    var i = 0;
    while ((el = el.previousSibling) != null)
        i++;
    debugger;
    refreshImgView(true, i, i != 0, i != (target.parentNode.parentNode.children.length - 1),true);
})

// handle next/prev/close
document.getElementById('next').addEventListener('click', function (e) {
    debugger;
    refreshImgView(true, imgNum + 1, true, imgNum + 1 != ( document.getElementById('GallerySection').children.length - 1 ),true);
});
document.getElementById('prev').addEventListener('click', function (e) {
    debugger;
    refreshImgView(true, imgNum - 1, imgNum != 1, true,true);
});
document.getElementById('close').addEventListener('click', function (e) {
    refreshImgView(false, 0, false, false,false);
});

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

function clearDialog() {
    document.getElementById('urlInput').value = '';
    document.getElementById('addDialog').style.visibility = 'hidden';
}

function eventDispatcher(element, eventType) {
    var functionarr = [];
    element.addEventListener(eventType, function (e) {
        for (i = 0; i < functionarr.length; i++) {
            (functionarr[i])(e);
        }
    });
    return {
        register: function (cl, g) {
            fun = {};
            if (g === undefined) {
                fun = cl;
                cl = undefined;
            }
            else {
                fun = function (a) {
                    allClasses = a.target.className.split(' ');
                    if ((allClasses.length > 0) && (allClasses.indexOf(cl) > -1)) {
                        g(a);
                    }
                }
            }
            functionarr.push(fun);
            return this;
        }
    }
}

function refreshImgView(isVisible, imgElementNumber, showPrev, showNext, showClose) {
    var picView = document.getElementById('picView');
    var picViewImg = document.getElementById('picViewImg');
    var imgElementToShow = document.getElementById('GallerySection').children[imgElementNumber].firstChild;
    imgNum = imgElementNumber;
    if (!isVisible) {
        picView.style.visibility = 'hidden';
        document.getElementById('prev').style.visibility = 'hidden';
        document.getElementById('next').style.visibility = 'hidden';
        document.getElementById('close').style.visibility = 'hidden';
    }
    else {
        picView.style.visibility = 'visible';
        picViewImg.src = imgElementToShow.src;
        // handle the next and prev visibility
        document.getElementById('prev').style.visibility = showPrev ? 'visible' : 'hidden';
        document.getElementById('next').style.visibility = showNext ? 'visible' : 'hidden';
        document.getElementById('close').style.visibility = showClose ? 'visible' : 'hidden';
    }
}

function slideShow(imgNum) {
    if (imgNum == (document.getElementById('GallerySection').children.length)) {
        refreshImgView(false, 0, false, false,false);
    } else {
        refreshImgView(true, imgNum, false, false,false);
        setTimeout(function () {
            slideShow(imgNum + 1);
        },3000)
    }
}