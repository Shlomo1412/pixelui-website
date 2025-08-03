// Plugin page functionality
class PluginPage {
    constructor() {
        this.searchInput = null;
        this.filterButtons = null;
        this.sidebarLinks = null;
        this.contentContainer = null;
        this.copyButtons = null;
        this.tabButtons = null;
        
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupTheme();
        this.setupLucideIcons();
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.loadPluginDocs();
    }

    setupElements() {
        this.searchInput = document.getElementById('plugin-search');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.sidebarLinks = document.querySelectorAll('.sidebar-link');
        this.contentContainer = document.getElementById('plugin-docs-content');
    }

    loadPluginDocs() {
        // Load all plugin documentation sections into the content container
        const pluginDocsHTML = `
            <!-- Plugin Overview -->
            <div class="widget-doc" id="plugin-overview">
                <div class="widget-header">
                    <h2 class="widget-title">Plugin Overview</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        PixelUI's plugin system allows you to extend the framework with custom widgets, themes, 
                        animations, and functionality. Plugins are modular, reusable components that can be 
                        easily shared and distributed.
                    </p>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="star"></i>
                        Key Features
                    </h3>
                    <ul class="note-content">
                        <li><strong>Modular Architecture:</strong> Clean, isolated plugin system</li>
                        <li><strong>Hot Loading:</strong> Load and unload plugins at runtime</li>
                        <li><strong>Dependency Management:</strong> Automatic plugin dependency resolution</li>
                        <li><strong>Configuration System:</strong> Flexible plugin configuration options</li>
                        <li><strong>Event System:</strong> Custom events for plugin communication</li>
                        <li><strong>Type Safety:</strong> Built-in validation and error handling</li>
                    </ul>
                </div>

                <div class="note">
                    <div class="note-title">
                        <i data-lucide="info"></i>
                        Plugin Compatibility
                    </div>
                    <div class="note-content">
                        Plugins are compatible with PixelUI v1.0+ and follow semantic versioning for 
                        backward compatibility. The plugin API is stable and documented.
                    </div>
                </div>
            </div>

            <!-- Installation -->
            <div class="widget-doc" id="installation">
                <div class="widget-header">
                    <h2 class="widget-title">Installation</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Installing and managing plugins in PixelUI is straightforward. 
                        Plugins can be loaded from files, URLs, or the built-in registry.
                    </p>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Loading Plugins
                    </h3>
                    
                    <div class="example-tabs">
                        <button class="example-tab active" data-tab="file">From File</button>
                        <button class="example-tab" data-tab="registry">From Registry</button>
                        <button class="example-tab" data-tab="url">From URL</button>
                    </div>
                    
                    <div class="example-content active" data-content="file">
                        <div class="code-example">
                            <button class="copy-btn" aria-label="Copy code">
                                <i data-lucide="copy"></i>
                            </button>
                            <pre><code class="language-lua">local PixelUI = require("pixelui")

-- Load plugin from local file
PixelUI.plugins.load("my-custom-widget.lua")

-- Load multiple plugins
PixelUI.plugins.loadMultiple({
    "widgets/advanced-button.lua",
    "themes/dark-theme.lua",
    "animations/bounce.lua"
})

-- Initialize PixelUI with plugins
PixelUI.init()</code></pre>
                        </div>
                    </div>
                    
                    <div class="example-content" data-content="registry">
                        <div class="code-example">
                            <button class="copy-btn" aria-label="Copy code">
                                <i data-lucide="copy"></i>
                            </button>
                            <pre><code class="language-lua">-- Load from official plugin registry
PixelUI.plugins.install("advanced-charts")
PixelUI.plugins.install("material-theme")

-- Load with specific version
PixelUI.plugins.install("data-grid", "1.2.0")

-- Load with configuration
PixelUI.plugins.install("notification-system", {
    version = "latest",
    config = {
        position = "top-right",
        duration = 3000
    }
})</code></pre>
                        </div>
                    </div>
                    
                    <div class="example-content" data-content="url">
                        <div class="code-example">
                            <button class="copy-btn" aria-label="Copy code">
                                <i data-lucide="copy"></i>
                            </button>
                            <pre><code class="language-lua">-- Load from remote URL
PixelUI.plugins.loadFromURL("https://plugins.pixelui.dev/weather-widget.lua")

-- Load with authentication
PixelUI.plugins.loadFromURL("https://private-repo.com/plugin.lua", {
    headers = {
        Authorization = "Bearer your-token"
    }
})</code></pre>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Basic Plugin -->
            <div class="widget-doc" id="basic-plugin">
                <div class="widget-header">
                    <h2 class="widget-title">Your First Plugin</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Let's create a simple plugin that adds a new "GlowButton" widget with animated glow effects.
                        This example demonstrates the basic plugin structure and widget creation.
                    </p>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Complete Plugin Example
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- glow-button-plugin.lua
local GlowButtonPlugin = {
    -- Plugin metadata
    name = "GlowButton",
    version = "1.0.0",
    author = "Your Name",
    description = "A button widget with animated glow effects",
    dependencies = {},
    
    -- Plugin configuration
    config = {
        defaultGlowColor = colors.cyan,
        animationDuration = 1.0,
        glowIntensity = 0.8
    }
}

-- Plugin initialization
function GlowButtonPlugin:init(pixelUI)
    self.PixelUI = pixelUI
    
    -- Register our custom widget
    pixelUI.registerWidget("glowButton", self.createGlowButton)
    
    -- Register custom animation easing
    pixelUI.animations.registerEasing("glow", self.glowEasing)
    
    print("GlowButton plugin loaded successfully!")
end

-- Create the GlowButton widget
function GlowButtonPlugin:createGlowButton(props)
    -- Validate required properties
    if not props.text then
        error("GlowButton requires 'text' property")
    end
    
    -- Default properties
    local widget = {
        x = props.x or 1,
        y = props.y or 1,
        width = props.width or #props.text + 4,
        height = props.height or 3,
        text = props.text,
        color = props.color or colors.white,
        background = props.background or colors.gray,
        glowColor = props.glowColor or self.config.defaultGlowColor,
        onClick = props.onClick,
        
        -- Internal state
        isGlowing = false,
        glowIntensity = 0,
        isHovered = false
    }
    
    -- Widget methods
    widget.render = function(self)
        local bg = self.background
        
        -- Apply glow effect
        if self.isGlowing then
            local intensity = self.glowIntensity
            bg = self.PixelUI.colors.blend(bg, self.glowColor, intensity)
        end
        
        -- Draw button
        self.PixelUI.drawFilledRect(self.x, self.y, self.width, self.height, bg)
        self.PixelUI.drawBorder(self.x, self.y, self.width, self.height, 
                               self.isHovered and self.glowColor or colors.lightGray)
        
        -- Draw text (centered)
        local textX = self.x + math.floor((self.width - #self.text) / 2)
        local textY = self.y + math.floor(self.height / 2)
        self.PixelUI.drawText(textX, textY, self.text, self.color)
    end
    
    widget.startGlow = function(self)
        if self.isGlowing then return end
        
        self.isGlowing = true
        self.PixelUI.animate(self, {
            glowIntensity = self.config.glowIntensity
        }, {
            duration = self.config.animationDuration,
            easing = "glow",
            onComplete = function()
                -- Fade out
                self.PixelUI.animate(self, {
                    glowIntensity = 0
                }, {
                    duration = self.config.animationDuration,
                    easing = "glow",
                    onComplete = function()
                        self.isGlowing = false
                    end
                })
            end
        })
    end
    
    widget.onMouseEnter = function(self)
        self.isHovered = true
        self:startGlow()
    end
    
    widget.onMouseLeave = function(self)
        self.isHovered = false
    end
    
    widget.onMouseClick = function(self, x, y, button)
        if self.onClick then
            self.onClick(self, x, y, button)
        end
        self:startGlow()
    end
    
    return widget
end

-- Custom easing function for glow animation
function GlowButtonPlugin:glowEasing(t)
    -- Smooth in-out easing with slight overshoot
    return t < 0.5 and 2 * t * t or 1 - math.pow(-2 * t + 2, 3) / 2
end

-- Plugin cleanup
function GlowButtonPlugin:destroy()
    -- Unregister widgets and animations
    self.PixelUI.unregisterWidget("glowButton")
    self.PixelUI.animations.unregisterEasing("glow")
    
    print("GlowButton plugin unloaded")
end

-- Export plugin
return GlowButtonPlugin</code></pre>
                    </div>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="play"></i>
                        Using the Plugin
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- main.lua
local PixelUI = require("pixelui")

-- Load our custom plugin
PixelUI.plugins.load("glow-button-plugin.lua")

-- Initialize PixelUI
PixelUI.init()

-- Create a glow button using our plugin
local glowBtn = PixelUI.glowButton({
    x = 10, y = 5,
    text = "Click Me!",
    glowColor = colors.cyan,
    onClick = function(self)
        print("Glow button clicked!")
    end
})

-- Run the application
PixelUI.run()</code></pre>
                    </div>
                </div>
            </div>

            <!-- Plugin Structure -->
            <div class="widget-doc" id="plugin-structure">
                <div class="widget-header">
                    <h2 class="widget-title">Plugin Structure</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Understanding the anatomy of a PixelUI plugin and the required components
                        for creating robust, maintainable plugins.
                    </p>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="list"></i>
                        Required Properties
                    </h3>
                    <table class="property-table">
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Type</th>
                                <th>Required</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Property"><code class="property-name">name</code></td>
                                <td data-label="Type"><span class="property-type">string</span></td>
                                <td data-label="Required">Yes</td>
                                <td data-label="Description" class="property-description">Unique plugin identifier</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">version</code></td>
                                <td data-label="Type"><span class="property-type">string</span></td>
                                <td data-label="Required">Yes</td>
                                <td data-label="Description" class="property-description">Semantic version (e.g., "1.0.0")</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">init</code></td>
                                <td data-label="Type"><span class="property-type">function</span></td>
                                <td data-label="Required">Yes</td>
                                <td data-label="Description" class="property-description">Plugin initialization function</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">author</code></td>
                                <td data-label="Type"><span class="property-type">string</span></td>
                                <td data-label="Required">No</td>
                                <td data-label="Description" class="property-description">Plugin author name</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">description</code></td>
                                <td data-label="Type"><span class="property-type">string</span></td>
                                <td data-label="Required">No</td>
                                <td data-label="Description" class="property-description">Brief plugin description</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">dependencies</code></td>
                                <td data-label="Type"><span class="property-type">table</span></td>
                                <td data-label="Required">No</td>
                                <td data-label="Description" class="property-description">Plugin dependencies list</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">config</code></td>
                                <td data-label="Type"><span class="property-type">table</span></td>
                                <td data-label="Required">No</td>
                                <td data-label="Description" class="property-description">Default configuration options</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">destroy</code></td>
                                <td data-label="Type"><span class="property-type">function</span></td>
                                <td data-label="Required">No</td>
                                <td data-label="Description" class="property-description">Cleanup function for plugin unloading</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Plugin Template
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- plugin-template.lua
local MyPlugin = {
    -- Metadata (required)
    name = "MyPlugin",
    version = "1.0.0",
    author = "Your Name",
    description = "Plugin description",
    
    -- Dependencies (optional)
    dependencies = {
        -- "other-plugin >= 1.0.0",
        -- "pixelui >= 1.0.0"
    },
    
    -- Configuration (optional)
    config = {
        enabled = true,
        option1 = "default value",
        option2 = 42
    }
}

-- Required: Plugin initialization
function MyPlugin:init(pixelUI)
    self.PixelUI = pixelUI
    
    -- Register widgets, themes, animations, etc.
    -- Set up event listeners
    -- Initialize plugin state
    
    print(self.name .. " v" .. self.version .. " loaded")
end

-- Optional: Plugin cleanup
function MyPlugin:destroy()
    -- Unregister components
    -- Clean up resources
    -- Remove event listeners
    
    print(self.name .. " unloaded")
end

-- Export the plugin
return MyPlugin</code></pre>
                    </div>
                </div>
            </div>

            <!-- Widget Plugins -->
            <div class="widget-doc" id="widget-plugins">
                <div class="widget-header">
                    <h2 class="widget-title">Widget Plugins</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Widget plugins are the most common type of plugin, allowing you to create 
                        custom UI components with their own behavior, styling, and interactions.
                    </p>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Advanced Widget Example
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- Progress Ring Widget Plugin
local ProgressRingPlugin = {
    name = "ProgressRing",
    version = "1.0.0",
    author = "PixelUI Team",
    description = "Circular progress indicator with animations"
}

function ProgressRingPlugin:init(pixelUI)
    self.PixelUI = pixelUI
    
    pixelUI.registerWidget("progressRing", function(props)
        local widget = {
            x = props.x or 1,
            y = props.y or 1,
            radius = props.radius or 5,
            progress = props.progress or 0, -- 0-100
            thickness = props.thickness or 2,
            color = props.color or colors.blue,
            backgroundColor = props.backgroundColor or colors.gray,
            showPercentage = props.showPercentage ~= false,
            animationDuration = props.animationDuration or 0.5,
            
            -- Internal state
            animatedProgress = 0,
            isAnimating = false
        }
        
        widget.setProgress = function(self, newProgress, animate)
            animate = animate ~= false -- Default to true
            
            if animate and not self.isAnimating then
                self.isAnimating = true
                self.PixelUI.animate(self, {
                    animatedProgress = newProgress
                }, {
                    duration = self.animationDuration,
                    easing = "easeOutCubic",
                    onComplete = function()
                        self.isAnimating = false
                        self.progress = newProgress
                    end
                })
            else
                self.progress = newProgress
                self.animatedProgress = newProgress
            end
        end
        
        widget.render = function(self)
            local centerX = self.x + self.radius
            local centerY = self.y + self.radius
            local progress = self.isAnimating and self.animatedProgress or self.progress
            
            -- Draw background circle
            self.PixelUI.drawCircle(centerX, centerY, self.radius, self.backgroundColor)
            
            -- Draw progress arc
            if progress > 0 then
                local angle = (progress / 100) * 360
                self.PixelUI.drawArc(centerX, centerY, self.radius, 0, angle, self.color, self.thickness)
            end
            
            -- Draw percentage text
            if self.showPercentage then
                local text = math.floor(progress) .. "%"
                local textX = centerX - math.floor(#text / 2)
                local textY = centerY
                self.PixelUI.drawText(textX, textY, text, self.color)
            end
        end
        
        -- Initialize animated progress
        widget.animatedProgress = widget.progress
        
        return widget
    end)
end

return ProgressRingPlugin</code></pre>
                    </div>
                </div>
            </div>

            <!-- More sections can be added here -->
            <div class="widget-doc" id="theme-plugins">
                <div class="widget-header">
                    <h2 class="widget-title">Theme Plugins</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Theme plugins allow you to create custom visual styles and color schemes
                        that can be applied to the entire PixelUI interface.
                    </p>
                </div>

                <div class="note">
                    <div class="note-title">
                        <i data-lucide="palette"></i>
                        Coming Soon
                    </div>
                    <div class="note-content">
                        Theme plugin documentation is being prepared. Check back soon for comprehensive 
                        guides on creating custom themes and color schemes.
                    </div>
                </div>
            </div>

            <div class="widget-doc" id="animation-plugins">
                <div class="widget-header">
                    <h2 class="widget-title">Animation Plugins</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Animation plugins extend PixelUI's animation system with custom easing functions,
                        transition effects, and complex animation sequences.
                    </p>
                </div>

                <div class="note">
                    <div class="note-title">
                        <i data-lucide="zap"></i>
                        Coming Soon
                    </div>
                    <div class="note-content">
                        Animation plugin documentation is being prepared. Check back soon for guides 
                        on creating custom animations and easing functions.
                    </div>
                </div>
            </div>

            <div class="widget-doc" id="utility-plugins">
                <div class="widget-header">
                    <h2 class="widget-title">Utility Plugins</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Utility plugins provide helper functions, data processing tools, and other
                        supporting functionality that enhances the PixelUI development experience.
                    </p>
                </div>

                <div class="note">
                    <div class="note-title">
                        <i data-lucide="tool"></i>
                        Coming Soon
                    </div>
                    <div class="note-content">
                        Utility plugin documentation is being prepared. Check back soon for guides 
                        on creating helper functions and development tools.
                    </div>
                </div>
            </div>

            <!-- Plugin Registry -->
            <div class="widget-doc" id="plugin-registry">
                <div class="widget-header">
                    <h2 class="widget-title">Plugin Registry</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Discover and share plugins with the PixelUI community through the official plugin registry.
                        Browse categories, read reviews, and find the perfect extensions for your projects.
                    </p>
                </div>

                <div class="quick-links">
                    <h3 class="quick-links-title">Popular Plugin Categories</h3>
                    <div class="quick-links-grid">
                        <a href="#" class="quick-link">
                            <i data-lucide="layout"></i>
                            <span>UI Components</span>
                        </a>
                        <a href="#" class="quick-link">
                            <i data-lucide="palette"></i>
                            <span>Themes & Styles</span>
                        </a>
                        <a href="#" class="quick-link">
                            <i data-lucide="zap"></i>
                            <span>Animations</span>
                        </a>
                        <a href="#" class="quick-link">
                            <i data-lucide="chart-bar"></i>
                            <span>Data Visualization</span>
                        </a>
                        <a href="#" class="quick-link">
                            <i data-lucide="tool"></i>
                            <span>Utilities</span>
                        </a>
                        <a href="#" class="quick-link">
                            <i data-lucide="gamepad-2"></i>
                            <span>Game UI</span>
                        </a>
                    </div>
                </div>

                <div class="note">
                    <div class="note-title">
                        <i data-lucide="globe"></i>
                        Coming Soon
                    </div>
                    <div class="note-content">
                        The official PixelUI Plugin Registry is currently in development. 
                        For now, you can share plugins through GitHub, the ComputerCraft forums, 
                        or the PixelUI Discord community.
                    </div>
                </div>
            </div>
        `;

        if (this.contentContainer) {
            this.contentContainer.innerHTML = pluginDocsHTML;
            
            // Re-setup elements that are now in the DOM
            this.copyButtons = document.querySelectorAll('.copy-btn');
            this.tabButtons = document.querySelectorAll('.example-tab');
            
            // Setup event listeners for newly added elements
            this.setupCodeHandling();
            this.setupTabHandling();
            
            // Highlight code and setup icons
            this.setupCodeHighlighting();
            this.setupLucideIcons();
        }
    }

