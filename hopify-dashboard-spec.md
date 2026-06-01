# Hopify — Spécification complète du Dashboard

> **Document de référence pour la construction du dashboard de l'ERP hospitalier Hopify.**
> Stack : Laravel (API REST) + Next.js (frontend) + PostgreSQL + Redis + Laravel Reverb (WebSockets).
> Architecture : Multi-tenant (Stancl/Tenancy, base de données séparée par hôpital).

---

## Principes de design

- Le dashboard est **role-based** : 4 vues distinctes selon le rôle connecté (Directeur/Admin, Médecin, Infirmier, Réceptionniste).
- Les éléments marqués **[TEMPS RÉEL]** utilisent Laravel Reverb (WebSockets) — mise à jour sans rechargement de page.
- Les éléments marqués **[POLLING]** se rafraîchissent toutes les 30 à 60 secondes.
- Les éléments marqués **[ALERTE]** déclenchent une notification visuelle (badge, couleur rouge/orange) quand un seuil est atteint.
- Les éléments marqués **[ACTION]** permettent d'effectuer une action directement depuis le dashboard sans changer de page (modal ou side panel).
- Toutes les données sont scopées au **tenant courant** (hôpital connecté).
- La période affichée est contrôlée par le **sélecteur de période global** (Aujourd'hui / Cette semaine / Ce mois / Personnalisée).

---

## Hiérarchie des zones (ordre d'affichage)

```
┌─────────────────────────────────────────────────────┐
│  ZONE 1 — Barre du haut (Header)                    │
├─────────────────────────────────────────────────────┤
│  ZONE 2 — KPIs opérationnels (ligne de métriques)   │
├───────────────────────────┬─────────────────────────┤
│  ZONE 3 — Gestion des     │  ZONE 5 — Alertes &     │
│           lits (temps réel│           urgences       │
├───────────────────────────┤           (panneau fixe) │
│  ZONE 4 — Rendez-vous     │                         │
│           du jour         │                         │
├───────────────────────────┴─────────────────────────┤
│  ZONE 6 — Activité clinique                         │
├──────────────┬──────────────┬───────────────────────┤
│  ZONE 7 —    │  ZONE 8 —    │  ZONE 9 — RH          │
│  Pharmacie   │  Finances    │                       │
├──────────────┴──────────────┴───────────────────────┤
│  ZONE 10 — Graphiques & tendances                   │
├─────────────────────────────────────────────────────┤
│  ZONE 11 — Activité récente (feed)                  │
├─────────────────────────────────────────────────────┤
│  ZONE 12 — Actions rapides                          │
└─────────────────────────────────────────────────────┘
```

---

## Zone 1 — Barre du haut (Header)

> Présente en permanence, accessible depuis toutes les pages. Ne défile pas.

| Élément | Description | Comportement |
|---|---|---|
| **Logo Hopify + Hopify. + nom de l'hôpital** | Logo Hopify + Hopify. (saas name). Nom de l'établissement courant (tenant) affiché juste en bas du logo | Cliquable → retour dashboard. |
| **Date et heure en temps réel** | Affichage live de la date complète et de l'heure locale (timezone du tenant configuré dans les settings). | Rafraîchissement chaque seconde via `setInterval`. |
| **Sélecteur de période** | Filtre global : `Aujourd'hui` / `Cette semaine` / `Ce mois` / `Période personnalisée` (date picker). | Affecte tous les KPIs, graphiques et listes du dashboard. Persisté en localStorage par utilisateur. |
| **Recherche globale** | Barre de recherche omniprésente avec raccourci clavier (`Cmd+K` / `Ctrl+K`). | Recherche simultanément dans : patients (nom, prénom, MRN), médecins, chambres/lits, RDV (numéro), factures (numéro). Résultats groupés par catégorie dans un dropdown. |
| **Centre de notifications** | Icône cloche avec badge rouge indiquant le nombre de notifications non lues. | Clic → panneau déroulant latéral. Contient : alertes critiques, rappels RDV, résultats labo anormaux, messages internes, expiration stock. Triage par priorité. **[TEMPS RÉEL]** |
| **Messagerie interne** | Icône messages avec badge. Messagerie entre personnel de l'hôpital. | Clic → panneau de conversation. Groupes par département possibles. **[TEMPS RÉEL]** |
| **Profil utilisateur** | Photo ou initiales, nom complet, rôle affiché. | Menu déroulant : Mon profil / Mes préférences / Changer mot de passe / Déconnexion. Indicateur 2FA actif/inactif. |

---

## Zone 2 — KPIs opérationnels

> Ligne de cartes métriques en haut du contenu principal. Visibles d'un coup d'œil.
> Chaque carte affiche : valeur principale + comparaison avec la période précédente (↑ ↓).

| Élément | Valeur affichée | Seuils d'alerte | Source de données |
|---|---|---|---|
| **Patients hospitalisés** | Nombre de patients actuellement admis (statut `active`). | Aucun seuil, informatif. | `hospitalizations` WHERE status = 'active' |
| **Admissions du jour** | Nombre de nouvelles admissions depuis minuit. | Aucun seuil. | `hospitalizations` WHERE admitted_at >= today |
| **Sorties du jour** | Nombre de patients sortis (discharged) aujourd'hui. | Aucun seuil. | `hospitalizations` WHERE discharged_at >= today |
| **Taux d'occupation des lits** | Pourcentage = lits occupés / total lits actifs × 100. Barre de progression visuelle. | Jaune si > 80% / Rouge si > 95% **[ALERTE]** | `beds` GROUP BY status |
| **RDV du jour** | Total des rendez-vous planifiés aujourd'hui. Sous-détail : confirmés / en attente / annulés. | Orange si > 20% annulés. | `appointments` WHERE scheduled_at::date = today |
| **Consultations du jour** | Consultations ouvertes + finalisées aujourd'hui. | Aucun seuil. | `consultations` WHERE consultation_date::date = today |
| **Patients urgences** | File d'attente aux urgences. Temps d'attente moyen en minutes. | Rouge si temps d'attente > 60 min. **[ALERTE]** **[TEMPS RÉEL]** | `hospitalizations` JOIN `departments` WHERE type = 'emergency' |
| **Résultats labo en attente** | Nombre d'analyses commandées sans résultat rendu. Sous-détail : STAT / Urgent / Routine. | Rouge si STAT non traité > 2h. **[ALERTE]** | `lab_order_items` WHERE status != 'completed' |
| **Revenus du jour** | Total encaissé aujourd'hui en CAD. Comparatif avec J-1. | Aucun seuil, informatif. | `payments` WHERE paid_at::date = today |
| **Personnel en service** | Nombre d'employés actuellement en shift actif. Sous-détail : médecins / infirmiers / autres. | Orange si sous-effectif détecté. **[TEMPS RÉEL]** | `employee_shifts` WHERE date = today AND status = 'scheduled' |

---

## Zone 3 — Gestion des lits

> Widget central et critique. Doit être visible sans défilement sur desktop.

| Élément | Description | Comportement | Tags |
|---|---|---|---|
| **Carte visuelle des lits** | Grille visuelle représentant chaque lit par service. Couleur par statut : Vert = disponible, Rouge = occupé, Gris = maintenance, Jaune = réservé. | Clic sur un lit → panneau avec détail du patient ou formulaire d'admission si disponible. Filtre par service/département. | **[TEMPS RÉEL]** |
| **Taux d'occupation par service** | Barres de progression ou anneaux (donut) par département : ICU / Chirurgie / Médecine générale / Maternité / Pédiatrie… Valeur en % + nb de lits occupés/total. | Tri par taux décroissant. Clic → vue détaillée du service. | **[TEMPS RÉEL]** |
| **Liste des lits disponibles** | Table scrollable : Département / Chambre / Lit / Type de lit / Disponible depuis. | Tri par département. Bouton "Admettre ici" sur chaque ligne. | **[ACTION]** **[TEMPS RÉEL]** |
| **Transferts en cours** | Patients en cours de transfert d'un service à un autre. Affiche : patient, service source → service cible, heure de début. | Badge d'alerte rouge si transfert en attente depuis plus de 30 min. | **[TEMPS RÉEL]** **[ALERTE]** |
| **Prévisions d'occupation 24h** | Estimation des entrées/sorties prévues dans les prochaines 24h. Basé sur les RDV planifiés et les sorties programmées. | Affichage simplifié : +X admissions prévues / -X sorties prévues = solde net. | **[POLLING]** |
| **Alerte capacité critique** | Bannière ou badge rouge si un service dépasse 90% d'occupation. Message : "ICU à 95% — Capacité critique". | Suggestion automatique du service le plus disponible pour redirection. | **[ALERTE]** **[TEMPS RÉEL]** |

---

## Zone 4 — Rendez-vous du jour

> Vue complète de l'agenda journalier avec état de chaque créneau.

| Élément | Description | Comportement | Tags |
|---|---|---|---|
| **Timeline des RDV par médecin** | Vue chronologique horizontale (type Gantt) : chaque médecin = 1 ligne, chaque RDV = 1 bloc coloré par statut. Axe horaire de 7h à 20h. | Défilement horizontal. Clic sur un bloc → détail du RDV. Filtre par département ou médecin. | **[POLLING]** |
| **Liste des prochains RDV** | Table des RDV dans les prochaines 2 heures : Heure / Patient / Médecin / Type / Salle / Statut. | Mise à jour automatique. Statut cliquable pour changement rapide (confirmé → en cours). | **[TEMPS RÉEL]** |
| **File d'attente (patients arrivés)** | Patients ayant checkéin (`arrived_at` non null) qui attendent d'être pris en charge. Affiche le temps d'attente en minutes. | Alerte si > 30 min d'attente. Tri par heure d'arrivée. | **[TEMPS RÉEL]** **[ALERTE]** |
| **No-shows et annulations** | Compteur de RDV manqués et annulés aujourd'hui. Liste avec motif d'annulation. | Bouton "Replanifier" sur chaque no-show. | **[POLLING]** |
| **Créneaux libres du jour** | Créneaux disponibles encore ouverts pour chaque médecin. Permet un booking rapide directement depuis le dashboard. | Ouvre le formulaire de prise de RDV pré-rempli avec le créneau sélectionné. | **[ACTION]** |
| **Taux de remplissage des agendas** | Barre de progression par médecin : Dr. Martin 8/10 RDV (80%) / Dr. Tremblay 5/8 RDV (62%)… | Tri par taux décroissant. Clic → agenda complet du médecin. | **[POLLING]** |
| **RDV confirmés vs en attente** | Compteur double : X confirmés / Y en attente de confirmation. | Bouton "Envoyer rappels" pour relancer les confirmations en masse. | **[ACTION]** |

---

## Zone 5 — Alertes & urgences

> Panneau latéral fixe (sidebar droite sur desktop) ou section prioritaire. Toujours visible.
> Trié par niveau de criticité : Critique → Urgent → Modéré.

| Élément | Description | Niveau | Tags |
|---|---|---|---|
| **Résultats labo critiques** | Résultats marqués `is_abnormal = true` avec `abnormality_level = 'critical'` non encore vus par le médecin prescripteur. Affiche : patient, test, valeur, valeur normale. | 🔴 Critique | **[TEMPS RÉEL]** **[ALERTE]** |
| **Patients en état critique** | Patients hospitalisés avec signes vitaux hors limites critiques (dernière saisie de `vital_signs`). Affiche : patient, service, indicateur concerné, valeur. | 🔴 Critique | **[TEMPS RÉEL]** **[ALERTE]** |
| **Alertes interactions médicamenteuses** | Ordonnances créées contenant des interactions de niveau `major` ou `contraindicated` non encore validées par un médecin. | 🔴 Critique | **[ALERTE]** |
| **Imageries urgentes sans rapport** | Ordres d'imagerie avec `urgency = 'emergency'` réalisés mais sans rapport radiologiste depuis plus de 2h. | 🔴 Critique | **[ALERTE]** |
| **Stock pharmacie critique** | Médicaments dont la quantité est en dessous du `reorder_level`. Nombre de produits concernés + lien vers pharmacie. | 🟠 Urgent | **[ALERTE]** |
| **Factures en retard** | Factures dont `due_date` est dépassée et statut != 'paid'. Montant total en CAD + nombre de patients concernés. | 🟠 Urgent | **[ALERTE]** |
| **Réclamations assurance bloquées** | Claims avec statut `rejected` ou en attente de document depuis plus de 7 jours. Action requise de ta part. | 🟠 Urgent | **[ALERTE]** |
| **Médicaments expirant bientôt** | Lots de médicaments avec `expires_at` dans moins de 30 jours. Quantité et valeur à risque. | 🟡 Modéré | **[ALERTE]** |

---

## Zone 6 — Activité clinique

> Suivi du flux clinique en cours — consultations actives, examens, ordonnances.

| Élément | Description | Comportement | Tags |
|---|---|---|---|
| **Consultations en cours** | Consultations avec `is_finalized = false` ouvertes en ce moment. Affiche : médecin, patient, heure d'ouverture. | Clic → ouvrir la consultation. | **[TEMPS RÉEL]** |
| **Ordonnances à dispenser** | Prescriptions avec statut `active` non encore dispensées par la pharmacie. | Bouton "Dispenser" sur chaque ligne. Filtre par médecin ou patient. | **[ACTION]** |
| **Résultats labo à valider** | Résultats entrés par technicien (`resulted_at` non null) mais non validés (`validated_at` null). | Bouton "Valider" avec accès rapide au dossier. | **[ACTION]** |
| **Consultations non finalisées > 4h** | Consultations ouvertes depuis plus de 4 heures sans finalisation. Alerte modérée pour rappeler au médecin. | Notification push au médecin concerné. | **[ALERTE]** **[POLLING]** |
| **Notes infirmières récentes** | Dernières notes de soins (`nursing_notes`) ajoutées aux hospitalisations actives. Feed chronologique. | Clic → ouvrir le dossier d'hospitalisation complet. | **[TEMPS RÉEL]** |
| **Visites médicales du jour** | Doctor rounds effectués aujourd'hui par service. Compteur : patients visités / patients hospitalisés dans le service. | Alerte si un patient n'a pas reçu de visite depuis 24h. | **[POLLING]** **[ALERTE]** |

---

## Zone 7 — Pharmacie

> Mini-tableau de bord pharmacie intégré — vue synthétique sans accéder au module complet.

| Élément | Description | Comportement | Tags |
|---|---|---|---|
| **État du stock global** | Valeur totale du stock en CAD. Nombre de références actives. Date du dernier inventaire. | Clic → accès au module pharmacie complet. | **[KPI]** |
| **Médicaments sous seuil** | Liste des médicaments dont `quantity <= reorder_level`. Colonne : nom, quantité restante, seuil, unité. | Bouton "Commander" sur chaque ligne. Badge avec nombre total en rouge. | **[ALERTE]** **[ACTION]** |
| **Expirations à 30 jours** | Lots expirant dans les 30 prochains jours. Affiche : médicament, numéro de lot, date d'expiration, quantité, valeur. | Tri par date la plus proche. Bouton "Marquer expiré". | **[ALERTE]** |
| **Dispensations du jour** | Nombre et valeur totale des médicaments sortis aujourd'hui. Mini graphique en barres heure par heure. | Clic → détail de toutes les transactions du jour. | **[KPI]** |
| **Médicaments contrôlés** | Suivi spécial pour stupéfiants et médicaments contrôlés. Dispensations aujourd'hui + balance de stock. | Accès restreint aux rôles `pharmacist` et `admin`. | **[KPI]** |
| **Commandes fournisseurs en cours** | Commandes passées et en attente de livraison. Date de livraison prévue. Alerte si retard. | Clic → détail de la commande. | **[POLLING]** |

---

## Zone 8 — Finances & facturation

> Santé financière de l'hôpital — indicateurs clés pour le directeur et le personnel billing.

| Élément | Description | Comportement | Tags |
|---|---|---|---|
| **Revenus du jour** | Total encaissé aujourd'hui en CAD. Décomposé : Comptant / Carte / Assurance / Virement. Comparatif avec J-1 (↑ ↓ %). | Clic → liste des paiements du jour. | **[KPI]** |
| **Revenus du mois** | Cumul mensuel en CAD avec barre de progression vers l'objectif mensuel (si configuré dans les settings). | Clic → rapport financier mensuel complet. | **[KPI]** |
| **Factures impayées** | Montant total dû en CAD. Nombre de factures. Sous-détail : En cours / En retard (>30j) / Très en retard (>90j). | Badge rouge si montant > seuil configuré. Clic → liste des factures impayées. | **[KPI]** **[ALERTE]** |
| **Réclamations assurance en attente** | Claims soumis sans réponse de l'assureur. Montant total réclamé. Délai moyen de traitement par assureur. | Clic → liste des claims par statut. | **[KPI]** |
| **Taux de recouvrement** | Pourcentage = montant payé / montant facturé × 100 sur la période. Objectif cible affiché (ex: 85%). | Couleur : vert si > objectif, orange si entre 70-objectif, rouge si < 70%. | **[KPI]** |
| **Courbe des revenus (30 jours)** | Graphique linéaire des encaissements jour par jour sur 30 jours glissants. | Toggle : vue journalière / hebdomadaire. Comparaison avec les 30 jours précédents. | **[Graphique]** |
| **Paiements reçus aujourd'hui** | Feed des derniers paiements : patient, montant, méthode de paiement, heure. | Clic sur une ligne → facture correspondante. | **[TEMPS RÉEL]** |

---

## Zone 9 — Ressources humaines

> Aperçu du personnel en service — visible principalement pour admin et directeur.

| Élément | Description | Comportement | Tags |
|---|---|---|---|
| **Personnel en service maintenant** | Grille ou liste des employés actuellement en shift actif. Affiche : photo/initiales, nom, rôle, département, heure de début de shift. | Filtrable par rôle ou département. | **[TEMPS RÉEL]** |
| **Absences du jour** | Employés absents (congé approuvé, maladie déclarée). Affiche l'impact sur la couverture par département. | Lien vers les congés approuvés dans le module RH. | **[ALERTE]** |
| **Planning des shifts du jour** | Vue des 3 shifts : Matin / Soir / Nuit. Qui est planifié dans chaque shift. Shifts en cours vs à venir. | Clic → modifier le planning depuis le module RH. | **[KPI]** |
| **Congés en attente d'approbation** | Nombre de demandes de congé soumises et non encore traitées. | Bouton "Approuver / Rejeter" avec accès rapide. Badge avec compteur. | **[ACTION]** **[ALERTE]** |
| **Couverture par département** | Indicateur de sous-effectif par service. Alerte si le nombre d'infirmiers ou médecins est en dessous du minimum requis. | Rouge si sous-effectif critique. Configure les minimums dans les settings. | **[ALERTE]** **[POLLING]** |

---

## Zone 10 — Graphiques & tendances

> Visualisations analytiques — positionnées en bas du dashboard. Contexte historique.

| Élément | Type de graphique | Description | Interactivité |
|---|---|---|---|
| **Évolution des admissions (7 jours)** | Courbe linéaire double | Admissions (bleu) et sorties (vert) par jour sur 7 jours glissants. Identifie les pics d'activité. | Toggle 7j / 14j / 30j. |
| **Taux d'occupation historique** | Courbe linéaire avec zone | Pourcentage d'occupation des lits par heure (aujourd'hui) ou par jour (semaine/mois). Zone colorée sous la courbe. Ligne seuil à 80% et 95%. | Toggle heure / jour. |
| **Revenus par période** | Barres verticales groupées | Revenus par semaine ou par mois. Barres groupées : encaissé (plein) vs facturé (contour). | Toggle semaine / mois. Comparaison N-1 activable. |
| **Répartition par spécialité** | Donut chart | Distribution des consultations par département ou spécialité médicale. Légende avec pourcentages. | Clic sur un secteur → liste des consultations du département. |
| **Top 10 diagnostics (ICD)** | Barres horizontales | Les 10 codes diagnostics (ICD-10/11) les plus posés sur la période. Fréquence + pourcentage. | Clic sur une barre → liste des patients avec ce diagnostic. |
| **Modes de paiement** | Donut chart | Répartition des encaissements : Comptant / Carte / Assurance / Virement. Montant et % par mode. | Clic sur un secteur → liste des paiements du type sélectionné. |

---

## Zone 11 — Activité récente (feed)

> Journal chronologique des dernières actions — vue en temps réel de ce qui se passe dans l'hôpital.

| Élément | Description | Comportement | Tags |
|---|---|---|---|
| **Dernières admissions** | Les 5 à 10 dernières admissions : patient, lit assigné, service, médecin admettant, heure. | Clic → dossier d'hospitalisation. | **[TEMPS RÉEL]** |
| **Derniers RDV confirmés ou créés** | RDV récemment confirmés ou nouvellement créés. Affiche : patient, médecin, date et heure du RDV. | Clic → détail du rendez-vous. | **[TEMPS RÉEL]** |
| **Dernières consultations ouvertes** | Consultations créées dans les dernières heures. Médecin, patient, heure d'ouverture, statut (en cours / finalisé). | Clic → ouvrir la consultation. | **[TEMPS RÉEL]** |
| **Derniers paiements reçus** | Paiements enregistrés récemment. Patient, montant, méthode, caissier, heure. | Clic → facture correspondante. | **[TEMPS RÉEL]** |
| **Flux global d'activité** | Timeline mixte de toutes les actions : admissions, consultations, paiements, alertes, notes infirmières. Items avec icône par type d'action. | Filtre par type d'événement. Pagination "Charger plus". Exportable en CSV. | **[TEMPS RÉEL]** |

---

## Zone 12 — Actions rapides

> Raccourcis flottants ou barre fixe en bas — les actions les plus fréquentes en 1 clic.

| Élément | Action déclenchée | Rôles concernés | Tags |
|---|---|---|---|
| **+ Nouveau patient** | Ouvre le formulaire de création patient dans un side panel sans quitter le dashboard. Pré-remplit le MRN auto. | Réceptionniste, Admin, Médecin | **[ACTION]** |
| **+ Nouveau rendez-vous** | Booking rapide : sélection patient (recherche) → médecin → créneau disponible → confirmation. Vérifie les conflits en temps réel. | Réceptionniste, Admin, Médecin | **[ACTION]** |
| **+ Nouvelle consultation** | Sélection du patient → ouverture d'une consultation vierge avec signes vitaux. Pré-remplit avec le dernier RDV confirmé si disponible. | Médecin, Infirmier | **[ACTION]** |
| **Admettre un patient** | Workflow d'admission en 3 étapes : sélection patient → liste des lits disponibles → diagnostic d'entrée → confirmation. | Médecin, Admin | **[ACTION]** |
| **+ Créer une facture** | Génération manuelle d'une facture : sélection patient → ajout des lignes → calcul automatique taxes et remises. | Réceptionniste, Admin | **[ACTION]** |
| **Rechercher un patient** | Focus immédiat sur la barre de recherche globale avec filtre "patients" pré-sélectionné. | Tous les rôles | **[ACTION]** |
| **Imprimer / Exporter le rapport** | Export PDF ou Excel du dashboard complet ou d'une zone sélectionnée. Rapport journalier automatisé à 18h. | Admin, Directeur | **[ACTION]** |

---

## Dashboards par rôle

> Le même ensemble d'éléments est disponible mais filtré et réorganisé selon le rôle.

### Directeur / Admin
Accès complet à toutes les zones. Focus sur : KPIs globaux, Finances, Graphiques, RH, Alertes.

### Médecin
Zones prioritaires : Ses RDV du jour (filtrés sur lui), Ses consultations en cours, Résultats labo de ses patients, Alertes interactions médicamenteuses, Actions rapides (consultation, ordonnance).

### Infirmier
Zones prioritaires : Lits de son département (filtrés), Patients de son service avec signes vitaux, Notes infirmières, Médicaments à administrer, Alertes patients critiques de son service.

### Réceptionniste
Zones prioritaires : RDV du jour (tous médecins), File d'attente, Admissions, Facturation, Actions rapides (nouveau patient, nouveau RDV, facture).

---

## Endpoints API Laravel requis pour le dashboard

```
GET /api/v1/dashboard/kpis                  → KPIs opérationnels (Zone 2)
GET /api/v1/dashboard/beds                  → État des lits temps réel (Zone 3)
GET /api/v1/dashboard/appointments/today    → RDV du jour (Zone 4)
GET /api/v1/dashboard/alerts                → Toutes les alertes triées (Zone 5)
GET /api/v1/dashboard/clinical              → Activité clinique (Zone 6)
GET /api/v1/dashboard/pharmacy              → Résumé pharmacie (Zone 7)
GET /api/v1/dashboard/finance               → KPIs financiers (Zone 8)
GET /api/v1/dashboard/hr                    → Résumé RH (Zone 9)
GET /api/v1/dashboard/charts                → Données graphiques (Zone 10)
GET /api/v1/dashboard/feed                  → Activité récente (Zone 11)

WebSocket channels (Laravel Reverb):
  private-tenant.{tenantId}.beds            → Mises à jour lits temps réel
  private-tenant.{tenantId}.alerts          → Nouvelles alertes critiques
  private-tenant.{tenantId}.feed            → Activité récente
  private-tenant.{tenantId}.appointments    → Changements de RDV
```

---

## Résumé des éléments par zone

| Zone | Nb d'éléments | Temps réel | Alertes | Actions |
|---|---|---|---|---|
| 1 — Barre du haut | 7 | 3 | 1 | 1 |
| 2 — KPIs opérationnels | 10 | 4 | 4 | 0 |
| 3 — Gestion des lits | 6 | 4 | 2 | 1 |
| 4 — Rendez-vous du jour | 7 | 3 | 1 | 2 |
| 5 — Alertes & urgences | 8 | 3 | 8 | 0 |
| 6 — Activité clinique | 6 | 3 | 1 | 2 |
| 7 — Pharmacie | 6 | 0 | 2 | 1 |
| 8 — Finances & facturation | 7 | 2 | 1 | 0 |
| 9 — Ressources humaines | 5 | 2 | 2 | 1 |
| 10 — Graphiques & tendances | 6 | 0 | 0 | 0 |
| 11 — Activité récente | 5 | 5 | 0 | 0 |
| 12 — Actions rapides | 7 | 0 | 0 | 7 |
| **TOTAL** | **80** | **29** | **22** | **15** |

---

*Document généré pour le projet Hopify — ERP hospitalier SaaS multi-tenant.*
*Stack : Laravel 11 + Next.js 14 + PostgreSQL + Redis + Stancl/Tenancy + Laravel Reverb.*
