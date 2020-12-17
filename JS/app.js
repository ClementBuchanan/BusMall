'use strict';

var allImages = [];
var renderQue = [];

var maxClicks = 25;
var actualClicks = 0;
var myContainer = document.getElementById('container');
//console.log(myContainer);
var imageOneElement = document.getElementById('image-One');
var imageTwoElement = document.getElementById('image-Two');
var imageThreeElement = document.getElementById('image-Three');

//image constructor
function MallImage(name, src = 'jpg') {
  this.name = name; // bag
  this.src = `images/${name}.${src}`;
  this.views = 0;
  this.votes = 0;
  console.log(this);
  allImages.push(this);
}
MallImage.prototype.logger = function () {
  console.log(this);
};
var retrieveMallImage = localStorage.getItem('images');
if (retrieveMallImage) {
  allImages = JSON.parse(retrieveMallImage);
} else {
  //instantiations
  new MallImage('bag');
  new MallImage('banana');
  new MallImage('chair');
  new MallImage('pen');
  new MallImage('dragon');
  new MallImage('boots');
  new MallImage('bubblegum');
  new MallImage('cthulhu');
  new MallImage('pet-sweep');
  new MallImage('scissors');
  new MallImage('bathroom');
  new MallImage('breakfast');
  new MallImage('dog-duck');
  new MallImage('shark');
  new MallImage('sweep', 'png');
  new MallImage('tauntaun');
  new MallImage('unicorn');
  new MallImage('usb', 'gif');
  new MallImage('water-can');
  new MallImage('wine-glass');
}

// retrieved from Math.random MDN docs
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function renderImages() {
  while (renderQue.length < 6) {
    var tempIndex = getRandomIndex(allImages.length);
    while (renderQue.includes(tempIndex)) {
      tempIndex = getRandomIndex(allImages.length);
    }
    renderQue.unshift(tempIndex);
  }
  //console.log(renderQue);

  var imageOneIndex = renderQue.pop();
  var imageTwoIndex = renderQue.pop();
  var imageThreeIndex = renderQue.pop();

  // validation

  imageOneElement.src = allImages[imageOneIndex].src;
  imageOneElement.alt = allImages[imageOneIndex].name;
  imageOneElement.title = allImages[imageOneIndex].name;
  allImages[imageOneIndex].views++;

  imageTwoElement.src = allImages[imageTwoIndex].src;
  imageTwoElement.alt = allImages[imageTwoIndex].name;
  imageTwoElement.title = allImages[imageTwoIndex].name;
  allImages[imageTwoIndex].views++;

  imageThreeElement.src = allImages[imageThreeIndex].src;
  imageThreeElement.alt = allImages[imageThreeIndex].name;
  imageThreeElement.title = allImages[imageThreeIndex].name;
  allImages[imageTwoIndex].views++;

}
function handleClick(event) {
  //console.log(event);
  actualClicks++;

  var clickedImage = event.target.title;
  console.log(clickedImage);

  for (var i = 0; i < allImages.length; i++)
    if (clickedImage === allImages[i].name) {
      allImages[i].votes++;
    }
  if (actualClicks === maxClicks) {
    myContainer.removeEventListener('click', handleClick);
    console.log('here');
    renderChart();
  }
  renderImages();
}
renderImages();

myContainer.addEventListener('click', handleClick);

function renderChart() {
  var namesArray = [];
  var votesArray = [];
  var viewsArray = [];

  for (var j = 0; j < allImages.length; j++) {
    namesArray.push(allImages[j].name);
    votesArray.push(allImages[j].votes);
    viewsArray.push(allImages[j].views);
  }
  //chart retrive from chartsJS.org

  var ctx = document.getElementById('myChart').getContext('2d');

  var dataObject = {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: 'Number of Votes',
        data: votesArray,
        backgroundColor: 'rgba(255, 51, 51, 0.5)',
        borderColor: 'rgba(102, 204, 0, 0.8)',
        borderWidth: 1
      },
      {
        label: 'Number of Views',
        data: viewsArray,
        backgroundColor: 'rgba(102, 204, 0, 0.8)',
        borderColor: 'rgba(255, 51, 51, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  var myChart = new Chart(ctx, dataObject);
}

