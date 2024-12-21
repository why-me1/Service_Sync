// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Autocomplete functionality
    const suggestions = ['Home Repairs', 'Cleaning', 'Tech Help', 'Moving'];
    const input = document.getElementById('taskSearch');
    const list = document.getElementById('autocompleteList');
  
    input.addEventListener('input', () => {
      const value = input.value.toLowerCase();
      list.innerHTML = '';
      if (value) {
        suggestions
          .filter(s => s.toLowerCase().includes(value))
          .forEach(s => {
            const li = document.createElement('li');
            li.textContent = s;
            li.className = 'list-group-item';
            li.addEventListener('click', () => {
              input.value = s;
              list.innerHTML = '';
            });
            list.appendChild(li);
          });
      }
    });
  
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  });
  