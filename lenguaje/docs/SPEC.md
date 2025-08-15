
# H4XLang — Especificación (resumen inicial)

> Estado: borrador público (v0.1). Este documento define principios y un MVP de 90 días.

## 1. Principios de diseño
- **Seguridad por diseño**: propiedad de memoria, tipos lineales y control de efectos.
- **TCB pequeño**: runtime mínimo, preferentemente sin GC en el núcleo.
- **Verificable**: contratos y anotaciones formales ligeras con soporte opcional de SMT.
- **Interoperable**: Wasm/LLVM como targets. FFI con C y SDKs para TypeScript/Python.
- **Experiencia DX**: CLI simple (`build/test/verify`), plantillas, plugin de editor.

## 2. Sistema de tipos
### 2.1. Ownership y tipos lineales
- Cada valor tiene un propietario único.
- Los tipos lineales (p. ej., `asset Coin`) **no** pueden duplicarse ni descartarse sin `consume`.
- Movimiento explícito garantiza ausencia de *use-after-free* y *double free*.

### 2.2. Capacidades (capabilities)
- Representan permisos de acciones sensibles (mover activos, I/O, red).
- Las funciones declaran `requires Capability` para ejecutarse.

### 2.3. Efectos
- Firmas con anotaciones `pure`, `io`, `net`, etc.
- El verificador de efectos impide elevar privilegios sin cheques en compile-time.

## 3. Modelo de memoria y runtime
- Asignación estática + regiones; opcional heap con allocador verificado.
- Medidas de CFI, ASLR friendly y *stack canaries* en modo nativo.
- Sin *undefined behavior* expuesto al usuario.

## 4. Targets y FFI
- **Wasm** (MVP): sandbox fuerte, portable (web/edge/server). ABI documentada.
- **LLVM**: rendimiento nativo. Flags de seguridad activadas por defecto.
- **FFI**: puente seguro con C; generadores de bindings a TS/Python.

## 5. Seguridad y verificación
- Librería cripto constante en tiempo; sin *footguns*.
- Especificaciones ligeras en el código: pre/post/invariantes.
- Soporte a SMT (Z3) en CI para módulos marcados `@verify`.

## 6. Toolchain
- CLI: `h4x build`, `h4x test`, `h4x verify`.
- Builds reproducibles y firma de artefactos (SBOM incluido).
- Registro de paquetes con sello **Verified** (análisis SAST + verificación).

## 7. Roadmap 90 días
- Semanas 1–2: gramática (EBNF), AST, diseño stdlib.
- Semanas 3–6: parser, type-checker (ownership/efectos), backend Wasm MVP.
- Semanas 7–9: cripto básica, FFI C, reproducible builds.
- Semanas 10–12: verificador SMT ligero, registro de paquetes (alpha), plugin VSCode.

## 8. Licenciamiento y negocio
- Núcleo OSS (Apache-2.0/MIT); servicios Pro (cloud build/verify) y Enterprise (SLA, soporte, hardening).
- Sello **Verified** para paquetes: revisión automatizada + reporte.

## 9. Criterios de seguridad de salida
- 0 *use-after-free* en pruebas del stdlib.
- 0 UB en conjuntos de tests canónicos.
- FFI con pruebas de límite (fuzz) y cobertura >90% en runtime.
