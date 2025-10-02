function submitForm() {
  var searchInput = document.getElementById('search-input');
  var cursorPosition = searchInput.selectionStart;

  clearTimeout(window.searchTimeout);
  window.searchTimeout = setTimeout(function () {
    $.ajax({
      url: $('#search-form').attr('action'),
      data: $('#search-form').serialize(),
      dataType: 'script',
      success: function () {
        searchInput.focus();
        searchInput.setSelectionRange(cursorPosition, cursorPosition);
      }
    });
  }, 300); // Increased delay slightly for better UX
}
