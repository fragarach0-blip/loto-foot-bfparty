// Référence id -> équipes (extraite de index.html, MATCHES + FINAL_MATCHES).
// Sert à retrouver / vérifier un match avant d'écrire un résultat.
export const MATCH_NAMES = {
  1:'Mexique - Afrique du Sud', 2:'Corée du Sud - Rép. Tchèque',
  3:'Canada - Bosnie-Herzég.', 4:'Qatar - Suisse',
  5:'Brésil - Maroc', 6:'Haïti - Écosse',
  7:'USA - Paraguay', 8:'Australie - Turquie',
  9:'Allemagne - Curaçao', 10:"Côte d'Ivoire - Équateur",
  11:'Pays-Bas - Japon', 12:'Suède - Tunisie',
  13:'Belgique - Égypte', 14:'Iran - Nouvelle-Zélande',
  15:'Espagne - Cap-Vert', 16:'Arabie Saoudite - Uruguay',
  17:'France - Sénégal', 18:'Irak - Norvège',
  19:'Argentine - Algérie', 20:'Autriche - Jordanie',
  21:'Portugal - RD Congo', 22:'Ouzbékistan - Colombie',
  23:'Angleterre - Croatie', 24:'Ghana - Panama',
  25:'Rép. Tchèque - Afrique du Sud', 26:'Turquie - Paraguay',
  27:'Suisse - Bosnie-Herzég.', 28:'Mexique - Corée du Sud',
  29:'Canada - Qatar', 30:'Écosse - Maroc', 31:'Brésil - Haïti', 32:'USA - Australie',
  33:'Équateur - Curaçao', 34:"Allemagne - Côte d'Ivoire",
  35:'Tunisie - Japon', 36:'Pays-Bas - Suède',
  37:'Nouvelle-Zélande - Égypte', 38:'Belgique - Iran',
  39:'Uruguay - Cap-Vert', 40:'Espagne - Arabie Saoudite',
  41:'Norvège - Sénégal', 42:'France - Irak',
  43:'Jordanie - Algérie', 44:'Argentine - Autriche',
  45:'Colombie - RD Congo', 46:'Portugal - Ouzbékistan',
  47:'Panama - Croatie', 48:'Angleterre - Ghana',
  53:'Rép. Tchèque - Mexique', 54:'Afrique du Sud - Corée du Sud',
  55:'Suisse - Canada', 56:'Bosnie-Herzég. - Qatar',
  57:'Écosse - Brésil', 58:'Maroc - Haïti',
  59:'Turquie - USA', 60:'Paraguay - Australie',
  61:'Équateur - Allemagne', 62:"Curaçao - Côte d'Ivoire",
  63:'Tunisie - Pays-Bas', 64:'Japon - Suède',
  65:'Nouvelle-Zélande - Belgique', 66:'Égypte - Iran',
  67:'Uruguay - Espagne', 68:'Cap-Vert - Arabie Saoudite',
  69:'Norvège - France', 70:'Sénégal - Irak',
  71:'Jordanie - Argentine', 72:'Algérie - Autriche',
  73:'Colombie - Portugal', 74:'RD Congo - Ouzbékistan',
  75:'Panama - Angleterre', 76:'Croatie - Ghana'
  // 77+ = phase finale (équipes déterminées plus tard)
};

export function matchName(id) {
  return MATCH_NAMES[id] || `Match #${id} (phase finale)`;
}
