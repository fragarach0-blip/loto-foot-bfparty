// Configuration Firebase partagée + helpers pour les scripts d'admin.
// La config est la même clé publique que celle exposée dans index.html
// (clé client Firebase : ce n'est pas un secret, l'accès est régi par
// les règles de sécurité Firestore).
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQMWAisEORfCtuXUhuu0Q_ltd051950Fc",
  authDomain: "loto-foot-2026.firebaseapp.com",
  projectId: "loto-foot-2026",
  storageBucket: "loto-foot-2026.firebasestorage.app",
  messagingSenderId: "977811294904",
  appId: "1:977811294904:web:f8d15288c8f9525511424d"
};

export const db = getFirestore(initializeApp(firebaseConfig));

// Les deux parties = deux documents Firestore indépendants.
//   main    -> app familiale     (https://fragarach0-blip.github.io/loto-foot/)
//   bfparty -> partie BF Party    (https://fragarach0-blip.github.io/loto-foot-bfparty/)
export const PARTIES = ['main', 'bfparty'];

export function partyRef(party) {
  if (!PARTIES.includes(party)) {
    throw new Error(`Partie inconnue : "${party}". Valeurs possibles : ${PARTIES.join(', ')}`);
  }
  return doc(db, 'state', party);
}

export async function loadParty(party) {
  const snap = await getDoc(partyRef(party));
  if (!snap.exists()) throw new Error(`Document state/${party} introuvable.`);
  return snap.data();
}

// Trouve un joueur par prénom (insensible à la casse). Renvoie {id, name, ...} ou null.
export function findPlayer(data, name) {
  return (data.players || []).find(p => p.name.toLowerCase() === name.toLowerCase()) || null;
}

export { getDoc, updateDoc, setDoc };
