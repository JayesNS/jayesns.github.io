const fillGrid = (parent, elementFactory, size = [1, 1]) => {
  if (!elementFactory) {
    throw new Error('\'elementFactory\' cannot be null');
  }

  if (!parent) {
    throw new Error('\'parent\' cannot be null');
  }

  const [width, height] = size;

  parent.style.display = 'grid';
  parent.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  parent.style.gridTemplateRows = `repeat(${height}, 1fr)`;

  new Array(width * height).fill(null).forEach((_, index) => {
    const element = elementFactory(index);
    if (!(element instanceof Element)) {
      throw Error('\'elementFactory\' must return \'Element\' instance');
    }
    parent.appendChild(element);
  })
};
