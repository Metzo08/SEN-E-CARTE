# PROJET - sen-e-carte-saas

| Champ | Valeur |
|---|---|
| Client | <nom / interne> |
| Type | <web / mobile / SaaS / IoT / BTP / ...> |
| Cree le | <jj/mm/aaaa> |
| CDC | cahier-des-charges/CDC-VALIDE.md |
| Equipe | <agents mobilises> |

## Etat du pipeline

| Etape | Statut | Preuve |
|---|---|---|
| 0. CDC valide | A FAIRE | scripts\verifier-cdc.ps1 -Projet sen-e-carte-saas |
| 1. Cadrage | A FAIRE | rapports/jalon/ |
| 2. Conception | A FAIRE | rapports/jalon/ |
| 3. Developpement | A FAIRE | scripts\verifier-jalon.ps1 -Etape developpement |
| 4. Qualite/securite | A FAIRE | scripts\verifier-jalon.ps1 -Etape qualite |
| 5. Preproduction | A FAIRE | preuves/ (rollback teste) |
| 6. Recette/livraison | A FAIRE | scripts\verifier-livraison.ps1 -Projet sen-e-carte-saas |

## Regles de ce dossier

1. Aucun fichier dans src/ avant STATUT CDC: VALIDE (porte 0).
2. Toute memoire (decisions, incidents...) est dans memoire/ de CE dossier.
3. Jamais de secret, cle API ou donnee reelle dans ce dossier - .env local
   uniquement, .env.example documente les cles sans valeurs.
4. Aucune information dun autre projet ni de lagence nest copiee ici.
5. Toute livraison passe par scripts\verifier-livraison.ps1 + signature
   Ahmed Tall.

