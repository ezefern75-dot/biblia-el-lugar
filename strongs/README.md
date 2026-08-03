# El Lugar · Diccionario Strong's Enriquecido

**Versión:** 1.2.0  
**Fecha:** 2026-08-01  
**Prioridad:** Fidedignidad académica.

## Origen de los datos

- **Fuente principal**: STEPBible TBESH (hebreo/arameo) y TBESG (griego)  
  Licencia: **CC BY 4.0**  
  Origen: Tyndale House Cambridge / STEPBible.org  
  Repositorio oficial: https://github.com/STEPBible/STEPBible-Data

- Las definiciones hebreas se basan en el BDB abridged (Online Bible / Tyndale).  
- Las definiciones griegas se basan principalmente en Abbott-Smith (con correcciones Tyndale).

**Importante**: No redistribuir los archivos crudos TBESH/TBESG. Apuntar siempre al repositorio oficial de STEPBible. Este diccionario es una reconstrucción estructurada para uso en la aplicación *El Lugar · Biblia*.

## Archivos

| Archivo | Descripción | Entradas |
|---------|-------------|----------|
| `strongs-hebrew.json` | Hebreo + Arameo (H0001–H…) | ~8 723 |
| `strongs-greek.json` | Griego (G0001–G…) | ~10 847 |
| `meta.json` | Metadatos, licencia, esquema | — |
| `sample-*.json` | Muestras legibles | — |

## Esquema de cada entrada

```json
{
  "strong": "H0001",
  "lemma": "אָב",
  "translit": "av",
  "pos": "H:N-M",
  "gloss": "father",
  "definition": "1) father of an individual\n2) of God as father...",
  "lang": "he",
  "lxx_equivalents": ["G3962"],
  "cognates": [],
  "key_verses": [],
  "sources": ["STEPBible TBESH CC-BY-4.0"]
}
```

- `lxx_equivalents` / `hebrew_equivalents`: solo se rellenan cuando la equivalencia está documentada (principalmente vía LXX).  
  Actualmente hay un conjunto inicial de altas frecuencias; se ampliará con datos CATSS/Tov alineados.
- `cognates` y `key_verses`: reservados para enriquecimiento futuro (siempre con fuente).

## Qué NO se incluye (aún)

- Texto completo de HALOT o BDAG (obras comerciales con copyright).
- Etimologías especulativas no respaldadas.
- Equivalencias LXX inventadas o poco frecuentes sin justificación.

## Próximos pasos planeados

1. Ampliar `lxx_equivalents` con frecuencias reales de alineaciones abiertas.
2. Añadir glosas en español cuidadas (basadas en RVR1960 + revisión).
3. Incorporar raíces y familias semánticas documentadas.
4. Integrar en el cargador de `index.html` de *El Lugar · Biblia*.
5. Versionado semántico y changelog.

## Uso en la App

Cargar de forma asíncrona:

```js
const he = await fetch('strongs/strongs-hebrew.json').then(r => r.json());
const gr = await fetch('strongs/strongs-greek.json').then(r => r.json());
function lookup(code) {
  if (code.startsWith('H')) return he[code];
  if (code.startsWith('G')) return gr[code];
  return null;
}
```

## Atribución obligatoria

> Datos léxicos: STEPBible.org (basado en trabajo de Tyndale House Cambridge), licencia CC BY 4.0.  
> Reconstrucción estructurada para El Lugar · Biblia.

---

*Construido con el criterio: mejor menos y fidedigno que mucho e inexacto.*


## Changelog
- **1.2.0** — Integrado en la App (carga asíncrona dual + render compatible).
- **1.1.0-alpha** — Cognados + LXX + glosas ES.
- **1.0.0-alpha** — Base STEPBible.


## Política de contenido

Este diccionario **no incluye** material cabalístico, gematría, sefirot ni interpretaciones místicas.
Las familias de raíces hebreas son estrictamente **filológicas** (shoresh compartido según la lexicografía bíblica académica).
