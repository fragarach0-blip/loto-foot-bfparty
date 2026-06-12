// Enregistre le résultat officiel d'un match (le classement se recalcule tout seul).
//
//   node set-result.mjs <party> <matchId> <s1> <s2>
//   node set-result.mjs bfparty 1 2 0      # Mexique 2-0 Afrique du Sud
//
// Astuce : "all" écrit dans les deux parties à la fois.
//   node set-result.mjs all 1 2 0
//
import { partyRef, getDoc, updateDoc, PARTIES } from './lib/firebase.mjs';
import { matchName } from './lib/matches.mjs';

const [party, matchId, s1, s2] = process.argv.slice(2);
if (!party || matchId == null || s1 == null || s2 == null) {
  console.error('Usage : node set-result.mjs <party|all> <matchId> <s1> <s2>');
  process.exit(1);
}
const targets = party === 'all' ? PARTIES : [party];

for (const t of targets) {
  const ref = partyRef(t);
  const d = (await getDoc(ref)).data();
  const results = d.results || {};
  const matchMeta = d.matchMeta || {};
  results[matchId] = { s1: String(s1), s2: String(s2) };
  matchMeta[matchId] = {
    ...(matchMeta[matchId] || {}),
    status: 'FINISHED',
    winner: +s1 > +s2 ? 'HOME_TEAM' : +s1 < +s2 ? 'AWAY_TEAM' : 'DRAW'
  };
  await updateDoc(ref, { results, matchMeta });
  console.log(`state/${t} : match ${matchId} (${matchName(+matchId)}) = ${s1}-${s2} [FINISHED]`);
}
process.exit(0);
