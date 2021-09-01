class MenuController {
  constructor(config = {}) {
    this.config = config;

    this.difficultySelect = document.querySelector('#difficulty-select');
    this.startButton = document.querySelector('#start-button');
    this.resetButton = document.querySelector('#reset-button');

    this.initialize(this.config);
  }

  initialize(config) {
    const {maxDifficulty = 10, defaultDifficulty = 5, onStart, onReset} = config;

    this.initializeDifficultyOptions(maxDifficulty, defaultDifficulty);

    if (!onStart || !onReset) {
      throw Error('Both \'onStart\' and \'onReset\' must be provided in config')
    }
    this.addEventListeners(onStart, onReset);
  }

  initializeDifficultyOptions(maxDifficulty, defaultDifficulty) {
    new Array(maxDifficulty).fill(null).forEach((_, index) => {
      const difficulty = index + 1;

      const option = document.createElement('option');
      option.innerHTML = difficulty;
      option.value = difficulty;

      this.difficultySelect.appendChild(option)
    });

    if (defaultDifficulty < maxDifficulty) {
      this.difficultySelect.value = defaultDifficulty;
    }
  }

  addEventListeners(onStart, onReset) {
    this.startButton.addEventListener('click', onStart);
    this.resetButton.addEventListener('click', onReset);
  }

  getDifficulty() {
    return parseInt(this.difficultySelect.value);
  }
}