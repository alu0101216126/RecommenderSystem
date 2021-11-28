# RecommenderSystem

#### Autor: Daniel Álvarez Medina
#### Correo: alu0101216126@ull.edu.es
#### [Acceda al sistema de recomendación](https://alu0101216126.github.io/RecommenderSystem/)

## Índice

* [Introducción](#item1)
* [Directorios](#item2)
* [Instrucciones](#item3)

<a name="item1"></a>
## 1. Introducción

Implementación de un sistema de recomendación siguiendo el sistema de filtrado colaborativo.

La práctica se ha llevado a cabo en el lenguaje **Javascript**. A su vez, la pedida de datos la hemos realizado en HTML y procesado posteriormente en Javascript.
Cabe destacar que para dar estilo al HTML, empleamos hojas de estilo **CSS**, y también las proporcionadas por el framework de CSS [Materialize](https://materializecss.com).

<a name="item2"></a>
## 2. Directorios

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

<a name="item3"></a>
## 3. Instrucciones

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

Un ejemplo de ejecución sería el siguiente:

<p align="center">
 <a href="https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/media/formExample.gif">
  <img src="./docs/media/formExample.gif" style="max-width:100%; width: 150%">
 </a>
</p>

<a name="item4"></a>
## 4. Descripción del código

### 4.1. index.html

El fichero [index.html](https://github.com/alu0101216126/RecommenderSystem/blob/main/docs/index.html), contiene el formulario a rellenar por parte del usuario, donde posteriormente será analizado.




