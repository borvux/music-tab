import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = ["container", "confirmButton"];
  static values = {
    formId: String,
    path: String,
  };

  connect() {
    // Allows closing the modal with the Escape key
    this.boundCloseOnEscape = this.closeOnEscape.bind(this);
    document.addEventListener("keydown", this.boundCloseOnEscape);
  }

  disconnect() {
    document.removeEventListener("keydown", this.boundCloseOnEscape);
  }

  // Opens the modal and sets up the confirm button's action
  open(event) {
    event.preventDefault();

    // Get the form ID or path from the button that opened the modal
    const button = event.currentTarget;
    this.formIdValue = button.dataset.modalFormIdValue || "";
    this.pathValue = button.dataset.modalPathValue || "";

    // Show the modal
    this.containerTarget.classList.remove("hidden");
    document.body.classList.add("overflow-hidden"); // Prevent background scrolling
  }

  // Closes the modal
  close() {
    this.containerTarget.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  // Closes the modal if the background is clicked
  closeOnBackdropClick(event) {
    if (event.target === this.containerTarget) {
      this.close();
    }
  }

  // Closes the modal if the Escape key is pressed
  closeOnEscape(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Handles the click on the "Confirm" or "Yes" button
  confirm(event) {
    event.preventDefault();

    if (this.formIdValue) {
      // If we have a form ID, submit that form
      const form = document.getElementById(this.formIdValue);
      if (form) {
        form.submit();
      }
    } else if (this.pathValue) {
      // If we have a path, use Turbo to visit it with the 'delete' method
      const link = document.createElement("a");
      link.href = this.pathValue;
      link.dataset.turboMethod = "delete";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    this.close();
  }
}
