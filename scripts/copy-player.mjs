// Copie un joueur (profil + tous ses pronos) d'une partie vers une autre.
// Sert quand un joueur est commun aux deux sites (ex : Charlotte).
//
//   node copy-player.mjs <source> <destination> "<prénom>"
//   node copy-player.mjs main bfparty "Charlotte"
//
import { partyRef, getDoc, updateDoc, loadParty, findPlayer } from './lib/firebase.mjs';

const [src, dest, name] = process.argv.slice(2);
if (!src || !dest || !name) {
  console.error('Usage : node copy-player.mjs <source> <destination> "<prénom>"');
  process.exit(1);
}

const from = await loadParty(src);
const player = findPlayer(from, name);
if (!player) { console.error(`"${name}" introuvable dans state/${src}.`); process.exit(1); }

const destRef = partyRef(dest);
const to = (await getDoc(destRef)).data();
if (findPlayer(to, name)) {
  console.log(`"${name}" est déjà dans state/${dest}. Rien à faire.`);
  process.exit(0);
}

const playerPreds = (from.preds || {})[player.id] || {};
const players = [...(to.players || []), player];
const preds = { ...(to.preds || {}), [player.id]: playerPreds };
await updateDoc(destRef, { players, preds });

console.log(`"${player.name}" copié de state/${src} vers state/${dest} (${Object.keys(playerPreds).length} pronos).`);
process.exit(0);
