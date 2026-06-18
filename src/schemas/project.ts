// import { defineField, defineType } from 'sanity';

// export default defineType({
//   name: 'project',
//   title: 'Projet',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'title',
//       title: 'Titre',
//       type: 'string',
//       validation: Rule => Rule.required(),
//     }),
//     defineField({
//       name: 'description',
//       title: 'Description',
//       type: 'text',
//       validation: Rule => Rule.required(),
//     }),
//     defineField({
//       name: 'image',
//       title: 'Image',
//       type: 'image',
//       options: { hotspot: true }, // recadrage intelligent
//     }),
//     defineField({
//       name: 'link',
//       title: 'Lien live',
//       type: 'url',
//     }),
//     defineField({
//       name: 'github',
//       title: 'GitHub',
//       type: 'url',
//     }),
//     defineField({
//       name: 'date',
//       title: 'Date',
//       type: 'date',
//       validation: Rule => Rule.required(),
//     }),
//     defineField({
//       name: 'techs',
//       title: 'Technologies',
//       type: 'array',
//       of: [{ type: 'string' }],
//       options: {
//         list: [
//           { title: 'TypeScript', value: 'typescript' },
//           { title: 'React',      value: 'react' },
//           { title: 'Next.js',    value: 'nextjs' },
//           { title: 'Vue',        value: 'vue' },
//           { title: 'Angular',    value: 'angular' },
//           { title: 'NestJS',     value: 'nestjs' },
//           { title: 'Node.js',    value: 'nodejs' },
//           { title: 'Docker',     value: 'docker' },
//           { title: 'PostgreSQL', value: 'postgresql' },
//           { title: 'MongoDB',    value: 'mongodb' },
//           { title: 'Firebase',   value: 'firebase' },
//           { title: 'Flutter',    value: 'flutter' },
//           { title: 'Tailwind',   value: 'tailwind' },
//           { title: 'Git',        value: 'git' },
//           { title: 'Figma',      value: 'figma' },
//           { title: 'Symfony',    value: 'symfony'}
//         ],
//       },
//     }),
//     defineField({
//       name: 'published',
//       title: 'Publié',
//       type: 'boolean',
//       initialValue: true,
//     }),
//   ],
//   orderings: [
//     {
//       title: 'Date décroissante',
//       name: 'dateDesc',
//       by: [{ field: 'date', direction: 'desc' }],
//     },
//   ],
// });

export const a =0;
