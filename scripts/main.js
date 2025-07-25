// PixelUI Documentation JavaScript

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Theme management with enhanced toggle
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }
    
    init() {
        this.setTheme(this.theme);
        this.bindEvents();
    }
    
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeButton();
    }
    
    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    
    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Add keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    updateThemeButton() {
        // Update button icons
        const lightIcon = document.querySelector('.theme-icon.light-icon');
        const darkIcon = document.querySelector('.theme-icon.dark-icon');
        
        if (lightIcon && darkIcon) {
            if (this.theme === 'light') {
                lightIcon.style.display = 'block';
                darkIcon.style.display = 'none';
            } else {
                lightIcon.style.display = 'none';
                darkIcon.style.display = 'block';
            }
        }
    }
}

// Widget data
const widgetData = [
    {
        name: 'label',
        category: 'display',
        description: 'Static text display with alignment and color options',
        example: `PixelUI.label({
    x = 2, y = 2,
    text = "Hello, World!",
    color = colors.cyan
})`
    },
    {
        name: 'button',
        category: 'input',
        description: 'Interactive button with click events and styling',
        example: `PixelUI.button({
    x = 2, y = 4,
    text = "Click Me",
    background = colors.blue,
    onClick = function()
        print("Button clicked!")
    end
})`
    },
    {
        name: 'textBox',
        category: 'input',
        description: 'Text input field with placeholder and change events',
        example: `PixelUI.textBox({
    x = 2, y = 6,
    width = 20,
    placeholder = "Enter text...",
    onChange = function(self, text)
        print("Text changed: " .. text)
    end
})`
    },
    {
        name: 'checkBox',
        category: 'input',
        description: 'Toggle checkbox with labels and state management',
        example: `PixelUI.checkBox({
    x = 2, y = 8,
    text = "Enable feature",
    checked = false,
    onToggle = function(self, checked)
        print("Checked: " .. tostring(checked))
    end
})`
    },
    {
        name: 'slider',
        category: 'input',
        description: 'Value slider with range and step controls',
        example: `PixelUI.slider({
    x = 2, y = 10,
    width = 15,
    min = 0,
    max = 100,
    value = 50,
    onChange = function(self, value)
        print("Value: " .. value)
    end
})`
    },
    {
        name: 'rangeSlider',
        category: 'input',
        description: 'Dual-handle range slider for selecting value ranges',
        example: `PixelUI.rangeSlider({
    x = 2, y = 12,
    width = 20,
    min = 0,
    max = 100,
    minValue = 25,
    maxValue = 75,
    onChange = function(self, min, max)
        print("Range: " .. min .. " - " .. max)
    end
})`
    },
    {
        name: 'progressBar',
        category: 'feedback',
        description: 'Visual progress indicator with customizable styling',
        example: `PixelUI.progressBar({
    x = 2, y = 14,
    width = 20,
    value = 75,
    max = 100,
    color = colors.lime
})`
    },
    {
        name: 'listView',
        category: 'display',
        description: 'Scrollable list with item selection and events',
        example: `PixelUI.listView({
    x = 2, y = 16,
    width = 15,
    height = 5,
    items = {"Item 1", "Item 2", "Item 3"},
    onSelect = function(self, item, index)
        print("Selected: " .. item)
    end
})`
    },
    {
        name: 'container',
        category: 'layout',
        description: 'Layout container for organizing child widgets',
        example: `local container = PixelUI.container({
    x = 2, y = 18,
    width = 20,
    height = 10,
    border = true,
    isScrollable = true
})

container:addChild(PixelUI.label({
    x = 2, y = 2,
    text = "Inside container"
}))`
    },
    {
        name: 'toggleSwitch',
        category: 'input',
        description: 'Modern toggle switch for boolean values',
        example: `PixelUI.toggleSwitch({
    x = 2, y = 20,
    text = "Enable notifications",
    checked = true,
    onToggle = function(self, checked)
        print("Toggle: " .. tostring(checked))
    end
})`
    },
    {
        name: 'radioButton',
        category: 'input',
        description: 'Single selection from a group of options',
        example: `PixelUI.radioButton({
    x = 2, y = 22,
    text = "Option 1",
    group = "options",
    checked = true,
    onSelect = function(self)
        print("Option 1 selected")
    end
})`
    },
    {
        name: 'comboBox',
        category: 'input',
        description: 'Dropdown selection list with expandable options',
        example: `PixelUI.comboBox({
    x = 2, y = 24,
    width = 15,
    items = {"Option A", "Option B", "Option C"},
    selectedIndex = 1,
    onSelect = function(self, item, index)
        print("Selected: " .. item)
    end
})`
    },
    {
        name: 'tabControl',
        category: 'navigation',
        description: 'Tabbed interface for organizing content',
        example: `PixelUI.tabControl({
    x = 2, y = 26,
    width = 25,
    height = 8,
    tabs = {"Tab 1", "Tab 2", "Tab 3"},
    selectedIndex = 1,
    onChange = function(self, index)
        print("Tab " .. index .. " selected")
    end
})`
    },
    {
        name: 'numericUpDown',
        category: 'input',
        description: 'Numeric input with increment/decrement buttons',
        example: `PixelUI.numericUpDown({
    x = 2, y = 28,
    width = 10,
    value = 42,
    min = 0,
    max = 100,
    step = 1,
    onChange = function(self, value)
        print("Value: " .. value)
    end
})`
    },
    {
        name: 'groupBox',
        category: 'layout',
        description: 'Visual grouping container with border and title',
        example: `PixelUI.groupBox({
    x = 2, y = 30,
    width = 20,
    height = 6,
    title = "Settings Group",
    titleColor = colors.yellow
})`
    },
    {
        name: 'canvas',
        category: 'display',
        description: 'Custom drawing surface for pixel-level graphics',
        example: `PixelUI.canvas({
    x = 2, y = 32,
    width = 20,
    height = 10,
    onDraw = function(self)
        -- Custom drawing code here
        term.setBackgroundColor(colors.red)
        term.setCursorPos(self.x + 5, self.y + 5)
        term.write("  ")
    end
})`
    },
    {
        name: 'chart',
        category: 'display',
        description: 'Data visualization with line, bar, and scatter charts',
        example: `PixelUI.chart({
    x = 2, y = 34,
    width = 25,
    height = 12,
    data = {
        {x = 1, y = 10},
        {x = 2, y = 25},
        {x = 3, y = 15}
    },
    chartType = "line",
    title = "Sample Chart"
})`
    },
    {
        name: 'msgBox',
        category: 'feedback',
        description: 'Modal message box dialog with buttons and icons',
        example: `PixelUI.msgBox({
    title = "Confirmation",
    message = "Are you sure?",
    buttons = {"Yes", "No"},
    icon = "question",
    onButton = function(box, index, text)
        print("User clicked: " .. text)
    end
})`
    },
    {
        name: 'colorPicker',
        category: 'input',
        description: 'Interactive color picker with palette and preview',
        example: `PixelUI.colorPicker({
    x = 2, y = 36,
    selectedColor = colors.blue,
    onColorSelected = function(self, color)
        print("Color selected: " .. color)
    end
})`
    },
    {
        name: 'colorPickerDialog',
        category: 'input',
        description: 'Modal color picker dialog with advanced options',
        example: `local dialog = PixelUI.colorPickerDialog({
    title = "Choose Color",
    selectedColor = colors.red,
    onColorSelected = function(color)
        print("Selected color: " .. color)
    end
})
dialog:show()`
    },
    {
        name: 'loadingIndicator',
        category: 'feedback',
        description: 'Loading bar/spinner for progress display',
        example: `PixelUI.loadingIndicator({
    x = 2, y = 38,
    width = 15,
    style = "bar",
    animated = true
})`
    },
    {
        name: 'spinner',
        category: 'feedback',
        description: 'Animated spinner with customizable styles',
        example: `PixelUI.spinner({
    x = 2, y = 40,
    style = "dots",
    color = colors.cyan,
    speed = 0.5
})`
    },
    {
        name: 'scrollBar',
        category: 'navigation',
        description: 'Standalone scrollbar widget for custom scrolling',
        example: `PixelUI.scrollBar({
    x = 22, y = 2,
    length = 15,
    orientation = "vertical",
    min = 0,
    max = 100,
    value = 50,
    onChange = function(self, value)
        print("Scroll: " .. value)
    end
})`
    },
    {
        name: 'passwordBox',
        category: 'input',
        description: 'Password input field with masked characters',
        example: `PixelUI.passwordBox({
    x = 2, y = 42,
    width = 16,
    placeholder = "Password",
    maskChar = "*",
    onChange = function(self, text)
        print("Password length: " .. #text)
    end
})`
    },
    {
        name: 'modal',
        category: 'layout',
        description: 'Custom modal container for overlays',
        example: `PixelUI.modal({
    x = 10, y = 5,
    width = 30,
    height = 15,
    title = "Modal Dialog",
    content = myContent,
    onClose = function()
        print("Modal closed")
    end
})`
    },
    {
        name: 'window',
        category: 'layout',
        description: 'Windowed UI container with title bar',
        example: `PixelUI.window({
    x = 5, y = 3,
    width = 35,
    height = 20,
    title = "My Window",
    draggable = true,
    resizable = true,
    content = windowContent
})`
    },
    {
        name: 'breadcrumb',
        category: 'navigation',
        description: 'Breadcrumb navigation for hierarchical paths',
        example: `PixelUI.breadcrumb({
    x = 2, y = 44,
    items = {"Home", "Documents", "Projects"},
    separator = " > ",
    onItemClick = function(self, item, index)
        print("Clicked: " .. item)
    end
})`
    },
    {
        name: 'treeView',
        category: 'navigation',
        description: 'Hierarchical tree view for nested data',
        example: `PixelUI.treeView({
    x = 2, y = 46,
    width = 20,
    height = 10,
    nodes = treeData,
    onNodeSelect = function(self, node)
        print("Selected: " .. node.text)
    end
})`
    },
    {
        name: 'spacer',
        category: 'layout',
        description: 'Layout spacer for adding gaps between widgets',
        example: `PixelUI.spacer({
    x = 2, y = 48,
    width = 10,
    height = 2
})`
    }
];

