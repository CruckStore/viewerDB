import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import fs from "fs";
import readline from "readline";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 4000;
const sqlFilePath = path.resolve(__dirname, "..", "dump.sql");

app.use(cors());

const searchHandler: RequestHandler = (req, res, next) => {
  const query = req.query.q;
  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "Paramètre q (string) requis" });
    return;
  }

  const results: string[] = [];
  const stream = fs.createReadStream(sqlFilePath, { encoding: "utf8" });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  rl.on("line", (line) => {
    if (line.includes(query)) {
      results.push(line);
      if (results.length >= 100) rl.close();
    }
  });

  rl.on("close", () => {
    res.json(results);
  });

  rl.on("error", (err) => {
    next(err);
  });
};

app.get("/api/search", searchHandler);

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
