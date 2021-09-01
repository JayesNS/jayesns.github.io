class ReferenceBoardController {
  constructor(config) {
    const {boardSize} = config;

    this.boardSize = boardSize;

    this.initialize();
  }

  initialize() {
    this.referenceBoard = document.querySelector('#reference-sequence');

    let elementFactory = (index) => {
      const element = document.createElement('div');
      const boardName = parent.id;
      element.id = `${boardName}-${index}`;
      return element;
    };

    fillGrid(this.referenceBoard, elementFactory, this.boardSize);
  }

  setSequence(sequence) {
    this.sequence = sequence;
  }

  showSequence(length = this.sequence.currentLength) {
    let counter = 0;
    this.timer = setInterval(() => {
      if (counter >= length) {
        clearInterval(this.timer);
        this.clearBoxes();
        return;
      }
      this.highlightBox(this.sequence.sequence[counter]);
      counter++;
    }, 500);
  }

  clearBoxes() {
    const boxes = Array.from(this.referenceBoard.children);
    boxes.forEach(box => box.className = '');
  }

  highlightBox(boxId) {
    const box = this.referenceBoard.children[boxId];
    this.clearBoxes();
    box.className = 'highlighted';
  }
}