
import axios from 'axios';

const API_URL = 'https://5000-${REPL_SLUG}-${REPL_OWNER}.${REPL_SLUG}.repl.co';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
