import { StandardMode } from "./Standard.js";

export const MODES_DICTIONARY = {
  STANDARD: "standard",
}

/**
 * Works with game modes. Create new instances relying on modes' dictionary.
 */
export class Modes {
  constructor(root) {
    this.root = root;
    this.MODES = {
      [MODES_DICTIONARY.STANDARD]: StandardMode
    };
  }

  /**
   * Create mode instance from existing modes dictionary
   * @public
   * @param name
   * @returns Mode instance
   */
  initMode(name) {
    if(!this.MODES[name]) {
      throw new Error(`Mode with name ${name} doesn't exist`)
    }
    return new this.MODES[name](this.root);
  }
}