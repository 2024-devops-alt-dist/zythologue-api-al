# API - Zythologue

Cette application est une API réalisée à l'aide de node.js, du framework express, de typescript et de postgresql. Il s'agit d'une application présentant des bières et brasseries, et permettant à des utilisateurs de noter et commenter les bières.

## Installation

Prérequis nécessaire à l'installation du projet:
* [Node.js](https://nodejs.org/fr)
* [Docker](https://www.docker.com/)
* [DBeaver](https://dbeaver.io/) (ou autre SGBDR)

Cloner le projet:
```
$ git clone https://github.com/2024-devops-alt-dist/zythologue-api-al.git
```

* Installer les dépendances en locale (optionnel):
```
npm install
```

* Créer un fichier .env à la racine du projet basé sur le fichier .env.template, puis ajouter les valeurs aux variables d'environnement :
```
DB_HOST=db
DB_PORT=port de la base de données
DB_NAME=nom de la base de données
DB_USER=nom de l'utilisateur
DB_PASSWORD=mot de passe
SERVER_PORT=port du serveur
```

* Exécuter la commande suivante pour créer et lancer les conteneurs de la base de données et de l'API nodeJs:
```
$ docker compose up --build
```

## Documentation 

La documentation de l'API est disponible sur la route /api/docs.
