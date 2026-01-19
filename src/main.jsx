import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

/**
 * main.jsx - Точка входа React-приложения Connectum Pro v20.2 Platinum
 * --------------------------------------------------------
 * Этот файл отвечает за монтирование всего интерфейса в DOM-дерево
 * и обеспечивает работу React в строгом режиме для выявления ошибок.
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error("Критическая ошибка: Элемент #root не найден в index.html. Проверьте структуру public/index.html");
} else {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

// Глобальный обработчик ошибок для логирования в консоль Mini App
window.onerror = function (message, source, lineno, colno, error) {
    console.error(`🔴 App Crash: ${message} at ${source}:${lineno}`);
    return false;
};