// API Reference data
const apiData = {
    'Core Functions': {
        'PixelUI.init()': {
            description: 'Initialize the PixelUI framework',
            syntax: 'PixelUI.init()',
            parameters: 'None',
            returns: 'None',
            example: `local PixelUI = require("pixelui")
PixelUI.init()`
        },
        'PixelUI.run()': {
            description: 'Start the main event loop',
            syntax: 'PixelUI.run(config)',
            parameters: 'config (table, optional): Configuration object with callbacks',
            returns: 'None',
            example: `PixelUI.run({
    onKey = function(key)
        if key == keys.q then
            return false -- Quit
        end
    end,
    onQuit = function()
        print("Goodbye!")
    end
})`
        },
        'PixelUI.clear()': {
            description: 'Clear all widgets from the screen',
            syntax: 'PixelUI.clear()',
            parameters: 'None',
            returns: 'None',
            example: 'PixelUI.clear()'
        },
        'PixelUI.render()': {
            description: 'Manually render all widgets',
            syntax: 'PixelUI.render()',
            parameters: 'None',
            returns: 'None',
            example: 'PixelUI.render()'
        }
    },
    'Animation': {
        'PixelUI.animate()': {
            description: 'Animate widget properties',
            syntax: 'PixelUI.animate(widget, config)',
            parameters: 'widget (object): Target widget\nconfig (table): Animation configuration',
            returns: 'Animation object',
            example: `PixelUI.animate(myButton, {
    to = { x = 10, y = 5, background = colors.red },
    duration = 1.0,
    easing = "outQuad",
    onComplete = function(widget)
        print("Animation complete!")
    end
})`
        }
    },
    'Theme System': {
        'PixelUI.setTheme()': {
            description: 'Set the global theme',
            syntax: 'PixelUI.setTheme(theme)',
            parameters: 'theme (table): Theme configuration object',
            returns: 'None',
            example: `PixelUI.setTheme({
    primary = colors.blue,
    secondary = colors.lightGray,
    background = colors.black,
    text = colors.white
})`
        }
    },
    'Event Handling': {
        'onClick': {
            description: 'Button click event handler',
            syntax: 'onClick = function(self) end',
            parameters: 'self (object): The widget that was clicked',
            returns: 'None',
            example: `onClick = function(self)
    print("Button was clicked!")
    self.text = "Clicked!"
end`
        },
        'onChange': {
            description: 'Value change event handler',
            syntax: 'onChange = function(self, value) end',
            parameters: 'self (object): The widget\nvalue: New value',
            returns: 'None',
            example: `onChange = function(self, value)
    print("New value: " .. tostring(value))
end`
        },
        'onSelect': {
            description: 'Selection event handler',
            syntax: 'onSelect = function(self, item, index) end',
            parameters: 'self (object): The widget\nitem: Selected item\nindex (number): Item index',
            returns: 'None',
            example: `onSelect = function(self, item, index)
    print("Selected item " .. index .. ": " .. item)
end`
        }
    }
};

