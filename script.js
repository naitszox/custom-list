const dropAreas = document.querySelectorAll('.js--drag-and-drop .area');
const dragItems = document.querySelectorAll('.js--drag-and-drop .drag-item');

const titleLeft = document.querySelector('#title-left');
const titleRight = document.querySelector('#title-right');

const newItem = document.querySelector('.js--drag-and-drop .new-item');

dropAreas.forEach(function(dropArea) {

  dropArea.addEventListener('drop', function(area) {
    area.preventDefault();
    var data = area.dataTransfer.getData("text");
    dropArea.appendChild(document.getElementById(data));
  });

  dropArea.addEventListener('dragover', function(area) {
    area.preventDefault();
  });

});


dragItems.forEach(function(dragItem) {

  dragItem.setAttribute('draggable', true);

  dragItem.addEventListener('dragstart', function(item) {
    item.dataTransfer.setData("text", item.target.id);
  });

});


function setTitleValue(key, side) {
  if(key.keyCode == 13) {
    localStorage.setItem('title-' + side, key.target.value);
  }
}

titleLeft.addEventListener('keyup', function(key) {
  setTitleValue(key, 'left');
});

titleRight.addEventListener('keyup', function(key) {
  setTitleValue(key, 'right');
});

newItem.addEventListener('keyup', function(key) {
  if(key.keyCode == 13) {
    console.log(key.target.value);
  }
});

function getTitleValue() {
  var leftTitleStorage = localStorage.getItem('title-left');
  var rightTitleStorage = localStorage.getItem('title-right');

  console.log(leftTitleStorage);

  titleLeft.value = leftTitleStorage;
  titleRight.value = rightTitleStorage;
}

getTitleValue();
