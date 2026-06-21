# Format des fichiers `unitXXX.csv` — Battle Cats

Sources : analyse croisée des fichiers `DataLocal/unit001-013.csv` (nginx local)
et des stats vérifiées sur [battlecats-db.com](https://battlecats-db.com).

---

## Structure générale

Chaque fichier `unitXXX.csv` correspond à une unité (chat). Il contient **3 lignes**, une par forme :

| Ligne | Forme |
|-------|-------|
| 1 | Forme normale |
| 2 | Forme intermédiaire (souvent identique à la ligne 1) |
| 3 | Forme évoluée (true form) |

---

## Tableau des colonnes

| Col | Nom | Unité / Notes | Confiance | Exemples vérifiés |
|-----|-----|---------------|-----------|-------------------|
| **0** | HP | Base (× ~44.5 à Lv max) | ✅ Confirmé | Cat=100→4 450, Tank=400→17 800 |
| **1** | Knockbacks | Nb de coups avant recul | ✅ Confirmé | Cat=3, Tank=1 (très résistant) |
| **2** | Vitesse | Unités/s du jeu | ✅ Confirmé | Cat=10, Cow=30, Tank=8 |
| **3** | Dégâts | Base (× même ratio que HP) | ✅ Confirmé | Double systématiquement à l'évolution |
| **4** | Backswing | Frames de récupération post-attaque | ⚠️ Probable | Cat=15, Tank=30, Battle=10, Cow=0 |
| **5** | Portée | Pixels (range) | ✅ Confirmé | Cat=140, Gross=350, Titan=150 |
| **6** | Coût (base) | Affiché en jeu = col6 × 1.5 | ✅ Confirmé | Cat: 50×1.5=75 ✓, Titan: 1300×1.5=1950 ✓ |
| **7** | Recharge | Base (réduite par upgrades Recherche) | ⚠️ Probable | Croît entre formes, plus élevé pour unités puissantes |
| **8** | Inconnu | Toujours 0 pour les unités basiques | ❓ Inconnu | — |
| **9** | Anim. ref. | 320 pour presque toutes les unités | ❓ Inconnu | Lié au fichier d'animation |
| **10** | Flag inconnu | 0 ou 1 — corrélé avec certaines capacités | ❓ Incertain | Battle=1, Cat Fish=1, Cat=0, Tank=0 |
| **11** | Inconnu | 0 pour la quasi-totalité | ❓ Inconnu | — |
| **12** | Type / catégorie | 0 ou 1 | ❓ Incertain | Tank=1, Titan=1, Cat=0 |
| **13** | Foreswing | Frames avant que le coup atterrit | ✅ Confirmé | Cat=8f, Cow=6f, Titan=18f (db ✓) |
| **14** | Inconnu | Souvent 0 | ❓ Inconnu | — |
| **15** | Inconnu | Souvent 9, parfois 0 | ❓ Inconnu | — |
| **16** | Capacité : Slow | 1 = possède la capacité Slow | ⚠️ Probable | — |
| **17** | Capacité : Freeze | 1 = possède la capacité Freeze | ⚠️ Probable | — |
| **18** | Capacité : Weaken | 1 = possède la capacité Weaken | ⚠️ Probable | — |
| **19** | Capacité : Knockback | 1 = possède la capacité Knockback | ⚠️ Probable | Titan form 3 ✓ |
| **20** | Capacité : Critical | 1 = possède Crit / Strengthen | ⚠️ Probable | Bird Cat form 3 (Strengthen) |
| **21** | Capacité : Barrier | 1 = Barrier Breaker | ⚠️ Probable | — |
| **22** | Capacité : Wave | 1 = Wave Attack | ⚠️ Probable | — |
| **23** | Strong vs ennemis | 1 = "Efficace contre" un type | ✅ Confirmé | Battle=1 (vs Red), Gross form3=1 (vs Alien), Cat Fish=1 (vs Red) |
| **24** | Probabilité | % de déclenchement de la capacité | ⚠️ Probable | Titan form 3 : 30 = 30% knockback ✓ |
| **31** | Crit % | % de coup critique | ⚠️ Probable | Cat Island form 3 = 2 → 2% crit ✓ |
| **37–39** | Params capacité | Selon la capacité (seuil HP, bonus, durée) | ⚠️ Probable | Bird Cat form 3 : 20, 120, 50 (Strengthen) |

---

## Formule coût

```
coût_affiché = col[6] × 1.5
```

Vérifiée sur 6 unités : Cat, Tank, Battle, Gross, Cow, Titan.

---

## Fréquence d'attaque (temps total du cycle)

Le cycle d'attaque complet n'est **pas** directement dans le CSV — il combine :

```
cycle_total = foreswing (col[13]) + backswing (col[4]) + durée_animation
```

La durée d'animation vient des fichiers `.maanim` (pas dans `DataLocal`).  
La fréquence affichée sur les wikis correspond au cycle complet en frames (à 30 fps).

---

## Colonnes 16+ : flags de capacités

Les colonnes à partir de la 16 encodent des flags `0`/`1` suivis de paramètres :

```
[flag_slow][flag_freeze][flag_weaken][flag_knockback]
[flag_critical][flag_barrier][flag_wave][flag_strong_vs]
[probabilité %][...][...][critical %]...[params strengthen]
```

Les unités avec de nombreuses capacités (ex. Titan Cat forme 3) ont plusieurs `1` dans cette zone + des valeurs non-nulles pour les paramètres.

Les `-1` présents dans certains fichiers (ex. `unit009`, `unit013`) indiquent des **patterns multi-coups** (timing d'attaques multiples encodé en complément).

---

## Unités de référence

| ID | JP | EN | Particularité clé |
|----|----|----|-------------------|
| 001 | ネコ | Cat | Stats de base de référence |
| 002 | タンクネコ | Tank Cat | KB=1 (résistance max), vitesse faible |
| 003 | バトルネコ | Battle Cat | col[23]=1 : Strong vs Red |
| 004 | キモネコ | Gross Cat | Longue portée (350), form 3 : Strong vs Alien |
| 005 | ウシネコ | Cow Cat | Vitesse max (30), col[4]=0 (backswing via anim) |
| 007 | ネコフィッシュ | Cat Fish | Strong vs Red + 2% crit (form 3) |
| 009 | 巨神ネコ | Titan Cat | Coût élevé, form 3 : 30% knockback toutes cibles |

---

## Ce qui reste à investiguer

- [ ] Formule exacte de conversion col[7] → frames de recharge affichés
- [ ] Signification précise de col[10] et col[12]
- [ ] Ordre exact des flags de capacités (cols 16–22)
- [ ] Encodage du type d'ennemi ciblé par "Strong vs" (Red / Alien / Black / etc.)
- [ ] Signification des `-1` dans les colonnes de multi-coups
- [ ] Colonnes 40–100+ (fichiers de units spéciaux avec +90 colonnes)