// Widget showcase functionality
class WidgetShowcase {
    constructor() {
        this.widgets = widgetData;
        this.currentCategory = 'all';
        this.init();
    }
    
    init() {
        this.renderWidgets();
        this.bindEvents();
    }
    
    renderWidgets() {
        const grid = document.getElementById('widgets-grid');
        const filteredWidgets = this.currentCategory === 'all' 
            ? this.widgets 
            : this.widgets.filter(widget => widget.category === this.currentCategory);
        
        grid.innerHTML = filteredWidgets.map(widget => `
            <div class="widget-card" data-category="${widget.category}">
                <div class="widget-header">
                    <div class="widget-name">PixelUI.${widget.name}()</div>
                    <div class="widget-category">${widget.category}</div>
                </div>
                <div class="widget-description">${widget.description}</div>
                <div class="widget-example">
                    <pre><code class="language-lua">${widget.example}</code></pre>
                </div>
            </div>
        `).join('');
        
        // Re-highlight code
        if (window.Prism) {
            Prism.highlightAll();
        }
    }
    
    filterByCategory(category) {
        this.currentCategory = category;
        this.renderWidgets();
        
        // Update active tab
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
    }
    
    bindEvents() {
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.filterByCategory(tab.dataset.category);
            });
        });
    }
}

