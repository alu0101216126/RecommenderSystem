//languaje: javascript
//path: src\recommender.js

// Clase que representa un sistema de recomendación
class Recommender {

    constructor() {
        this.matrix = [];
        this.transformedMatrix = [];
        this.similarityMatrix = [];
        this.neighborsPerUser = [];
        this.calculatePredictions = [];
        this.neighbors = 3; // Mínimo 3 vecinos
        this.prediction = '1';
        this.metrics = '1';  
      }

    //Método que establece la matriz de utilidad y reinicia los arrays en el caso en que se cambie la matriz de utilidad
    setMatrix(matrix) {
        this.matrix = matrix;
        this.transformedMatrix = [];
        this.similarityMatrix = [];
        this.neighborsPerUser = [];
        this.calculatePredictions = [];
    }

    //Método que establece la métrica elegida
    setMetrics(metrics) {
        this.metrics = metrics;
    }

    // Método que establece la cantidad de usuarios a considerar
    setNeighbors(neighbors) {
        if (neighbors >= 3) this.neighbors = neighbors;
        else this.neighbors = 3;
    }

    // Método que establece el tipo de predicción a calcular
    setPrediction(prediction) {
        this.prediction = prediction;
    }

    // Método que calcula la matriz de similitud
    setSimilarityMatrix() {
        let similarityMatrix = [];
        for (let i = 0; i < this.matrix.length; i++) {
            let row = [];
            for (let j = 0; j < this.matrix.length; j++) {
                let similarityFixed = this.similarity(i, j);
                row.push(similarityFixed);
            }
            similarityMatrix.push(row);
        }
        this.similarityMatrix = similarityMatrix;
    }

    // Método que vacía el array de vecinos por usuario
    emptyNeighborsPerUser() {
        this.neighborsPerUser = [];
    }

    // Método que vacía el array de cálculo de predicciones
    emptyCalculatePredictions() {
        this.calculatePredictions = [];
    }

    // Método que devuleve la matriz de similitud
    getSimilarityMatrix() {
        return this.similarityMatrix;
    }

    // Método que devuelve la matriz de utilidad
    getOriginalMatrix() {
        return this.matrix;
    }

    // Método que devuelve la matriz de utilidad tras la calificación a través de la predicción
    getTransformedMatrix() {
        return this.transformedMatrix;
    }

    // Método que devuelve el array de vecinos de un usuario
    getNeighborsPerUser() {
        return this.neighborsPerUser;
    }

    // Método que devuelve el array de cálculo de predicciones	
    getCalculatePredictions() {
        return this.calculatePredictions;
    }

    // Método que devuelve el tipo de predicción elegida
    getPrediction() {
        return this.prediction;
    }

    // Método que redirecciona a la métrica elegida
    similarity(user1, user2) {
        if (this.metrics == '1') return this.pearson(user1, user2);
        else if (this.metrics == '2') return this.cosine(user1, user2);
        return this.euclidean(user1, user2);
    }
    
    // Método que redirecciona a la predicción elegida
    selectPrediction(user, item) {
        if (this.prediction == '1')  return this.simplePrediction(user, item); 
        else return this.meanDifferencePrediction(user, item);
    }
    
    // Método que realiza la media de un usuario
    userAverage(user) {
        let userRow = this.matrix[user];
        let sum = 0;
        let count = 0;
        for (let i = 0; i < userRow.length; i++) {
            if (userRow[i] >= 0) {
                sum += userRow[i];
                count++;
            }
        }
        return sum / count;
    }

    // Método de similitud: correlación de Pearson entre dos usuarios
    pearson(user1, user2) {
        let user1Row = this.matrix[user1];
        let user2Row = this.matrix[user2];
    
        let numerator = 0;
        let denominator1 = 0;
        let denominator2 = 0;
        
        let user1Average = this.userAverage(user1);
        let user2Average = this.userAverage(user2);

        for (let i = 0; i < user1Row.length; i++) {
            if (user1Row[i] >= 0 && user2Row[i] >= 0) {

                numerator += (user1Row[i] - user1Average) * (user2Row[i] - user2Average);
                denominator1 += Math.pow(user1Row[i] - user1Average, 2);
                denominator2 += Math.pow(user2Row[i] - user2Average, 2);
            }
        }

        let denominator = Math.sqrt(denominator1) * Math.sqrt(denominator2);
        let result = numerator / denominator;

        // Normalizamos en caso de negativo
        if (result < 0) {
            result = (result - (-1)) / (1 - (-1));
        }

        return result;
    }

