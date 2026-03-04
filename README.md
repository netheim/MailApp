# Parcel Order App

Минимальное приложение на Next.js (App Router) + TypeScript + Tailwind CSS.

## Быстрый старт

1. Установите зависимости:
```bash
npm install
# или
yarn
```

2. Запустите проект в режиме разработки:
```bash
npm run dev
# или
yarn dev
```

3. Откройте http://localhost:3000

## Структура

- `app/` — маршруты (главная форма, список заказов, детали)
- `components/` — компоненты формы, диалог, карточки
- `lib/storage.ts` — работа с localStorage
- `utils/validators.ts` — zod-схемы валидации
- `types/` — TypeScript типы

Данные сохраняются в localStorage. Кастомные диалоги реализованы без alert/confirm.