// Demo code animation
class DemoAnimation {
    constructor() {
        this.codeExamples = [
            `-- Create a simple button
PixelUI.button({
    x = 5, y = 3,
    text = "Hello World",
    background = colors.blue,
    onClick = function()
        print("Hello from PixelUI!")
    end
})`,
            `-- Add a text input
PixelUI.textBox({
    x = 5, y = 5,
    width = 20,
    placeholder = "Enter your name",
    onChange = function(self, text)
        print("Hello, " .. text .. "!")
    end
})`,
            `-- Create a progress bar
PixelUI.progressBar({
    x = 5, y = 7,
    width = 25,
    value = 75,
    max = 100,
    color = colors.lime
})`,
            `-- Add animation magic
PixelUI.animate(myWidget, {
    to = { x = 20, background = colors.red },
    duration = 1.0,
    easing = "outQuad"
})`
        ];
        this.currentIndex = 0;
        this.init();
    }
    
    init() {
        this.updateDemo();
        setInterval(() => this.nextExample(), 4000);
    }
    
    updateDemo() {
        const demoCode = document.getElementById('demo-code');
        if (demoCode) {
            demoCode.innerHTML = `<pre><code class="language-lua">${this.codeExamples[this.currentIndex]}</code></pre>`;
            if (window.Prism) {
                Prism.highlightAll();
            }
        }
    }
    
    nextExample() {
        this.currentIndex = (this.currentIndex + 1) % this.codeExamples.length;
        this.updateDemo();
    }
}

// Smooth scrolling for navigation with auto-advance
class SmoothScroll {
    constructor() {
        this.sections = ['hero', 'features', 'widgets', 'getting-started', 'examples', 'api', 'download'];
        this.currentSectionIndex = 0;
        this.isAutoScrolling = false;
        this.scrollThreshold = 0.9; // 90% of section height
        this.autoAdvanceEnabled = localStorage.getItem('autoAdvanceEnabled') !== 'false'; // Default to true
        this.init();
    }
    
