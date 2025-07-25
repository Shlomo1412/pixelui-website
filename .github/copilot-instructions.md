<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file
this file is AI generated cuz I'm lazy 
                    - Shlomo -->

# PixelUI Documentation Website - Copilot Instructions

This is a static documentation website for the PixelUI framework, a comprehensive UI library for ComputerCraft/CC: Tweaked.

## Project Context

- **Purpose**: Beautiful, comprehensive documentation for PixelUI framework
- **Technology Stack**: HTML5, CSS3, Vanilla JavaScript
- **Target Audience**: ComputerCraft developers and Lua programmers
- **Design Goal**: Modern, responsive, accessible documentation site

## Code Standards

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Follow BEM methodology for CSS classes where applicable
- Maintain proper document structure with heading hierarchy

### CSS
- Use CSS custom properties (CSS variables) defined in :root
- Follow mobile-first responsive design approach
- Use CSS Grid and Flexbox for layouts
- Maintain consistent spacing using CSS custom properties
- Support both light and dark themes using data-theme attribute

### JavaScript
- Use ES6+ features and modern JavaScript
- Implement class-based architecture for components
- Use vanilla JavaScript without framework dependencies
- Follow event-driven programming patterns
- Maintain separation of concerns

## Framework Information

The PixelUI framework provides:
- 30+ UI widgets (buttons, inputs, charts, modals, etc.)
- Animation system with easing functions
- Theme support with customizable colors
- Event handling (mouse, keyboard, drag, focus)
- Layout containers (scrollable, draggable)
- Modal dialogs and overlays

## Styling Guidelines

- Primary color: #3b82f6 (blue)
- Accent color: #10b981 (green)
- Use Inter font for body text, JetBrains Mono for code
- Border radius: 0.375rem (sm), 0.5rem (md), 0.75rem (lg)
- Shadows: Use CSS custom property variables
- Transitions: Use consistent timing (0.15s fast, 0.3s normal, 0.5s slow)

## Component Architecture

Each major feature should be implemented as a class:
- ThemeManager: Handles light/dark theme switching
- WidgetShowcase: Manages widget filtering and display
- APIReference: Handles API documentation navigation
- SmoothScroll: Manages navigation scrolling
- MobileMenu: Handles responsive menu behavior

## Content Updates

- Widget data is stored in the `widgetData` array
- API documentation is in the `apiData` object
- Both should be easily updatable without touching other code
- Code examples should use proper Lua syntax for ComputerCraft

## Performance Considerations

- Minimize DOM manipulations
- Use event delegation where appropriate
- Lazy load heavy content (syntax highlighting)
- Optimize images and assets
- Use efficient CSS selectors

## Accessibility Requirements

- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for images
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly markup
- Focus management for interactive elements

## Browser Support

Target modern browsers with support for:
- CSS Grid and Flexbox
- ES6+ JavaScript features
- CSS custom properties
- Intersection Observer API
- Modern DOM APIs

When implementing new features, ensure they work across the supported browser range and follow the established patterns in the existing codebase.
