class UserBoardController {
  constructor(config) {
    const {boardSize} = config;

    this.boardSize = boardSize;

    this.initialize(config);
  }

  initialize(config) {
    const {onUserInput} = config;

    this.userBoard = document.querySelector('#user-board');

    this.initializeBoard();

    const tiles = Array.from(this.userBoard.children);
    tiles.forEach(tile => {
      tile.addEventListener('click', ({target}) => {
        onUserInput(parseInt(target.value));
      })
    });
  }

  initializeBoard() {
    let elementFactory = (index) => {
      const element = document.createElement('button');
      element.value = index;
      return element;
    };

    fillGrid(this.userBoard, elementFactory, this.boardSize);
  }
}