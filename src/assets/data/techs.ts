import { ITech } from "../../models/tech";

export const TECHS_REGISTRY: Record<string, ITech> = {
  // Languages
  typescript:   { name: 'TypeScript',   icon: 'https://cdn.simpleicons.org/typescript/3178C6',   type: 'language' },
  javascript:   { name: 'JavaScript',   icon: 'https://cdn.simpleicons.org/javascript/F7DF1E',   type: 'language' },
  python:       { name: 'Python',       icon: 'https://cdn.simpleicons.org/python/3776AB',       type: 'language' },
  java:         { name: 'Java',         icon: 'https://cdn.simpleicons.org/openjdk/ffffff',      type: 'language' },
  dart:         { name: 'Dart',         icon: 'https://cdn.simpleicons.org/dart/0175C2',         type: 'language' },

  // Frameworks / Libraries
  react:        { name: 'React',        icon: 'https://cdn.simpleicons.org/react/61DAFB',        type: 'library' },
  nextjs:       { name: 'Next.js',      icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff',    type: 'framework' },
  vue:          { name: 'Vue',          icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D',     type: 'framework' },
  angular:      { name: 'Angular',      icon: 'https://cdn.simpleicons.org/angular/DD0031',      type: 'framework' },
  flutter:      { name: 'Flutter',      icon: 'https://cdn.simpleicons.org/flutter/02569B',      type: 'framework' },
  nestjs:       { name: 'NestJS',       icon: 'https://cdn.simpleicons.org/nestjs/E0234E',       type: 'framework' },
  express:      { name: 'Express',      icon: 'https://cdn.simpleicons.org/express/ffffff',      type: 'framework' },
  springboot:   { name: 'Spring Boot',  icon: 'https://cdn.simpleicons.org/springboot/6DB33F',   type: 'framework' },
  tailwind:     { name: 'Tailwind',     icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',  type: 'framework' },

  // Databases
  postgresql:   { name: 'PostgreSQL',   icon: 'https://cdn.simpleicons.org/postgresql/4169E1',   type: 'database' },
  mongodb:      { name: 'MongoDB',      icon: 'https://cdn.simpleicons.org/mongodb/47A248',      type: 'database' },
  mysql:        { name: 'MySQL',        icon: 'https://cdn.simpleicons.org/mysql/4479A1',        type: 'database' },
  redis:        { name: 'Redis',        icon: 'https://cdn.simpleicons.org/redis/FF4438',        type: 'database' },
  firebase:     { name: 'Firebase',     icon: 'https://cdn.simpleicons.org/firebase/FFCA28',     type: 'database' },
  supabase:     { name: 'Supabase',     icon: 'https://cdn.simpleicons.org/supabase/3ECF8E',     type: 'database' },

  // DevOps / Tools
  docker:       { name: 'Docker',       icon: 'https://cdn.simpleicons.org/docker/2496ED',       type: 'devops' },
  git:          { name: 'Git',          icon: 'https://cdn.simpleicons.org/git/F05032',          type: 'tool' },
  github:       { name: 'GitHub',       icon: 'https://cdn.simpleicons.org/github/ffffff',       type: 'tool' },
  jira:         { name: 'Jira',         icon: 'https://cdn.simpleicons.org/jira/0052CC',         type: 'tool' },
  figma:        { name: 'Figma',        icon: 'https://cdn.simpleicons.org/figma/F24E1E',        type: 'tool' },
  cloudinary:   { name: 'Cloudinary',   icon: 'https://cdn.simpleicons.org/cloudinary/3448C5',   type: 'tool' },
  nodejs:       { name: 'Node.js',      icon: 'https://cdn.simpleicons.org/nodedotjs/339933',    type: 'framework' },
};

export const getTech = (key: string): ITech | undefined => TECHS_REGISTRY[key];