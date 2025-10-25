// js/search.js
// Reusable client-side search for tables or lists.
// Usage:
// - Put <input id="search-input"> on every page that needs search.
// - For tables: include <table id="data-table"> with rows inside <tbody>.
// - For lists: include <div id="data-list"> and each item with class "item".
// - Optionally include a no-results placeholder:
//   - Table: <tr class="no-results-row"><td colspan="X">No results found.</td></tr>
//   - List: <div class="no-results">No results found.</div>

(function () {
  'use strict';

  // Debounce helper
  function debounce(fn, wait) {
    let t = null;
    return function () {
      const args = arguments;
      const ctx = this;
      clearTimeout(t);
      t = setTimeout(function () {
        fn.apply(ctx, args);
      }, wait);
    };
  }

  // Normalizes string for comparison: lower-case, remove diacritics
  function normalize(str) {
    if (!str) return '';
    try {
      // Unicode normalization and remove diacritics (accents)
      return String(str).toLowerCase().normalize('NFKD').replace(/\p{Diacritic}/gu, '');
    } catch (e) {
      // Fallback if the environment doesn't support Unicode property escapes
      return String(str).toLowerCase();
    }
  }

  function filterByQuery(query) {
    const q = normalize(query || '');

    // TABLE: look for #data-table > tbody > tr
    const table = document.getElementById('data-table');
    if (table) {
      const tbody = table.tBodies[0] || table.querySelector('tbody');
      if (!tbody) return;
      const rows = Array.from(tbody.querySelectorAll('tr'));
      let visible = 0;

      rows.forEach(row => {
        // Treat a row with class "no-results-row" specially (leave hidden/show logic to end)
        if (row.classList.contains('no-results-row')) {
          return;
        }
        const text = normalize(row.textContent);
        const match = q === '' || text.indexOf(q) !== -1;
        row.style.display = match ? '' : 'none';
        if (match) visible++;
      });

      // Handle the "no results" row if present
      const noRow = tbody.querySelector('.no-results-row');
      if (noRow) {
        noRow.style.display = visible === 0 ? '' : 'none';
      }

      return;
    }

    // LIST: look for #data-list .item
    const list = document.getElementById('data-list');
    if (list) {
      const items = Array.from(list.querySelectorAll('.item'));
      let visible = 0;
      items.forEach(it => {
        const text = normalize(it.textContent);
        const match = q === '' || text.indexOf(q) !== -1;
        it.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      const noEl = list.querySelector('.no-results');
      if (noEl) noEl.style.display = visible === 0 ? '' : 'none';
      return;
    }

    // If neither found, just log a helpful message once
    if (!table && !list) {
      // eslint-disable-next-line no-console
      console.warn('search.js: no #data-table or #data-list found on page');
    }
  }

  function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) {
      // eslint-disable-next-line no-console
      console.warn('search.js: #search-input not found on this page.');
      return;
    }

    // Prevent form from submitting and reloading the page (search should be client-side)
    const form = input.closest('form');
    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        filterByQuery(input.value);
      });
    }

    const debounced = debounce(function (ev) {
      filterByQuery(ev.target.value);
    }, 150);

    input.addEventListener('input', debounced);

    // Run initial filter in case the input has a value (e.g., prefilled from URL)
    filterByQuery(input.value || '');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
