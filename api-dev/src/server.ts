import app from "./app";
import { Logger } from "./logger";

app.listen(3001, () => {
  Logger.info(`Server started on port 3001`);
});
