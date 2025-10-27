import app from "./app";
import { env } from "./utils/env";

const port = env.port;

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
