document.addEventListener("DOMContentLoaded", () => {
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
    }
  });

  // filter by color
  const containerFilterList = document.querySelector('.container__filter__list');
  const tiles = document.querySelectorAll('.tile');
  containerFilterList.addEventListener('click', (e) => {
    if (e.target.nodeName === 'LI') {
      const color = e.target.style['background-color'];

      if (e.target.classList.contains('selected')) {
        e.target.classList.remove('selected');

        tiles.forEach(tile => {
          tile.classList.remove('hide');
        })
      } else {
        e.target.classList.add('selected');

        tiles.forEach(tile => {
          if (tile.style['background-color'] !== color) {
            tile.classList.add('hide');
          }
        })
      }
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
    const value = e.target.value;
    document.querySelectorAll('.tile').forEach(tile => {
      tile.classList.remove('hide');

      if (!tile.dataset.content.includes(value)) {
        tile.classList.add('hide');
      } else {
        tile.classList.remove('hide');
      }
    })
  }, 1000))
})
