class Sequence {
  constructor({length = 1, maxValue = 0}) {
    this.length = length;
    this.maxValue = maxValue;
    this.currentLength = 1;
    this.userInput = [];

    this.initialize();
  }

  initialize() {
    this.sequence = this.getSequence(this.maxValue, this.length);
  }

  checkUserInput(userInput = this.userInput, onWin, onLose, onContinue) {
    if (userInput.join(',') !== [...this.sequence].slice(0, userInput.length).join(',')) {
      onLose();
      return;
    }

    if (userInput.join(',') === [...this.sequence].join(',')) {
      onWin();
      return;
    }

    if (userInput.length === this.currentLength) {
      this.userInput = [];
      this.currentLength++;
      onContinue();
    }
  }

  getSequence(max, length) {
    return new Array(length)
      .fill(null)
      .map(() => this.getRandomFromRange(0, max - 1));
  }

  getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  clear() {
    this.userInput = [];
  }
}