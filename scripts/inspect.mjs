// Affiche l'état d'une partie : joueurs, pronos remplis, résultats enregistrés.
//
//   node inspect.mjs <party>
//   node inspect.mjs bfparty
//
import { loadParty, PARTIES } from './lib/firebase.mjs';
import { matchName } from './lib/matches.mjs';

const party = process.argv[2];
if (!PARTIES.includes(party)) {
  console.error(`Usage : node inspect.mjs <${PARTIES.join('|')}>`);
  process.exit(1);
}

const d = await loadParty(party);
const players = d.players || [];
const preds = d.preds || {};
const results = d.results || {};

console.log(`\n=== state/${party} ===`);
console.log(`Joueurs : ${players.length}`);
for (const p of players) {
  const n = Object.keys(preds[p.id] || {}).length;
  console.log(`  - ${p.name.padEnd(12)} ${n} pronos  (id ${p.id})${p.pin ? '  [PIN]' : ''}`);
}

const resIds = Object.keys(results).sort((a, b) => a - b);
console.log(`\nRésultats enregistrés : ${resIds.length}`);
for (const id of resIds) {
  console.log(`  match ${String(id).padStart(3)} : ${results[id].s1}-${results[id].s2}  ${matchName(+id)}`);
}
console.log(`\npredUnlock (override admin) : ${d.predUnlock ? 'ACTIVÉ' : 'désactivé'}`);
process.exit(0);