    init() {
        // Handle navigation links with better scroll calculation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Skip empty hashes and external links
                if (href === '#' || anchor.hostname !== window.location.hostname) {
                    return;
                }
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    this.isAutoScrolling = true;
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update current section index
                    const sectionId = href.substring(1);
                    this.currentSectionIndex = this.sections.indexOf(sectionId);
                    
                    // Reset auto-scroll flag after animation
                    setTimeout(() => {
                        this.isAutoScrolling = false;
                    }, 1000);
                }
            });
        });
        
        // Add scroll detection for auto-advance
        this.setupAutoAdvance();
        
        // Add scroll to top button
        this.addScrollToTopButton();
    }
    
    setupAutoAdvance() {
        let lastScrollTime = Date.now();
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            // Don't auto-advance during manual scrolling or auto-scrolling
            if (this.isAutoScrolling) return;
            
            lastScrollTime = Date.now();
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Set timeout to check for auto-advance after scrolling stops
            scrollTimeout = setTimeout(() => {
                // Only auto-advance if user hasn't scrolled for 500ms
                if (Date.now() - lastScrollTime >= 500) {
                    this.checkAutoAdvance();
                }
            }, 500);
        });
    }
    
    checkAutoAdvance() {
        // Only auto-advance if feature is enabled
        if (!this.autoAdvanceEnabled) return;
        
        const currentSection = this.getCurrentSection();
        if (!currentSection) return;
        
        const rect = currentSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = currentSection.offsetHeight;
        
        // Check if we've scrolled to near the end of the section
        const scrollProgress = Math.abs(rect.top) / (sectionHeight - windowHeight);
        
        if (scrollProgress >= this.scrollThreshold && rect.top < 0) {
            this.advanceToNextSection();
        }
    }
    
    getCurrentSection() {
        // Find the section that's currently most visible
        let currentSection = null;
        let maxVisibleArea = 0;
        
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId) || document.querySelector('.hero');
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate visible area
            const visibleTop = Math.max(0, -rect.top);
            const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
            const visibleArea = Math.max(0, visibleBottom - visibleTop);
            
            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                currentSection = section;
                this.currentSectionIndex = this.sections.indexOf(sectionId);
            }
        });
        
        return currentSection;
    }
    
    advanceToNextSection() {
        const nextIndex = this.currentSectionIndex + 1;
        if (nextIndex >= this.sections.length) return; // Don't advance past last section
        
        const nextSectionId = this.sections[nextIndex];
        const nextSection = document.getElementById(nextSectionId);
        
        if (nextSection) {
            this.isAutoScrolling = true;
            const offsetTop = nextSection.getBoundingClientRect().top + window.pageYOffset - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            this.currentSectionIndex = nextIndex;
            
            // Reset auto-scroll flag
            setTimeout(() => {
                this.isAutoScrolling = false;
            }, 1000);
        }
    }
    
    addScrollToTopButton() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
        scrollTopBtn.title = 'Scroll to top';
        document.body.appendChild(scrollTopBtn);

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Re-create icons for the new button
        lucide.createIcons();
    }
}

