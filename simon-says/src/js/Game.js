const GameState = {
  AWAITING: 'awaiting',
  PLAYING: 'playing',
  LOST: 'lost',
  WON: 'won'
};

class Game {
  constructor(config = {}) {
    const {boardSize = [4, 4]} = config;
    this.boardSize = boardSize;
    this.state = GameState.AWAITING;

    this.menu = new MenuController({
      ...config,
      onStart: this.start.bind(this),
      onReset: this.reset.bind(this)
    });
    this.referenceBoard = new ReferenceBoardController({boardSize});


    this.userSequence = document.querySelector('#user-sequence');

    this.initialize();
  }

  initialize() {
    // TODO: move to UserBoardController
    this.initializeGameBoard(this.userSequence, 'button');
    const boxes = Array.from(document.querySelectorAll('#user-sequence > *'));
    boxes.forEach(box => {
      box.addEventListener('click', ({target}) => {
        if (this.state !== GameState.PLAYING) {
          return;
        }

        const value = parseInt(target.value);
        this.sequence.userInput.push(value);
        this.sequence.checkUserInput(undefined, this.win.bind(this), this.lose.bind(this), this.play.bind(this));
      })
    });
    //
  }

  play() {
    this.state = GameState.PLAYING;
    this.referenceBoard.showSequence();
  }

  win() {
    this.state = GameState.WON;
    alert('win');
  }

  lose() {
    this.state = GameState.LOST;
    this.referenceBoard.showSequence(this.sequence.length);
    alert('game over');
  }

  start() {
    if (this.state === GameState.PLAYING) {
      console.warn('Cannot start already started game');
      return;
    }

    this.sequence = new Sequence({length: this.menu.getDifficulty(), maxValue: this.boardSize[0] * this.boardSize[1]});
    this.referenceBoard.setSequence(this.sequence);
    this.play();
  }

  reset() {
    if (this.state !== GameState.PLAYING) {
      console.warn('Game is not started cannot reset');
    }

    this.sequence = new Sequence({length: this.menu.getDifficulty(), maxValue: this.boardSize[0] * this.boardSize[1]});
    this.referenceBoard.setSequence(this.sequence);
    this.play();
  }

  initializeGameBoard(parent, elementType = 'div') {
    let elementFactory = (index) => {
      const element = document.createElement(elementType);
      element.value = index;
      return element;
    };

    fillGrid(parent, elementFactory, this.boardSize);
  }
}