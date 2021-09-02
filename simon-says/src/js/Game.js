const GameState = {
  AWAITING: 'awaiting',
  PLAYING: 'playing',
  LOST: 'lost',
  WON: 'won'
};

class Game {
  constructor(config = {}) {
    this.config = config;
    this.state = GameState.AWAITING; 

    this.initialize(config);
  }

  initialize(config) {
    this.menu = new MenuController({
      ...config,
      onStart: this.start.bind(this),
      onReset: this.reset.bind(this)
    });
    this.referenceBoard = new ReferenceBoardController(this.config);
    this.userBoard = new UserBoardController({
      boardSize: this.config.boardSize,
      onUserInput: this.handleUserInput.bind(this)
    });
  }

  handleUserInput(tileId) {
    if (this.state !== GameState.PLAYING) {
      return;
    }

    this.sequence.userInput.push(tileId);
    this.sequence.checkUserInput(undefined, this.win.bind(this), this.lose.bind(this), this.play.bind(this));
  }

  play() {
    this.state = GameState.PLAYING;
    this.referenceBoard.showSequence();
  }

  win() {
    this.state = GameState.WON;
    alert('Winner winner chicken dinner!');
  }

  lose() {
    this.state = GameState.LOST;
    this.referenceBoard.showSequence(this.sequence.length);
    alert('Game over! Try again');
  }

  start() {
    if (this.state === GameState.PLAYING) {
      console.warn('Cannot start already started game');
      return;
    }

    this.sequence = new Sequence({
      length: this.menu.getDifficulty(),
      maxValue: this.getTileAmount()
    });
    this.referenceBoard.setSequence(this.sequence);
    this.play();
  }

  reset() {
    if (this.state !== GameState.PLAYING) {
      console.warn('Game is not started cannot reset');
    }

    this.referenceBoard.clear();
    this.userInput = [];
    this.state = GameState.AWAITING;
  }

  getTileAmount() {
    const [width, height] = this.config.boardSize;
    return width * height;
  }
}