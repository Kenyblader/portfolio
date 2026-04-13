

export const datas = {
    email: 'matickeny@gmail.com',
  github: 'https://github.com/kenyblader',
  linkedin: 'https://www.linkedin.com/in/reins-keny-sineu-nouleughe/',
  cv: '/cv.pdf', // place ton CV dans /public/cv.pdf
  name: 'Sineu Nouleughe Reins Keny',
  title: 'Développeur Fullstack',
  bio: 'Du pixel au serveur, je construis des expériences qui durent.',
  available: true,
  presentation: [
    {
      title: 'Développeur Frontend',
      techs: [
        {
          name: 'React',
          type: 'bibliothèque',
          icon: '/icons/react.svg'
        },
        {
          name: 'Angular',
          type: 'framework',
                icon:'/icons/angular.svg'
            },
            {
                name: 'Typescript',
                type: 'language',
                icon:'/icons/typescript.svg'
            },
            {
                name: 'Flutter',
                type: 'framework',
                icon:'/icons/flutter.svg'
            },
            {
                name: 'Next.js',
                type: 'framework',
                icon:'/icons/nextdotjs.svg'
            }]
        },
        {title: 'developpeur back end',
            techs:[{
                name:'Node.js',
                type: 'runtime',
                icon:'/icons/nodedotjs.svg'
            },
            {
                name:'Express',
                type: 'framework',
                icon:'/icons/express.svg'
            },
            {
                name:'Nestjs',
                type: 'framework',
                icon: '/icons/nestjs.svg'
            },
            {
                name: 'Spring Boot',
                type: 'framework',
                icon:'/icons/springboot.svg'
            }]
        },
        {
            title: 'outils',
            techs:[{
                name:'Git',
                type: 'version control',
                icon:'/icons/git.svg'
            },
        {
            name:'Docker',
            type: 'containerization',
            icon:'/icons/docker.svg'
        },
        {name: 'Github',
            type: 'platform',
            icon:'/icons/github.svg'
         },
         {
            name: 'Jira',
            type: 'project management',
            icon:'/icons/jira.svg'
         }
        ]
    }],
    projects:[
    {
        "id": "1b65cd66-bde9-41df-8ea5-368794f8c26f",
        "title": "Portfolio",
        "description": "application react + nest permetant de presenter mon profil, mes realisations mes competences ",
        "github": "https://github.com/Kenyblader/portfolio",
        "link": "https://portfolio-three-sand-82.vercel.app/",
        "image": "https://res.cloudinary.com/dpzq9zpiy/image/upload/v1762773677/portfolio/ubzhkeix35bv32acgmqc.png",
        "imagePublicId": "portfolio/ubzhkeix35bv32acgmqc",
        "createdAt": "2025-11-10T11:21:19.000Z",
        "updatedAt": "2025-12-20T16:56:33.000Z",
        "date": "2025-11-10T11:21:19.000Z"
    },
    {
        "id": "5237a476-3e3a-4047-b806-54d10c2b8ad3",
        "title": "SmartyCoord",
        "description": "SmartyCoord est une plateforme web développée avec Angular, Firebase et Cloudinary, offrant la planification des activités, la gestion des tâches, le suivi des dépenses, la génération de rapports et la synchronisation en temps réel via un tableau de bord interactif.",
        "github": "https://github.com/Kenyblader/Smartycoord",
        "link": "https://smartycoord.vercel.app/",
        "image": "https://res.cloudinary.com/dpzq9zpiy/image/upload/v1762733752/portfolio/m43wtqoibxcorjb6ec9a.png",
        "imagePublicId": "portfolio/m43wtqoibxcorjb6ec9a",
        "createdAt": "2025-11-10T00:15:53.000Z",
        "updatedAt": "2025-12-20T16:57:26.000Z",
        "date": "2025-11-10T00:15:53.000Z"
    },
    {
        "id": "edac9b63-86d3-4109-81fb-05d0e132a50a",
        "title": "cv-app",
        "description": "application web ui permet aun utilisateur d'adapter un cv existant en fonction du profil rechercher sur une offre d'emplois a partier du profil du candadat et d'un cv existant ,  avec un chat integere et desagent personalisables",
        "github": "https://github.com/Fokam07/NextJscours/tree/main/chat-app",
        "link": undefined,
        "image": undefined,
        "imagePublicId": undefined,
        "createdAt": "2026-04-06T14:40:10.000Z",
        "updatedAt": "2026-04-06T14:40:55.000Z",
        "date": "2026-04-06T14:40:10.000Z"
    }],
    about: {
    quote: {
        before: "Je ne code pas juste des apps — je construis des ",
        highlight: "expériences",
        after: " qui ont du sens."
    },
    sub: "Développeur fullstack basé à Paris, passionné par l'intersection entre design, technologie et impact réel.",
    cards: [
      {
        icon: '👤',
        title: 'Qui je suis',
        text: "Je m'appelle Reins Keny, développeur fullstack avec une vraie sensibilité pour le design. J'aime transformer des idées complexes en interfaces simples et élégantes.",
        tags: []
      },
      {
        icon: '⚡',
        title: 'Ce qui me passionne',
        text: "L'intersection entre code et créativité. Les animations bien pensées, les architectures propres, et les projets qui résolvent de vrais problèmes.",
        tags: ['UI/UX', 'Open source', 'IA']
      },
      {
        icon: '🤝',
        title: 'Ma façon de travailler',
        text: "Code propre, communication directe, livraison fiable. Je préfère poser les bonnes questions plutôt que de foncer dans la mauvaise direction.",
        tags: []
      }
    ]
  },
};
