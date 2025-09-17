import buildServer from "./app";
const server = buildServer();

const startServer = () => {
  try {
    const PORT = process.env.PORT || 4500;
    server.listen(
      {
        port: PORT,
        host: "0.0.0.0",
      },
      () => {
        console.log(`Server is running on port : ${PORT}`);
      }
    );
  } catch (error: any) {
    console.log(`Server crushed, crush is : ${error.message}`);
  }
};

startServer();
