// Active/désactive l'override admin "predUnlock" (déverrouille TOUS les pronos
// d'une partie, peu importe l'heure des matchs). Même effet que le bouton
// "Pronostics déverrouillés" dans le panneau admin.
//
//   node toggle-unlock.mjs <party> <on|off>
//   node toggle-unlock.mjs bfparty on
//
import { partyRef, getDoc, updateDoc } from './lib/firebase.mjs';

const [party, mode] = process.argv.slice(2);
if (!party || !['on', 'off'].includes(mode)) {
  console.error('Usage : node toggle-unlock.mjs <party> <on|off>');
  process.exit(1);
}

const ref = partyRef(party);
await updateDoc(ref, { predUnlock: mode === 'on' });
console.log(`state/${party} : predUnlock = ${mode === 'on' ? 'ACTIVÉ (pronos déverrouillés)' : 'désactivé (verrouillage normal)'}`);
process.exit(0);
