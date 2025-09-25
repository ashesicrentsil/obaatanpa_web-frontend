# 📸 Obaatanpa Images Directory

This directory contains all images used in the Obaatanpa website. Follow this guide to add your images with the correct names and locations.

## 📁 Directory Structure

```
public/images/
├── hero/                    # Hero section images
├── testimonials/           # Customer testimonial photos
├── blog/                   # Blog post featured images
├── features/               # Why Obaatanpa feature card backgrounds
├── icons/                  # Custom icons and logos
├── placeholder.svg         # Default placeholder (already exists)
└── hero-pattern.svg        # Background pattern (already exists)
```

## 🖼️ Required Images

### 🌟 Hero Section
**Location:** `public/images/hero/`

| Filename | Description | Recommended Size | Used In |
|----------|-------------|------------------|---------|
| `hero-mother-baby.jpg` | Main hero image of happy Ghanaian mother with baby | 800x600px | Hero Section |

**Current code reference:**
```jsx
// In HeroSection.tsx
<Image src="/images/hero/hero-mother-baby.jpg" alt="Happy Ghanaian mother with baby" />
```

### 👥 Testimonials
**Location:** `public/images/testimonials/`

| Filename | Description | Recommended Size | Used In |
|----------|-------------|------------------|---------|
| `testimonial-1.jpg` | Akosua Mensah (Accra) | 300x300px | Testimonial Carousel |
| `testimonial-2.jpg` | Ama Osei (Kumasi) | 300x300px | Testimonial Carousel |
| `testimonial-3.jpg` | Efua Asante (Tamale) | 300x300px | Testimonial Carousel |
| `testimonial-4.jpg` | Adwoa Boateng (Cape Coast) | 300x300px | Testimonial Carousel |

**Current code reference:**
```jsx
// In TestimonialSection.tsx
image: '/images/testimonials/testimonial-1.jpg'
```

### 📰 Blog Posts
**Location:** `public/images/blog/`

| Filename | Description | Recommended Size | Used In |
|----------|-------------|------------------|---------|
| `nutrition-guide.jpg` | Nutrition guide featured image | 600x400px | Featured Content |
| `labor-prep.jpg` | Labor preparation article image | 600x400px | Featured Content |
| `postpartum-care.jpg` | Postpartum care article image | 600x400px | Featured Content |

**Current code reference:**
```jsx
// In FeaturedContentSection.tsx
image: '/images/blog/nutrition-guide.jpg'
```

### 🎯 Feature Cards
**Location:** `public/images/features/`

| Filename | Description | Recommended Size | Used In |
|----------|-------------|------------------|---------|
| `hospital-search.jpg` | Hospital/medical facility image | 400x320px | Why Obaatanpa Cards |
| `educational-resources.jpg` | Books/learning/education image | 400x320px | Why Obaatanpa Cards |
| `nutrition-plans.jpg` | Healthy food/nutrition image | 400x320px | Why Obaatanpa Cards |
| `ask-midwife.jpg` | Midwife/healthcare professional | 400x320px | Why Obaatanpa Cards |
| `appointments.jpg` | Calendar/scheduling image | 400x320px | Why Obaatanpa Cards |
| `community-support.jpg` | Group of mothers/community | 400x320px | Why Obaatanpa Cards |

**Current code reference:**
```jsx
// In WhyObaatanpaSection.tsx
image: '/images/features/hospital-search.jpg'
```

### 🎨 Icons & Logos
**Location:** `public/images/icons/`

| Filename | Description | Recommended Size | Used In |
|----------|-------------|------------------|---------|
| `logo.svg` or `logo.png` | Main Obaatanpa logo | 120x40px (3:1 ratio) | Navigation Bar |
| `favicon.ico` | Website favicon | 32x32px | Browser tab |

**Current code reference:**
```jsx
// In Navigation.tsx
<Image src="/images/icons/logo.svg" alt="Obaatanpa Logo" />
```

## 📐 Image Guidelines

### ✅ **Recommended Specifications:**

**📱 Hero Images:**
- **Format:** JPG or WebP
- **Size:** 800x600px minimum
- **Quality:** High resolution, well-lit
- **Content:** Authentic Ghanaian mothers/families

**👤 Testimonial Photos:**
- **Format:** JPG or PNG
- **Size:** 300x300px (square)
- **Quality:** Clear, professional headshots
- **Content:** Diverse representation of Ghanaian women

**📖 Blog Images:**
- **Format:** JPG or WebP
- **Size:** 600x400px (3:2 aspect ratio)
- **Quality:** High resolution, relevant to content
- **Content:** Healthcare, pregnancy, baby care themes

**🎯 Icons:**
- **Format:** PNG or SVG
- **Size:** Vector or high resolution
- **Quality:** Clean, simple designs
- **Content:** Brand-consistent styling

### 🎨 **Style Guidelines:**

- **Colors:** Align with brand palette (#e67d82, #7da8e6)
- **Mood:** Warm, caring, professional, culturally relevant
- **People:** Diverse representation of Ghanaian families
- **Quality:** Professional photography preferred
- **Lighting:** Bright, natural lighting
- **Background:** Clean, uncluttered backgrounds

## 🔄 How to Add Images

### 1. **Save Your Images**
Place your images in the appropriate folders with the exact filenames listed above.

### 2. **Verify Paths**
Make sure the file paths in the code match your image locations:
```
/images/hero/hero-mother-baby.jpg
/images/testimonials/testimonial-1.jpg
/images/blog/nutrition-guide.jpg
```

### 3. **Test Loading**
After adding images, refresh your browser at `http://localhost:3002` to see them load.

### 4. **Optimize for Web**
- Compress images for faster loading
- Use WebP format when possible
- Keep file sizes under 500KB for best performance

## 🚀 Quick Start

1. **Download/prepare your images**
2. **Rename them according to the table above**
3. **Place them in the correct folders**
4. **Refresh the website to see changes**

## 📝 Current Status

✅ **Folders Created:** All image directories are ready
✅ **Placeholders:** Currently using placeholder.svg for all images
✅ **Code Ready:** All image paths are properly configured
⏳ **Waiting:** For you to add real images

## 🔧 Need Help?

If you need to:
- **Change image names:** Update the corresponding component files
- **Add new images:** Follow the same folder structure
- **Optimize images:** Use tools like TinyPNG or ImageOptim

Your images will automatically appear on the website once you place them in the correct locations with the right names! 🎉
