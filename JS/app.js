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
var imageFourElement = document.getElementById('image-One');
var imageFiveElement = document.getElementById('image-Two');
var imageSixElement = document.getElementById('image-Three');
var resultsList = document.getElementById('results');

//image constructor
function MallImage(name, src = 'jpg') {
  this.name = name; // bag
  this.src = `images/${name}.${'jpg'}`;
  this.view = 0;
  this.votes = 0;
  allImages.push(this);
}

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

// retrieved from Math.random MDN docs
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function renderImages() {
  while (renderQue.length < 4) {
    var tempIndex = getRandomIndex(allImages.length);
    while (renderQue.includes(tempIndex)) {
      tempIndex = getRandomIndex(allImages.length);
    }
    renderQue.push(tempIndex);
  }
  console.log(renderQue);

  var imageOneIndex = renderQue.pop();
  var imageTwoIndex = renderQue.pop();
  var imageThreeIndex = renderQue.pop();

  // validation

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
  if (actualClicks === 25) {
    myContainer.removeEventListener('click', handleClick);
    console.log('here');
    renderChart();
  }
  renderImages();
}
renderImages();


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
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },
      {
        label: 'Number of Views',
        data: viewsArray,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)'
        ],
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




myContainer.addEventListener('click', handleClick);





