# 🌽 Festa das Tradições Nordestinas e Nortistas

![App Preview](https://imgix.cosmicjs.com/fff8b7b0-a124-11f0-bba7-d56988718db7-photo-1533174072545-7a4b6ad7a6c3-1759584072788.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A vibrant cultural blog celebrating the rich traditions, music, cuisine, and heritage of Northeastern and Northern Brazil. Built with Next.js 15, TypeScript, and powered by Cosmic CMS.

## ✨ Features

- 📝 **Dynamic Blog System** - Browse and read posts about culture, festivals, and cuisine
- 👤 **Author Profiles** - Dedicated pages for content creators with biographies and social links
- 🏷️ **Category Organization** - Filter content by Culture & Art, Festivals & Traditions, and Regional Cuisine
- 🎨 **Modern Design** - Responsive, colorful interface inspired by Brazilian festivals
- 🖼️ **Optimized Images** - Automatic image optimization using imgix
- ⚡ **Fast Performance** - Built with Next.js 15 App Router for optimal speed
- 📱 **Mobile-First** - Beautiful experience on all devices
- 🔍 **SEO Optimized** - Proper meta tags and semantic HTML

## 🎯 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e11e65260d9dd939d1bb94&clone_repository=68e1202f260d9dd939d1bbb3)

## 📚 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories about 🌽✨ Saudações a todos os corações nordestinos e nortistas! ✨🌽
>
> Hoje celebramos a riqueza de nossas tradições, a força da nossa cultura e a alegria de nosso povo! É tempo de festa, de dançar ao som das sanfonas, de saborear a saborosa culinária que nos une e de lembrar das histórias que nossos avós nos contaram sob as estrelas.
>
> Que nesta festa, possamos renovar a esperança, celebrar nossas raízes e a união que nos fortalece. Que os ritmos da nossa terra embalam nossos sonhos e que o calor humano nos envolva, proporcionando momentos de alegria e gratidão.
>
> Assim como as cores vibrantes da nossa bandeira e os sabores intensos das nossas comidas típicas, que a diversidade e a beleza da nossa cultura nos inspirem a seguir em frente, acreditando em um futuro repleto de oportunidades.
>
> Vamos juntos valorizar nossas tradições, respeitar nossos costumes e transmitir esse legado às novas gerações! Que a Festa das Tradições Nordestinas e Nortistas nos lembre da força do nosso povo e da esperança que carrega em seu coração.
>
> Feliz festa! Que a alegria e a esperança nunca nos faltem! 🎉🌺"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a blog with posts, authors, and categories about 🌽✨ Saudações a todos os corações nordestinos e nortistas! ✨🌽
>
> Hoje celebramos a riqueza de nossas tradições, a força da nossa cultura e a alegria de nosso povo! É tempo de festa, de dançar ao som das sanfonas, de saborear a saborosa culinária que nos une e de lembrar das histórias que nossos avós nos contaram sob as estrelas.
>
> Que nesta festa, possamos renovar a esperança, celebrar nossas raízes e a união que nos fortalece. Que os ritmos da nossa terra embalam nossos sonhos e que o calor humano nos envolva, proporcionando momentos de alegria e gratidão.
>
> Assim como as cores vibrantes da nossa bandeira e os sabores intensos das nossas comidas típicas, que a diversidade e a beleza da nossa cultura nos inspirem a seguir em frente, acreditando em um futuro repleto de oportunidades.
>
> Vamos juntos valorizar nossas tradições, respeitar nossos costumes e transmitir esse legado às novas gerações! Que a Festa das Tradições Nordestinas e Nortistas nos lembre da força do nosso povo e da esperança que carrega em seu coração.
>
> Feliz festa! Que a alegria e a esperança nunca nos faltem! 🎉🌺", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Image Optimization**: imgix
- **Package Manager**: bun
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your bucket set up

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({
    type: 'posts'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const posts = response.objects
```

### Fetching a Single Post

```typescript
const response = await cosmic.objects.findOne({
  type: 'posts',
  slug: 'post-slug'
}).depth(1)

const post = response.object
```

### Fetching Posts by Category

```typescript
const response = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const posts = response.objects
```

## 🎨 Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

### Content Types

1. **Posts** - Blog articles with markdown content
   - Content (markdown)
   - Featured Image
   - Category (relationship)
   - Author (relationship)
   - Publish Date

2. **Categories** - Content organization
   - Name
   - Description
   - Color (for visual distinction)

3. **Authors** - Content creators
   - Name
   - Biography
   - Photo
   - Social Links (JSON)

### Key Features

- **Depth Parameter**: Used to fetch related objects (authors and categories) in a single request
- **Image Optimization**: Featured images automatically optimized using imgix query parameters
- **Type Safety**: Full TypeScript definitions for all content types
- **Error Handling**: Graceful handling of empty results (404 errors)

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy" button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Environment Variables

Set these in your Vercel project settings:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

Built with love for the rich cultural heritage of Northeastern and Northern Brazil. Special thanks to the content creators Maria do Socorro and João Caboclo for their contributions to preserving these beautiful traditions.

---

**Viva São João! Que a alegria e a esperança nunca nos faltem! 🎉🌺**

<!-- README_END -->