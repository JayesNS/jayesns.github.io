class Game {
  constructor(config = {}) {
    const {boardSize = [4, 4]} = config
    this.menu = new MenuController({
      ...config,
      onStart: this.start.bind(this),
      onReset: this.reset.bind(this)
    });

    this.boardSize = boardSize;

    this.referenceSequence = document.querySelector('#reference-sequence');
    this.userSequence = document.querySelector('#user-sequence');

    this.initialize();
  }

  initialize() {
    this.initializeGameBoard(this.referenceSequence);
    this.initializeGameBoard(this.userSequence, 'button');
  }

  start() {
    this.sequence = new Sequence({length: this.menu.getDifficulty(), maxValue: this.boardSize[0] * this.boardSize[1]});
  }

  reset() {
    console.log('reset');
  }

  initializeGameBoard(parent, elementType = 'div') {
    let elementFactory = (index) => {
      const element = document.createElement(elementType);
      if (elementType == 'button') {
        element.value = index;
      } else {
        const boardName = parent.id;
        element.id = `${boardName}-${index}`;
      }
      return element;
    };

    fillGrid(parent, elementFactory, this.boardSize);
  }
}