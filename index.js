document.addEventListener("DOMContentLoaded", () => {
  // filter function
  let tileColor = [];
  let tileContent = '';
  const filterFunction = (color, content) => {
    document.querySelectorAll('.tile').forEach(tile => {
      tile.classList.remove('hide');

      if (tile.dataset.content.includes(content) && (!color.length || color.includes(tile.style['background-color']))) {
        tile.classList.remove('hide');
      } else {
        tile.classList.add('hide');
      }
    })
  }

  // fetch colors
  const getColors = fetch('https://random-flat-colors.vercel.app/api/random?count=5');
  let colorsContainer = document.querySelectorAll('.colors-container');
  getColors
    .then((response) => response.json())
    .then((data) => {
      let colorsHtml = '';

      data.colors.map((color) => {
        colorsHtml += `<li class="filter__list__color" style="background-color:${color};"></li>`
      });

      colorsContainer.forEach(colorNode => {
        colorNode.innerHTML = colorsHtml;
      });
    })
    .catch(() => {
      confirm("Colors API failed to load");
      location.reload();
    })

  // open sidebar
  const addCreativeButton = document.querySelector('.creatives__add');
  const sidebar = document.querySelector('.sidebar');
  const sideBarForm = document.getElementById('sidebarForm');
  const error = document.querySelector('.error-message');
  addCreativeButton.addEventListener('click', (e) => {
    // reset filters
    document.querySelectorAll('li').forEach(list => {
      list.classList.remove('selected')
    });
    document.querySelector('.hidden-color').value = '';
    error.textContent = 'Please fill all the fields.';

    sideBarForm.reset();
    e.target.classList.add('disable');
    sidebar.classList.remove('hide');
    error.classList.add('hide');
  });

  // close sidebar
  const sideBarClose = document.querySelector('.sidebar__header__close');
  sideBarClose.addEventListener('click', (e) => {
    addCreativeButton.classList.remove('disable');
    sidebar.classList.add('hide');
  });

  // create tiles
  let containerTiles = document.querySelector('.container__tiles');
  let rangeCounter = document.querySelector('.range-container__counter');
  sideBarForm.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const color = formData.get('color');
    const title = formData.get('title');
    const subTitle = formData.get('subtitle');
    const count = parseInt(rangeCounter.textContent);

    if (title && subTitle && count < 5) {
      containerTiles.innerHTML += `<div class="tile" data-content="${title + ' ' + subTitle}" style="background-color:${color};"><span class="title">${title}</span><span class="subtitle">${subTitle}</span></div>`;
      rangeCounter.textContent = count + 1;
      document.querySelector(".range-container__range").style.background = `linear-gradient(to right, #000 ${(count + 1) * 20}%,#ffffff ${(count + 1) * 20}%)`
    } else {
      if (count === 5) {
        error.textContent = 'Limit Reached!'
      }

      error.classList.remove('hide');
    }
  }

  // set color
  const sideBarFilterList = document.querySelector('.sidebar__filter__list');
  sideBarFilterList.addEventListener('click', (e) => {
    document.querySelectorAll('li').forEach(list => {
      list.classList.remove('selected')
    });

    if (e.target.nodeName === 'LI') {
      e.target.classList.add('selected');
      document.querySelector('.hidden-color').value = e.target.style['background-color'];
    } else {
      document.querySelectorAll('li').forEach(list => {
        list.classList.remove('selected')
      });

      document.querySelector('.hidden-color').value = '';
    }
  });

  // filter by color
  const containerFilterList = document.querySelector('.container__filter__list');
  const tiles = document.querySelectorAll('.tile');
  containerFilterList.addEventListener('click', (e) => {
    if (e.target.nodeName === 'LI') {
      // console.log('color', e.target.classList.contains('selected'))
      if (e.target.classList.contains('selected')) {
        e.target.classList.remove('selected');

        const index = tileColor.indexOf(e.target.style['background-color']);
        // console.log('index', index)
        if (index > -1) {
          tileColor.splice(index, 1);
        }
      } else {
        // console.log('sarole')
        tileColor.push(e.target.style['background-color']);
        e.target.classList.add('selected');
      }

      // console.log('tileColor', tileColor);
      // console.log('tileContent', tileContent);
      filterFunction(tileColor, tileContent);
    }
  });

  // filter by text
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const filteredText = document.querySelector('.container__filter__search');
  filteredText.addEventListener('input', debounce((e) => {
    tileContent = e.target.value;
    filterFunction(tileColor, tileContent);
  }, 1000));
})
