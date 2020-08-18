const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();
let likes = 0;

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const id = uuid();

  const repository = {id, title, url, techs, likes};

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  
  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({error: "Repository not found"});
  }

  const repository = {
    id,
    title: request.body.title,
    url: request.body.url,
    techs: request.body.techs,
    likes    
  }

  repositories[repoIndex] = repository;

  return response.status(200).json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({error: "Repository not found"})
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({error: "Repository not found"});
  }

  const likes = ++repositories[repoIndex].likes;


  return response.json(repositories[repoIndex]);

});

module.exports = app;