// Navbar scroll effect
class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }
    
    init() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.boxShadow = 'var(--shadow-lg)';
            } else {
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Enhanced Mobile menu with improved responsiveness
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.mobileNav = null;
        this.init();
    }
    
    init() {
        this.createMobileNav();
        this.bindEvents();
        this.handleResize();
    }
    
    createMobileNav() {
        // Create mobile navigation if it doesn't exist
        if (!document.querySelector('.mobile-nav')) {
            this.mobileNav = document.createElement('div');
            this.mobileNav.className = 'mobile-nav';
            
            const mobileNavLinks = document.createElement('div');
            mobileNavLinks.className = 'mobile-nav-links';
            
            // Clone navigation links for mobile
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                const mobileLink = document.createElement('a');
                mobileLink.href = link.href;
                mobileLink.textContent = link.textContent;
                mobileLink.className = 'mobile-nav-link';
                mobileLink.addEventListener('click', () => this.closeMobileNav());
                mobileNavLinks.appendChild(mobileLink);
            });
            
            this.mobileNav.appendChild(mobileNavLinks);
            document.body.appendChild(this.mobileNav);
        }
    }
    
    bindEvents() {
        if (!this.toggle) return;
        
        this.toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileNav();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileNav && this.mobileNav.classList.contains('open')) {
                if (!this.mobileNav.contains(e.target) && !this.toggle.contains(e.target)) {
                    this.closeMobileNav();
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileNav && this.mobileNav.classList.contains('open')) {
                this.closeMobileNav();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    toggleMobileNav() {
        if (!this.mobileNav) return;
        
        if (this.mobileNav.classList.contains('open')) {
            this.closeMobileNav();
        } else {
            this.openMobileNav();
        }
    }
    
    openMobileNav() {
        if (!this.mobileNav) return;
        
        this.mobileNav.classList.add('open');
        this.toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    closeMobileNav() {
        if (!this.mobileNav) return;
        
        this.mobileNav.classList.remove('open');
        this.toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    handleResize() {
        // Close mobile nav on desktop
        if (window.innerWidth >= 769) {
            this.closeMobileNav();
        }
    }
}

// Enhanced Intersection Observer for animations with responsive awareness
class ScrollAnimations {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.init();
        this.bindResize();
    }
    
    init() {
        // Set up elements for animation by adding the initial state
        const animatedElements = document.querySelectorAll('.feature-card, .example-card, .step, .widget-card');
        
        // Add initial invisible state to all elements
        animatedElements.forEach(el => {
            el.classList.add('scroll-animate');
        });
        
        // Create intersection observer with responsive thresholds
        const observerOptions = {
            threshold: this.isMobile ? 0.1 : 0.3,
            rootMargin: this.isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Add stagger effect for card grids
                    if (entry.target.classList.contains('widget-card') || 
                        entry.target.classList.contains('feature-card')) {
                        const siblings = Array.from(entry.target.parentElement.children);
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * (this.isMobile ? 0.1 : 0.2)}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        animatedElements.forEach(el => observer.observe(el));
        
        // Add scroll indicators for mobile
        if (this.isMobile) {
            this.addScrollIndicators();
        }
    }
    
    addScrollIndicators() {
        const scrollableElements = document.querySelectorAll('.widget-example, .code-block pre, .api-demo-content');
        
        scrollableElements.forEach(element => {
            if (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) {
                element.parentElement.classList.add('scroll-indicator');
                
                element.addEventListener('scroll', () => {
                    const parent = element.parentElement;
                    const isAtStart = element.scrollLeft <= 5;
                    const isAtEnd = element.scrollLeft >= element.scrollWidth - element.clientWidth - 5;
                    
                    parent.classList.toggle('scrolled', !isAtStart && !isAtEnd);
                    parent.classList.toggle('at-end', isAtEnd);
                });
            }
        });
    }
    
    bindResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const wasMobile = this.isMobile;
                this.isMobile = window.innerWidth <= 768;
                
                // Reinitialize if mobile state changed
                if (wasMobile !== this.isMobile) {
                    this.init();
                }
            }, 250);
        });
    }
}

// Responsive utility class
class ResponsiveUtils {
    constructor() {
        this.breakpoints = {
            mobile: 640,
            tablet: 1024,
            desktop: 1440
        };
        
        this.init();
    }
    
    init() {
        this.handleImageOptimization();
        this.handleTouchDevices();
        this.handleReducedMotion();
        this.addViewportClasses();
    }
    
    handleImageOptimization() {
        // Add loading="lazy" to images below the fold
        const images = document.querySelectorAll('img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.loading = 'lazy';
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (!img.complete) {
                imageObserver.observe(img);
            }
        });
    }
    
    handleTouchDevices() {
        // Add touch-specific classes
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Improve touch scrolling for horizontal scroll areas
            const scrollAreas = document.querySelectorAll('.widget-example, .api-demo-content');
            scrollAreas.forEach(area => {
                area.style.webkitOverflowScrolling = 'touch';
            });
        }
    }
    
    handleReducedMotion() {
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }
    
    addViewportClasses() {
        const updateViewportClasses = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Remove existing viewport classes
            document.body.classList.remove('viewport-mobile', 'viewport-tablet', 'viewport-desktop', 'viewport-landscape');
            
            // Add current viewport class
            if (width <= this.breakpoints.mobile) {
                document.body.classList.add('viewport-mobile');
            } else if (width <= this.breakpoints.tablet) {
                document.body.classList.add('viewport-tablet');
            } else {
                document.body.classList.add('viewport-desktop');
            }
            
            // Add orientation class
            if (width > height) {
                document.body.classList.add('viewport-landscape');
            }
            
            // Add small height class for landscape phones
            if (height < 500) {
                document.body.classList.add('viewport-short');
            } else {
                document.body.classList.remove('viewport-short');
            }
        };
        
        updateViewportClasses();
        window.addEventListener('resize', updateViewportClasses);
        window.addEventListener('orientationchange', () => {
            setTimeout(updateViewportClasses, 100);
        });
    }
    
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= this.breakpoints.mobile) return 'mobile';
        if (width <= this.breakpoints.tablet) return 'tablet';
        return 'desktop';
    }
    
    isMobile() {
        return this.getCurrentBreakpoint() === 'mobile';
    }
    
    isTablet() {
        return this.getCurrentBreakpoint() === 'tablet';
    }
    
    isDesktop() {
        return this.getCurrentBreakpoint() === 'desktop';
    }
}

