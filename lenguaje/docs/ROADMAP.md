# Roadmap — H4XLang

## Fase 0 — Fundamentos (1 semana)
Objetivo: alinear visión y cerrar decisiones “difíciles”.
- Decisiones: nombre final, licencia, targets iniciales, filosofía DX.
- Entregables: SPEC v0.1 cerrada, arquitectura del compilador, repos creados.
- Éxito: consenso en 1–2 reuniones.

## Fase 1 — Núcleo del lenguaje (Semanas 1–2)
Objetivo: gramática y semántica mínima.
- Entregables: EBNF, AST, resolución de símbolos, tipos primitivos.
- Éxito: parsea y type-check de “hola mundo” + funciones puras.

## Fase 2 — Seguridad de memoria (Semanas 3–4)
Objetivo: ownership y tipos lineales (assets).
- Entregables: borrow checker, consume/move.
- Éxito: 0 use-after-free y 0 double free en ejemplos.

## Fase 3 — Backend Wasm (Semanas 5–6)
Objetivo: ejecutar en sandbox.
- Entregables: generador Wasm, ABI mínima, CLI básica.
- Éxito: demo ejecutando funciones puras y módulo con I/O controlado.

## Fase 4 — Stdlib mínima + FFI C (Semanas 7–8)
Objetivo: ser útil rápido e interoperable.
- Entregables: colecciones, tiempo, crypto mínima; FFI C.
- Éxito: ejemplo real integrándose con lib C sin inseguridades.

## Fase 5 — Verificación ligera + CI (Semanas 9–10)
Objetivo: garantías automáticas.
- Entregables: requires/ensures/invariant, verificador SMT, builds reproducibles.
- Éxito: módulo con @verify pasa en CI.

## Fase 6 — Experiencia de desarrollador (Semanas 11–12)
Objetivo: que apetezca usarlo.
- Entregables: extensión VSCode, docs “Primeros 60 min”.
- Éxito: usuario externo compila y corre en <60 min.

## Fase 7 — Beta pública (Mes 4–6)
Objetivo: uso por fuera del círculo interno.
- Entregables: bindings TS/Python, fuzzing, benchmarks.
- Éxito: 100+ ⭐️, 10 issues externos útiles.

## Fase 8 — Control de efectos y capabilities (Mes 6–9)
Objetivo: seguridad operacional.
- Entregables: efectos, capabilities, políticas.
- Éxito: servicio real pasa auditoría.

## Fase 9 — Ecosistema y registro (Mes 9–12)
Objetivo: paquetes reutilizables.
- Entregables: registro de paquetes, sello Verified.
- Éxito: 50 paquetes, 10 Verified.

## Fase 10 — Monetización (Mes 12+)
Objetivo: ingresos sin fricción.
- Entregables: Cloud Build/Verify, soporte Enterprise.
- Éxito: 2–3 clientes piloto, MRR inicial.