    setupCodeHandling() {
        // Copy code buttons
        this.copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.copyCode(e.target.closest('.code-example'));
            });
        });
    }

    setupTabHandling() {
        // Example tabs
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target);
            });
        });
        
        // Initialize first tab in each group
        const tabGroups = document.querySelectorAll('.example-tabs');
        tabGroups.forEach(group => {
            const firstTab = group.querySelector('.example-tab');
            if (firstTab) {
                this.switchTab(firstTab, false);
            }
        });
    }

    setupEventListeners() {
        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.dataset.filter);
            });
        });

        // Sidebar navigation
        this.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.setActiveLink(link);
                
                // Close mobile sidebar on navigation
                if (window.innerWidth <= 1024) {
                    this.closeMobileSidebar();
                }
            });
        });

        // Scroll to update active section
        window.addEventListener('scroll', () => {
            this.updateActiveSection();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'k':
                        e.preventDefault();
                        this.focusSearch();
                        break;
                    case '/':
                        e.preventDefault();
                        this.focusSearch();
                        break;
                }
            }
            
            if (e.key === 'Escape') {
                this.clearSearch();
                this.closeMobileSidebar();
            }
        });
    }

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') || 
                           (prefersDark.matches ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', currentTheme);

        themeToggle?.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });

        // Listen for system theme changes
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', 
                    e.matches ? 'dark' : 'light');
            }
        });
    }

    setupLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    setupMobileNavigation() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navbar = document.getElementById('navbar');
        
        mobileToggle?.addEventListener('click', () => {
            navbar.classList.toggle('mobile-open');
        });

        // Mobile sidebar toggle
        const mobileSidebarToggle = document.createElement('button');
        mobileSidebarToggle.className = 'mobile-sidebar-toggle';
        mobileSidebarToggle.innerHTML = '<i data-lucide="menu"></i>';
        mobileSidebarToggle.setAttribute('aria-label', 'Toggle sidebar');
        
        const apiHeader = document.querySelector('.api-header');
        if (apiHeader && window.innerWidth <= 1024) {
            apiHeader.appendChild(mobileSidebarToggle);
            
            mobileSidebarToggle.addEventListener('click', () => {
                this.toggleMobileSidebar();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('#mobile-menu-toggle')) {
                navbar?.classList.remove('mobile-open');
            }
            
            if (!e.target.closest('.api-sidebar') && !e.target.closest('.mobile-sidebar-toggle')) {
                this.closeMobileSidebar();
            }
        });
    }

    toggleMobileSidebar() {
        const sidebar = document.querySelector('.api-sidebar');
        const overlay = document.querySelector('.sidebar-overlay') || this.createSidebarOverlay();
        
        sidebar?.classList.toggle('mobile-open');
        
        if (sidebar?.classList.contains('mobile-open')) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeMobileSidebar() {
        const sidebar = document.querySelector('.api-sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        
        sidebar?.classList.remove('mobile-open');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    createSidebarOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.addEventListener('click', () => this.closeMobileSidebar());
        document.body.appendChild(overlay);
        return overlay;
    }

    setupSmoothScrolling() {
        // Scroll to top button
        const scrollTopBtn = document.getElementById('scroll-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn?.classList.add('visible');
            } else {
                scrollTopBtn?.classList.remove('visible');
            }
        });

        scrollTopBtn?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupCodeHighlighting() {
        // Ensure Prism.js is loaded and highlight code
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }

    handleSearch(query) {
        const normalizedQuery = query.toLowerCase().trim();
        const contentSections = document.querySelectorAll('.widget-doc');
        
        if (!normalizedQuery) {
            this.showAllSections();
            return;
        }

        let hasResults = false;

        contentSections.forEach(section => {
            const content = section.textContent.toLowerCase();
            const title = section.querySelector('.widget-title')?.textContent.toLowerCase() || '';
            const isMatch = content.includes(normalizedQuery) || title.includes(normalizedQuery);
            
            if (isMatch) {
                section.style.display = 'block';
                this.highlightSearchTerms(section, normalizedQuery);
                hasResults = true;
            } else {
                section.style.display = 'none';
            }
        });

        // Update sidebar links
        this.sidebarLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const isVisible = targetSection && targetSection.style.display !== 'none';
            
            link.style.display = isVisible ? 'block' : 'none';
        });

        // Show no results message
        this.toggleNoResults(!hasResults);
    }

    highlightSearchTerms(section, query) {
        // Simple highlighting - in a real implementation, you'd want more sophisticated highlighting
        const textNodes = this.getTextNodes(section);
        const regex = new RegExp(`(${query})`, 'gi');
        
        textNodes.forEach(node => {
            if (node.textContent.toLowerCase().includes(query)) {
                const parent = node.parentNode;
                const highlighted = node.textContent.replace(regex, '<mark>$1</mark>');
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlighted;
                parent.replaceChild(wrapper, node);
            }
        });
    }

    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    // Skip code blocks and other formatted content
                    const parent = node.parentNode;
                    if (parent.tagName === 'CODE' || parent.tagName === 'PRE') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        return textNodes;
    }

    showAllSections() {
        const contentSections = document.querySelectorAll('.widget-doc');
        contentSections.forEach(section => {
            section.style.display = 'block';
            this.removeHighlights(section);
        });
        
        this.sidebarLinks.forEach(link => {
            link.style.display = 'block';
        });
        
        this.toggleNoResults(false);
    }

    removeHighlights(section) {
        const highlights = section.querySelectorAll('mark');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }

    toggleNoResults(show) {
        let noResultsEl = document.querySelector('.no-results');
        
        if (show && !noResultsEl) {
            noResultsEl = document.createElement('div');
            noResultsEl.className = 'no-results';
            noResultsEl.innerHTML = `
                <div class="no-results-content">
                    <i data-lucide="search"></i>
                    <h3>No results found</h3>
                    <p>Try adjusting your search terms or browse the categories below.</p>
                </div>
            `;
            document.querySelector('.api-content').appendChild(noResultsEl);
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        } else if (!show && noResultsEl) {
            noResultsEl.remove();
        }
    }

    handleFilter(filter) {
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // Filter content based on category
        const contentSections = document.querySelectorAll('.widget-doc');
        contentSections.forEach(section => {
            const shouldShow = filter === 'all' || this.sectionMatchesFilter(section, filter);
            section.style.display = shouldShow ? 'block' : 'none';
        });

        // Update sidebar
        this.sidebarLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const isVisible = targetSection && targetSection.style.display !== 'none';
            
            link.style.display = isVisible ? 'block' : 'none';
        });
    }

    sectionMatchesFilter(section, filter) {
        const sectionId = section.id;
        const categories = {
            'guides': ['plugin-overview', 'installation', 'basic-plugin', 'plugin-structure', 'lifecycle', 'configuration', 'testing', 'best-practices'],
            'examples': ['basic-plugin', 'widget-plugins', 'theme-plugins', 'animation-plugins', 'examples-gallery'],
            'reference': ['plugin-api', 'dependencies', 'custom-events', 'plugin-communication', 'performance'],
            'community': ['plugin-registry', 'contributing', 'examples-gallery']
        };
        
        return categories[filter]?.includes(sectionId) || false;
    }

    scrollToSection(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const offset = target.offsetTop - navbarHeight - 20;

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }

    setActiveLink(activeLink) {
        this.sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateActiveSection() {
        const scrollPos = window.pageYOffset + 100;
        const contentSections = document.querySelectorAll('.widget-doc');
        
        contentSections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.id;
            
            if (scrollPos >= top && scrollPos < bottom) {
                this.sidebarLinks.forEach(link => {
                    link.classList.toggle('active', 
                        link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }

    copyCode(codeBlock) {
        const code = codeBlock.querySelector('code');
        if (!code) return;

        const textToCopy = code.textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                this.showCopyFeedback(codeBlock);
            }).catch(() => {
                this.fallbackCopyText(textToCopy, codeBlock);
            });
        } else {
            this.fallbackCopyText(textToCopy, codeBlock);
        }
    }

    fallbackCopyText(text, codeBlock) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopyFeedback(codeBlock);
        } catch (err) {
            console.error('Failed to copy text');
        }
        
        document.body.removeChild(textArea);
    }

    showCopyFeedback(codeBlock) {
        const copyBtn = codeBlock.querySelector('.copy-btn');
        const originalContent = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i data-lucide="check"></i>';
        copyBtn.classList.add('copied');
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        setTimeout(() => {
            copyBtn.innerHTML = originalContent;
            copyBtn.classList.remove('copied');
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 2000);
    }

    switchTab(tabButton, animate = true) {
        const tabGroup = tabButton.closest('.example-section');
        if (!tabGroup) return;

        const tabId = tabButton.dataset.tab;
        const tabs = tabGroup.querySelectorAll('.example-tab');
        const contents = tabGroup.querySelectorAll('.example-content');

        // Update tab buttons
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab === tabButton);
        });

        // Update content
        contents.forEach(content => {
            const isActive = content.dataset.content === tabId;
            content.classList.toggle('active', isActive);
            
            if (animate) {
                if (isActive) {
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.style.opacity = '1';
                    }, 50);
                }
            }
        });

        // Re-highlight code if Prism is available
        if (typeof Prism !== 'undefined') {
            setTimeout(() => {
                Prism.highlightAll();
            }, 100);
        }
    }

    focusSearch() {
        if (this.searchInput) {
            this.searchInput.focus();
            this.searchInput.select();
        }
    }

    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
            this.showAllSections();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PluginPage();
});

// Handle dynamic imports and async loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Additional initialization if needed
    });
} else {
    // DOM already loaded
    new PluginPage();
}
