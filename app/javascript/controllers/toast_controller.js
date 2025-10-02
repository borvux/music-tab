import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toast"
export default class extends Controller {
  connect() {
    // Show the toast
    this.element.classList.remove('hidden');

    // Hide and remove the toast after 5 seconds
    setTimeout(() => {
      this.close();
    }, 5000);
  }

  close() {
    // Add a class to fade out
    this.element.classList.add('opacity-0');
    
    // Remove the element from the DOM after the transition
    setTimeout(() => {
      this.element.remove();
    }, 500); // Corresponds to transition duration-500
  }
}
