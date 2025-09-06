# Jaqiaru Yatiri
### Un Diccionario Digital del Vocabulario Aymara de Ludovico Bertonio (1612)

Este proyecto, **Jaqiaru Yatiri** ("El que sabe la lengua de la gente"), implementa un pipeline de IA y Lingüística Computacional de código abierto para digitalizar el "Vocabulario de la lengua aymara" (1612) de Ludovico Bertonio y publicarlo como un diccionario web interactivo.

## Estructura del Repositorio

## Estructura del Repositorio

- **`/colab_notebooks`**: Contiene los notebooks de Google Colab para las fases de OCR y extracción de datos.
  - `01_ocr_pipeline.ipynb`: Script para procesar el PDF, aplicar preprocesamiento de imagen y extraer texto con Tesseract.
  - `02_data_extraction_with_langextract.ipynb`: Script para tomar el texto crudo y estructurarlo en formato JSONL usando un LLM.
- **`/data`**: Almacena los datos del proyecto.
  - `/source`: Lugar para el facsímil original en PDF.
  - `/processed`: Archivos generados por los pipelines (texto crudo, JSONL).
- **`/scripts`**: Scripts de Python para tareas de post-procesamiento.
  - `curate_and_finalize_json.py`: Limpia y convierte el archivo JSONL en el JSON final para el sitio web.
- **`/docs`**: Contiene el sitio web estático que se desplegará con GitHub Pages.
  - `index.html`: Estructura principal de la página.
  - `/data/data.json`: La base de datos final del diccionario.
  - `/css/style.css`: Estilos visuales.
  - `/js/main.js`: Lógica de la aplicación, incluyendo la búsqueda con Lunr.js.

## ¿Cómo Empezar?

1.  **Configurar el entorno**: Instala las dependencias de Python con `pip install -r requirements.txt`. Asegúrate de tener Tesseract OCR instalado en tu sistema.
2.  **Fase 1 (OCR)**: Coloca el PDF en `data/source/` y ejecuta el notebook `01_ocr_pipeline.ipynb`.
3.  **Fase 2 (Extracción)**: Ejecuta el notebook `02_data_extraction_with_langextract.ipynb` para procesar el texto crudo.
4.  **Fase 3 (Curación)**: Ejecuta el script `python scripts/curate_and_finalize_json.py` para generar el archivo `docs/data/data.json`.
5.  **Visualización**: Abre `docs/index.html` en tu navegador para ver el diccionario en acción.



bertonio_vocabulario.pdf
