# Configuración de ESLint y Prettier

Este proyecto está configurado con ESLint v9 y Prettier para mantener un código consistente y de alta calidad.

## 📋 Configuración incluida

### ESLint v9

- **Archivo de configuración**: `eslint.config.js` (formato flat config)
- **Parser**: `@typescript-eslint/parser`
- **Plugin**: `@typescript-eslint/eslint-plugin`
- **Integración con Prettier**: `eslint-config-prettier`

### Prettier

- **Archivo de configuración**: `.prettierrc`
- **Archivos ignorados**: `.prettierignore`

### VS Code

- **Configuración del editor**: `.vscode/settings.json`
- **Formateo automático al guardar**
- **Arreglo automático de ESLint al guardar**

## 🚀 Scripts disponibles

```bash
# Ejecutar ESLint para verificar problemas
npm run lint

# Ejecutar ESLint y arreglar problemas automáticamente
npm run lint:fix

# Formatear archivos con Prettier
npm run format

# Verificar formato sin modificar archivos
npm run format:check

# Verificar tanto lint como formato
npm run check

# Arreglar tanto lint como formato
npm run fix
```

## 🔧 Uso básico

### Para verificar tu código:

```bash
npm run check
```

### Para arreglar problemas automáticamente:

```bash
npm run fix
```

### Para formatear todo el código:

```bash
npm run format
```

## 📁 Archivos ignorados

ESLint y Prettier están configurados para ignorar:

- `node_modules/`
- `dist/`
- `build/`
- `coverage/`
- Archivos de log
- Archivos de configuración de dependencias

## ⚙️ Reglas principales

### ESLint

- Uso obligatorio de `const` cuando sea posible
- Prohibido usar `var`
- Warnings para `console.log` (excepto en tests)
- Error para `debugger`
- Configuración específica para TypeScript

### Prettier

- Comillas simples
- Punto y coma obligatorio
- Ancho de línea: 80 caracteres
- Indentación: 2 espacios
- Comas al final en objetos ES5

## 🔌 Extensiones recomendadas para VS Code

1. **ESLint** (`dbaeumer.vscode-eslint`)
2. **Prettier** (`esbenp.prettier-vscode`)

## 🛠️ Solución de problemas

Si encuentras errores, ejecuta:

```bash
# Instalar dependencias faltantes
npm install

# Verificar configuración
npm run lint

# Si hay problemas de formato, ejecutar
npm run format
```

## 📝 Personalización

Puedes modificar las reglas editando:

- `eslint.config.js` para reglas de ESLint
- `.prettierrc` para configuración de Prettier

---

_Configuración creada para proyecto TypeScript + Node.js + Express + TypeORM_
