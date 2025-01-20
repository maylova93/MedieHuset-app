import { useEffect, useState } from "react"; 

// Пользовательский хук usePost для выполнения POST-запросов
export function usePost({ url, body, token }) {
  const [data, setData] = useState(); // Состояние для хранения данных ответа
  const [error, setError] = useState(); // Состояние для ошибок
  const [isLoading, setIsLoading] = useState(); // Состояние загрузки

  useEffect(() => {
    setIsLoading(true); // Устанавливаем состояние загрузки в true перед запросом

    // Настройки для POST-запроса
    const options = {
      method: "POST", // Указываем метод запроса
      body: body, // Передаем тело запроса
      headers: token // Если токен передан, добавляем заголовок Authorization
        ? { Authorization: `Bearer ${token}` }
        : {}, // Если токен отсутствует, заголовки остаются пустыми
    };

    // Выполняем запрос с fetch
    fetch(url, options)
      .then((res) => res.json()) // Преобразуем ответ в JSON
      .then((data) => setData(data)) // Сохраняем данные в состояние
      .catch((err) => setError(err)) // В случае ошибки сохраняем сообщение об ошибке
      .finally(() => setIsLoading(false)); // Завершаем состояние загрузки
  }, [url, body]); // Хук useEffect будет запускаться при изменении url или body

  // Возвращаем объект с данными, ошибкой и состоянием загрузки
  return { data, error, isLoading };
}
