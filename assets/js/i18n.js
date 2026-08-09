(function () {
  "use strict";

  const TRANSLATIONS = {
    en: {
      "Accueil": "Home",
      "Club": "Club",
      "Apprentissage": "Learning",
      "Blog": "Blog",
      "Portfolio": "Portfolio",
      "Contact": "Contact",
      "Navigation principale": "Main navigation",
      "Accueil TianSemi": "TianSemi home",
      "Ouvrir le menu": "Open menu",
      "Fermer le menu": "Close menu",
      "Langue du site": "Site language",
      "Changer de thème": "Change theme",
      "Aller au contenu principal": "Skip to main content",
      "TianSemi Corp.": "TianSemi Corp.",
      "Page introuvable — TianSemi": "Page not found — TianSemi",
      "Apprentissage TianSemi — Parcours réseau et cybersécurité": "TianSemi Learning — Networking and cybersecurity paths",
      "Quiz interactif TianSemi — Réseaux et Cybersécurité": "TianSemi Interactive Quiz — Networking and Cybersecurity",
      "Cloud DevOps — Parcours Apprentissage TianSemi": "Cloud DevOps — TianSemi Learning Track",
      "Apprendre la Cybersécurité — Parcours TianSemi": "Learn Cybersecurity — TianSemi Track",
      "Attaques courantes — Fiche Cybersécurité TianSemi": "Common attacks — TianSemi Cybersecurity Guide",
      "Intelligence artificielle — Parcours TianSemi": "Artificial Intelligence — TianSemi Track",
      "Linux — Parcours Apprentissage TianSemi": "Linux — TianSemi Learning Track",
      "Programmation — Parcours Apprentissage TianSemi": "Programming — TianSemi Learning Track",
      "Adressage IP — Fiche Réseaux TianSemi": "IP Addressing — TianSemi Networking Guide",
      "Cette page est introuvable": "This page cannot be found",
      "Le lien que vous avez suivi est peut-être incorrect ou la page a été déplacée. Revenez vers une ressource TianSemi pour continuer.": "The link you followed may be incorrect or the page may have moved. Return to a TianSemi resource to continue.",
      "Retour à l’accueil": "Back to home",
      "Nous contacter": "Contact us",

      "Club Réseau & Cybersécurité · INPHB": "Network & Cybersecurity Club · INP-HB",
      "Apprendre, sécuriser, construire.": "Learn, secure, build.",
      "TianSemi rassemble des ressources pratiques, des outils interactifs et des projets pour progresser ensemble en réseau, cybersécurité et numérique.": "TianSemi brings together practical resources, interactive tools and projects to help learners progress in networking, cybersecurity and digital skills.",
      "Découvrir le club": "Discover the club",
      "Commencer à apprendre": "Start learning",
      "Commencer dès maintenant": "Start now",
      "Révisez avec les flashcards TOEIC ou testez vos connaissances avec le quiz interactif.": "Review with TOEIC flashcards or test your knowledge with the interactive quiz.",
      "outils interactifs disponibles": "interactive tools available",
      "mots à réviser dans les flashcards TOEIC": "words to review in the TOEIC flashcards",
      "catégories de vocabulaire TOEIC": "TOEIC vocabulary categories",
      "Un portail, quatre pôles": "One portal, four pillars",
      "Chaque pôle se construit progressivement. Les pages provisoires présentent déjà les accès utiles, sans promettre de contenu qui n’existe pas encore.": "Each pillar is being built progressively. Temporary pages already provide useful access points without promising content that does not exist yet.",
      "Découvrez l’histoire, la mission et la vision de TianSemi, club Réseau & Cybersécurité de l’INPHB.": "Discover the story, mission and vision of TianSemi, the INP-HB Network & Cybersecurity Club.",
      "Choisissez une filière — Réseaux, Cybersécurité, Linux, Programmation, Cloud/DevOps ou IA — puis pratiquez avec les outils disponibles.": "Choose a track — Networking, Cybersecurity, Linux, Programming, Cloud/DevOps or AI — then practice with the available tools.",
      "Découvrez les premiers articles TianSemi : introduction cybersécurité, retour Huawei ICT mondial et tutoriel réseau.": "Discover the first TianSemi articles: cybersecurity introduction, Huawei ICT world-stage feedback and a networking tutorial.",
      "Explorez prochainement les réalisations et le parcours de Moulo Oholo Jean Noël.": "Explore Moulo Oholo Jean Noël’s achievements and career path.",
      "En savoir plus": "Learn more",
      "Lire le blog": "Read the blog",
      "Échangeons autour de votre besoin": "Let’s discuss your needs",
      "Envoyer": "Send",
      "Nom": "Name",
      "Téléphone": "Phone",
      "Message": "Message",
      "Écrivez votre message...": "Write your message...",

      "Plateforme d’apprentissage": "Learning platform",
      "Choisissez votre parcours TianSemi.": "Choose your TianSemi path.",
      "Les filières TianSemi structurent les ressources du club pour progresser étape par étape : bases réseau, culture cybersécurité, systèmes Linux, développement, cloud/devops et intelligence artificielle.": "TianSemi tracks organize the club’s resources so learners can progress step by step: networking basics, cybersecurity culture, Linux systems, development, cloud/devops and artificial intelligence.",
      "Voir les filières": "View tracks",
      "Faire le quiz": "Take the quiz",
      "Réviser le TOEIC": "Review TOEIC",
      "Espace membre": "Member area",
      "Bienvenue sur la plateforme.": "Welcome to the platform.",
      "Connectez-vous avec Google pour que TianSemi reconnaisse votre profil. Le suivi de progression sera ajouté dans une phase future ; aucune donnée de progression n’est enregistrée ici.": "Sign in with Google so TianSemi can recognize your profile. Progress tracking will be added in a future phase; no progress data is stored here.",
      "Se connecter avec Google": "Sign in with Google",
      "Profil reconnu": "Profile recognized",
      "Bonjour": "Hello",
      ", prêt à progresser ?": ", ready to progress?",
      "Votre session Google est active. Pour l’instant, la plateforme personnalise uniquement l’accueil ; le suivi de progression sera ajouté dans une évolution dédiée.": "Your Google session is active. For now, the platform only personalizes the welcome area; progress tracking will be added in a dedicated evolution.",
      "Continuer mon parcours": "Continue my path",
      "Se déconnecter": "Sign out",
      "6 filières": "6 tracks",
      "Parcours disponibles": "Available tracks",
      "Chaque filière donne une porte d’entrée claire. Certaines pages seront enrichies progressivement, mais l’arborescence est prête pour accueillir les contenus du club.": "Each track provides a clear entry point. Some pages will be enriched progressively, but the structure is ready to host the club’s content.",
      "Débutant": "Beginner",
      "Intermédiaire": "Intermediate",
      "Avancé": "Advanced",
      "Réseaux": "Networking",
      "Cybersécurité": "Cybersecurity",
      "Programmation": "Programming",
      "Intelligence artificielle": "Artificial intelligence",
      "Comprendre les bases des architectures réseau, de l’adressage et du diagnostic technique.": "Understand the basics of network architectures, addressing and technical diagnostics.",
      "Découvrir l’hygiène numérique, les menaces courantes, la veille et les premiers réflexes sécurité.": "Discover digital hygiene, common threats, monitoring and first security reflexes.",
      "Prendre en main l’environnement Linux, la ligne de commande, le scripting et l’administration système.": "Get started with Linux, the command line, scripting and system administration.",
      "Développer les bases nécessaires pour automatiser, créer des outils et contribuer aux projets web.": "Build the fundamentals needed to automate, create tools and contribute to web projects.",
      "Explorer les pratiques de déploiement, d’automatisation, d’infrastructure et de collaboration technique.": "Explore deployment, automation, infrastructure and technical collaboration practices.",
      "Comprendre les usages de l’IA et ses liens avec les données, l’automatisation et la cybersécurité.": "Understand AI use cases and its links with data, automation and cybersecurity.",
      "Ouvrir la filière": "Open track",
      "Auto-évaluation": "Self-assessment",
      "Outils pour pratiquer dès maintenant": "Tools to practice now",
      "Les outils existants ne sont plus isolés : ils deviennent des points d’entrée pratiques pour tester son niveau et progresser dans un parcours.": "The existing tools are no longer isolated: they become practical entry points to test your level and progress through a path.",
      "Tester ses connaissances": "Test your knowledge",
      "Utilisez le quiz comme outil d’auto-évaluation après une session de révision ou une activité TianSemi. Il sert de point de départ pour identifier les notions à renforcer.": "Use the quiz as a self-assessment tool after a review session or TianSemi activity. It helps identify the concepts to reinforce.",
      "Réseaux / sécurité": "Networking / security",
      "Renforcer l’anglais professionnel": "Strengthen professional English",
      "Les flashcards TOEIC aident à progresser sur le vocabulaire utile aux certifications, documentations, formations internationales et compétitions techniques.": "TOEIC flashcards help you improve vocabulary useful for certifications, documentation, international training and technical competitions.",
      "227 mots": "227 words",
      "13 catégories": "13 categories",
      "Ouvrir les flashcards": "Open flashcards",
      "Comment les utiliser dans votre progression ?": "How should you use them in your progress?",
      "Commencez par choisir une filière, puis utilisez le Quiz après une séance Réseaux ou Cybersécurité pour vérifier vos acquis. Utilisez les flashcards TOEIC en parallèle pour renforcer l’anglais technique utile aux certifications, documentations et compétitions internationales.": "Start by choosing a track, then use the Quiz after a Networking or Cybersecurity session to check your understanding. Use the TOEIC flashcards alongside it to strengthen the technical English needed for certifications, documentation and international competitions.",

      "Objectifs d’apprentissage": "Learning objectives",
      "Ressources disponibles": "Available resources",
      "Retour aux filières": "Back to tracks",
      "Retour Cybersécurité": "Back to Cybersecurity",
      "Retour Réseaux": "Back to Networking",
      "Ressources initiales": "Initial resources",
      "Premiers points d’entrée": "First entry points",
      "Outils recommandés": "Recommended tools",
      "Prérequis": "Prerequisites",
      "Niveau recommandé": "Recommended level",
      "Blog associé": "Related blog",
      "Articles pour prolonger la filière Cybersécurité": "Articles to continue the Cybersecurity track",
      "Lire la fiche": "Read the guide",
      "Ouvrir le quiz": "Open quiz",
      "Ouvrir TOEIC": "Open TOEIC",
      "Réviser le vocabulaire technique": "Review technical vocabulary",
      "Réviser le TOEIC": "Review TOEIC",
      "Renforcer l’anglais technique": "Strengthen technical English",
      "Quiz interactif": "Interactive quiz",
      "Flashcards TOEIC": "TOEIC flashcards",
      "Filière prioritaire · Débutant": "Priority track · Beginner",
      "Filière · Débutant": "Track · Beginner",
      "Filière · Intermédiaire": "Track · Intermediate",
      "Filière · Avancé": "Track · Advanced",
      "Filière Cybersécurité · Fiche débutant": "Cybersecurity track · Beginner guide",
      "Filière Réseaux · Fiche débutant": "Networking track · Beginner guide",
      "Fiche débutant": "Beginner guide",
      "Métadonnées de la ressource": "Resource metadata",
      "Durée : 20 min": "Duration: 20 min",
      "Niveau : débutant": "Level: beginner",
      "Sujet : hygiène sécurité": "Topic: security hygiene",
      "À retenir": "Key takeaways",
      "Continuer": "Continue",

      "Profil professionnel": "Professional portfolio",
      "Portfolio professionnel": "Professional portfolio",
      "Moulo Oholo Jean Noël": "Moulo Oholo Jean Noël",
      "Profil orienté réseaux, cybersécurité et transformation numérique, avec une démarche centrée sur l'apprentissage, la pratique et la transmission. À travers TianSemi, M. Moulo contribue à structurer des ressources utiles pour progresser en réseau, sécurité informatique et culture numérique.": "Profile focused on networking, cybersecurity and digital transformation, with an approach centered on learning, practice and knowledge sharing. Through TianSemi, Mr. Moulo helps structure useful resources for progress in networking, information security and digital culture.",
      "Télécharger le CV FR": "Download French CV",
      "Download English CV": "Download English CV",
      "Contact recruteur": "Recruiter contact",
      "Voir les certifications": "View certifications",
      "Réseaux": "Networking",
      "Formation": "Education",
      "Outils pédagogiques": "Learning tools",
      "Profil": "Profile",
      "CV téléchargeable": "Downloadable CV",
      "Parcours": "Career path",
      "Compétences": "Skills",
      "Certifications": "Certifications",
      "Projets réels": "Real projects",
      "Télécharger le CV PDF — FR": "Download PDF CV — FR",
      "Download CV PDF — EN": "Download PDF CV — EN",
      "Contacter M. Moulo": "Contact Mr. Moulo",
      "Compétences professionnelles": "Professional skills",
      "Certifications professionnelles": "Professional certifications",
      "Contact professionnel": "Professional contact",
      "Ouvert aux opportunités": "Open to opportunities",
      "Envoyer le message": "Send message",

      "Site vitrine Club TianSemi": "TianSemi Club showcase site",
      "Club TianSemi — Réseau et Cybersécurité INPHB": "TianSemi Club — INP-HB Networking and Cybersecurity",
      "Identité du club": "Club identity",
      "Club Réseau & Cybersécurité · INPHB": "Network & Cybersecurity Club · INP-HB",
      "TianSemi, apprendre, sécuriser, construire.": "TianSemi: learn, secure, build.",
      "TianSemi rassemble des étudiants et contributeurs autour d’un objectif simple : progresser ensemble en réseau, cybersécurité et numérique par la pratique, le partage de ressources et la réalisation d’outils concrets.": "TianSemi brings students and contributors together around one simple goal: progress together in networking, cybersecurity and digital skills through practice, resource sharing and concrete tools.",
      "Commencer à apprendre": "Start learning",
      "Voir les activités": "View activities",
      "Voir le portfolio": "View portfolio",
      "Contacter le club": "Contact the club",
      "Actions principales du club": "Main club actions",
      "Chiffres clés TianSemi": "TianSemi key figures",
      "Ancrage académique du club": "Academic anchoring of the club",
      "outils interactifs déjà publiés": "interactive tools already published",
      "mots TOEIC disponibles en flashcards": "TOEIC words available as flashcards",
      "catégories de vocabulaire structurées": "structured vocabulary categories",
      "Identité du club TianSemi": "TianSemi club identity",
      "Histoire": "Story",
      "Mission": "Mission",
      "Vision": "Vision",
      "Une initiative née d’un besoin concret": "An initiative born from a concrete need",
      "TianSemi se structure progressivement autour d’un constat : les étudiants ont besoin de ressources pratiques, accessibles et contextualisées pour passer de la théorie à l’action en réseau, cybersécurité et numérique. Le site sert aujourd’hui de première vitrine publique à cette dynamique.": "TianSemi is gradually being structured around one observation: students need practical, accessible and contextualized resources to move from theory to action in networking, cybersecurity and digital skills. The site now serves as the first public showcase for this momentum.",
      "Former par la pratique et le partage": "Train through practice and sharing",
      "La mission de TianSemi est d’aider les membres à apprendre, expérimenter et transmettre. Le club met en avant des outils concrets, des parcours d’apprentissage et une culture de contribution responsable pour développer des compétences utiles.": "TianSemi’s mission is to help members learn, experiment and share knowledge. The club promotes concrete tools, learning paths and a culture of responsible contribution to develop useful skills.",
      "Devenir un repère technique étudiant": "Become a student technical reference point",
      "TianSemi vise à devenir un point de référence étudiant pour l’apprentissage des réseaux, de la cybersécurité et des technologies numériques, avec des contenus fiables, des projets réels et une ouverture vers les partenaires académiques et professionnels.": "TianSemi aims to become a student reference point for learning networking, cybersecurity and digital technologies, with reliable content, real projects and openness to academic and professional partners.",
      "Axes de travail": "Work areas",
      "Apprentissage guidé": "Guided learning",
      "Parcours réseau, cybersécurité, Linux, programmation, cloud/devops et IA à structurer progressivement.": "Networking, cybersecurity, Linux, programming, cloud/devops and AI paths to be structured progressively.",
      "Outils pédagogiques": "Learning tools",
      "Quiz interactif et flashcards TOEIC déjà disponibles pour apprendre par la pratique.": "Interactive quiz and TOEIC flashcards already available for practice-based learning.",
      "Culture sécurité": "Security culture",
      "Sensibilisation, veille technique et montée en compétences autour des bonnes pratiques numériques.": "Awareness, technical monitoring and skills development around good digital practices.",
      "Consulter les activités réelles": "View real activities",
      "Rejoindre le club": "Join the club",
      "Les chiffres institutionnels qui nécessitent validation du bureau — année de création officielle, nombre de membres actifs et liste détaillée des projets menés — seront publiés après confirmation. Cette page affiche uniquement les informations déjà vérifiables sur la plateforme.": "Institutional figures requiring board validation — official founding year, number of active members and detailed list of completed projects — will be published after confirmation. This page only displays information already verifiable on the platform.",
      "Activités": "Activities",
      "Rejoindre": "Join",
      "Rejoindre TianSemi": "Join TianSemi",
      "Activités TianSemi": "TianSemi activities",
      "Rayonnement · Activités": "Outreach · Activities",
      "Cette page documente uniquement les activités réellement confirmées. Elle sera enrichie progressivement avec les initiatives validées par le bureau du club.": "This page only documents confirmed real activities. It will be progressively enriched with initiatives validated by the club board.",
      "Retour au club": "Back to club",
      "Synthèse des activités": "Activity summary",
      "activité réelle documentée": "real documented activity",
      "cycle de préparation concerné": "preparation cycle concerned",
      "compétition ICT ciblée": "targeted ICT competition",
      "communauté étudiante concernée": "student community concerned",
      "Huawei ICT Compétition 2026-2027 training": "Huawei ICT Competition 2026-2027 training",
      "Cycle 2026–2027": "2026–2027 cycle",
      "Session de préparation et d’entraînement autour de la Huawei ICT Competition 2026–2027. Cette activité vise à accompagner les étudiants dans la montée en compétences sur les thématiques liées aux réseaux, aux technologies ICT et aux exigences d’une compétition technique internationale.": "Preparation and training session for the Huawei ICT Competition 2026–2027. This activity supports students in building skills related to networking, ICT technologies and the requirements of an international technical competition.",
      "Compétition": "Competition",
      "Critère à compléter : le backlog demande au moins 3 activités documentées au lancement. Une seule activité réelle a été confirmée pour l’instant ; les prochaines cartes seront ajoutées dès validation d’autres activités par le bureau TianSemi.": "Criterion to complete: the backlog requires at least 3 documented activities at launch. Only one real activity has been confirmed so far; the next cards will be added as soon as other activities are validated by the TianSemi board.",
      "Devenir membre": "Become a member",
      "Recrutement · Communauté TianSemi": "Recruitment · TianSemi community",
      "Vous souhaitez progresser en réseau, cybersécurité et numérique dans une communauté orientée pratique ? Déposez votre demande d’adhésion : le bureau TianSemi pourra vous recontacter avec les prochaines étapes.": "Do you want to progress in networking, cybersecurity and digital skills within a practice-oriented community? Submit your membership request: the TianSemi board will be able to contact you with the next steps.",
      "Remplir le formulaire": "Fill out the form",
      "Découvrir le club": "Discover the club",
      "Pourquoi rejoindre ?": "Why join?",
      "TianSemi est pensé comme un espace de progression collective : apprendre, pratiquer, documenter et contribuer à des ressources utiles pour les étudiants.": "TianSemi is designed as a space for collective progress: learning, practicing, documenting and contributing useful resources for students.",
      "Participer à des activités réseau, cybersécurité et ICT": "Take part in networking, cybersecurity and ICT activities",
      "Progresser avec des outils pédagogiques et projets concrets": "Progress with learning tools and concrete projects",
      "Partager ses connaissances avec d’autres étudiants": "Share knowledge with other students",
      "Préparer des compétitions et initiatives techniques": "Prepare for competitions and technical initiatives",
      "Processus actuel": "Current process",
      "Le processus d’adhésion est centralisé via ce formulaire. Les demandes reçues sont transmises au contact officiel TianSemi pour suivi par le bureau du club.": "The membership process is centralized through this form. Requests received are sent to the official TianSemi contact for follow-up by the club board.",
      "Formulaire d’adhésion": "Membership form",
      "Nom complet": "Full name",
      "E-mail": "Email",
      "Téléphone (facultatif)": "Phone (optional)",
      "Si renseigné, utilisez le format international avec indicatif pays.": "If provided, use the international format with country code.",
      "Profil": "Profile",
      "Sélectionnez votre profil": "Select your profile",
      "Étudiant INPHB": "INP-HB student",
      "Étudiant autre établissement": "Student from another institution",
      "Partenaire / intervenant": "Partner / speaker",
      "Autre": "Other",
      "Domaine d’intérêt principal": "Main area of interest",
      "Sélectionnez un domaine": "Select an area",
      "Compétitions ICT": "ICT competitions",
      "Motivation": "Motivation",
      "Présentez brièvement votre motivation, votre niveau actuel et ce que vous souhaitez apprendre ou apporter au club.": "Briefly introduce your motivation, your current level and what you want to learn or contribute to the club.",
      "Envoyer ma demande": "Send my application",

      "Blog technique": "Technical blog",
      "Comprendre, documenter, transmettre.": "Understand, document, share.",
      "Les articles TianSemi partagent des bases techniques, des retours d’expérience et des guides pratiques pour aider les étudiants à progresser en réseau, cybersécurité et numérique.": "TianSemi articles share technical fundamentals, experience feedback and practical guides to help students progress in networking, cybersecurity and digital skills.",
      "Tous les articles": "All articles",
      "Tous": "All",
      "Actualités": "News",
      "Retours d’expérience": "Experience feedback",
      "Lire l’article": "Read article",
      "Pour aller plus loin": "Go further",
      "Articles similaires": "Related articles",
      "Durée de lecture": "Reading time",
      "Introduction à la cybersécurité : comprendre les bases avant les outils": "Introduction to cybersecurity: understand the basics before the tools",
      "Retour d’expérience Huawei ICT : maîtrise, rapidité et mental": "Huawei ICT experience feedback: mastery, speed and mindset",
      "Tutoriel réseau : diagnostiquer une connectivité pas à pas": "Networking tutorial: diagnose connectivity step by step",

      "Quiz Interactif": "Interactive Quiz",
      "Testez vos connaissances avec ce quiz amusant!": "Test your knowledge with this fun quiz!",
      "Filière associée : Réseaux & Cybersécurité": "Related track: Networking & Cybersecurity",
      "Utilisez ce quiz après une séance réseau ou cybersécurité pour identifier les notions à renforcer. Les questions servent de passerelle vers les ressources des filières prioritaires TianSemi.": "Use this quiz after a networking or cybersecurity session to identify concepts to reinforce. The questions act as a bridge to TianSemi’s priority track resources.",
      "Consulter les ressources Réseaux": "View Networking resources",
      "Consulter les ressources Cybersécurité": "View Cybersecurity resources",
      "Bienvenue au Quiz!": "Welcome to the Quiz!",
      "Ce quiz contient différents types de questions : vrai/faux, choix multiples et choix unique. Bonne chance!": "This quiz includes true/false, multiple-choice and single-choice questions. Good luck!",
      "Commencer le Quiz": "Start Quiz",
      "Question": "Question",
      "Précédent": "Previous",
      "Suivant": "Next",
      "Soumettre": "Submit",
      "Résultats du Quiz": "Quiz Results",
      "Votre score :": "Your score:",
      "Voir la Correction": "View Correction",
      "Recommencer": "Restart",
      "Se déconnecter": "Sign out"
    }
  };

  Object.assign(TRANSLATIONS.en, {
    "Portfolio Moulo Oholo — Réseaux et Cybersécurité": "Moulo Oholo Portfolio — Networking and Cybersecurity",
    "Ce portfolio présente le parcours professionnel de M. Moulo dans les domaines des réseaux, de la cybersécurité et des outils numériques. L'objectif est de permettre à un recruteur ou partenaire d'évaluer rapidement son positionnement, ses réalisations et les ressources concrètes associées à son travail.": "This portfolio presents Mr. Moulo’s professional path in networking, cybersecurity and digital tools. Its goal is to help recruiters and partners quickly assess his positioning, achievements and the concrete resources connected to his work.",
    "Le CV PDF à jour est disponible directement depuis cette page. Le fichier pèse moins de 2 Mo et peut être conservé ou partagé en interne par un recruteur.": "The up-to-date PDF CV is available directly from this page. The file is under 2 MB and can be saved or shared internally by a recruiter.",
    "Orientation professionnelle — Réseaux & cybersécurité": "Professional focus — Networking & cybersecurity",
    "Parcours centré sur les infrastructures réseau, la sécurité informatique et l'accompagnement à la montée en compétences par la pratique.": "A path focused on network infrastructure, information security and practical skills development.",
    "TianSemi — ressources numériques et apprentissage": "TianSemi — digital resources and learning",
    "Contribution à la construction d'une plateforme TianSemi organisée autour du portfolio, du club, des parcours d'apprentissage et de contenus techniques.": "Contribution to building the TianSemi platform around the portfolio, the club, learning tracks and technical content.",
    "Projets pédagogiques — Quiz & TOEIC": "Learning projects — Quiz & TOEIC",
    "Mise à disposition d'outils interactifs existants : quiz de connaissances et flashcards TOEIC, intégrés dans l'espace d'apprentissage du site.": "Delivery of existing interactive tools: a knowledge quiz and TOEIC flashcards integrated into the site’s learning area.",
    "Spécialités": "Specialties",
    "Réseaux informatiques": "Computer networking",
    "Compréhension des fondamentaux réseau et vulgarisation de notions techniques.": "Understanding of networking fundamentals and ability to explain technical concepts clearly.",
    "Culture sécurité appliquée aux usages, aux infrastructures et à la sensibilisation des apprenants.": "Security culture applied to everyday usage, infrastructure and learner awareness.",
    "Transmission": "Knowledge sharing",
    "Création de supports et outils pour faciliter l'apprentissage progressif.": "Creation of resources and tools that support progressive learning.",
    "Voir le détail des compétences": "View detailed skills",
    "Cette page remplace la logique d'icônes génériques du template par des compétences alignées sur le profil réseaux/cybersécurité et les réalisations TianSemi déjà visibles. Les niveaux pourront être affinés après validation détaillée du CV et des certifications.": "This page replaces the template’s generic icon list with skills aligned with the networking/cybersecurity profile and the TianSemi work already visible. Levels can be refined after detailed validation of the CV and certifications.",
    "Les niveaux ci-dessous sont indicatifs et alignés sur le positionnement public du portfolio TianSemi. Ils permettent d'évaluer rapidement les domaines de contribution sans gonfler artificiellement le profil.": "The levels below are indicative and aligned with the public positioning of the TianSemi portfolio. They help quickly assess contribution areas without artificially inflating the profile.",
    "Organisation de ressources par thèmes pour aider les apprenants à progresser sans se perdre.": "Organization of resources by topic to help learners progress without getting lost.",
    "Orientation vers l'apprentissage par la pratique et la création de supports utiles.": "Focus on learning through practice and creating useful resources.",
    "Cette page centralise les certifications, attestations et documents de formation fournis par M. Moulo. Chaque carte indique l'organisme identifié, le domaine et un lien vers le document source disponible.": "This page centralizes certifications, attestations and training documents provided by Mr. Moulo. Each card indicates the identified organization, the field and a link to the available source document.",
    "Liste des certifications et attestations de M. Moulo": "List of Mr. Moulo’s certifications and attestations",
    "M. Moulo est ouvert aux échanges professionnels liés aux réseaux, à la cybersécurité, aux outils numériques, aux projets pédagogiques et aux collaborations techniques.": "Mr. Moulo is open to professional discussions related to networking, cybersecurity, digital tools, learning projects and technical collaborations.",
    "En cas de difficulté avec le formulaire, utilisez l’e-mail professionnel :": "If you have trouble with the form, use the professional email:",

    "Choisissez votre point d’entrée.": "Choose your entry point.",
    "Contenu détaillé à produire par le club.": "Detailed content to be produced by the club.",
    "Contenu structuré à produire dans les prochains sprints.": "Structured content to be produced in upcoming sprints.",
    "Filière amorcée ; les contenus détaillés seront ajoutés après validation pédagogique.": "Track started; detailed content will be added after educational validation.",
    "Les contenus détaillés seront enrichis progressivement par le club ; les points d’entrée réels sont déjà accessibles.": "Detailed content will be progressively enriched by the club; real entry points are already available.",
    "Ce parcours pose les fondations indispensables pour comprendre comment les équipements communiquent : adressage, architecture, diagnostic et premiers réflexes de dépannage.": "This track lays the essential foundations for understanding how devices communicate: addressing, architecture, diagnosis and first troubleshooting reflexes.",
    "Ce parcours donne les bases pour adopter une culture sécurité : comprendre les risques, protéger ses usages, reconnaître les attaques courantes et progresser vers des pratiques plus avancées.": "This track provides the foundations for adopting a security culture: understanding risks, protecting your usage, recognizing common attacks and moving toward more advanced practices.",
    "Ce parcours introduit les bases nécessaires pour comprendre le web, automatiser des tâches et contribuer progressivement aux outils TianSemi.": "This track introduces the basics needed to understand the web, automate tasks and gradually contribute to TianSemi tools.",
    "Ce parcours introduit les usages de l’IA, la notion de données, l’automatisation et les enjeux de sécurité associés aux outils intelligents.": "This track introduces AI use cases, data concepts, automation and security issues associated with intelligent tools.",
    "Ce parcours prépare aux pratiques modernes de livraison logicielle : versionnement, automatisation, déploiement et exploitation responsable.": "This track prepares learners for modern software delivery practices: versioning, automation, deployment and responsible operations.",
    "Parcours destiné à prendre en main Linux, la ligne de commande, les permissions, le scripting et les bases d’administration système.": "A track designed to get started with Linux, the command line, permissions, scripting and system administration basics.",
    "Bases techniques nécessaires à la compréhension, au diagnostic et à la documentation d'environnements réseau.": "Technical foundations needed to understand, diagnose and document network environments.",
    "Bonnes pratiques de protection, vigilance utilisateur et réduction des risques courants.": "Protection best practices, user vigilance and reduction of common risks.",
    "Capacité à rendre les sujets sécurité compréhensibles pour des étudiants ou utilisateurs non experts.": "Ability to make security topics understandable for students or non-expert users.",
    "Débutant motivé, à l’aise avec l’usage quotidien d’un ordinateur.": "Motivated beginner, comfortable with everyday computer use.",
    "Débutant ou intermédiaire ; curiosité technique et rigueur sont prioritaires.": "Beginner or intermediate; technical curiosity and rigor matter most.",
    "Construire les bases utiles aux entraînements comme Huawei ICT Competition.": "Build useful foundations for training such as the Huawei ICT Competition.",
    "Flashcards TOEIC pour vocabulaire technique international.": "TOEIC flashcards for international technical vocabulary.",
    "Le TOEIC soutient les filières TianSemi en renforçant l’anglais technique utile aux certifications, documentations, compétitions ICT et ressources internationales.": "TOEIC supports TianSemi tracks by strengthening the technical English needed for certifications, documentation, ICT competitions and international resources.",
    "Faire une auto-évaluation": "Do a self-assessment",
    "Lire une architecture simple": "Read a simple architecture",
    "Lire une alerte de sécurité": "Read a security alert",
    "Comprendre l’adressage IP et les bases réseau.": "Understand IP addressing and networking basics.",
    "Comprenez OSI/TCP-IP, IPv4, masque, passerelle, DNS et les premiers tests de diagnostic.": "Understand OSI/TCP-IP, IPv4, subnet masks, gateways, DNS and first diagnostic tests.",
    "Identifiez phishing, mots de passe faibles, malwares et les bons gestes en cas d’incident.": "Identify phishing, weak passwords, malware and the right actions during an incident.",
    "Après une séance sur l’adressage ou le diagnostic, utilisez le Quiz pour vérifier les notions clés. Les flashcards TOEIC complètent le parcours en renforçant le vocabulaire technique anglais.": "After a session on addressing or diagnosis, use the Quiz to check key concepts. TOEIC flashcards complete the path by strengthening English technical vocabulary.",
    "Ces articles relient les notions du parcours à des explications et retours d’expérience plus narratifs.": "These articles connect track concepts with more narrative explanations and experience feedback.",
    "Ces lectures donnent du contexte avant d’approfondir avec les fiches et le quiz.": "These readings provide context before going deeper with guides and the quiz.",
    "Articles pour prolonger la filière Réseaux": "Articles to continue the Networking track",
    "Tutoriel réseau : diagnostiquer une panne de connectivité": "Networking tutorial: diagnose a connectivity issue",

    "Cette fiche donne les repères indispensables pour lire une configuration réseau simple : modèles OSI/TCP-IP, adresse IPv4, masque, passerelle, DNS et premiers tests de connectivité.": "This guide gives the essential reference points for reading a simple network configuration: OSI/TCP-IP models, IPv4 address, subnet mask, gateway, DNS and first connectivity tests.",
    "Cette fiche introduit les menaces les plus fréquentes pour un étudiant ou un jeune professionnel : phishing, mots de passe faibles, malwares, faux liens et mauvaises configurations.": "This guide introduces the most common threats for a student or young professional: phishing, weak passwords, malware, fake links and misconfigurations.",
    "Résumé et suite de la ressource": "Summary and next steps",
    "Après cette fiche, testez vos bases avec le quiz puis revenez enrichir vos notes.": "After this guide, test your fundamentals with the quiz, then come back and enrich your notes.",
    "Après cette fiche, testez votre compréhension avec le quiz et reliez les notions aux bases réseau.": "After this guide, test your understanding with the quiz and connect the concepts to networking basics.",
    "1. Deux modèles pour se repérer": "1. Two models for orientation",
    "2. Lire une adresse IPv4": "2. Read an IPv4 address",
    "3. Diagnostiquer dans le bon ordre": "3. Diagnose in the right order",
    "1. Les attaques à connaître en premier": "1. Attacks to know first",
    "2. Lire un message suspect": "2. Read a suspicious message",
    "3. Les premiers réflexes de protection": "3. First protection reflexes",
    "Le DNS transforme un nom en adresse IP.": "DNS turns a name into an IP address.",
    "La passerelle relie à d’autres réseaux.": "The gateway connects to other networks.",
    "Le masque indique la taille du réseau.": "The mask indicates the network size.",
    "L’IP identifie une machine.": "The IP identifies a machine.",
    "La MFA bloque de nombreuses compromissions.": "MFA blocks many compromises.",
    "Le phishing joue sur l’urgence et la confiance.": "Phishing exploits urgency and trust.",
    "Activer l’authentification multifacteur dès qu’elle est disponible.": "Enable multifactor authentication whenever available.",
    "Activer l’authentification multifacteur sur les comptes importants.": "Enable multifactor authentication on important accounts.",
    "Mettre à jour régulièrement le système, le navigateur et les applications.": "Regularly update the system, browser and applications.",
    "Mettre à jour le système, le navigateur et les applications critiques.": "Update the system, browser and critical applications.",
    "Demander un avis en cas de doute plutôt que cacher une erreur.": "Ask for advice when in doubt instead of hiding a mistake.",

    "Introduction à la cybersécurité : comprendre les bases avant les outils — TianSemi": "Introduction to cybersecurity: understand the basics before the tools — TianSemi",
    "La cybersécurité n’est pas seulement une affaire de logiciels, de firewalls ou de mots compliqués. C’est d’abord une manière de protéger des personnes, des données, des services et la confiance qui permet au numérique de fonctionner.": "Cybersecurity is not only about software, firewalls or complicated words. It is first a way to protect people, data, services and the trust that allows digital systems to work.",
    "Les trois piliers : confidentialité, intégrité, disponibilité": "The three pillars: confidentiality, integrity, availability",
    "Les menaces les plus courantes": "The most common threats",
    "Les premiers réflexes à adopter": "First reflexes to adopt",
    "Les métiers et compétences à découvrir": "Careers and skills to discover",
    "Les outils ne remplacent pas la méthode": "Tools do not replace method",
    "Comment progresser sans se disperser ?": "How to progress without getting scattered?",
    "La cybersécurité est aussi une discipline collective": "Cybersecurity is also a collective discipline",
    "La cybersécurité peut sembler vaste, mais le premier pas est accessible : apprendre les menaces courantes, adopter de bons réflexes et développer une méthode d’analyse. Un débutant n’a pas besoin de tout connaître pour progresser ; il doit surtout apprendre à poser les bonnes questions.": "Cybersecurity can seem vast, but the first step is accessible: learn common threats, adopt good reflexes and develop an analysis method. A beginner does not need to know everything to progress; they mainly need to learn how to ask the right questions.",
    "Retour d’expérience Huawei ICT : maîtrise, rapidité et mental": "Huawei ICT experience feedback: mastery, speed and mindset",
    "M. Moulo Oholo Jean Noël a terminé 3e au podium mondial avec deux autres membres de l’équipe réseau. Retour sur les leçons techniques et mentales.": "Mr. Moulo Oholo Jean Noël finished 3rd on the world podium with two other members of the networking team. A look back at the technical and mental lessons.",
    "M. Moulo Oholo Jean Noël a terminé 3e au podium mondial avec deux autres membres de l’équipe réseau lors de la phase mondiale de la Huawei ICT Competition. Voici les enseignements que TianSemi retient pour former ses membres.": "Mr. Moulo Oholo Jean Noël finished 3rd on the world podium with two other members of the networking team during the global stage of the Huawei ICT Competition. Here are the lessons TianSemi keeps for training its members.",
    "Le contexte : une compétition mondiale exigeante": "The context: a demanding global competition",
    "Le challenge : aller vite sans perdre la précision": "The challenge: move fast without losing precision",
    "Les trois leçons retenues": "The three lessons learned",
    "1. La maîtrise": "1. Mastery",
    "2. La rapidité": "2. Speed",
    "3. Le mental": "3. Mindset",
    "Le podium mondial obtenu par M. Moulo Oholo Jean Noël avec deux autres membres de l’équipe réseau montre qu’un résultat solide repose rarement sur un seul talent. Il vient d’un équilibre entre préparation, méthode, endurance mentale et coordination.": "The world podium achieved by Mr. Moulo Oholo Jean Noël with two other networking team members shows that a strong result rarely relies on talent alone. It comes from a balance of preparation, method, mental endurance and coordination.",
    "Ce retour d’expérience donne une direction claire au club : former des étudiants capables d’apprendre sérieusement, de pratiquer régulièrement et de rester solides sous pression. L’objectif n’est pas seulement de participer à une compétition, mais de construire une culture technique durable.": "This experience feedback gives the club a clear direction: train students who can learn seriously, practice regularly and remain solid under pressure. The goal is not only to take part in a competition, but to build a lasting technical culture.",
    "Le quiz a été déplacé vers": "The quiz has moved to",
    "Les flashcards TOEIC ont été déplacées vers": "TOEIC flashcards have moved to",
    "Chargement des voix anglaises gratuites...": "Loading free English voices...",
    "Choisir la langue affichée en premier": "Choose the language shown first",
    "Lire le mot en anglais": "Read the word in English",
    "Mélanger les cartes": "Shuffle cards",
    "Modifie la recherche ou la catégorie pour retrouver des cartes.": "Change the search or category to find cards.",
    "Filtrer les articles par catégorie": "Filter articles by category"
  });

  Object.assign(TRANSLATIONS.en, {
    "Schéma réseau stylisé avec routeur, postes et adresses IP.": "Stylized network diagram with router, workstations and IP addresses.",
    "Une machine": "A machine",
    "avec le masque": "with the mask",
    "est dans un autre réseau.": "is on another network.",
    "est-elle dans le même réseau ?": "is it on the same network?",
    "Une machine a l’adresse": "A machine has the address",
    "Votre ordinateur a une adresse": "Your computer has an address",
    "Ici, toutes les machines en": "Here, all machines in",
    "La passerelle répond, mais": "The gateway responds, but",
    "ne se résout pas. Le DNS devient la piste principale.": "does not resolve. DNS becomes the main lead.",
    "répond mais qu’un site ne s’ouvre pas, le DNS devient une piste sérieuse.": "responds but a website does not open, DNS becomes a serious lead.",
    "ne répond pas. Orientez l’analyse vers la sortie réseau, le routage ou le filtrage.": "does not respond. Focus the analysis on network access, routing or filtering.",
    ". Recherchez d’abord un problème DHCP ou une absence de connexion au réseau.": ". First look for a DHCP issue or a missing network connection.",
    "Découvrir le web": "Discover the web",
    "Voir le document": "View document",
    "Toutes les cartes": "All cards",
    "Retourner la carte": "Flip card",
    "Utiliser le terminal": "Use the terminal",
    "Quel est le réseau ?": "What is the network?",
    "Comprendre les bases": "Understand the basics",
    "Schéma de la méthode": "Method diagram",
    "Voir les compétences": "View skills",
    "Forensic sur Android": "Android forensics",
    "Comprendre les usages": "Understand use cases",
    "Comprendre la logique": "Understand the logic",
    "Étape 1 : vérifier la configuration locale": "Step 1: check the local configuration",
    "Étape 2 : tester la passerelle": "Step 2: test the gateway",
    "Étape 4 : tester le DNS": "Step 4: test DNS",
    "Synthèse des compétences": "Skills summary",
    "Réinitialiser les filtres": "Reset filters",
    "Comprendre les permissions": "Understand permissions",
    "Pentesting avec Metasploit": "Pentesting with Metasploit",
    "Développer une veille utile": "Build useful monitoring habits",
    "La passerelle répond-elle ?": "Does the gateway respond?",
    "Liste des activités TianSemi": "List of TianSemi activities",
    "Préparer les compétitions ICT": "Prepare for ICT competitions",
    "Internet répond-il sans DNS ?": "Does the Internet respond without DNS?",
    "Le langage SQL — Guide complet": "SQL language — Complete guide",
    "Mini-scénarios pour s’entraîner": "Mini-scenarios to practice",
    "Construire une hygiène numérique": "Build digital hygiene",
    "Identifier les menaces courantes": "Identify common threats",
    "Ce que TianSemi veut transmettre": "What TianSemi wants to pass on",
    "Valider et documenter le résultat": "Validate and document the result",
    "Identifier les données nécessaires": "Identify the necessary data",
    "Pourquoi l’utiliser dans le parcours ?": "Why use it in the path?",
    "La résolution de nom fonctionne-t-elle ?": "Does name resolution work?",
    "Quiz interactif pour vérifier ses acquis.": "Interactive quiz to check your knowledge.",
    "Sur Windows, une adresse qui commence par": "On Windows, an address that starts with",
    "Format international avec indicatif pays.": "International format with country code.",
    "Quelle pourrait être une passerelle logique ?": "What could be a logical gateway?",
    "Le service applicatif répond-il correctement ?": "Does the application service respond correctly?",
    "Pourquoi parler de cybersécurité dès le début ?": "Why talk about cybersecurity from the start?",
    "Échangeons autour de votre projet ou de TianSemi.": "Let’s discuss your project or TianSemi.",
    "Illustration d’un podium de compétition technique.": "Illustration of a technical competition podium.",
    "Un mot de passe réutilisé devient un risque global.": "A reused password becomes a global risk.",
    "Ma machine a-t-elle une configuration IP cohérente ?": "Does my machine have a consistent IP configuration?",
    "Deviner ou réutiliser un mot de passe déjà compromis.": "Guessing or reusing an already compromised password.",
    "Écrire de premiers scripts pour gagner en efficacité.": "Write first scripts to become more efficient.",
    "Aucun article ne correspond encore à cette catégorie.": "No article matches this category yet.",
    "Le câble, le Wi-Fi ou la carte réseau fonctionnent-ils ?": "Are the cable, Wi-Fi or network card working?",
    "Reconnaître les attaques courantes et réagir correctement.": "Recognize common attacks and react correctly.",
    "Variables, conditions, boucles et découpage d’un problème.": "Variables, conditions, loops and breaking down a problem.",
    "La contribution au dépôt TianSemi sert d’exercice pratique.": "Contributing to the TianSemi repository serves as a practical exercise.",
    "Lire et modifier les droits d’accès de manière responsable.": "Read and modify access rights responsibly.",
    "Le site TianSemi sert de support de contribution progressif.": "The TianSemi site serves as a progressive contribution support.",
    "L’adresse IP, le masque et la passerelle sont-ils cohérents ?": "Are the IP address, subnet mask and gateway consistent?",
    "Le service utilise-t-il TCP ou UDP ? Le port est-il joignable ?": "Does the service use TCP or UDP? Is the port reachable?",
    "HTML, CSS et JavaScript comme base des outils statiques du site.": "HTML, CSS and JavaScript as the foundation for the site’s static tools.",
    "Éviter les logiciels piratés et les pièces jointes non attendues.": "Avoid pirated software and unexpected attachments.",
    "TOEIC pour vocabulaire international utile aux documentations IA.": "TOEIC for international vocabulary useful for AI documentation.",
    "Illustration d’un bouclier numérique relié à un réseau de points.": "Illustration of a digital shield connected to a network of points.",
    "Sauvegarder les données importantes hors de la machine principale.": "Back up important data outside the main machine.",
    "Comprendre pourquoi la qualité des données influence les résultats.": "Understand why data quality influences results.",
    "Tutoriel réseau : diagnostiquer une panne de connectivité — TianSemi": "Networking tutorial: diagnose a connectivity issue — TianSemi",
    "Exposer involontairement un service, un dépôt ou une donnée sensible.": "Unintentionally exposing a service, repository or sensitive data.",
    "Lire une structure de projet, documenter et proposer une amélioration.": "Read a project structure, document it and propose an improvement.",
    "Illustration d’un bouclier numérique pour introduire la cybersécurité.": "Illustration of a digital shield introducing cybersecurity.",
    "Identifier les tâches répétitives et documenter les étapes de livraison.": "Identify repetitive tasks and document delivery steps.",
    "Installer un programme malveillant via fichier, lien ou logiciel piraté.": "Installing malicious software through a file, link or pirated software.",
    "Vérifier les liens, les domaines et les pièces jointes avant de cliquer.": "Check links, domains and attachments before clicking.",
    "Interpréter la criticité, l’impact et les actions de correction à prioriser.": "Interpret criticality, impact and the corrective actions to prioritize.",
    "Un guide pratique pour appliquer une méthode de diagnostic en quatre étapes.": "A practical guide for applying a four-step diagnostic method.",
    "Un retour concret sur l’importance des bases réseau en compétition technique.": "Concrete feedback on the importance of networking fundamentals in technical competition.",
    "Utilisez le quiz pour identifier les notions à revoir après une séance réseau.": "Use the quiz to identify concepts to review after a networking session.",
    "Un cahier de notes, un navigateur, et idéalement un outil de simulation réseau.": "A notebook, a browser and ideally a network simulation tool.",
    "Illustration d’un podium de compétition technique avec un réseau de connexions.": "Illustration of a technical competition podium with a connection network.",
    "Servez-vous du quiz pour vérifier vos bases et repérer les sujets à approfondir.": "Use the quiz to check your fundamentals and spot topics to deepen.",
    "Utilisez le formulaire pour contacter le club. Nous répondrons dès que possible.": "Use the form to contact the club. We will reply as soon as possible.",
    "Faire croire à un message légitime pour voler un mot de passe ou pousser au clic.": "Impersonating a legitimate message to steal a password or push a click.",
    "Se déplacer, manipuler fichiers/dossiers et comprendre les commandes essentielles.": "Navigate, handle files/folders and understand essential commands.",
    "Une interface plus nette pour parcourir, filtrer et mémoriser le vocabulaire utile.": "A cleaner interface to browse, filter and memorize useful vocabulary.",
    "Sauvegarder les données importantes et tester la restauration quand c’est possible.": "Back up important data and test restoration when possible.",
    "Observer les risques : confidentialité, biais, prompt injection et usage responsable.": "Observe risks: privacy, bias, prompt injection and responsible use.",
    "Utiliser une logique de vérification progressive pour isoler une panne réseau simple.": "Use progressive verification logic to isolate a simple network issue.",
    "Suivre des sources fiables et transformer une information sécurité en action concrète.": "Follow reliable sources and turn security information into concrete action.",
    "Avoir quelques notions réseau aide à comprendre les scénarios d’attaque et de défense.": "Basic networking knowledge helps understand attack and defense scenarios.",
    "Identifier les notions LAN/WAN, adresse IP, passerelle, DNS, ports et protocoles courants.": "Identify LAN/WAN concepts, IP address, gateway, DNS, ports and common protocols.",
    "Illustration professionnelle utilisée pour représenter le portfolio de Moulo Oholo Jean Noël": "Professional illustration used to represent Moulo Oholo Jean Noël’s portfolio.",
    "Un exemple concret de préparation technique, utile pour comprendre l’importance de la méthode.": "A concrete example of technical preparation, useful for understanding the importance of method.",
    "Se repérer dans un schéma réseau, distinguer les rôles des équipements et les flux principaux.": "Read a network diagram, distinguish equipment roles and main flows."
  });

  Object.assign(TRANSLATIONS.en, {
    "Un bon réflexe consiste à vérifier l’expéditeur, le domaine du lien, le contexte et la demande réelle. Un message peut utiliser un logo officiel tout en pointant vers une adresse frauduleuse.": "A good reflex is to check the sender, the link domain, the context and the actual request. A message can use an official logo while pointing to a fraudulent address.",
    "Utiliser un mot de passe unique par service, idéalement généré par un gestionnaire de mots de passe.": "Use a unique password for each service, ideally generated by a password manager.",
    "L’objectif n’est pas de paniquer, mais de réduire vite l’impact. Déconnectez la session suspecte, changez le mot de passe depuis un appareil sain, activez la MFA et signalez l’incident à une personne compétente.": "The goal is not to panic, but to quickly reduce the impact. Disconnect the suspicious session, change the password from a trusted device, enable MFA and report the incident to a competent person.",
    "Reconnaître les risques liés aux malwares, fuites de données, vulnérabilités et ingénierie sociale.": "Recognize risks related to malware, data leaks, vulnerabilities and social engineering.",
    "Utilisez le Quiz pour relier les notions sécurité aux bases réseau et à la culture cyber. Les flashcards TOEIC aident à lire plus facilement les ressources, alertes et certifications en anglais.": "Use the Quiz to connect security concepts with networking fundamentals and cyber culture. TOEIC flashcards help you read resources, alerts and certifications in English more easily.",
    "La filière sera enrichie avec des fiches pratiques, retours d’expérience et ressources de veille TianSemi.": "The track will be enriched with practical guides, experience feedback and TianSemi monitoring resources.",
    "Travaillez le vocabulaire anglais utile aux documentations de sécurité, formations et certifications.": "Work on English vocabulary useful for security documentation, training and certifications.",
    "Un article d’entrée pour comprendre les enjeux, les menaces courantes et les premiers réflexes.": "An entry article to understand the stakes, common threats and first reflexes.",
    "Un réseau peut être vu comme une pile de responsabilités. Le modèle OSI aide à raisonner couche par couche, tandis que TCP/IP correspond davantage à la réalité des réseaux modernes.": "A network can be seen as a stack of responsibilities. The OSI model helps reason layer by layer, while TCP/IP is closer to the reality of modern networks.",
    "Une adresse IPv4 identifie une machine dans un réseau. Elle est accompagnée d’un masque, qui sépare la partie réseau de la partie hôte.": "An IPv4 address identifies a machine on a network. It comes with a mask, which separates the network part from the host part.",
    "sont dans le même réseau local. La passerelle sert à sortir vers d’autres réseaux, par exemple Internet.": "are on the same local network. The gateway is used to reach other networks, such as the Internet.",
    "Quand la connexion ne fonctionne pas, il faut éviter de tester au hasard. Une méthode simple consiste à remonter progressivement depuis la machine locale vers Internet.": "When the connection does not work, avoid random testing. A simple method is to move progressively from the local machine toward the Internet.",
    "Renforcez le vocabulaire utile pour lire de la documentation et suivre des formations internationales.": "Strengthen the vocabulary needed to read documentation and follow international training.",
    "Dès qu’un étudiant utilise une messagerie, un compte cloud, un ordinateur partagé, un smartphone ou un dépôt GitHub, il entre dans un environnement où la sécurité compte. Une erreur de mot de passe, un lien mal vérifié ou un fichier exécuté trop vite peut exposer un compte, un projet ou une organisation entière. La cybersécurité commence donc bien avant les laboratoires avancés : elle commence dans les habitudes.": "As soon as a student uses email, a cloud account, a shared computer, a smartphone or a GitHub repository, they enter an environment where security matters. A password mistake, a poorly checked link or a file executed too quickly can expose an account, a project or an entire organization. Cybersecurity therefore starts long before advanced labs: it starts with habits.",
    "Pour TianSemi, apprendre la cybersécurité signifie apprendre à raisonner. Il ne s’agit pas de mémoriser une liste d’outils, mais de comprendre ce que l’on protège, contre qui, avec quels moyens et avec quelles limites. Cette logique permet de progresser sans se perdre dans la quantité immense de ressources disponibles en ligne.": "For TianSemi, learning cybersecurity means learning how to reason. It is not about memorizing a list of tools, but understanding what we protect, against whom, with which means and with which limits. This logic helps learners progress without getting lost in the huge amount of online resources.",
    "La plupart des sujets de sécurité peuvent être reliés à trois objectifs simples. La confidentialité vise à empêcher l’accès non autorisé à une information. L’intégrité garantit qu’une donnée ou un système n’a pas été modifié de façon illégitime. La disponibilité assure que le service reste accessible quand les utilisateurs en ont besoin.": "Most security topics can be connected to three simple objectives. Confidentiality prevents unauthorized access to information. Integrity ensures that data or a system has not been modified illegitimately. Availability ensures that the service remains accessible when users need it.",
    "Un vol de mot de passe menace la confidentialité. Une modification discrète d’un fichier de configuration menace l’intégrité. Une attaque qui rend un service inaccessible menace la disponibilité. Ce trio aide à analyser une situation sans paniquer : on identifie d’abord l’objectif touché, puis on choisit les actions adaptées.": "A stolen password threatens confidentiality. A silent configuration file change threatens integrity. An attack that makes a service unavailable threatens availability. This trio helps analyze a situation without panic: first identify the affected objective, then choose the right actions.",
    "Pour un débutant, les premières menaces à connaître sont très concrètes : phishing, mots de passe faibles, logiciels malveillants, appareils non mis à jour, mauvaise configuration et fuite involontaire d’informations. Ces problèmes semblent simples, mais ils restent parmi les causes les plus fréquentes d’incidents.": "For a beginner, the first threats to know are very concrete: phishing, weak passwords, malware, outdated devices, misconfiguration and accidental information leaks. These problems may seem simple, but they remain among the most frequent causes of incidents.",
    "Le phishing, par exemple, exploite la confiance et l’urgence. Le message peut paraître officiel, mais pointer vers un faux domaine. Un mot de passe réutilisé peut exposer plusieurs comptes à partir d’une seule fuite. Une mauvaise permission sur un fichier peut rendre public ce qui devait rester interne. La sécurité demande donc de la technique, mais aussi de l’attention.": "Phishing, for example, exploits trust and urgency. The message may look official while pointing to a fake domain. A reused password can expose several accounts from a single leak. A wrong file permission can make public what should remain internal. Security therefore requires technique, but also attention.",
    "Utiliser des mots de passe uniques et longs, idéalement gérés par un gestionnaire de mots de passe.": "Use unique and long passwords, ideally managed by a password manager.",
    "Un bon niveau individuel aide, mais il ne suffit pas. Dans une équipe, chacun peut devenir un point fort ou un point faible. C’est pourquoi un club comme TianSemi a un rôle important : partager les réflexes, organiser des ateliers, relire les pratiques, documenter les erreurs et créer une culture où la sécurité devient normale.": "A good individual level helps, but it is not enough. In a team, everyone can become either a strength or a weakness. That is why a club like TianSemi has an important role: share reflexes, organize workshops, review practices, document mistakes and create a culture where security becomes normal.",
    "La progression se construit étape par étape : comprendre les réseaux, pratiquer Linux, apprendre à lire des logs, suivre des alertes, documenter ses analyses, puis participer à des challenges. Les outils viendront naturellement si les bases sont solides.": "Progress is built step by step: understand networks, practice Linux, learn to read logs, follow alerts, document analyses, then take part in challenges. Tools will come naturally if the foundations are solid.",
    "La cybersécurité n’est pas un seul métier. On y trouve des profils orientés défense, comme l’analyste SOC, l’administrateur sécurité ou l’ingénieur réseau sécurisé. On y trouve aussi des profils orientés test et évaluation, comme l’auditeur, le pentester ou le participant à des exercices de type CTF. D’autres rôles concernent la gouvernance, la conformité, la sensibilisation ou la réponse à incident.": "Cybersecurity is not a single job. It includes defense-oriented profiles such as SOC analysts, security administrators or secure network engineers. It also includes testing and assessment profiles such as auditors, pentesters or CTF participants. Other roles involve governance, compliance, awareness and incident response.",
    "Pour un étudiant, il n’est pas nécessaire de choisir immédiatement une spécialité. Le plus important est de construire une base commune : comprendre les réseaux, savoir utiliser un système Linux, lire une documentation technique, écrire des notes claires et expliquer une démarche. Ces compétences transversales rendent l’apprentissage plus stable, quel que soit le métier visé ensuite.": "For a student, it is not necessary to choose a specialty immediately. The most important thing is to build a shared foundation: understand networks, use a Linux system, read technical documentation, write clear notes and explain a method. These cross-functional skills make learning more stable, whatever career path comes next.",
    "Beaucoup de débutants commencent par accumuler des vidéos, des outils et des listes de vulnérabilités. Le problème est que cette approche donne l’impression de travailler sans toujours produire une compétence durable. Une meilleure méthode consiste à choisir un thème court, pratiquer, noter ce qui a été compris, puis vérifier ses acquis avec un exercice ou un quiz.": "Many beginners start by collecting videos, tools and vulnerability lists. The problem is that this approach creates the impression of working without always building lasting skill. A better method is to choose a short topic, practice, write down what was understood, then check knowledge with an exercise or quiz.",
    "Par exemple, une semaine peut être consacrée au phishing : comprendre le principe, analyser trois exemples, écrire une checklist, puis expliquer à un autre membre comment repérer un lien suspect. Une autre semaine peut porter sur les mots de passe : longueur, réutilisation, gestionnaire, MFA et récupération de compte. Ce rythme transforme la sécurité en habitude de raisonnement.": "For example, one week can focus on phishing: understand the principle, analyze three examples, write a checklist, then explain to another member how to spot a suspicious link. Another week can focus on passwords: length, reuse, manager, MFA and account recovery. This rhythm turns security into a reasoning habit.",
    "Pour continuer, ouvrez la filière Cybersécurité de la plateforme Apprentissage TianSemi. Vous y trouverez les premières ressources, un quiz d’auto-évaluation et des liens pour structurer votre progression.": "To continue, open the Cybersecurity track on the TianSemi Learning platform. You will find first resources, a self-assessment quiz and links to structure your progress.",
    "Une phase mondiale de compétition technique n’évalue pas seulement ce qu’un participant sait. Elle mesure aussi sa capacité à mobiliser rapidement ses connaissances, à travailler sous pression et à rester lucide lorsque le temps manque. Dans un environnement réseau, la moindre hésitation peut coûter cher : une commande mal choisie, une lecture trop lente ou un diagnostic incomplet peut bloquer toute l’équipe.": "A global technical competition stage does not only assess what a participant knows. It also measures their ability to mobilize knowledge quickly, work under pressure and remain lucid when time is short. In a network environment, the slightest hesitation can be costly: a poorly chosen command, slow reading or incomplete diagnosis can block the whole team.",
    "Dans une compétition réseau, la vitesse n’est utile que si elle s’appuie sur une vraie maîtrise. Aller vite sans comprendre conduit à multiplier les erreurs. Comprendre sans exécuter rapidement peut laisser le temps filer. Le bon niveau se situe entre les deux : lire vite, reconnaître les situations, choisir une méthode et vérifier les résultats.": "In a network competition, speed is useful only when backed by real mastery. Going fast without understanding multiplies mistakes. Understanding without executing quickly can let time slip away. The right level sits between the two: read quickly, recognize situations, choose a method and verify results.",
    "C’est pour cette raison que TianSemi insiste sur les fondamentaux : adressage, routage, diagnostic, sécurité de base, lecture de configuration et documentation technique en anglais. Ces bases deviennent des réflexes lorsque la pression augmente.": "This is why TianSemi insists on fundamentals: addressing, routing, diagnosis, basic security, configuration reading and technical documentation in English. These foundations become reflexes when pressure rises.",
    "Les outils utilisés varient selon les environnements : simulateurs, interfaces de configuration, terminaux, documentation et supports d’entraînement. Mais l’outil n’est qu’un accélérateur. Ce qui compte, c’est la démarche : identifier le problème, isoler les causes possibles, tester une hypothèse, valider le résultat, puis passer à l’étape suivante.": "The tools used vary by environment: simulators, configuration interfaces, terminals, documentation and training materials. But the tool is only an accelerator. What matters is the method: identify the problem, isolate possible causes, test a hypothesis, validate the result, then move to the next step.",
    "La maîtrise vient de la répétition intelligente. Il ne suffit pas de refaire dix fois le même exercice ; il faut comprendre pourquoi une solution fonctionne, dans quelles conditions elle échoue et comment expliquer sa démarche à un autre membre.": "Mastery comes from intelligent repetition. It is not enough to repeat the same exercise ten times; you need to understand why a solution works, under which conditions it fails and how to explain the method to another member.",
    "La rapidité se prépare avant la compétition. Elle naît de fiches courtes, de commandes connues, de réflexes de vérification et d’une bonne lecture des consignes. Un étudiant rapide n’est pas celui qui se précipite : c’est celui qui perd moins de temps à choisir sa première action.": "Speed is prepared before the competition. It comes from short notes, known commands, verification reflexes and careful reading of instructions. A fast student is not the one who rushes: it is the one who wastes less time choosing the first action.",
    "Le mental devient visible quand quelque chose ne marche pas. Dans ces moments, il faut éviter de s’énerver, revenir à la méthode et communiquer simplement. Une équipe forte garde son calme, distribue les tâches et accepte de corriger vite une mauvaise piste.": "Mindset becomes visible when something does not work. In those moments, avoid getting angry, return to the method and communicate simply. A strong team stays calm, distributes tasks and accepts quickly correcting a wrong lead.",
    "Les entraînements Huawei ICT Competition 2026-2027 doivent donc être structurés : notions clés, pratique, correction, documentation et partage. Chaque séance doit laisser une trace utile pour les membres suivants.": "Huawei ICT Competition 2026-2027 training should therefore be structured: key concepts, practice, correction, documentation and sharing. Each session should leave a useful trace for future members.",
    "Quand “Internet ne marche pas”, il faut éviter les tests au hasard. Ce tutoriel propose une méthode simple en quatre étapes pour localiser rapidement une panne réseau de base.": "When “the Internet does not work”, avoid random testing. This tutorial proposes a simple four-step method to quickly locate a basic network issue.",
    "L’objectif n’est pas de résoudre toutes les pannes possibles, mais d’apprendre une démarche fiable. La plupart des problèmes débutants viennent d’une mauvaise configuration IP, d’une passerelle inaccessible, d’un souci DNS ou d’un service final indisponible. En suivant toujours le même ordre, vous gagnez du temps.": "The goal is not to solve every possible failure, but to learn a reliable method. Most beginner issues come from a bad IP configuration, an unreachable gateway, a DNS problem or an unavailable final service. By always following the same order, you save time.",
    "Commencez par lire l’adresse IP, le masque, la passerelle et les DNS. Si l’adresse est absente, incohérente ou dans un réseau inattendu, le reste des tests sera difficile à interpréter.": "Start by reading the IP address, mask, gateway and DNS. If the address is missing, inconsistent or in an unexpected network, the rest of the tests will be difficult to interpret.",
    "indique souvent que la machine n’a pas reçu d’adresse depuis le DHCP. Sur Linux, l’absence de route par défaut peut expliquer pourquoi la machine joint le réseau local mais pas Internet. Notez toujours les valeurs observées avant de modifier quoi que ce soit.": "often indicates that the machine did not receive an address from DHCP. On Linux, the absence of a default route can explain why the machine reaches the local network but not the Internet. Always write down observed values before changing anything.",
    "La passerelle est souvent la première sortie vers le reste du réseau. Si elle ne répond pas, le problème peut venir du Wi-Fi, du câble, du VLAN, de l’adresse IP ou de la passerelle elle-même.": "The gateway is often the first exit toward the rest of the network. If it does not respond, the problem may come from Wi-Fi, the cable, the VLAN, the IP address or the gateway itself.",
    "Si le ping échoue, ne concluez pas immédiatement que la passerelle est éteinte : certains équipements bloquent les réponses ICMP. Mais dans un environnement d’apprentissage ou un petit réseau local, ce test reste très utile pour vérifier rapidement la proximité réseau.": "If the ping fails, do not immediately conclude that the gateway is down: some equipment blocks ICMP replies. But in a learning environment or small local network, this test remains very useful to quickly check network proximity.",
    "Tester une adresse IP publique permet de savoir si la sortie réseau fonctionne sans dépendre de la résolution de nom. Si": "Testing a public IP address shows whether network exit works without depending on name resolution. If",
    "Si ce test échoue alors que la passerelle répond, la panne peut se situer plus loin : règle de filtrage, route absente, problème NAT ou coupure côté fournisseur. À ce stade, vous savez au moins que la machine locale et le lien vers la passerelle ne sont probablement pas la première cause.": "If this test fails while the gateway responds, the issue may be farther away: filtering rule, missing route, NAT problem or provider outage. At this stage, you at least know that the local machine and link to the gateway are probably not the first cause.",
    "Le DNS transforme un nom en adresse IP. Une panne DNS donne souvent l’impression qu’Internet est coupé, alors que la connectivité IP fonctionne encore.": "DNS turns a name into an IP address. A DNS failure often makes it feel like the Internet is down, while IP connectivity still works.",
    "Comparez toujours deux tests : un accès par adresse IP et un accès par nom. Si l’adresse répond mais pas le nom, vérifiez le serveur DNS configuré, essayez un autre nom de domaine, puis contrôlez si le navigateur n’utilise pas un cache ou un DNS privé différent.": "Always compare two tests: access by IP address and access by name. If the address responds but the name does not, check the configured DNS server, try another domain name, then verify whether the browser uses a cache or a different private DNS.",
    "Une fois la panne localisée, ne vous contentez pas de dire “ça marche”. Notez le symptôme initial, les tests effectués, le résultat de chaque commande et la correction appliquée. Cette trace aide à expliquer votre démarche, à éviter la même erreur plus tard et à transmettre l’expérience aux autres membres du club. Dans un contexte professionnel, cette habitude fait la différence entre un dépannage improvisé et un vrai diagnostic reproductible.": "Once the issue is located, do not just say “it works”. Write down the initial symptom, the tests performed, the result of each command and the correction applied. This trace helps explain your method, avoid the same mistake later and pass the experience on to other club members. In a professional context, this habit makes the difference between improvised troubleshooting and a real reproducible diagnosis.",
    "Une bonne méthode de diagnostic évite les suppositions. En partant de la machine locale, puis de la passerelle, puis d’Internet, puis du DNS, vous pouvez expliquer votre raisonnement et trouver plus vite où se situe la panne. Pour vous entraîner, refaites ce tutoriel sur deux réseaux différents et notez les résultats obtenus.": "A good diagnostic method avoids assumptions. Starting from the local machine, then the gateway, then the Internet, then DNS, you can explain your reasoning and find the issue faster. To practice, redo this tutorial on two different networks and write down the results.",
    "Un article fondateur pour comprendre les enjeux, les menaces courantes et les premiers réflexes de sécurité à adopter avant de se perdre dans les outils.": "A foundational article to understand the stakes, common threats and first security reflexes before getting lost in tools.",
    "Un tutoriel pas à pas avec commandes, tableau de diagnostic et méthode en quatre étapes pour gagner une compétence immédiatement applicable.": "A step-by-step tutorial with commands, a diagnostic table and a four-step method to gain an immediately applicable skill.",
    "Une lecture structurée des compétences utiles à un recruteur : réseaux, cybersécurité, outillage numérique et capacité à transmettre des notions techniques de façon progressive.": "A structured reading of skills useful to a recruiter: networking, cybersecurity, digital tooling and the ability to teach technical concepts progressively.",
    "Structuration de notes, supports et explications réutilisables par une équipe ou une communauté.": "Structuring notes, resources and explanations reusable by a team or community.",
    "Suivi des alertes, compréhension des risques de dépendances et logique de correction progressive.": "Alert monitoring, understanding dependency risks and progressive correction logic.",
    "Un point de contact dédié aux recruteurs et partenaires souhaitant échanger autour d’une opportunité, d’une mission, d’un stage, d’un projet réseau/cybersécurité ou d’une collaboration professionnelle.": "A dedicated contact point for recruiters and partners who want to discuss an opportunity, mission, internship, networking/cybersecurity project or professional collaboration."
  });

  const SKIP_SELECTOR = "script, style, code, pre, svg, canvas, textarea, input, select";
  const ATTRS = ["title", "aria-label", "alt", "placeholder"];
  const originals = new WeakMap();
  if (window.TianSemiNetworkEngineeringTranslations) {
    Object.assign(TRANSLATIONS.en, window.TianSemiNetworkEngineeringTranslations);
  }

  const reverseEn = Object.fromEntries(Object.entries(TRANSLATIONS.en).map(([fr, en]) => [en, fr]));

  function normalize(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function getDictionary(lang) {
    return TRANSLATIONS[lang] || {};
  }

  function translateText(text, lang) {
    const compact = normalize(text);
    if (!compact) return text;
    if (lang === "fr") {
      const original = reverseEn[compact];
      if (!original) return text;
      const leadingFr = text.match(/^\s*/)?.[0] || "";
      const trailingFr = text.match(/\s*$/)?.[0] || "";
      return `${leadingFr}${original}${trailingFr}`;
    }
    const dictionary = getDictionary(lang);
    const translated = dictionary[compact];
    if (!translated) return text;
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  }

  function shouldSkipNode(node) {
    const parent = node.parentElement;
    return !parent || Boolean(parent.closest(SKIP_SELECTOR));
  }

  function translateTextNode(node, lang) {
    if (shouldSkipNode(node)) return;
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    const original = originals.get(node);
    node.nodeValue = translateText(original, lang);
  }

  function translateAttributes(element, lang) {
    ATTRS.forEach((attr) => {
      if (!element.hasAttribute(attr)) return;
      const key = `i18nOriginal${attr.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase())}`;
      if (!element.dataset[key]) {
        element.dataset[key] = element.getAttribute(attr);
      }
      element.setAttribute(attr, translateText(element.dataset[key], lang));
    });
  }

  function walk(root, lang) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => translateTextNode(node, lang));

    root.querySelectorAll("*").forEach((element) => {
      if (!element.closest(SKIP_SELECTOR)) translateAttributes(element, lang);
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
    document.querySelectorAll("#lang, .site-nav__language").forEach((select) => {
      if (select instanceof HTMLSelectElement && select.value !== lang) select.value = lang;
    });
    walk(document.body, lang);
    document.title = translateText(document.title, lang);
    document.dispatchEvent(new CustomEvent("tiansemi:i18n", { detail: { lang } }));
  }

  function bindSelectors() {
    document.querySelectorAll("#lang, .site-nav__language").forEach((select) => {
      if (!(select instanceof HTMLSelectElement) || select.dataset.i18nBound) return;
      select.dataset.i18nBound = "true";
      select.addEventListener("change", () => applyLanguage(select.value || "fr"));
    });
  }

  function init() {
    bindSelectors();
    applyLanguage(localStorage.getItem("lang") || document.documentElement.lang || "fr");

    const observer = new MutationObserver(() => {
      bindSelectors();
      walk(document.body, localStorage.getItem("lang") || document.documentElement.lang || "fr");
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.TianSemiI18n = { applyLanguage };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
