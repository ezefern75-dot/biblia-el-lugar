import os

# 1. Coloca este script en la carpeta donde tienes tus JSON
# 2. Ejecútalo en la terminal de VS Code con: python organizador_biblias.py

def renombrar_archivos():
    archivos = [f for f in os.listdir('.') if f.endswith('.json')]
    print("--- Iniciando organización de archivos ---")
    
    for archivo in archivos:
        # Ejemplo: Si el archivo se llama "1-Genesis.json", lo limpia
        # Aquí puedes ajustar la lógica según como los tengas ahora
        nombre_limpio = archivo.replace(".json", "").strip()
        
        # El script espera que el usuario separe RVR y Kadosh manualmente en carpetas
        # o que el nombre contenga la versión.
        print(f"Detectado: {archivo}")

print("Script listo. Asegúrate de que tus archivos coincidan con la lista de la App.")