import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f7f7f7;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .expense-item {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
  }

  .expense-filter {
    display: flex;
    justify-content: center;
    margin: 20px auto;
    max-width: 600px;
    gap: 10px;
  }

  .expense-filter button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .expense-filter button.active {
    background-color: #0056b3;
  }

  .expense-filter button:hover {
    background-color: #0056b3;
  }

  .expense-filter button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  .vencida {
    color: red;
  }
`;
