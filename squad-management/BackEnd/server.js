const app = require('./app');
const User = require('./Models/Users');
const Event = require('./Models/Events');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await User.createTable();
    await Event.createTable();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      console.log(`API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}
