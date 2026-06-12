// Enregistre / corrige le pronostic d'un joueur pour un match (utile quand un
// joueur n'a pas eu le temps de saisir et que le match est verrouillé).
//
//   node set-pred.mjs <party> "<prénom>" <matchId> <s1> <s2>
//   node set-pred.mjs bfparty "Benjamin" 1 2 0
//
import { partyRef, getDoc, updateDoc, findPlayer } from './lib/firebase.mjs';
import { matchName } from './lib/matches.mjs';

const [party, name, matchId, s1, s2] = process.argv.slice(2);
if (!party || !name || matchId == null || s1 == null || s2 == null) {
  console.error('Usage : node set-pred.mjs <party> "<prénom>" <matchId> <s1> <s2>');
  process.exit(1);
}

const ref = partyRef(party);
const d = (await getDoc(ref)).data();
const player = findPlayer(d, name);
if (!player) {
  console.error(`Joueur "${name}" introuvable dans state/${party}.`);
  console.error('Joueurs :', (d.players || []).map(p => p.name).join(', '));
  process.exit(1);
}

const preds = d.preds || {};
const pp = preds[player.id] || {};
pp[matchId] = { s1: String(s1), s2: String(s2) };
preds[player.id] = pp;
await updateDoc(ref, { preds });

console.log(`state/${party} : ${player.name} -> match ${matchId} (${matchName(+matchId)}) = ${s1}-${s2}`);
process.exit(0);
