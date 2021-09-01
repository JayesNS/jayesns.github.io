class Sequence {
  constructor({length = 1, maxValue = 0}) {
    this.length = length;
    this.maxValue - maxValue;
    this.currentLength = 1;
    this.userInput = [];

    this.initialize();

    this.generate(maxValue);
    this.showSequence(this.currentLength);
  }

  initialize() {
    const boxes = Array.from(document.querySelectorAll('#user-sequence > *'));
    boxes.forEach(box => {
      box.addEventListener('click', ({target}) => {
        const value = parseInt(target.value);
        this.userInput.push(value);
        this.checkUserInput(this.userInput, this.sequence);
      })
    });
  }

  checkUserInput(userInput, sequence) {
    if (userInput.join(',') !== [...sequence].slice(0, userInput.length).join(',')) {
      // TODO: Create proper handling of losing game
      alert('game over')
      this.generate(this.maxValue);
      return;
    }

    if (userInput.join(',') === [...sequence].join(',')) {
      alert('winner winner chicken dinner!');
      return;
    }

    if (userInput.length === this.currentLength) {
      console.log('everything ok, next level');
      this.userInput = [];
      this.showSequence(++this.currentLength);
    }
  }

  generate(max) {
    this.sequence = new Array(this.length)
      .fill(null)
      .map(() => this.getRandomFromRange(0, max - 1));
  }

  getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  showSequence(length = this.currentLength) {
    let counter = 0;
    this.timer = setInterval(() => {
      if (counter >= length) {
        clearInterval(this.timer);
        this.clearBoxes();
        return;
      }
      this.highlightBox(this.sequence[counter]);
      counter++;
    }, 500);
  }

  clearBoxes() {
    const boxes = Array.from(document.querySelectorAll('#reference-sequence > *'));
    boxes.forEach(box => box.className = '');
  }

  highlightBox(boxId) {
    const box = document.querySelector('#reference-sequence').children[boxId];
    this.clearBoxes();
    box.className = 'highlighted';
  }
}