// Copy code functionality
class CodeCopy {
    constructor() {
        this.init();
    }
    
    init() {
        // Add copy buttons to code blocks
        document.querySelectorAll('pre code').forEach(codeBlock => {
            const pre = codeBlock.parentElement;
            if (pre.tagName === 'PRE') {
                const copyButton = document.createElement('button');
                copyButton.className = 'copy-button';
                copyButton.innerHTML = '<i data-lucide="copy"></i>';
                copyButton.title = 'Copy code';
                
                copyButton.addEventListener('click', () => {
                    navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                        copyButton.innerHTML = '<i data-lucide="check"></i>';
                        setTimeout(() => {
                            copyButton.innerHTML = '<i data-lucide="copy"></i>';
                            lucide.createIcons();
                        }, 2000);
                    });
                });
                
                pre.style.position = 'relative';
                pre.appendChild(copyButton);
            }
        });
        
        // Re-initialize icons
        lucide.createIcons();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new ThemeManager();
    new WidgetShowcase();
    new DemoAnimation();
    window.smoothScrollInstance = new SmoothScroll(); // Store reference for utility functions
    new NavbarScroll();
    new MobileMenu();
    new ScrollAnimations();
    new ResponsiveUtils(); // Initialize responsive utilities
    new CodeCopy();
    
    // Add copy button styles
    const style = document.createElement('style');
    style.textContent = `
        .copy-button {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 0.25rem;
            padding: 0.5rem;
            color: white;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 10;
        }
        
        pre:hover .copy-button {
            opacity: 1;
        }
        
        .copy-button:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .copy-button:focus {
            opacity: 1;
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
        
        .api-item {
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .api-item:last-child {
            border-bottom: none;
        }
        
        .api-item h3 {
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .api-item h4 {
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        
        .api-syntax pre,
        .api-example pre {
            background-color: var(--bg-code);
            padding: 1rem;
            border-radius: var(--radius-md);
            overflow-x: auto;
        }
        
        /* Enhanced mobile navigation */
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--bg-card);
                border: 1px solid var(--border-color);
                border-top: none;
                flex-direction: column;
                padding: 1rem;
                box-shadow: var(--shadow-lg);
                z-index: 1000;
            }
            
            .nav-links.active a {
                padding: 0.75rem;
                border-radius: var(--radius-sm);
                transition: background-color 0.2s;
            }
            
            .nav-links.active a:hover {
                background-color: var(--bg-secondary);
            }
        }
        
        /* Touch-friendly improvements */
        @media (pointer: coarse) {
            .btn {
                min-height: 44px;
                min-width: 44px;
            }
            
            .copy-button {
                min-height: 44px;
                min-width: 44px;
                opacity: 1;
            }
            
            .nav-links a {
                min-height: 44px;
                display: flex;
                align-items: center;
            }
            
            .theme-toggle {
                min-height: 44px;
                min-width: 44px;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add some utility functions
window.PixelUIDemo = {
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    toggleTheme: function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    },
    
    toggleAutoAdvance: function() {
        const smoothScroll = window.smoothScrollInstance;
        if (smoothScroll) {
            smoothScroll.autoAdvanceEnabled = !smoothScroll.autoAdvanceEnabled;
            localStorage.setItem('autoAdvanceEnabled', smoothScroll.autoAdvanceEnabled);
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'theme-change-notification';
            notification.innerHTML = `
                <i data-lucide="${smoothScroll.autoAdvanceEnabled ? 'play' : 'pause'}"></i>
                <span>Auto-advance ${smoothScroll.autoAdvanceEnabled ? 'enabled' : 'disabled'}</span>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('visible');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('visible');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 2000);
            
            lucide.createIcons();
        }
    },
    
    downloadFile: function(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};
