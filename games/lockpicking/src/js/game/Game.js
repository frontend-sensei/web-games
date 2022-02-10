import { GameUI } from "./GameUI.js";
import { GameTimer } from "./GameTimer.js";
import { Progress } from "./Progress.js";
import { LevelBuilder } from "./level/LevelBuilder.js";

/**
 * Creates a new Game
 * @class Game
 */
export class Game {
  constructor() {
    this._levels = new LevelBuilder().build();
    this._progress = new Progress().restore();
    this._timer = new GameTimer(this, 2000);
    this._ui = new GameUI(this);

    this.attemts = 3;
    this.launched = false;
    this.level = level;
    this.pendingHandler = false;
    this.keydownHandler = this.keydownHandler.bind(this);

    this.level = this._levels.levels.get(this._progress.progress.level.id);

    console.log(this.level);

    this.render();
  }

  render() {
    this._ui.render(".game-page");
  }

  start() {
    this.launched = true;
    this.addListeners();

    this._timer.start();
    this._ui._Bar._BarUI.movePointer();
  }

  stop() {
    this._timer.stop();
    this.launched = false;
    this.removeListeners();
    this._ui._Bar._BarUI.stopPointer();
  }

  onDefeat() {
    this.launched = false;
    this.removeListeners();
    this._ui._Bar._BarUI.stopPointer();
    this.gameOver();
  }

  gameOver() {
    // Show popup
    // redirect to home page
  }

  addListeners() {
    window.addEventListener("keydown", this.keydownHandler);
  }

  removeListeners() {
    window.removeEventListener("keydown", this.keydownHandler);
  }

  keydownHandler() {
    if (this.pendingHandler) {
      return;
    }

    this.pendingHandler = true;

    if (this._timer.finished) {
      return;
    }
    if (event.keyCode === 32) {
      this._timer.pause();
      this._ui._Bar._BarUI.stopPointer();
      setTimeout(() => {
        this._timer.start();
        this._ui._Bar._BarUI.movePointer();
        this.pendingHandler = false;
      }, 1500);
    }
  }
}
