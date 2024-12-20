# Revue du code par Quentin Degli-Esposti

## Points relevés

J'ai suivi le readme et j'ai réussi à lancer le projet.
Il manque juste la documentation API dans le ReadMe qui pourrait permettre plus de lisibilité, mais on la retrouve sur API Swagger

Attention lors de la création du .env à bien respecter la concordance des noms avec le docker-compose.yml

L'API est fonctionnelle et se lance, mais j'ai des erreurs dans la console: 

Cannot find module 'pg' or its corresponding type declarations.
Cannot find module 'dotenv' or its corresponding type declarations.
Cannot find name 'process'. Do you need to install type definitions for node? Try npm i --save-dev @types/node.
Cannot find name 'process'. Do you need to install type definitions for node? Try npm i --save-dev @types/node.
...

Adrien a fait toutes les tables du projet alors qu'on en demandait seulement 2, bravo!

Son projet est bien structuré, il a reproduit un modèle type de Symfony avec des controleurs, des services, des models et des routes.

j'ai reussi à tester les endpoints sur beers et breweries et c'est fonctionnel. Il faut bien être vigilant et tester avec la méthode Patch via Postman pour valider la requête pour modifier et bien faire attention à la structure du body sous forme de tableau (on retrouve toutes les infos sur la documentation)

L'ensemble est donc très cohérent et fonctionnel !!!