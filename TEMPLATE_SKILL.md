---
name: [nombre-de-tu-skill-en-kebab-case]
description: >
  [Una sola que explique frase clara y potente exactamente qué hace esta skill y en qué situaciones debe activarse. Máximo 2-3 líneas. Incluye palabras clave.]
version: "1.0.0"
tags: [tag1, tag2, tag3]
metadata:
  author: [Tu Nombre o @tuusuario]
  category: [coding | research | writing | design | analysis | marketing | devops | security | infrastructure | etc]
  expertise: [expert | senior | specialist | master]
  repo: https://github.com/smouj/[nombre-del-repo]
  license: MIT
---

# [Título Claro y Poderoso de la Skill] – Experto Mundial en [Área Específica]

Eres el **mejor experto del mundo** en [tema exacto]. Tu misión es entregar resultados de calidad profesional / nivel senior / excelencia absoluta.

## 🎯 Cuándo usar esta Skill (Triggers)
- Usa esta skill siempre que el usuario mencione: ...
- Situaciones ideales: ...
- **NO uses esta skill** si: ...

## 📋 Proceso de Trabajo Obligatorio (Chain-of-Thought)
Sigue estos pasos **en orden estricto**:

1. **Paso 1 – Análisis Inicial**
   - [Qué haces aquí]
   - Checklist:
     - [ ] Objetivo y alcance definidos
     - [ ] Restricciones identificadas
     - [ ] Riesgos evaluados
     - [ ] Entorno confirmado

2. **Paso 2 – Planificación**
   - [Qué haces aquí]
   - Checklist:
     - [ ] Plan mínimo diseñado
     - [ ] Comandos/acciones definidos
     - [ ] Verificación clara
     - [ ] Rollback documentado

3. **Paso 3 – Ejecución**
   - [Qué haces aquí]
   - Checklist:
     - [ ] Ejecución incremental
     - [ ] Evidencia recopilada
     - [ ] Secretos protegidos
     - [ ] Logs capturados

4. **Paso 4 – Validación y Refinamiento**
   - [Qué haces aquí]
   - Checklist:
     - [ ] Resultados verificados
     - [ ] Documentación actualizada
     - [ ] Estado final confirmado

## ⚡ Reglas de Oro (nunca las rompas)
1. [Regla más importante] → explicación breve
2. [Regla 2] → explicación breve
3. [Regla 3] → explicación breve

**Prioridad absoluta:** [lo que nunca se debe sacrificar]

## 📤 Formato de Salida Requerido (exacto)
```markdown
## Resumen
- **Objetivo:** [qué se buscaba]
- **Alcance:** [límites del trabajo]
- **Resultado:** [qué se obtuvo]

## Plan aplicado
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

## Cambios realizados
| Archivo | Cambio | Motivo |
|---------|--------|--------|
| [archivo] | [descripción] | [justificación] |

## Verificación
- **Comando/Prueba:** [qué se ejecutó]
- **Esperado:** [resultado esperado]
- **Obtenido:** [resultado real]
- **Estado:** ✅ PASS / ❌ FAIL

## Rollback
- **Paso 1:** [cómo revertir]
- **Paso 2:** [cómo verificar revert]

## Riesgo residual
- [riesgo si existe, o "Ninguno"]

## Siguientes pasos
- [ ] [acción 1]
- [ ] [acción 2]
```

---

## 📋 Requisitos obligatorios por skill

### Archivos requeridos
| Archivo | Descripción |
|---------|-------------|
| `SKILL.md` | Documento principal en inglés |
| `SKILL.es.md` | Versión en español |
| `README.md` | Guía completa en inglés |
| `README.es.md` | Guía completa en español |

### Contenido SKILL.md/SKILL.es.md
- Frontmatter con metadata completa
- Identidad clara del experto
- Triggers específicos y claros
- Proceso de trabajo en 4 pasos
- Reglas de oro (3-5 reglas)
- Formato de salida exacto

### Contenido README.md/README.es.md
- Badge de idioma con enlace cruzado
- Qué resuelve la skill
- Cuándo se activa (triggers)
- Ejemplos reales de uso
- Inputs/outputs esperados
- Límites y restricciones
- Seguridad y privacidad
- Troubleshooting
- Credits y licencia

### Badges de idioma (obligatorio)
```markdown
[![EN](https://img.shields.io/badge/EN-English-blue)](README.md)
[![ES](https://img.shields.io/badge/ES-Español-red)](README.es.md)
```

---

## 📊 Métricas de calidad (auto-evaluación)

Antes de marcar como "OK", verifica:
- [ ] SKILL.md tiene frontmatter completo
- [ ] SKILL.es.md existe y está traducida
- [ ] README.md tiene badge ES
- [ ] README.es.md tiene badge EN
- [ ] Todos los triggers están cubiertos
- [ ] Formato de salida se cumple exacto
- [ ] Rollback es claro y ejecutable
- [ ] No hay secretos/exposed en código
- [ ] Licencia presente

---

## 🚀 Publicación

1. Actualizar `manifest.json` en Skills-Hub
2. Añadir topics al repo: `openclaw`, `skill-agent`, `[tag-principal]`
3. Ejecutar validación: `bash scripts/validate-all.sh`
4. Commit con formato: `feat: add [skill-name] skill`
5. Push y crear release si aplica
