//languaje: javascript
//path: src\formulario.js

// Importamos la clase Recommender
const recommender = new Recommender();

// Obtenemos los datos del formulario mediante eventos

const fileInput = document.getElementById('matrix');
fileInput.addEventListener('change', fileToMatrix);

const metrics = document.getElementById('metrics');
metrics.addEventListener('change', function(e) {
    recommender.setMetrics(e.target.value);
});

const neighbors = document.getElementById('neighbors');
neighbors.addEventListener('change', function(e) {
    recommender.setNeighbors(e.target.value);
});

const prediction = document.getElementById('prediction');
prediction.addEventListener('change', function(e) {
    recommender.setPrediction(e.target.value);
});

const generate = document.getElementById('generate');
generate.addEventListener('click', function(e) {

    // Creamos la matriz de similitud
    recommender.setSimilarityMatrix();  
    let utilityMatrix = recommender.getOriginalMatrix();

    // Mostramos los datos en el HTML    
    document.getElementById('originalMatrix').innerHTML = '<h5>Matriz original:</h5>' + matrixToTable(utilityMatrix, 'Item ');
    document.getElementById('similarityMatrix').innerHTML = '<h5>Matriz de similitud:</h5>' + matrixToTable(recommender.getSimilarityMatrix(), 'Usuario ');
    document.getElementById('transformedMatrix').innerHTML = '<h5>Matriz de utilidad con las predicciones:</h5>' + matrixToTable(recommender.transformMatrix(), 'Item ', true, utilityMatrix);
    document.getElementById('neighborsPerUser').innerHTML = '<div class="center"><h5 class="center black-text">Predicción de vecinos por cada item del usuario:</h5></div>' + showNeighborsPerUser(recommender.getNeighborsPerUser());
    document.getElementById('calculatePredictions').innerHTML = '<div class="center"><h5 class="center black-text">Cálculo de predicciones:</h5></div>' + showPredictionsCalculation(recommender.getCalculatePredictions(), recommender.getPrediction());


    // Vaciamos el vector de vecinos por usuario
    recommender.emptyNeighborsPerUser();

    // Vaciamos el vector de cálculo de predicciones
    recommender.emptyCalculatePredictions();
    
});

/************ FUNCIONES ************/
// Mediante:  Math.round(('número' + Number.EPSILON) * 100) / 100 -> Redondeamos el número a 2 decimales

/**
 * Función que transforma un fichero de texto a una matriz, y asigna dicha matriz al recomendador.
 * @param {Event} e Evento que se produce al cambiar el fichero de texto
 * @returns 
 */
function fileToMatrix(e) {

    // Manejo de errores
    if (e.target.files.length < 1) {
      alert("Tienes que subir un fichero de matriz de utilidad");
    }

    const file = fileInput.files[0];
    let reader = new FileReader();
    let matrix = [];
    reader.readAsText(file);

    reader.onload= function() {

        // Guardamos el contenido por lineas en matrix
        matrix = String(reader.result).split('\n');

        // Por cada fila borrar todos los espacios situados al principio y al final, y separar por espacios
        for (let i = 0; i < matrix.length; i++) {
            
            if (matrix[i] == '') { 
                matrix.splice(i, 1); 
                continue;  
            }

            matrix[i] = matrix[i].trim();
            matrix[i] = matrix[i].split(' ');
            
        }
        
        // Mediante un for convertir la matriz a números enteros, pero si detectamos el caracter '-' lo convertimos a -1
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == '-') { matrix[i][j] = -1; }
                else { matrix[i][j] = parseInt(matrix[i][j]); }
            }
        }
        recommender.setMatrix(matrix);      
    }

}

/** Imprime una matriz en formato tabla usando hojas de estilo de materialize
 * 
 * @param {Array} matrix Matriz a imprimir
 * @param {String} type Si la cabecera de la tabla mostrara 'Usuario' x o 'Item' x
 * @param {Boolean} color Si está a 'true', donde en 'utilityMatrix' hay un -1, se pintara de azul flojo el fondo en 'matrix'
 * @param {Array} utilityMatrix Matriz de utilidad
 * @returns {String} Devuelve una tabla en formato HTML
 */
function matrixToTable(matrix, type = 'Item ', color = false, utilityMatrix = null) {
    let table = '<div class="col s12" id="table-container"><table class="stripped">';
    
    table += '<thead><tr><th> </th>';
    for (let i = 0; i < matrix[0].length; i++) {
        table += '<th> ' + type + (i+1) + '</th>';
    }
    table += '</tr></thead><tbody>';

    for (let i = 0; i < matrix.length; i++) {
        table += '<tr><th> Usuario ' + (i+1) + '</th>';
        for (let j = 0; j < matrix[i].length; j++) {
            if (color && utilityMatrix[i][j] == -1)
                table += '<td class="green lighten-3">' + Math.round((matrix[i][j] + Number.EPSILON) * 100) / 100 + '</td>';
            else if (matrix[i][j] == -1) 
                table += '<td class="green lighten-3"> - </td>';
            else 
                table += '<td>' + Math.round((matrix[i][j] + Number.EPSILON) * 100) / 100 + '</td>';
            
        }
        table += '</tr>';
    }
    table += '</tbody></table></div>';
    return table;
    
} 

/**
 * Función que muestra los vecinos de cada usuario
 * @param {Array} array Array de arrays con los vecinos de cada usuario
 * @returns {String} Devuelve la información en formato HTML
 */
function showNeighborsPerUser(array) {
    let text = '<div class="col s8 offset-s2">';
    for (let i = 0; i < array.length; i++) {
        text += '<p>En el proceso de predicción realizado, el <b> Usuario'+ (array[i][0] + 1) +
        '</b> con <b>item' + (array[i][1] + 1) +
        '</b>, tiene como vecinos más próximos: <b> ';

        for (let j = 0; j < array[i][2].length; j++) {
            if (j == 0) text += (array[i][2][j].user + 1);
            else text += ', ' + (array[i][2][j].user + 1);
        }

        text += '</b>.</p>';
    }
    return text;
}

/**
 * Función que muestra los cálculos de predicciones
 * @param {*} array Array de arrays con los cálculos de predicciones
 * @param {*} prediction Indica que tipo de predicción se empleó 
 * @returns {String} Devuelve la información en formato HTML
 */
function showPredictionsCalculation(array, prediction) {
    let text = '<div class="col s8 offset-s2">';
    for (let i = 0; i < array.length; i++) {
        text += '<p> Cálculo de predicción ' +
        'del <b> Usuario' + (array[i][0] + 1) +
        '</b> con <b>item' + (array[i][1] + 1) + '</b> en base a los vecinos seleccionados:  <b>';

        if (prediction == '1') {
            text += Math.round((array[i][2] + Number.EPSILON) * 100) / 100 + ' / ' +
            Math.round((array[i][3] + Number.EPSILON) * 100) / 100 +
            ' = ' + Math.round((array[i][4] + Number.EPSILON) * 100) / 100 + '</b>';
        }
        else {
            text += Math.round((array[i][5] + Number.EPSILON) * 100) / 100 + ' + (' +
            Math.round((array[i][2] + Number.EPSILON) * 100) / 100 + ' / ' +
            Math.round((array[i][3] + Number.EPSILON) * 100) / 100 +
            ') = ' + Math.round((array[i][4] + Number.EPSILON) * 100) / 100 + '</b>';
        }

        text += '</p>';
    }
    text += '</div>';

    return text;
}
