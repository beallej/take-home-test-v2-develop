
## Avis Critique
L’application en general est assez clair, mais il manque un peu de rigeur côté api et uniformisation côté front.

### General:

Points Négatifs:

- souvent nommage pas correcte (ex variable nommé “recipe” dans ingredient controller)
- La commande clean-db ne fonctionne pas.

### Front:

Points positifs:

- Usage de React Query pour controle du validité du data (s’il est à jour ou pas)

Points négatifs:

- Mélange de usage de sx, css
- styling repeté ou pas consistent entre components
- Pas du control des bodys envoyé et récuperés du back
- Pas de UX pour la gestion des erreurs formulaire, ou des actions utilisateur
  - Ex. `alert("Please fill all the fields")` est efficace, mais pas très sympa comme gestion des erreurs formulaire, on pourrra envisager un message plus specifique montré en bas du bouton dans une manière moins violente.

### Api:

Points Positifs:

- Separation consistent du repository, controller

Points négatifs

- Besoin de plus de séparation du travail
    - Couches séparées des controllers, use cases, repositories. Là les appels repository sont trop mélangés avec la logique métier des différents use cases.
    - Difference du types DTO, métier, data objet, avec mappers.
- Pas de control des req.body —- le valeur est passé en tant que “any” aux controllers du coup le typage ne sert à rien
- Pas de control de la suppression des ingrédients — ça affecte quelles recipes ?
- Les put devraient être par /:id et pas tout le objet dans le body pour être plus RESTful
- Il y a plein de routes qui ne sont pas appelés, du coup on peut supprimer tout ce code.

J’ai commencé a mettre en place zod pour avoir plus de control sur les req.body côté api et resp.body côté front pour les recipes et ingredients, mais je n’ai pas fait tout l’application.
J’ai aussi commencé à séparer plus la logique api des “service” en use cases pour que les “services” font que des appels au repository et ne manipulent pas la logique métier, mais pareil ici je n’ai pas fait tout l’application.

J’ai ajouté un theme.js pour plus facilement manipuler le styles des composents MUI et les intégrer avec notre design system —- les variables css peuvent êtres directement utilisés là-dedans.
