class CustomList {
  constructor() {

    this.titleLeft = document.querySelector('.js--drag-and-drop #title-left');
    this.titleRight = document.querySelector('.js--drag-and-drop #title-right');

    this.newItem = document.querySelector('.js--drag-and-drop .new-item');

    // Drag & Drop
    this.addDropFunction();
    this.addDragFunction();

    // Set Titles
    this.getTitleValue();
    // Set Items
    this.getItems();

    // EventListener
    this.customListEventListener();
  }

  addDropFunction() {
    const _this = this;
    const dropAreas = document.querySelectorAll('.js--drag-and-drop .area');

    dropAreas.forEach(function(dropArea) {

      dropArea.addEventListener('drop', function(area) {
        area.preventDefault();
        var data = area.dataTransfer.getData("text");
        console.log(data);
        dropArea.appendChild(document.getElementById(data));
        document.getElementById(data).classList.remove('is--dragging');

        _this.editItem(document.getElementById(data), area);

      });

      dropArea.addEventListener('dragover', function(area) {
        area.preventDefault();
      });

    });
  }

  addDragFunction() {
    const dragItems = document.querySelectorAll('.js--drag-and-drop .drag-item');

    dragItems.forEach(function(dragItem) {

      dragItem.setAttribute('draggable', true);

      dragItem.addEventListener('dragstart', function(item) {
        item.dataTransfer.setData("text", item.target.id);
        item.target.classList.add('is--dragging');
      });

    });
  }

  editItem(draggedItem, area) {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];

    if (storedItems) {
      storedItems.forEach(function(item) {
        if (item.name == draggedItem.innerHTML) {
          let position = 'left';
          if(area.target.classList.contains('right')) {
            position = 'right';
          }
          console.log(draggedItem.innerHTML);
          console.log(draggedItem.innerHTML);
          item.position = position;
        }
      });
    }

    localStorage.setItem("items", JSON.stringify(storedItems));
  }

  setTitleValue(key, side) {
    localStorage.setItem('title-' + side, key.target.value);
  }

  isInStorage(storedItems, key) {
    let isInStorage = false;

    if (storedItems) {
      storedItems.forEach(function(item) {
        if (item.name == key.target.value) {
          isInStorage = true;
        }
      });
    }

    return isInStorage;
  }

  addNewItem(key) {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];

    if(!this.isInStorage(storedItems, key)) {
      storedItems.push({
        'name': key.target.value,
        'position': 'left',
        'active': true
      });
    }

    localStorage.setItem("items", JSON.stringify(storedItems));

    this.getItems();
  }

  getItems() {
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];

    if (storedItems) {

      const allDragItems = document.querySelectorAll('.js--drag-and-drop .drag-item');
      allDragItems.forEach(function(item) {
        item.remove();
      });

      storedItems.forEach(function(item, index) {
        const elAreaSide = document.querySelector('.js--drag-and-drop .area.' + item.position);
        const newItem = document.createElement('div');

        newItem.setAttribute('id', 'drag-item-' + (index + 1));
        newItem.setAttribute('draggable', true);
        newItem.classList.add('drag-item');
        newItem.innerHTML = item.name;

        elAreaSide.appendChild(newItem);
      });
    }

    this.addDropFunction();
    this.addDragFunction();
  }

  customListEventListener() {
    const _this = this;

    this.titleLeft.addEventListener('keyup', function(key) {
      if(key.keyCode == 13) {
        _this.setTitleValue(key, 'left');
      }
    });

    this.titleRight.addEventListener('keyup', function(key) {
      if(key.keyCode == 13) {
        _this.setTitleValue(key, 'right');
      }
    });

    this.newItem.addEventListener('keyup', function(key) {
      if(key.keyCode == 13) {
        _this.addNewItem(key);
        this.value = '';
      }
    });
  }

  getTitleValue() {
    const leftTitleStorage = localStorage.getItem('title-left');
    const rightTitleStorage = localStorage.getItem('title-right');

    this.titleLeft.value = leftTitleStorage;
    this.titleRight.value = rightTitleStorage;
  }
}

let customList = new CustomList();
