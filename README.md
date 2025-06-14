# Каталог товаров / Product Catalog

Веб-приложение на Nuxt 3 для отображения каталога товаров с авторизацией и фильтрацией.

A Nuxt 3 web application for displaying a product catalog with authentication and filtering capabilities.

## Функциональность / Features

### Авторизация / Authentication

- Форма входа с использованием Fake Store API
- Сохранение токена в куки после успешной авторизации
- Middleware для защиты страниц

### Каталог товаров / Product Catalog

- Отображение списка товаров с изображениями, названиями и ценами
- Детальная страница товара с полным описанием
- Рейтинговая система товаров
- Адаптивный дизайн для всех устройств

### Фильтрация / Filtering

- Поиск по названию товара
- Фильтрация по категориям
- Мгновенное обновление результатов

## Технический стек / Tech Stack

- **Frontend Framework**: Nuxt 3
- **State Management**: Pinia
- **Styling**: TailwindCSS
- **API Integration**: Fake Store API
- **Loading States**: Vue Content Loader
- **Notifications**: Vue Toastification

## Особенности реализации / Implementation Details

- Composition API для управления логикой
- Адаптивный дизайн с использованием Tailwind breakpoints
- Skeleton-загрузчики для улучшения UX
- Lazy loading изображений
- Обработка ошибок на всех этапах
- Защита маршрутов через middleware

## Установка и запуск / Installation & Run

```bash
# Установка зависимостей / Install dependencies
npm install

# Разработка / Development
npm run dev

# Сборка / Build
npm run build
```

_Примечание: Это тестовое задание. Все изображения и контент используются исключительно в демонстрационных целях._
