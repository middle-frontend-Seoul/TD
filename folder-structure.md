## Структура папок проекта

```
|-dist
|-src
|--api (или services)
|--assets
|--components
|--components-ui
|--core
|--network
|--pages
|--redux
|--utils
|--constants.ts
|--index.html
|--index.tsx
|--polyfill.ts
|--types.d.ts
|--vars.scss
```

### api
Высокоуровневые реализации методов api.
Например, в auth-api.ts будут методы signin, signup и тд

Также здесь будет папка models, в которой будут описаны типы dto с бекенда и классы, которые преобразуют dto в объекты нашего приложения.

```
|--api
|---models
|----auth.ts - модели dto
|---auth-api.ts - высокоуровневые методы api
```

Пример getCurrentUser из auth-api:
```js
export const authApi = {
    getCurrentUser: async () => {
        const response = await axiosGet('/api/v1/user');
        return new Auth.CurrentUserInfo(response.data.body);
    }
}
```

Пример модели CurrentUserInfo из auth.ts
```js
export interface CurrentUserDto {
  id: number;
  login: string;
}

export class CurrentUserInfo {
  id: number;
  login: string;

  constructor(dto: CurrentUserDto) {
    this.id = dto.id;
    this.login = dto.login;
  }
}
```

### assets
Складываем различные картинки, иконки и тд

### components
Достаточно крупные компоненты, из которых составляются экраны (pages)

### components-ui
Мелкие, часто переиспользуемые компоненты (например Button, Input).
```
|--components-ui
|---button
|----button.tsx
|----button.scss
|----index.ts
```

### core
Основной компонент приложения в подпапке App, а также блок с роутами AppRoutes, приватный роут PrivateRoute
```
|--core
|---app
|----app.tsx
|----app.scss
|----app-routes.tsx
|----index.ts
|---private-route
```

### network
Файл http.ts с реализацией низкоуровневых методов get, post, put, delete на основе fetch или axios (удобно, чтобы остальная часть приложения не зависела от используемой библиотеки)
```
|--network
|---http.ts
```
Пример axiosGet из http.ts:
```js
export async function axiosGet(url, headers) {
    const allHeaders = { 'Content-Type': 'application/json', ...headers };
    try {
        const response = await axios.get(url, { headers: allHeaders });
        const responseError = checkResponseError(response);
        if (!responseError) {
            return response;
        }
        throw responseError;
    } catch {
        // обработка ошибки
    }
}
```

### pages
Компоненты-страницы (то-есть те и только те, на которые ведут роуты)
```
|--pages
|---leaderboard-page
|----leaderboard-page.tsx
|----leaderboard-page.scss
|----index.ts
```

### redux
Здесь будут actions, reducers, sagas и все, связанное с redux

### utils
Файлы с утилитами, например format.ts (форматирование дат, строк), customsHooks.ts с кастомными хуками, helpers.ts (неспецифичными для конкретного компонента/цели хелперами) и т.д.

### отдельные файлы в папке src
index.tsx - точка входа

index.html - шаблон

constants.ts - константы

types.d.ts - типы, которые неудобно держать в конкретной папке/компоненте

vars.scss - переменные препроцессора стилей

polyfill.ts - полифилы (если нужны будут)
