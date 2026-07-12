---
name: EcoSphere
colors:
  surface: '#eafef1'
  surface-dim: '#cbdfd2'
  surface-bright: '#eafef1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e4f9ec'
  surface-container: '#def3e6'
  surface-container-high: '#d9ede0'
  surface-container-highest: '#d3e7db'
  on-surface: '#0e1f17'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#23342c'
  inverse-on-surface: '#e1f6e9'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#1b6b51'
  on-secondary: '#ffffff'
  secondary-container: '#a6f2d1'
  on-secondary-container: '#237157'
  tertiary: '#005ac2'
  on-tertiary: '#ffffff'
  tertiary-container: '#71a1ff'
  on-tertiary-container: '#00367a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#a6f2d1'
  secondary-fixed-dim: '#8bd6b6'
  on-secondary-fixed: '#002116'
  on-secondary-fixed-variant: '#00513b'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#eafef1'
  on-background: '#0e1f17'
  surface-variant: '#d3e7db'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 32px
  gutter: 24px
  card-gap: 24px
  form-stack: 16px
  inline-sm: 8px
---

## Brand & Style
The design system is anchored in the concept of "Data Transparency for a Greener Future." It targets enterprise-level sustainability officers who require a balance of high-density information and a calming, professional atmosphere. 

The visual style is **Corporate Modern with a Neo-Ecological lean**. It leverages massive amounts of whitespace (airy) and a disciplined structural grid to make complex ESG datasets feel manageable and trustworthy. The aesthetic avoids "clutter" by using hairline borders and tonal backgrounds instead of heavy shadows, evoking a sense of precision and environmental clarity.

## Colors
This design system utilizes a specialized "Off-Mint" base to reduce eye strain during long periods of data auditing. 

- **The Primary Palette** uses Emerald and Forest greens to signify growth and environmental health.
- **The Sidebar** is the visual anchor, utilizing a deep vertical gradient to provide a high-contrast navigation area that separates global controls from the workspace.
- **Module Accents** use a subtle 10% alpha tint for backgrounds to allow for multi-colored categorizations (Environmental vs. Social) without breaking the clean, professional aesthetic.
- **Semantic Colors** are used strictly for compliance and risk status, ensuring "non-compliant" red stands out against the predominantly green UI.

## Typography
The typography is built on **Inter**, chosen for its exceptional legibility in data-heavy environments. 

- **Headings:** Use Semibold (600) weights with slight negative letter-spacing to create a "premium" editorial feel.
- **Body Text:** Standardizes on 14px for general use and 13px for dense data tables or secondary meta-info.
- **Labels:** Small labels use a 5% tracking (letter-spacing) and Medium/Semibold weights to ensure they remain legible even at 11px or 12px sizes.
- **Hierarchy:** Deep Forest (#065F46) can be used for section headers to provide extra visual distinction from the Charcoal primary text.

## Layout & Spacing
The design system follows a strict **8px grid system**. 

- **Sidebar:** Fixed width of 260px.
- **Main Canvas:** Fluid with a max-width of 1440px for content containers to maintain readability. 
- **Grid:** Use a 12-column grid for dashboards. Typical "Score Cards" should span 3 columns (4 cards per row) or 4 columns (3 cards per row).
- **Margins:** Standard outer canvas margin is 32px to reinforce the "airy" brand personality.

## Elevation & Depth
This design system avoids heavy drop shadows in favor of a **Layered Flat** approach:

1.  **Level 0 (Background):** Soft Off-White/Mint (#F6F9F7).
2.  **Level 1 (Cards/Content):** Pure White (#FFFFFF) with a 1px hairline border in #E5EAE8.
3.  **Level 2 (Dropdowns/Modals):** Pure White with a very subtle "Ambient Glow" (0px 4px 20px rgba(0, 0, 0, 0.04)).

Depth is primarily communicated through color shifts (tints) and borders rather than physical shadows, maintaining a "clean and surgical" aesthetic for data reporting.

## Shapes
The shape language is professional and restrained. 

- **Standard Radius:** 8px (Small/Soft) is the default for cards, inputs, and primary containers.
- **Pill Shapes:** Reserved exclusively for status badges and tags (e.g., "Compliant", "Social") to differentiate "metadata" from "interactive elements."
- **Interactive States:** Hovering over a card may result in the hairline border darkening to the Primary Emerald color, rather than scaling the card.

## Components
- **Buttons:** Primary buttons use the Emerald (#10B981) fill with white text. Ghost buttons use Forest (#065F46) text with no border unless hovered.
- **Score Cards:** Large 24px Semibold numbers. A small Sparkline (chart) should be placed in the bottom right corner of the card using the relevant Module Accent color.
- **Data Tables:** No vertical borders. Horizontal rows are separated by the #E5EAE8 hairline. Header row has a 5% Charcoal tint background.
- **Pill Badges:** 10% tint background of the category color with the 100% saturation color for the text (e.g., Environmental: Light Green bg, Dark Green text).
- **Input Fields:** 1px border (#E5EAE8), 8px radius. Focus state uses a 1px Emerald border and a soft Emerald outer glow.
- **Charts:** Use a custom "Eco" palette. Primary series is always Emerald. Comparison series is Slate Gray or Ocean Blue. Ensure all chart lines have a 2px stroke width for clarity.