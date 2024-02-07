export const PORT = 8080;
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
const dbName = process.env.DB_NAME;

export const environment = {
  development: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: `mongodb+srv://eugeniucozac:Mymail1986!@taskmanager.gpkpo9x.mongodb.net/?retryWrites=true&w=majority`,
  },
};
