import json

# Rutas de los archivos de entrada y salida
input_jsonl_path = 'data/processed/extracted_data.jsonl'
output_json_path = 'docs/data/data.json'

def clean_entry(entry):
    """
    Aplica reglas de limpieza a una entrada del diccionario.
    Esta es una función de ejemplo. Deberás adaptarla a tus necesidades.
    """
    if not isinstance(entry, dict):
        return None

    # Eliminar espacios en blanco sobrantes
    for key, value in entry.items():
        if isinstance(value, str):
            entry[key] = value.strip()
    
    # Ejemplo: Normalizar el campo 'part_of_speech' a minúsculas
    if 'part_of_speech' in entry and entry['part_of_speech']:
        entry['part_of_speech'] = entry['part_of_speech'].lower().replace('.', '')

    return entry

def main():
    """
    Lee el archivo JSONL, limpia cada entrada y lo guarda como un único archivo JSON.
    """
    print(f"🔄 Procesando {input_jsonl_path}...")
    
    final_dictionary = []
    try:
        with open(input_jsonl_path, 'r', encoding='utf-8') as f_in:
            for line in f_in:
                if line.strip():
                    try:
                        data = json.loads(line)
                        cleaned_data = clean_entry(data)
                        if cleaned_data:
                            final_dictionary.append(cleaned_data)
                    except json.JSONDecodeError:
                        print(f"⚠️ Se omitió una línea mal formada: {line.strip()}")
    except FileNotFoundError:
        print(f"❌ Error: El archivo de entrada '{input_jsonl_path}' no fue encontrado.")
        print("Asegúrate de haber completado la fase de extracción de datos primero.")
        return

    print(f"💾 Guardando {len(final_dictionary)} entradas en {output_json_path}...")
    
    with open(output_json_path, 'w', encoding='utf-8') as f_out:
        json.dump(final_dictionary, f_out, indent=2, ensure_ascii=False)
        
    print("✅ Proceso de curación y finalización completado.")

if __name__ == "__main__":
    main()
