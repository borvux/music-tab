import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="auto-scroll"
export default class extends Controller {
  static targets = ["button", "speedDisplay"];

  connect() {
    this.scrollInterval = null;
    this.scrollSpeed = 1;
  }

  disconnect() {
    // Ensure scrolling stops if the user navigates away
    this.stop();
  }

  toggle() {
    if (this.scrollInterval) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    const speedMapping = { 1: 200, 2: 100, 3: 50, 4: 25, 5: 10 };
    const interval = speedMapping[this.scrollSpeed];
    
    this.scrollInterval = setInterval(() => {
      window.scrollBy(0, 1);
    }, interval);

    this.buttonTarget.innerHTML = `Pause Scroll<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`;
  }

  stop() {
    clearInterval(this.scrollInterval);
    this.scrollInterval = null;
    this.buttonTarget.innerHTML = `Auto Scroll<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 inline" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" /></svg>`;
  }

  increaseSpeed() {
    if (this.scrollSpeed < 5) {
      this.scrollSpeed++;
      this.updateSpeedDisplay();
      if (this.scrollInterval) {
        this.stop();
        this.start();
      }
    }
  }

  decreaseSpeed() {
    if (this.scrollSpeed > 1) {
      this.scrollSpeed--;
      this.updateSpeedDisplay();
      if (this.scrollInterval) {
        this.stop();
        this.start();
      }
    }
  }

  updateSpeedDisplay() {
    this.speedDisplayTarget.textContent = `Speed: ${this.scrollSpeed}`;
  }
}
