const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const likes = 0;

  const repository = {id: uuid(), title, url, techs, likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find((r) => r.id === id);

  if(!repository){
    return response.status(400).json({"Error": "There is no repository with this id."});
  }

  repositories.forEach(rep => {
    if(rep.id === id){
      if(title){
        rep.title = title;
      }

      if(url){
        rep.url = url;
      }

      if(techs){
        rep.techs = techs;
      }
    }
  });

  const repositoryUpdated = repositories.find((r) => r.id === id);

  return response.status(200).json(repositoryUpdated);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((r) => r.id === id);

  if(!repository){
    return response.status(400).json({"Error": "There is no repository with this id."});
  }

  for (let index = 0; index < repositories.length; index++) {
    const element = repositories[index];
    
    if(element.id === id){
      repositories.splice(index,1);
      break;
    }
  }
  
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find((r) => r.id === id);

  if(!repository){
    return response.status(400).json({"Error": "There is no repository with this id."});
  }

  repositories.forEach(rep => {
    rep.likes++;
  });

  const repositoryUpdated = repositories.find((r) => r.id === id);

  return response.status(200).json(repositoryUpdated);
});

module.exports = app;
