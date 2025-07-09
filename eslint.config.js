import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import nodePlugin from 'eslint-plugin-node';
import prettier from 'eslint-config-prettier';

export default [
  // Configuración base de JavaScript
  js.configs.recommended,

  // Configuración para archivos TypeScript y JavaScript
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      node: nodePlugin,
    },
    rules: {
      // Reglas recomendadas de TypeScript
      ...tseslint.configs.recommended.rules,
      // Reglas recomendadas de Node.js
      ...nodePlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Reglas de estilo
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // Reglas específicas para Node.js/Express
      'no-debugger': 'error',
    },
  },

  // Configuración específica para archivos de test
  {
    files: ['**/*.test.ts', '**/*.spec.ts', '**/tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Archivos a ignorar
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.js',
      'coverage/**',
      '.git/**',
    ],
  },

  // Configuración de Prettier (debe ir al final)
  prettier,
];
