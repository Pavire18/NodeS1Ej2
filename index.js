const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const PORT = 3000;
const server = express();
const router = express.Router();
const pilotosFilePath = "./pilotos.json";

// Configuración del server
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(bodyParser.json());

router.get("/", (req, res) => {
  fs.readFile("./templates/fichero.html", "utf-8", (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      console.log("Funciona");
      res.set("Content-Type", "text/html");
      res.send(data);
    }
  });
});

router.get("/f1-driver", (req, res) => {
  fs.readFile(pilotosFilePath, (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      const pokemons = JSON.parse(data);
      res.json(pokemons);
    }
  });
});

router.get("/f1-driver/:id", (req, res) => {
  fs.readFile(pilotosFilePath, (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      const id = parseInt(req.params.id);
      const pilotos = JSON.parse(data);
      const piloto = pilotos.find((piloto) => piloto.id === id);

      if (piloto) {
        res.json(piloto);
      } else {
        res.status(404).send("Pokemon con encontrado.");
      }
    }
  });
});

server.post("/f1-driver", (req, res) => {
  fs.readFile(pilotosFilePath, (error, data) => {
    if (error) {
      res.status(500).send("Error inesperado");
    } else {
      const pilotos = JSON.parse(data);
      const newPiloto = req.body;
      const lastId = pilotos[pilotos.length - 1].id;
      newPiloto.id = lastId + 1;
      pilotos.push(newPiloto);

      // Guardamos fichero
      fs.writeFile(pilotosFilePath, JSON.stringify(pilotos), (error) => {
        if (error) {
          res.status(500).send("Error inesperado");
        } else {
          res.json(newPiloto);
        }
      });
    }
  });
});

server.use("/", router);

server.listen(PORT, () => {
  console.log(`Servidor está levantado y escuchando en el puerto ${PORT}`);
});
