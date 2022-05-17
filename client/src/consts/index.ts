export const API_BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "https://test-task-superkassa.herokuapp.com/api";
export const WS_API_URL = process.env.NODE_ENV === "development" ? "ws://localhost:3001" : "wss://test-task-superkassa.herokuapp.com";