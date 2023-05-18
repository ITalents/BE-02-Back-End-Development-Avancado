import { init } from "./app";

init().then((app) => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running in port: ${port}`));
});
