# Scripts d'administration — Loto Foot 2026

Petits scripts Node.js pour gérer les données Firestore des deux parties **sans
passer par l'interface** (utile quand un match est verrouillé, qu'un joueur n'a
pas pu saisir à temps, ou que l'API de résultats est en retard).

## Les deux parties

L'app stocke tout dans un seul document Firestore par partie :

| Partie    | Document Firestore | Site                                                   |
|-----------|--------------------|--------------------------------------------------------|
| `main`    | `state/main`       | https://fragarach0-blip.github.io/loto-foot/           |
| `bfparty` | `state/bfparty`    | https://fragarach0-blip.github.io/loto-foot-bfparty/   |

Les deux partagent le **même projet Firebase** mais des **données séparées**.
Toute écriture est synchronisée en direct : les joueurs voient le changement dès
que leur app se rafraîchit.

## Installation (une seule fois)

```bash
cd scripts
npm install
```

Nécessite Node.js 18+ (utilise `fetch` et les modules ES).

## Scripts disponibles

### Inspecter une partie
Liste les joueurs, le nombre de pronos remplis et les résultats enregistrés.
```bash
node inspect.mjs bfparty
node inspect.mjs main
```

### Enregistrer un résultat de match
Écrit le score officiel et marque le match `FINISHED` (le classement se recalcule
tout seul). `all` écrit dans les deux parties d'un coup.
```bash
node set-result.mjs bfparty 1 2 0     # Mexique 2-0 Afrique du Sud, BF Party
node set-result.mjs all 1 2 0         # ... dans les deux parties
```

### Saisir le prono d'un joueur
Pratique si un joueur n'a pas eu le temps de remplir avant le verrouillage.
```bash
node set-pred.mjs bfparty "Benjamin" 1 2 0
```

### Déverrouiller / reverrouiller les pronos
Override admin global (équivalent du bouton dans le panneau admin).
```bash
node toggle-unlock.mjs bfparty on     # déverrouille tout
node toggle-unlock.mjs bfparty off    # rétablit le verrouillage normal
```

### Copier un joueur d'une partie à l'autre
Profil + tous ses pronos (ne fait rien si le joueur existe déjà à destination).
```bash
node copy-player.mjs main bfparty "Charlotte"
```

### Bilan de la journée (classement rigolo)
Affiche, pour les deux parties, qui a gagné / perdu sur les matchs terminés
(score exact = 3 pts, bon résultat = 1 pt, raté = 0).
```bash
node daily-ranking.mjs
```

## Trouver l'identifiant d'un match

Les ids de match sont dans `lib/matches.mjs` (id → équipes). `node inspect.mjs`
les affiche aussi à côté des résultats. Exemples courants :

| id | Match                          |
|----|--------------------------------|
| 1  | Mexique - Afrique du Sud       |
| 2  | Corée du Sud - Rép. Tchèque    |
| 3  | Canada - Bosnie-Herzég.        |
| 7  | USA - Paraguay                 |
| 17 | France - Sénégal               |

## Récupérer un vrai score

L'app se synchronise via l'API **football-data.org** (plan gratuit), qui peut
avoir un gros retard sur les scores en direct. Pour ne pas dépendre de ça, on
récupère le score sur le web (ESPN, CNN…) puis on l'écrit avec `set-result.mjs`.

## Structure

```
scripts/
├── README.md            # ce fichier
├── package.json         # dépendance firebase
├── lib/
│   ├── firebase.mjs     # config + helpers (loadParty, findPlayer…)
│   └── matches.mjs      # référence id de match → équipes
├── inspect.mjs
├── set-result.mjs
├── set-pred.mjs
├── toggle-unlock.mjs
├── copy-player.mjs
└── daily-ranking.mjs    # bilan rigolo du jour (gagnant/perdant par partie)
```

## Note de sécurité

La config Firebase ici est la **clé client publique** (déjà présente dans
`index.html`). Ce n'est pas un secret : l'accès aux données est régi par les
règles de sécurité Firestore, pas par cette clé.

## Journal des opérations

| Date       | Partie    | Opération                                                        |
|------------|-----------|-----------------------------------------------------------------|
| 2026-06-11 | bfparty   | Copie du joueur Charlotte depuis `main` (104 pronos)            |
| 2026-06-11 | bfparty   | Déverrouillage des pronos (`predUnlock = on`)                   |
| 2026-06-11 | bfparty   | Saisie pronos Benjamin : M1 2-0, M2 1-1                          |
| 2026-06-11 | main + bf | Résultat M1 Mexique 2-0 Afrique du Sud (FINISHED)               |
