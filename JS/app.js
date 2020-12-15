'use strict';

var allImages = [];
var myContainer = document.getElementById('container');
//console.log(myContainer);
var imageOneElement = document.getElementById('image-One');
var imageTwoElement = document.getElementById('image-Two');
var imageThreeElement = document.getElementById('image-Three');
var resultsList = document.getElementById('results');

//image constructor
function Image(name, src = 'src') {
  this.name = name; // bag
  this.src = `images/${name}.${'jpg'}`;
  allImages.push(this);
}

//instantiations
new Image('bag');
new Image('banana');
new Image('chair');
new Image('pen');
new Image('dragon');

// retrieved from Math.random MDN docs
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function renderImages() {
  var imageOneIndex = getRandomIndex(allImages.length);
  var imageTwoIndex = getRandomIndex(allImages.length);

  validation

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

  function handleClick(event) {
    //console.log(event);
    var clickedImage = event.target.title;
    console.log(clickedImage);

    for (var i = 0; i < allImages.length; i++)
      if (clickedImages === allImages[i].name) {
        allImages[i].votes++;
      }
    renderImages();
  };
  renderImages();

  myContainer.addEventListener('click', handleClick)
}