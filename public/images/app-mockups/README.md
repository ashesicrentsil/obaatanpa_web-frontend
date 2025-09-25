# 📱 App Mockup Images for Download Section

This directory contains the phone mockup images used in the Download App section of the homepage.

## 📋 Required Images

### 1. **phone-1-welcome.png** (Left Phone)
- **Dimensions**: 400x800px (2:1 ratio)
- **Content**: Welcome/Login screen of the Obaatanpa app
- **Suggested Elements**:
  - Obaatanpa logo at top
  - "Welcome to Obaatanpa" heading
  - "Your maternal care companion" subtitle
  - Login/signup form or expert cards
  - Pink and blue gradient background
  - Professional, clean design

### 2. **phone-2-dashboard.png** (Center Phone - Main)
- **Dimensions**: 480x960px (2:1 ratio) 
- **Content**: Main dashboard of the Obaatanpa app
- **Suggested Elements**:
  - "Your Dashboard" or pregnancy week tracker
  - Progress cards (appointments, articles read)
  - Baby development information
  - Today's tips section
  - Navigation tabs at bottom
  - Gradient cards with pink/blue colors

### 3. **phone-3-community.png** (Right Phone)
- **Dimensions**: 400x800px (2:1 ratio)
- **Content**: Community chat or support screen
- **Suggested Elements**:
  - "Community Chat" header
  - Chat messages between mothers
  - Expert advice from doctors/midwives
  - Supportive, warm conversation
  - Message bubbles in different colors
  - Names like "Akosua M.", "Dr. Ama Osei"

## 🎨 Design Guidelines

### **Color Scheme**
- **Primary Pink**: #F59297 / #e67d82
- **Primary Blue**: #7da8e6
- **Background**: Light gradients from pink to blue
- **Text**: Dark gray (#374151) for readability
- **Cards**: White backgrounds with subtle shadows

### **Typography**
- **Headings**: Bold, clear fonts (Poppins-style)
- **Body Text**: Clean, readable fonts
- **Sizes**: Appropriate for mobile screens

### **Layout**
- **Status Bar**: Include realistic iOS/Android status bar
- **Safe Areas**: Respect phone bezels and rounded corners
- **Content**: Well-spaced, not cramped
- **Branding**: Consistent with Obaatanpa brand

## 📐 Technical Specifications

### **File Format**
- **Format**: PNG with transparency
- **Quality**: High resolution for crisp display
- **Optimization**: Compressed for web use

### **Phone Frame**
- **Style**: Modern smartphone with rounded corners
- **Color**: Black or dark gray frame
- **Shadow**: Subtle drop shadow for depth

### **Content Area**
- **Background**: App-appropriate colors
- **Elements**: Realistic app interface
- **Text**: Readable at small sizes
- **Icons**: Clear and recognizable

## 🔄 Implementation

The images are used in the `DownloadAppSection.tsx` component with the following properties:

```tsx
// Left Phone
<Image
  src="/images/app-mockups/phone-1-welcome.png"
  alt="Obaatanpa App Welcome Screen"
  width={200}
  height={400}
  className="w-48 h-auto rounded-3xl shadow-2xl object-contain"
/>

// Center Phone (Main)
<Image
  src="/images/app-mockups/phone-2-dashboard.png"
  alt="Obaatanpa App Dashboard"
  width={240}
  height={480}
  className="w-56 h-auto rounded-3xl shadow-2xl object-contain"
/>

// Right Phone
<Image
  src="/images/app-mockups/phone-3-community.png"
  alt="Obaatanpa App Community Chat"
  width={200}
  height={400}
  className="w-48 h-auto rounded-3xl shadow-2xl object-contain"
/>
```

## 🎯 Visual Effects

The phones have the following animations:
- **Left Phone**: Rotates 12° by default, straightens to 6° on hover
- **Center Phone**: Scales up 5% on hover
- **Right Phone**: Rotates -12° by default, straightens to -6° on hover
- **All Phones**: Smooth transitions and shadow effects

## 📝 Notes

- Images should showcase the key features of the Obaatanpa app
- Content should be relevant to maternal care and pregnancy
- Design should feel professional and trustworthy
- Text should be readable even at small sizes
- Colors should match the overall website branding
