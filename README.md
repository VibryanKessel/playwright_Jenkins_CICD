# Automatisation SauceDemo avec Playwright

Ce projet automatise les tests du site web [SauceDemo](https://www.saucedemo.com/) en utilisant Playwright avec TypeScript.

## 🎯 Fonctionnalités automatisées

### ✅ Page de Login
- Login avec différents types d'utilisateurs
- Validation des erreurs de connexion
- Gestion des utilisateurs bloqués

### ✅ Page Inventaire
- Affichage des produits
- Ajout de produits au panier (par index ou par nom)
- Suppression de produits du panier
- Tri des produits (nom, prix)
- Navigation vers le panier
- Logout

### ✅ Page Panier
- Visualisation des produits ajoutés
- Suppression de produits individuels
- Vidage complet du panier
- Navigation vers le checkout
- Retour à l'inventaire

### ✅ Page Checkout
- Saisie des informations de livraison
- Validation des champs obligatoires
- Finalisation de commande
- Gestion des erreurs de saisie

## 📁 Structure du projet

```
├── pages/                    # Page Object Model
│   ├── login.page.ts        # Page de connexion
│   ├── inventory.page.ts    # Page inventaire
│   ├── cart.page.ts         # Page panier
│   ├── checkout.page.ts     # Page checkout
│   └── index.ts             # Export de toutes les pages
├── tests/                   # Tests automatisés
│   ├── saucedemo.spec.ts    # Tests principaux
│   ├── users.spec.ts        # Tests par type d'utilisateur
│   └── advanced.spec.ts     # Tests avancés
├── data/                    # Données de test
│   └── testData.ts          # Configuration des données
├── playwright.config.ts     # Configuration Playwright
└── package.json            # Dépendances et scripts
```

## 🚀 Installation et utilisation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Installer les navigateurs Playwright
npx playwright install
```

### Exécution des tests

```bash
# Exécuter tous les tests
npm run test

# Exécuter les tests avec interface graphique
npm run test:headed

# Exécuter les tests avec UI mode
npm run test:ui

# Exécuter en mode debug
npm run test:debug

# Exécuter les tests spécifiques
npm run test:saucedemo
npm run test:users

# Voir le rapport de tests
npm run test:report
```

## 👥 Utilisateurs de test disponibles

| Utilisateur | Mot de passe | Description |
|-------------|--------------|-------------|
| `standard_user` | `secret_sauce` | Utilisateur standard sans problèmes |
| `locked_out_user` | `secret_sauce` | Utilisateur bloqué |
| `problem_user` | `secret_sauce` | Utilisateur avec des problèmes fonctionnels |
| `performance_glitch_user` | `secret_sauce` | Utilisateur avec des problèmes de performance |
| `error_user` | `secret_sauce` | Utilisateur générant des erreurs |
| `visual_user` | `secret_sauce` | Utilisateur avec des problèmes visuels |

## 🛒 Produits testés

- Sauce Labs Backpack
- Sauce Labs Bike Light
- Sauce Labs Bolt T-Shirt
- Sauce Labs Fleece Jacket
- Sauce Labs Onesie
- Test.allTheThings() T-Shirt (Red)

## 📊 Types de tests inclus

### Tests de base (`saucedemo.spec.ts`)
- Login/logout
- Ajout/suppression de produits
- Gestion du panier
- Workflow complet de commande
- Tri des produits
- Navigation

### Tests par utilisateur (`users.spec.ts`)
- Test de tous les types d'utilisateurs
- Vérification des comportements spécifiques
- Gestion des utilisateurs bloqués

### Tests avancés (`advanced.spec.ts`)
- Validation des champs obligatoires
- Gestion des prix et tri
- Workflow avec annulation/reprise
- Tests avec données spécifiques

## 🎨 Page Object Model

Le projet utilise le pattern Page Object Model pour une meilleure maintenabilité :

- **LoginPage** : Gestion de la connexion
- **InventoryPage** : Gestion de l'inventaire et des produits
- **CartPage** : Gestion du panier
- **CheckoutPage** : Gestion du processus de commande

## 📝 Configuration

La configuration Playwright inclut :
- Tests multi-navigateurs (Chrome, Firefox, Safari)
- Génération de rapports HTML
- Captures d'écran et vidéos en cas d'échec
- Mode parallèle pour optimiser les performances

## 🐛 Débogage

Pour déboguer les tests :
```bash
# Mode debug interactif
npm run test:debug

# Voir les traces en cas d'échec
npx playwright show-trace trace.zip
```

## 📈 Rapports

Les rapports de test sont générés automatiquement et incluent :
- Résultats détaillés par test
- Captures d'écran des échecs
- Métriques de performance
- Traces d'exécution
