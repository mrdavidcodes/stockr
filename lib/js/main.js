const inputProdDate = document.getElementById('productBBDate');

requirejs(['https://cdn.jsdelivr.net/npm/flatpickr'], function(flatpickr){

});

inputProdDate.addEventListener('click', flatpickr("#productBBDate", {}));
