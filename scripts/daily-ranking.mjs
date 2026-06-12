import { loadParty } from './lib/firebase.mjs';
import { matchName } from './lib/matches.mjs';

// Scoring phase de groupes : exact = 3, bon résultat = 1, sinon 0.
// (Tous les matchs terminés à ce stade sont des matchs de groupe A-L.)
function groupPts(pred, res) {
  if (!pred || pred.s1 === '' || pred.s1 == null || pred.s2 === '' || pred.s2 == null) return null;
  const ps1 = +pred.s1, ps2 = +pred.s2, rs1 = +res.s1, rs2 = +res.s2;
  if ([ps1, ps2, rs1, rs2].some(isNaN)) return null;
  if (ps1 === rs1 && ps2 === rs2) return 3;
  const pr = ps1 > ps2 ? 1 : ps1 < ps2 ? -1 : 0;
  const rr = rs1 > rs2 ? 1 : rs1 < rs2 ? -1 : 0;
  return pr === rr ? 1 : 0;
}

for (const party of ['main', 'bfparty']) {
  const d = await loadParty(party);
  const results = d.results || {};
  const finishedIds = Object.keys(results);
  console.log(`\n========== state/${party} ==========`);
  console.log('Matchs terminés :', finishedIds.map(id => `${matchName(+id)} (${results[id].s1}-${results[id].s2})`).join(' | ') || 'aucun');

  const rows = (d.players || []).map(p => {
    let total = 0, exact = 0, bon = 0, zero = 0, details = [];
    for (const id of finishedIds) {
      const pred = (d.preds[p.id] || {})[id];
      const pt = groupPts(pred, results[id]);
      if (pt == null) { details.push(`${id}:—`); continue; }
      total += pt;
      if (pt === 3) exact++; else if (pt === 1) bon++; else zero++;
      details.push(`${id}:${pred.s1}-${pred.s2}=${pt}pt`);
    }
    return { name: p.name, total, exact, bon, zero, details };
  }).sort((a, b) => b.total - a.total || b.exact - a.exact);

  for (const r of rows) {
    console.log(`  ${r.name.padEnd(12)} ${String(r.total).padStart(2)} pts  (${r.exact} exact, ${r.bon} bon, ${r.zero} raté)  [${r.details.join(', ')}]`);
  }
}
process.exit(0);
