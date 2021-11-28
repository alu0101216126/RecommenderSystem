<a name="item0"></a>
# RecommenderSystem

#### Autor: Daniel Álvarez Medina
#### Correo: alu0101216126@ull.edu.es
#### [Acceda al sistema de recomendación](https://alu0101216126.github.io/RecommenderSystem/)

## Índice 

* [Introducción](#item1)
* [Directorios](#item2)
* [Instrucciones](#item3)

  * [Ejemplo de uso](#item3.1)
 
* [Descripción del código](#item4)

  * [index.html](#item4.1) 
  * [form.js](#item4.2)
  * [recommender.js](#item4.3) 

<a name="item1"></a>
## 1. Introducción :rocket:

Implementación de un sistema de recomendación siguiendo el sistema de filtrado colaborativo.

La práctica se ha llevado a cabo en el lenguaje **Javascript**. A su vez, la pedida de datos la hemos realizado en HTML y procesado posteriormente en Javascript.
Cabe destacar que para dar estilo al HTML, empleamos hojas de estilo **CSS**, y también las proporcionadas por el framework de CSS [Materialize](https://materializecss.com).

[↑](#item0)

<a name="item2"></a>
## 2. Directorios :file_folder:

Si accedemos al directorio [/docs](https://github.com/alu0101216126/RecommenderSystem/tree/main/docs), encontraremos una organización como la siguiente:

* [/css](https://github.com/alu0101216126/RecommenderSystem/tree/main/docs/css): Directorio que contiene las hojas de estilo empleadas. 
  * [style.css](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/css/style.css): Hoja de estilo para el archivo [index.html](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/index.html)

* [/examples](https://github.com/alu0101216126/RecommenderSystem/tree/main/docs/examples): Directorio que contiene una serie de matrices de utilidad de ejemplo para introducir en el sistema de recomendación.
  * [utility-matrix-10-25-1.txt](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/examples/utility-matrix-10-25-1.txt): Ejemplo de matriz de 10x25.
  * [utility-matrix-10-25-2.txt](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/examples/utility-matrix-10-25-2.txt): Ejemplo de matriz de 10x25.
  * [utility-matrix-10-25-9.txt](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/examples/utility-matrix-10-25-9.txt): Ejemplo de matriz de 10x25.
  * [utility-matrix-100-1000-1.txt](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/examples/utility-matrix-100-1000-1.txt): Ejemplo de matriz de 100x1000.
  * [utility-matrix-25-100-1.txt](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/examples/utility-matrix-25-100-1.txt): Ejemplo de matriz de 25x100.
  * [utility-matrix-5-10-4.txt](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/examples/utility-matrix-5-10-4.txt): Ejemplo de matriz de 5x10.
  * [utility-matrix-5-5-1.txt](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/examples/utility-matrix-5-5-1.txt): Ejemplo de matriz de 5x5.

* [/media](https://github.com/alu0101216126/RecommenderSystem/tree/main/docs/media): Directorio que contiene imágenes y gifs empleados en el README.md.
* [/src](https://github.com/alu0101216126/RecommenderSystem/tree/main/docs/src): Directorio que contiene los scripts empleados para llevar a cabo el sistema de recomendación
  * [form.js](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/src/form.js): Procesamos los datos obtenidos en el formulario, y mediante un objeto de la clase **Recommender**, obtenemos y mostramos los resultados.
  * [recommender.js](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/src/recommender.js): Contiene la clase **Recommender**, dicha clase almacena los datos obtenidos en el formulario y realiza los cálculos correspondientes para obtener: la matriz de utilidad con las predicciones, la matriz de similitud, los vecinos más optimos para cada item de algún usuario, y los cálculos realizados en las predicciones.
* [index.html](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/index.html): Fichero **HTML** que contiene el formulario a procesar mediante el fichero [form.js](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/src/form.js)

[↑](#item0)

<a name="item3"></a>
## 3. Instrucciones :page_with_curl:

Para acceder al sistema recomendador lo haremos a través del enlace que aparece en la parte superior, o haciendo clic [aquí](https://alu0101216126.github.io/RecommenderSystem/).

![Formato inicial del formulario](./docs/media/initialForm.png)

Veremos que tenemos un formulario con una serie de campos:

* En primer lugar, se nos indica que seleccionemos una matriz de utilidad. Dicha matriz la debemos de subir en formato `.txt`, al pusar el botón de **Seleccionar arhivo**. En [/examples](https://github.com/alu0101216126/RecommenderSystem/tree/main/docs/examples) podemos encontrar algunas matrices de ejemplo. 
* Posteriormente debemos de seleccionar la métrica a emplear, tenemos tres opciones:

  * Correlación de Pearson
  * Distancia Coseno
  * Distancia Euclídea 

* A continuación elegimos la cantidad de vecinos, donde la cantidad mínima es 3. Si se introduce un valor inferior, se tomará el 3 como referencia.
* Finalmente debemos de elegir el tipo de predicción, donde puede ser:
  
  * Predicción simple
  * Diferencia con la media 

Una vez seleccionado todos los campos, pulsaremos el botón de **GENERAR PREDICCIÓN** para mostrar los resultados.

<a name="item3.1"></a>
### 3.1 Ejemplo de uso 

Un ejemplo de ejecución sería el siguiente:

<p align="center">
 <a href="https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/media/formExample.gif">
  <img src="./docs/media/formExample.gif" style="max-width:100%; width: 150%">
 </a>
</p>

[↑](#item0)

<a name="item4"></a>
## 4. Descripción del código :computer:

<a name="item4.1"></a>
### 4.1. index.html 

El fichero [index.html](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/index.html), contiene el formulario a rellenar por parte del usuario, donde posteriormente será analizado.

La información del contenido de este fichero lo puede encontrar en las [Instrucciones](#item3). 

[↑](#item0)

<a name="item4.2"></a>
### 4.2. form.js

En [form.js](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/src/form.js), procesamos los datos obtenidos en el formulario, para posteriormente almacenarlos en variables, y mediante un objeto de la clase **Recommender**, obtener y mostrar los resultados.

Para esto, primeramente, creamos un objeto de la clase Recommender que explicaremos más adelante. Lo llamaremos **recommender**:
```javascript
const recommender = new Recommender();
```
Una vez creado el objeto, podremos trabajar con los eventos para procesar y mostrar datos. Para conseguir esto, empleamos dos tipos de eventos:

* Evento `change`: Este evento se activará cada vez que el input del campo que estamos observando cambie.

```javascript
const metrics = document.getElementById('metrics');
metrics.addEventListener('change', function(e) {
    recommender.setMetrics(e.target.value);
});
```
Se puede observar en el ejemplo, que lo que haremos será obtener el campo que queremos analizar, que en este caso es la métrica a elegir. Posteriormente, cuando se active el evento, mediante el objeto recommender, almacenaremos el valor introducido. Esto aplicaría a todos los eventos que usan `change`.

El caso más complejo en este caso, es al obtener la matriz mediante fichero. Lo que debemos de hacer en este caso es transformar dicho fichero a formato de matriz de números. 

Para ello creamos la función `fileToMatrix`. Aquí creamos un objeto de la clase `FileReader()` que denominaremos `reader`. Una vez hecho esto, leemos el fichero recibido como texto:

```javascript
    const file = fileInput.files[0];
    let reader = new FileReader();
    let matrix = [];
    reader.readAsText(file);
```
Cuando se acabe de leer el fichero correctamente, se activará el evento `load`. En este evento tranformaremos los datos para crear una matriz de números, y cambiaremos los '-' por el valor -1. Finalmente esta matriz se almacena en el objeto recommender.

* Evento `click`: Este evento se activará cada vez que pulsemos el botón del campo que estamos observando.

```javascript
const generate = document.getElementById('generate');
generate.addEventListener('click', function(e) {
```
Se puede observar en el ejemplo, que lo que haremos será obtener el campo que queremos analizar, que en este caso es el botón a pulsar. Posteriormente, cuando se active el evento, lo que haremos será realizar todos los cálculos con los valores almacenados hasta el momento, para finalmente mostrarlos.

También existen otros métodos que simplemente se encargar de mostrar mediante HTML los resultados, estos son: ```matrixToTable(matrix, type = 'Item ', color = false, utilityMatrix = null)```, ```showNeighborsPerUser(array)``` y ```showPredictionsCalculation(array, prediction)```

[↑](#item0)

<a name="item4.3"></a>
### 4.3. recommender.js

El fichero [recommender.js](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/src/recommender.js), contiene la clase **Recommender**, dicha clase almacena los datos obtenidos en el formulario y realiza los cálculos correspondientes para obtener: la matriz de utilidad con las predicciones, la matriz de similitud, los vecinos más optimos para cada item de algún usuario, y los cálculos realizados en las predicciones.

### **_Constructor_**

El constructor por defecto de la clase es el siguiente:

```javascript
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
```
Como los valores de los atributos cambian dinámicamente mediante el evento explicado `change`, todos los atributos tendrán valores por defecto hasta que estos cambien.

* `this.matrix`: Matriz de utilidad que contiene un -1 en aquellos items que no han sido calificados.
* `this.transformedMatrix`: Matriz de utilidad que contiene los resultados de los cálculos de predicciones realizados en aquellos items sin calificación.
* `this.similarityMatrix`: Matriz de similitud entre los usuarios. Basada en la métrica empleada
* `this.neighborsPerUser`: Array de array de tipo `[[usuario, item, vecinos], ...]`. Almacena los vecinos más óptimos para cada item, especificando su usuario. Cabe destacar que `vecinos` contiene los vecinos óptimos.
* `this.calculatePredictions`: Array de array que almacenará los cálculos de predicción realizados.

  * En el caso de predicción simple, el formato es: `[[usuario, item, numerador, denominador, resultado], ...]`
  * En el caso de predicción basada en diferencia con la media, el formato es: `[[usuario, item, numerador, denominador, resultado, media del usuario], ...]`
  
* `this.neighbors`: Cantidad de vecinos a considerar. Mínimo debe de ser 3.
* `this.prediction`: Indica la predicción a emplear. `'1' = Predicción simple`, `'2' = Predicción basada en la diferencia con la media`
* `this.metrics`: Indica la métrica a emplear. `'1' = Correlación de Pearson`,` '2' = Distancia coseno`,` '3' = Distancia Euclídea`

[↑](#item0)

### **_Setters_**

Como ya se ha comentado, los valores pueden cambiar dinámicamente, es por ello que se han implementado una serie de setters que modifican los valores de los atributos:

* ```setMatrix(matrix)```: Establece la matriz de utilidad y reinicia los arrays en el caso en que se cambie la matriz de utilidad.
* ```setMetrics(metrics)```: Establece la métrica elegida.
* ```setNeighbors(neighbors)```: Establece la cantidad de usuarios a considerar.
* ```setPrediction(prediction)```: Establece el tipo de predicción a calcular.
* ```setSimilarityMatrix()```: Calcula y establece la matriz de similitud. A través de la matriz de utilidad calcula la relación que tiene cada usuario con el resto mediante la métrica de solicitud indicada. De esta manera obtenemos una matriz cuadrada con el valor de similitud entre los distintos usuarios.
* ```emptyNeighborsPerUser()```: Vacía el array de los vecinos más óptimos para cada item.
* ```emptyCalculatePredictions()```: Vacía el array de los cálculos de predicción realizados.

[↑](#item0)

### **_Getters_**

Asimismo, también contamos con una serie de getters que nos devuelven los valores de algunos atributos.

* ```getOriginalMatrix()```: Devuelve la matriz de utilidad.
* ```getSimilarityMatrix```: Devuelve la matriz de similitud.
* ```getTransformedMatrix()```: Devuelve la matriz de utilidad tras la calificación a través de la predicción.
* ```getNeighborsPerUser()```: Devuelve el array de vecinos de un usuario.
* ```getCalculatePredictions()```: Devuelve el array de cálculo de predicciones.
* ```getPrediction()```: Devuelve el tipo de predicción elegida.

[↑](#item0)

### **_Seleccionadores_**

Debido a que el usuario puede elegir las métricas o predicciones a usar, pues se han creado métodos para cumplir con estas funciones.

* ```similarity(user1, user2)```: Redirecciona a la métrica elegida, indicando los dos indices de los usuarios a analizar.
* ```selectPrediction(user, item)```: Redirecciona al tipo de predicción elegido, indicando los índices del usuario y el item a analizar.

[↑](#item0)

### **_Media de un usuario_**

```userAverage(user)```: Realizamos la media de los items de un usuario en la matriz de utilidad. Cabe destacar que aquellos items que no estén calificados, los obviaremos

[↑](#item0)

### **_Métricas de similitud_**

A continuación se mostrarán las distintas métricas que podemos emplear:

* #### **Correlación de Pearson: ** ```pearson(user1, user2)```

Recibimos los dos índices de los usuarios a analizar. En el resultado obtenemos un índice que puede utilizarse para medir el grado de relación de dos variables, siempre y cuando ambas sean cuantitativas y continuas.

Para ello, en primer lugar debemos de calcular la media de cada uno de los usuarios recibidos con el método ```userAverage(user)```. A continuación realizamos un bucle for que recorrerá la matriz de utilidad, teniendo en cuenta que las **calificaciones** que vayamos a emplear para la fórmula, deben haber sido calificadas por ambos usuarios previamente. La fórmula en cuestión es la siguiente:

![pearson1](./docs/media/pearson1.png)
![pearson2](./docs/media/pearson2.png)

* #### Distancia Coseno: ```cosine(user1, user2)```

Si dos vectores tienen exactamente la misma orientación (el ángulo que forman es 0) su coseno toma el valor de 1, si son perpendiculares (forman un ángulo de 90) su coseno es 0 y si tienen orientaciones opuestas (ángulo de 180) su coseno es de -1.

Tener en cuenta que realizamos un bucle for que recorrerá la matriz de utilidad, teniendo en cuenta que las **calificaciones** que vayamos a emplear para la fórmula, deben haber sido calificadas por ambos usuarios previamente. La fórmula en cuestión es la siguiente:

![cosine](./docs/media/cosine.png)

* #### **Distancia Euclídea: ** ```euclidean(user1, user2)```

Entre dos puntos p y q se define como la longitud del segmento que une ambos puntos. Puede generalizarse para un espacio Euclídeo n-dimensional.

Tener en cuenta que realizamos un bucle for que recorrerá la matriz de utilidad, teniendo en cuenta que las **calificaciones** que vayamos a emplear para la fórmula, deben haber sido calificadas por ambos usuarios previamente. La fórmula en cuestión es la siguiente:

![euclidean](./docs/media/euclidean.png)

[↑](#item0)

* ### Calcular vecinos más cercanos: ```getCloserNeighbors(user, item)``` 

Este método permite calcular los vecinos más cercanos de un usuario en función de la métrica de similitud. Esté método nos será útil a la hora de realizar los cálculos de predicciones, ya que necesitamos estos vecinos para los cálculos.

Primero calculamos todos los vecinos posibles de 'user' descartando aquellos que tengan un item sin calificar en la misma posición que 'user'.
```javascript
for (let i = 0; i < this.matrix.length; i++) {
            if (i != user && this.matrix[i][item] >= 0) {
                neighbors.push({
                    user: i,
                    similarity: this.similarityMatrix[user][i]
                });
            }
        }
```

Ahora ordenamos los vecinos por similitud. En Pearson o Distancia coseno, cuanto más grande sea el valor mejor, en Euclídea es a la inversa.

```javascript
if (this.metrics == '1' || this.metrics == '2') 
            neighbors.sort(function(a, b) { return b.similarity - a.similarity; });
        else 
            neighbors.sort(function(a, b) { return a.similarity - b.similarity; }); 
```

Elegimos la cantidad de vecinos próximos necesarias (this.neighbors).

```javascript
let result = [];
        for (let i = 0; i < this.neighbors; i++) 
            if (neighbors[i] != null) result.push(neighbors[i]);
```

Finalmente guardamos esos vecinos en nuestro array de vecinos por item, y retornamos el resultado

```javascript
this.neighborsPerUser.push([user, item, result]);
return result;
```

[↑](#item0)

* ### Predicción simple: ```simplePrediction(user, item)``` 

Permite calcular el valor desconocido de predicción simple utilizando las puntuaciones asignadas a los ítems i de los usuarios v más parecidos (vecinos más próximos).

Debemos obtener los vecinos más próximos mediante el método ```getCloserNeighbors(user, item)```, recorrerlos aplicando la fórmula:

![simple](./docs/media/simple.png)

Finalmente guardamos los cálculos en nuestro array de cálculos de predicciones y retornamos el resultado.

[↑](#item0)

* ### Predicción basada en la diferencia con la media: ```meanDifferencePrediction(user, item)``` 

Permite calcular el valor desconocido de predicción  basada en la diferencia con la media, utilizando las puntuaciones asignadas a los ítems i de los usuarios v más parecidos (vecinos más próximos).

Debemos obtener los vecinos más próximos mediante el método ```getCloserNeighbors(user, item)```, recorrerlos aplicando la fórmula:

![mean](./docs/media/mean.png)

Finalmente guardamos los cálculos en nuestro array de cálculos de predicciones y retornamos el resultado.

[↑](#item0)

* ### Matriz de utilidad con predicciones realizadas: ```transformMatrix()```

Método que transforma la matriz de utilidad, calificando aquellos items vacíos mediante las predicciones.

Primero realizamos una copia de nuestra matriz de utilidad y la denominamos ```transformedMatrix```. Ahora recorreremos la matriz de utilidad, y donde encontremos un item sin calificar (-1), aplicaremos la predicción.

Finalmente retornamos la matriz transformada.

[↑](#item0)

