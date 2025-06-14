# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## ✅ Fonctionnalités connectées à la base de données (MongoDB)
Les fonctionnalités suivantes sont conçues pour fonctionner avec une base de données MongoDB locale :

🔐 Création de compte utilisateur : les utilisateurs peuvent s’enregistrer via un formulaire, les données sont stockées dans la base.

🔑 Authentification (login) : les utilisateurs peuvent se connecter grâce à un système sécurisé avec JWT et bcrypt.

🐾 Consultation des races : la page "Races" récupère dynamiquement les données de MongoDB (nom, groupe, origine, image, description...).

ℹ️ Note importante : Ces fonctionnalités nécessitent que la base de données MongoDB soit installée et démarrée localement, et que le backend soit accessible avec un .env correctement configuré.

Si l'application ne parvient pas à se connecter au backend (par exemple sur un autre PC, comme celui de mon professeur, où la base ou le serveur ne sont pas disponibles), elle passe automatiquement en mode offline.
Dans ce mode, les données sont simulées côté front-end avec des éléments statiques (hardcoded), permettant de visualiser l’interface et le fonctionnement général, même sans connexion réelle à la base.



---

## 🔧 Fonctionnalités simulées (non connectées à la base de données)

Certaines fonctionnalités sont en cours de développement, ou bien simulées côté front-end pour représenter l’interface :

- 🐶 **Offres d’adoption** : données statiques (hardcoded) pour illustrer l’interface de la page.
- 🍽️ **Planification des repas** : simulation d’un ajout de repas visible à l’écran, sans persistance.
- 💉 **Rappels de vaccination** : interface prévue mais non connectée pour le moment.

---