    //  Método de similitud: distancia Coseno entre dos usuarios
    cosine(user1, user2) {
        let user1Row = this.matrix[user1];
        let user2Row = this.matrix[user2];
        let numerator = 0;
        let denominator1 = 0;
        let denominator2 = 0;

        for (let i = 0; i < user1Row.length; i++) {
            if (user1Row[i] >= 0 && user2Row[i] >= 0) {

                numerator += (user1Row[i]) * (user2Row[i]);
                denominator1 += Math.pow(user1Row[i], 2);
                denominator2 += Math.pow(user2Row[i], 2);
            }
        }

        let denominator = Math.sqrt(denominator1) * Math.sqrt(denominator2);

        return numerator / denominator;
    }

    // Método de similitud: distancia Euclídea entre dos usuarios
    euclidean(user1, user2) {
        let user1Row = this.matrix[user1];
        let user2Row = this.matrix[user2];
        let sum = 0;

        for (let i = 0; i < user1Row.length; i++) {
            if (user1Row[i] >= 0 && user2Row[i] >= 0) {
                sum += Math.pow(user1Row[i] - user2Row[i], 2);
            }
        }

        return Math.sqrt(sum);
    }

    // Método que permite calcular los vecinos más cercanos de un usuario en función de la métrica de similitud	
    getCloserNeighbors(user, item) {
        let neighbors = [];

        //Calculamos vecinos más cercanos a 'user'
        for (let i = 0; i < this.matrix.length; i++) {
            if (i != user && this.matrix[i][item] >= 0) {
                neighbors.push({
                    user: i,
                    similarity: this.similarityMatrix[user][i]
                });
            }
        }

        // Ordenar los vecinos por similitud
        if (this.metrics == '1' || this.metrics == '2') 
            neighbors.sort(function(a, b) { return b.similarity - a.similarity; });
        else 
            neighbors.sort(function(a, b) { return a.similarity - b.similarity; });  

        // Elegimos los k vecinos más cercanos
        let result = [];
        for (let i = 0; i < this.neighbors; i++) 
            if (neighbors[i] != null) result.push(neighbors[i]);

        // Guardamos los vecinos más cercanos para el usuario actual
        this.neighborsPerUser.push([user, item, result]);

        return result;
    }

    // Método que realiza el cálculo de predicción simple del item del usuario dado
    simplePrediction(user, item) {
        // Obtener los vecinos más cercanos
        let neighbors = this.getCloserNeighbors(user, item);

        let numerator = 0;
        let denominator = 0;

        // Calcular el numerador y denominador de la predicción
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            numerator += neighbor.similarity * this.matrix[neighbor.user][item];
            denominator += Math.abs(neighbor.similarity);    
        }

        // Guardamos los cálculos para el usuario actual
        this.calculatePredictions.push([user, item, numerator, denominator, numerator / denominator]);
        return numerator / denominator;        
    }

    // Método que realiza el cálculo de predicción considerando la diferencia con la media
    meanDifferencePrediction(user, item) {
        let neighbors = this.getCloserNeighbors(user, item);
        let userAverage = this.userAverage(user);
        let numerator = 0;
        let denominator = 0;

        // Calcular el numerador y denominador de la predicción
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            numerator += neighbor.similarity * (this.matrix[neighbor.user][item] - this.userAverage(neighbor.user));
            denominator += Math.abs(neighbor.similarity);
        }

        let result = userAverage + (numerator / denominator);

        // Guardamos los cálculos para el usuario actual
        this.calculatePredictions.push([user, item, numerator, denominator, result, userAverage]);
        return result;        
    }

    // Método que transforma la matriz de utilidad, calificando aquellos items vacíos mediante las predicciones
    transformMatrix() {
        for (let i = 0; i < this.matrix.length; i++) 
            this.transformedMatrix[i] = this.matrix[i].slice();

        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] == -1) { 
                    this.transformedMatrix[i][j] = this.selectPrediction(i, j);
                }
                else this.transformedMatrix[i][j] = this.matrix[i][j];
            }
        }
        return this.transformedMatrix;
    }
}

