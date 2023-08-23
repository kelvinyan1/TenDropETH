const colors = ['#fff', '#F0FFFF', '#00FFFF', '#0096FF', '#0000FF'];
let selectedBlock = null

function changeColor(event) {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  event.target.style.backgroundColor = randomColor;
}

function selectBlock(event, index) {
  selectedBlockIndex = index;
  const selectedBlockIndexElement = document.getElementById('selectedBlockIndex');
  selectedBlockIndexElement.textContent = index;
}

document.addEventListener('DOMContentLoaded', function () {
  const colorBlocks = document.getElementById('colorBlocks');

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const block = document.createElement('div');
      block.className = 'block';
      block.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      const index = i * 5 + j;
      block.addEventListener('click', function (event) {
        changeColor(event);
        selectBlock(event, index);
      });
      colorBlocks.appendChild(block);
    }
  }
});
