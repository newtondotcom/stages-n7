# stages-n7

Créé une pull request pour chaque étape.

1. Use server actions instead of  api since all routes will be used from inside the app, to ensure that the user is authenticated and authorized to access the data.
2. Affiche tous les textes en francais.
3. Ajoute un type de stage : 1A, 2A, 3A ou césure.
4. L'authentification ne marche pas car le middleware ne reconnait pas quand l'utilisateur est connecté.
