import { env } from "./config/env.config";
import { app } from "./infrastructure/http/app";

app.listen(env.PORT, () => {
  console.log(`Gateway & Users runing on port ${env.PORT}`);
});
