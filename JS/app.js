'use strict';

var allImages = [];
var myContainer = document.getElementById('container');
//console.log(myContainer);
var imageOneElement = document.getElementById('image-One');
var imageTwoElement = document.getElementById('image-Two');
var imageThreeElement = document.getElementById('image-Three');
var resultsList = document.getElementById('results');

//image constructor
function MallImage(name) {
  this.name = name; // bag
  this.src = `images/${name}.${'jpg'}`;
  allImages.push(this);
}

//instantiations
new MallImage('bag');
new MallImage('banana');
new MallImage('chair');
new MallImage('pen');
new MallImage('dragon');

// retrieved from Math.random MDN docs
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function renderImages() {
  var imageOneIndex = getRandomIndex(allImages.length);
  var imageTwoIndex = getRandomIndex(allImages.length);
  var imageThreeIndex = getRandomIndex(allImages.length);

  // validation

  while (imageOneIndex === imageTwoIndex) {
    imageTwoIndex = getRandomIndex(allImages.length);
  }

  imageOneElement.src = allImages[imageOneIndex].src;
  imageOneElement.alt = allImages[imageOneIndex].name;
  imageOneElement.title = allImages[imageOneIndex].name;
  allImages[imageOneIndex].view++;

  imageTwoElement.src = allImages[imageTwoIndex].src;
  imageTwoElement.alt = allImages[imageTwoIndex].name;
  imageTwoElement.title = allImages[imageTwoIndex].name;
  allImages[imageTwoIndex].views++;

  imageThreeElement.src = allImages[imageThreeIndex].src;
  imageThreeElement.alt = allImages[imageThreeIndex].name;
  imageThreeElement.title = allImages[imageThreeIndex].name;
  allImages[imageTwoIndex].views++;


  function handleClick(event) {
    //console.log(event);
    var clickedImage = event.target.title;
    console.log(clickedImage);

    for (var i = 0; i < allImages.length; i++)
      if (clickedImage === allImages[i].name) {
        allImages[i].votes++;
      }
  }
  renderImages();
  myContainer.addEventListener('click', handleClick);
}
renderImages();
