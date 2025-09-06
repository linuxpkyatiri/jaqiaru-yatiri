document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    let lunrIndex, dataStore;

    // 1. Cargar la base de datos del diccionario
    async function loadData() {
        try {
            const response = await fetch('data/data.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al cargar el diccionario:', error);
            resultsContainer.innerHTML = '<p class="info error">No se pudo cargar el diccionario. Por favor, intente de nuevo más tarde.</p>';
            return [];
        }
    }

    // 2. Inicializar el motor de búsqueda Lunr.js
    function initializeLunr(data) {
        dataStore = data.reduce((store, item, index) => {
            item.id = index; // Aseguramos un ID único para cada entrada
            store[index] = item;
            return store;
        }, {});

        lunrIndex = lunr(function () {
            this.ref('id'); // La referencia única para cada documento
            this.field('term', { boost: 10 }); // Priorizar búsquedas en el término aymara
            this.field('definition_es'); // Permitir buscar en la definición
            
            // Agregar cada documento al índice
            data.forEach((item, index) => {
                this.add({ id: index, ...item });
            });
        });

        resultsContainer.innerHTML = '<p class="info">Escribe en el campo de búsqueda para encontrar términos.</p>';
    }

    // 3. Renderizar los resultados en la página
    function renderResults(results) {
        if (!results.length) {
            resultsContainer.innerHTML = '<p class="info">No se encontraron resultados.</p>';
            return;
        }

        resultsContainer.innerHTML = results.map(result => {
            const item = dataStore[result.ref];
            return `
                <div class="result-item">
                    <span class="result-term">${item.term}</span>
                    <span class="result-pos">${item.part_of_speech || ''}</span>
                    <div class="result-def">${item.definition_es}</div>
                    ${item.notes ? `<div class="result-notes"><strong>Notas:</strong> ${item.notes}</div>` : ''}
                </div>
            `;
        }).join('');
    }

    // 4. Manejar el evento de búsqueda
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim();
        if (query.length < 2) {
            resultsContainer.innerHTML = '<p class="info">Escribe al menos 2 caracteres para buscar.</p>';
            return;
        }

        // Agregamos un comodín (*) al final para búsquedas de prefijos
        const searchResults = lunrIndex.search(query + '*');
        renderResults(searchResults);
    });
    
    // Iniciar la aplicación
    loadData().then(initializeLunr);
});
