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

-- Initialize PixelUI (auto-loads plugins from "plugins" directory)
PixelUI.init()

-- Manual plugin loading from file
PixelUI.loadPluginFromFile("my-custom-widget.lua")

-- Load all plugins from a directory
PixelUI.loadPluginsFromDirectory("plugins")

-- Check if a plugin is loaded
local plugin = PixelUI.getPlugin("my_plugin_id")
if plugin then
    print("Plugin loaded successfully")
end</code></pre>
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
PixelUI.loadPluginFromURL("https://plugins.pixelui.dev/weather-widget.lua")</code></pre>
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

-- Register the plugin using the correct API
registerPlugin({
    id = "glow_button",
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
    },
    
    -- Plugin initialization callback
    onLoad = function(plugin)
        -- Create the GlowButton widget
        local function createGlowButton(props)
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
                glowColor = props.glowColor or plugin.config.defaultGlowColor,
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
                    bg = colors.blend(bg, self.glowColor, intensity)
                end
                
                -- Draw button using available drawing functions
                draw.drawFilledRect(self.x, self.y, self.width, self.height, bg)
                draw.drawBorder(self.x, self.y, self.width, self.height, 
                               self.isHovered and self.glowColor or colors.lightGray)
                
                -- Draw text (centered)
                local textX = self.x + math.floor((self.width - #self.text) / 2)
                local textY = self.y + math.floor(self.height / 2)
                draw.drawText(textX, textY, self.text, self.color)
            end
            
            widget.startGlow = function(self)
                if self.isGlowing then return end
                
                self.isGlowing = true
                animate(self, {
                    glowIntensity = plugin.config.glowIntensity
                }, {
                    duration = plugin.config.animationDuration,
                    easing = "glow",
                    onComplete = function()
                        -- Fade out
                        animate(self, {
                            glowIntensity = 0
                        }, {
                            duration = plugin.config.animationDuration,
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
        
        -- Register the widget type
        registerWidget("glowButton", createGlowButton)
        
        -- Register custom easing function
        registerEasing("glow", function(t)
            -- Smooth in-out easing with slight overshoot
            return t < 0.5 and 2 * t * t or 1 - math.pow(-2 * t + 2, 3) / 2
        end)
        
        print("GlowButton plugin loaded successfully!")
    end,
    
    -- Plugin cleanup
    onUnload = function(plugin)
        -- Unregister components
        unregisterWidget("glowButton")
        unregisterEasing("glow")
        
        print("GlowButton plugin unloaded")
    end
})</code></pre>
                    </div>
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
PixelUI.loadPluginFromFile("glow-button-plugin.lua")

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
                                <td data-label="Property"><code class="property-name">id</code></td>
                                <td data-label="Type"><span class="property-type">string</span></td>
                                <td data-label="Required">Yes</td>
                                <td data-label="Description" class="property-description">Unique plugin identifier (snake_case)</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">name</code></td>
                                <td data-label="Type"><span class="property-type">string</span></td>
                                <td data-label="Required">Yes</td>
                                <td data-label="Description" class="property-description">Human-readable plugin name</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">version</code></td>
                                <td data-label="Type"><span class="property-type">string</span></td>
                                <td data-label="Required">Yes</td>
                                <td data-label="Description" class="property-description">Semantic version (e.g., "1.0.0")</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">onLoad</code></td>
                                <td data-label="Type"><span class="property-type">function</span></td>
                                <td data-label="Required">Yes</td>
                                <td data-label="Description" class="property-description">Plugin initialization callback</td>
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
                                <td data-label="Property"><code class="property-name">onUnload</code></td>
                                <td data-label="Type"><span class="property-type">function</span></td>
                                <td data-label="Required">No</td>
                                <td data-label="Description" class="property-description">Cleanup function for plugin unloading</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">onEnable</code></td>
                                <td data-label="Type"><span class="property-type">function</span></td>
                                <td data-label="Required">No</td>
                                <td data-label="Description" class="property-description">Called when plugin is enabled</td>
                            </tr>
                            <tr>
                                <td data-label="Property"><code class="property-name">onDisable</code></td>
                                <td data-label="Type"><span class="property-type">function</span></td>
                                <td data-label="Required">No</td>
                                <td data-label="Description" class="property-description">Called when plugin is disabled</td>
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

-- Register the plugin using the correct API
registerPlugin({
    -- Metadata (required)
    id = "my_plugin",
    name = "MyPlugin",
    version = "1.0.0",
    author = "Your Name",
    description = "Plugin description",
    
    -- Dependencies (optional)
    dependencies = {
        "other_plugin@1.0.0",     -- Exact version
        "another_plugin>=1.0.0"   -- Minimum version
    },
    
    -- Configuration (optional)
    config = {
        enabled = true,
        option1 = "default value",
        option2 = 42
    },
    
    -- Required: Plugin initialization
    onLoad = function(plugin)
        -- Access plugin configuration via plugin.config
        -- Register widgets, themes, animations, etc.
        -- Set up event listeners using on("event", callback)
        -- Initialize plugin state
        
        print(plugin.name .. " v" .. plugin.version .. " loaded")
    end,
    
    -- Optional: Plugin cleanup
    onUnload = function(plugin)
        -- Unregister components
        -- Clean up resources
        -- Remove event listeners
        
        print(plugin.name .. " unloaded")
    end,
    
    -- Optional: Plugin enable/disable callbacks
    onEnable = function(plugin)
        print(plugin.name .. " enabled")
    end,
    
    onDisable = function(plugin)
        print(plugin.name .. " disabled")
    end
})</code></pre>
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

            <!-- Plugin API -->
            <div class="widget-doc" id="plugin-api">
                <div class="widget-header">
                    <h2 class="widget-title">Plugin API</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Complete reference for the Plugin API, including all available methods
                        and interfaces for plugin development.
                    </p>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Core Plugin API
                    </h3>
                    <table class="property-table">
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>Parameters</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Method"><code class="property-name">PixelUI.loadPluginFromFile(path)</code></td>
                                <td data-label="Parameters"><span class="property-type">string</span></td>
                                <td data-label="Description" class="property-description">Load a plugin from file path</td>
                            </tr>
                            <tr>
                                <td data-label="Method"><code class="property-name">PixelUI.loadPluginsFromDirectory(path)</code></td>
                                <td data-label="Parameters"><span class="property-type">string</span></td>
                                <td data-label="Description" class="property-description">Load all plugins from directory</td>
                            </tr>
                            <tr>
                                <td data-label="Method"><code class="property-name">PixelUI.loadPluginFromURL(url)</code></td>
                                <td data-label="Parameters"><span class="property-type">string</span></td>
                                <td data-label="Description" class="property-description">Load a plugin from URL</td>
                            </tr>
                            <tr>
                                <td data-label="Method"><code class="property-name">PixelUI.getPlugin(pluginId)</code></td>
                                <td data-label="Parameters"><span class="property-type">string</span></td>
                                <td data-label="Description" class="property-description">Get a loaded plugin by ID</td>
                            </tr>
                            <tr>
                                <td data-label="Method"><code class="property-name">PixelUI.enablePlugin(pluginId)</code></td>
                                <td data-label="Parameters"><span class="property-type">string</span></td>
                                <td data-label="Description" class="property-description">Enable a loaded plugin</td>
                            </tr>
                            <tr>
                                <td data-label="Method"><code class="property-name">PixelUI.disablePlugin(pluginId)</code></td>
                                <td data-label="Parameters"><span class="property-type">string</span></td>
                                <td data-label="Description" class="property-description">Disable an active plugin</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Plugin Environment API
                    </h3>
                    <p class="section-description">
                        Functions available inside the plugin environment (within onLoad, onUnload, etc.)
                    </p>
                    
                    <table class="property-table">
                        <thead>
                            <tr>
                                <th>Function</th>
                                <th>Parameters</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Function"><code class="property-name">registerWidget(name, factory)</code></td>
                                <td data-label="Parameters"><span class="property-type">string, function</span></td>
                                <td data-label="Description" class="property-description">Register a custom widget type</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">unregisterWidget(name)</code></td>
                                <td data-label="Parameters"><span class="property-type">string</span></td>
                                <td data-label="Description" class="property-description">Remove a widget type</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">registerEasing(name, func)</code></td>
                                <td data-label="Parameters"><span class="property-type">string, function</span></td>
                                <td data-label="Description" class="property-description">Register custom animation easing</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">registerService(name, service)</code></td>
                                <td data-label="Parameters"><span class="property-type">string, table</span></td>
                                <td data-label="Description" class="property-description">Register a shared service</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">getService(name)</code></td>
                                <td data-label="Parameters"><span class="property-type">string</span></td>
                                <td data-label="Description" class="property-description">Get a registered service</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">on(event, callback)</code></td>
                                <td data-label="Parameters"><span class="property-type">string, function</span></td>
                                <td data-label="Description" class="property-description">Listen for events</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">emit(event, data)</code></td>
                                <td data-label="Parameters"><span class="property-type">string, any</span></td>
                                <td data-label="Description" class="property-description">Emit custom events</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">animate(widget, props, options)</code></td>
                                <td data-label="Parameters"><span class="property-type">table, table, table</span></td>
                                <td data-label="Description" class="property-description">Animate widget properties</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="palette"></i>
                        Drawing API
                    </h3>
                    <p class="section-description">
                        Drawing functions available in the plugin environment via the <code>draw</code> namespace
                    </p>
                    
                    <table class="property-table">
                        <thead>
                            <tr>
                                <th>Function</th>
                                <th>Parameters</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Function"><code class="property-name">draw.drawFilledRect(x, y, w, h, color)</code></td>
                                <td data-label="Parameters"><span class="property-type">numbers, color</span></td>
                                <td data-label="Description" class="property-description">Draw filled rectangle</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">draw.drawBorder(x, y, w, h, color)</code></td>
                                <td data-label="Parameters"><span class="property-type">numbers, color</span></td>
                                <td data-label="Description" class="property-description">Draw border around area</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">draw.drawText(x, y, text, color)</code></td>
                                <td data-label="Parameters"><span class="property-type">numbers, string, color</span></td>
                                <td data-label="Description" class="property-description">Draw text at position</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">draw.drawCircle(x, y, radius, color)</code></td>
                                <td data-label="Parameters"><span class="property-type">numbers, color</span></td>
                                <td data-label="Description" class="property-description">Draw circle outline</td>
                            </tr>
                            <tr>
                                <td data-label="Function"><code class="property-name">draw.drawArc(x, y, radius, start, end, color)</code></td>
                                <td data-label="Parameters"><span class="property-type">numbers, color</span></td>
                                <td data-label="Description" class="property-description">Draw arc segment</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Plugin Environment Example
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- Plugin context provides these functions directly
registerPlugin({
    id = "example_plugin",
    name = "Example Plugin",
    version = "1.0.0",
    
    onLoad = function(plugin)
        -- Register a widget (no PixelUI. prefix needed)
        registerWidget("customButton", function(props)
            -- Use drawing functions (draw namespace)
            draw.drawFilledRect(props.x, props.y, props.width, props.height, props.color)
            draw.drawText(props.x + 2, props.y + 1, props.text, colors.white)
        end)
        
        -- Listen for events (no PixelUI. prefix needed)
        on("widgetClicked", function(data)
            print("Widget clicked: " .. data.widgetType)
        end)
        
        -- Register a service
        registerService("dataProvider", {
            getData = function() return {value = 42} end
        })
        
        -- Animate widgets
        animate(someWidget, {x = 10}, {duration = 1.0})
    end
})</code></pre>
                    </div>
                </div>
            </div>

            <!-- Plugin Lifecycle -->
            <div class="widget-doc" id="lifecycle">
                <div class="widget-header">
                    <h2 class="widget-title">Plugin Lifecycle</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Understanding the plugin lifecycle from loading to unloading, including
                        initialization, runtime behavior, and cleanup procedures.
                    </p>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="cycle"></i>
                        Lifecycle Stages
                    </h3>
                    <div class="lifecycle-stages">
                        <div class="stage">
                            <div class="stage-number">1</div>
                            <div class="stage-content">
                                <h4>Loading</h4>
                                <p>Plugin file is loaded and validated</p>
                            </div>
                        </div>
                        <div class="stage">
                            <div class="stage-number">2</div>
                            <div class="stage-content">
                                <h4>Dependency Resolution</h4>
                                <p>Dependencies are checked and loaded</p>
                            </div>
                        </div>
                        <div class="stage">
                            <div class="stage-number">3</div>
                            <div class="stage-content">
                                <h4>Initialization</h4>
                                <p>onLoad() callback is called with plugin context</p>
                            </div>
                        </div>
                        <div class="stage">
                            <div class="stage-number">4</div>
                            <div class="stage-content">
                                <h4>Activation</h4>
                                <p>onEnable() callback called when plugin is enabled</p>
                            </div>
                        </div>
                        <div class="stage">
                            <div class="stage-number">5</div>
                            <div class="stage-content">
                                <h4>Runtime</h4>
                                <p>Plugin is active and responding to events</p>
                            </div>
                        </div>
                        <div class="stage">
                            <div class="stage-number">6</div>
                            <div class="stage-content">
                                <h4>Deactivation</h4>
                                <p>onDisable() callback called when plugin is disabled</p>
                            </div>
                        </div>
                        <div class="stage">
                            <div class="stage-number">7</div>
                            <div class="stage-content">
                                <h4>Cleanup</h4>
                                <p>onUnload() callback called during unloading</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Complete Lifecycle Example
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- Complete lifecycle example using correct plugin API
registerPlugin({
    id = "lifecycle_example",
    name = "LifecycleExample",
    version = "1.0.0",
    dependencies = {"core_plugin@1.0.0"},
    
    -- State variables
    widgets = {},
    eventHandlers = {},
    isActive = false,
    
    -- Called during plugin loading
    onLoad = function(plugin)
        print("Plugin loading: " .. plugin.name)
        
        -- Initialize plugin state
        plugin.widgets = {}
        plugin.eventHandlers = {}
        
        -- Register components using plugin environment functions
        registerWidget("myWidget", function(props)
            local widget = {
                x = props.x or 1,
                y = props.y or 1,
                text = props.text or "Widget"
            }
            
            widget.render = function(self)
                draw.drawText(self.x, self.y, self.text, colors.white)
            end
            
            return widget
        end)
        
        -- Set up event listeners using plugin environment
        on("themeChanged", function(theme)
            print("Theme changed to: " .. theme.name)
        end)
        
        print("Plugin loaded successfully!")
    end,
    
    -- Called when plugin is enabled
    onEnable = function(plugin)
        print("Plugin enabled: " .. plugin.name)
        plugin.isActive = true
        
        -- Enable any disabled functionality
        emit("pluginEnabled", {pluginId = plugin.id})
    end,
    
    -- Called when plugin is disabled
    onDisable = function(plugin)
        print("Plugin disabled: " .. plugin.name)
        plugin.isActive = false
        
        -- Disable functionality but don't unload
        emit("pluginDisabled", {pluginId = plugin.id})
    end,
    
    -- Called during plugin unloading
    onUnload = function(plugin)
        print("Plugin unloading: " .. plugin.name)
        
        -- Clean up resources
        for _, widget in pairs(plugin.widgets) do
            if widget.destroy then
                widget:destroy()
            end
        end
        
        -- Unregister components
        unregisterWidget("myWidget")
        
        -- Clear state
        plugin.widgets = {}
        plugin.eventHandlers = {}
        plugin.isActive = false
        
        print("Plugin unloaded successfully!")
    end
})</code></pre>
    
    -- Clear state
    self.isActive = false
    
    print("Plugin cleaned up successfully!")
end

return MyPlugin</code></pre>
                    </div>
                </div>
            </div>

            <!-- Configuration -->
            <div class="widget-doc" id="configuration">
                <div class="widget-header">
                    <h2 class="widget-title">Configuration</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Learn how to make your plugins configurable with settings, options,
                        and user preferences that can be customized at runtime.
                    </p>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="settings"></i>
                        Basic Configuration
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">local ConfigurablePlugin = {
    name = "ConfigurableWidget",
    version = "1.0.0",
    
    -- Default configuration
    config = {
        -- Appearance settings
        defaultColor = colors.blue,
        borderStyle = "solid",
        cornerRadius = 2,
        
        -- Behavior settings
        animationDuration = 0.3,
        enableSounds = true,
        autoHide = false,
        
        -- Advanced settings
        debugMode = false,
        maxInstances = 10,
        cacheEnabled = true
    }
}

function ConfigurablePlugin:init(pixelUI)
    self.PixelUI = pixelUI
    
    -- Merge user config with defaults
    self.settings = self:mergeConfig(pixelUI.getPluginConfig(self.name))
    
    -- Apply configuration
    self:applyConfig()
end

function ConfigurablePlugin:mergeConfig(userConfig)
    local merged = {}
    
    -- Start with defaults
    for key, value in pairs(self.config) do
        merged[key] = value
    end
    
    -- Override with user settings
    if userConfig then
        for key, value in pairs(userConfig) do
            if self.config[key] ~= nil then -- Only allow known settings
                merged[key] = value
            end
        end
    end
    
    return merged
end

function ConfigurablePlugin:applyConfig()
    -- Use configuration in plugin logic
    if self.settings.debugMode then
        print("Debug mode enabled for " .. self.name)
    end
    
    -- Configure animation system
    self.defaultAnimationOptions = {
        duration = self.settings.animationDuration,
        easing = "easeOut"
    }
end

-- Method to update configuration at runtime
function ConfigurablePlugin:updateConfig(newConfig)
    self.settings = self:mergeConfig(newConfig)
    self:applyConfig()
    
    -- Notify existing widgets of config change
    self:notifyConfigChange()
end

return ConfigurablePlugin</code></pre>
                    </div>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="play"></i>
                        Using Plugin Configuration
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- Load plugin with custom configuration
PixelUI.plugins.loadFromFile("configurable-plugin.lua")
    config = {
        defaultColor = colors.red,
        animationDuration = 0.5,
        debugMode = true,
        enableSounds = false
    }
})

-- Update configuration at runtime
local plugin = PixelUI.plugins.get("ConfigurableWidget")
plugin:updateConfig({
    cornerRadius = 4,
    autoHide = true
})</code></pre>
                    </div>
                </div>
            </div>

            <!-- Dependencies -->
            <div class="widget-doc" id="dependencies">
                <div class="widget-header">
                    <h2 class="widget-title">Dependencies</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Manage plugin dependencies to ensure proper loading order and
                        avoid conflicts between plugins with shared requirements.
                    </p>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="link"></i>
                        Dependency Declaration
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- Correct dependency syntax
registerPlugin({
    id = "advanced_widget",
    name = "AdvancedWidget",
    version = "2.1.0",
    
    -- Dependency specifications (simplified syntax)
    dependencies = {
        -- Exact version
        "other_plugin@1.0.0",
        
        -- Minimum version
        "animation_lib>=1.2.0",
        
        -- Note: Complex version constraints and optional dependencies
        -- are not supported in the current implementation
    },
    
    onLoad = function(plugin)
        -- Dependencies are automatically loaded before this callback
        -- Access other plugins via PixelUI.getPlugin()
        local animLib = PixelUI.getPlugin("animation_lib")
        
        if animLib then
            print("Animation library is available")
        else
            error("Required dependency 'animation_lib' not found")
        end
    end
})</code></pre>
                    </div>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="list"></i>
                        Dependency Operators
                    </h3>
                    <table class="property-table">
                        <thead>
                            <tr>
                                <th>Operator</th>
                                <th>Example</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Operator"><code class="property-name">@</code></td>
                                <td data-label="Example"><span class="property-type">plugin@1.0.0</span></td>
                                <td data-label="Description" class="property-description">Exact version required</td>
                            </tr>
                            <tr>
                                <td data-label="Operator"><code class="property-name">>=</code></td>
                                <td data-label="Example"><span class="property-type">plugin>=1.0.0</span></td>
                                <td data-label="Description" class="property-description">Minimum version required</td>
                            </tr>
                            <tr>
                                <td data-label="Operator"><code class="property-name">></code></td>
                                <td data-label="Example"><span class="property-type">plugin>1.0.0</span></td>
                                <td data-label="Description" class="property-description">Strictly greater than version</td>
                            </tr>
                            <tr>
                                <td data-label="Operator"><code class="property-name"><=</code></td>
                                <td data-label="Example"><span class="property-type">plugin<=2.0.0</span></td>
                                <td data-label="Description" class="property-description">Maximum version (inclusive)</td>
                            </tr>
                            <tr>
                                <td data-label="Operator"><code class="property-name"><</code></td>
                                <td data-label="Example"><span class="property-type">plugin<2.0.0</span></td>
                                <td data-label="Description" class="property-description">Maximum version (exclusive)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Testing Plugins -->
            <div class="widget-doc" id="testing">
                <div class="widget-header">
                    <h2 class="widget-title">Testing Plugins</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Best practices for testing your plugins, including unit tests,
                        integration tests, and debugging techniques.
                    </p>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="bug"></i>
                        Plugin Test Framework
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- test-my-plugin.lua
local TestFramework = require("pixelui-test")
local MyPlugin = require("my-plugin")

local tests = TestFramework.createSuite("MyPlugin Tests")

-- Test plugin loading
tests:test("Plugin loads successfully", function(assert)
    local plugin = MyPlugin
    assert.notNil(plugin, "Plugin should not be nil")
    assert.equal(plugin.name, "MyPlugin", "Plugin name should match")
    assert.equal(plugin.version, "1.0.0", "Plugin version should match")
end)

-- Test plugin initialization
tests:test("Plugin initializes correctly", function(assert)
    local mockPixelUI = TestFramework.createMockPixelUI()
    local plugin = MyPlugin
    
    plugin:init(mockPixelUI)
    
    assert.true(plugin.isInitialized, "Plugin should be initialized")
    assert.equal(plugin.PixelUI, mockPixelUI, "Plugin should store PixelUI reference")
end)

-- Test widget creation
tests:test("Plugin creates widgets correctly", function(assert)
    local mockPixelUI = TestFramework.createMockPixelUI()
    local plugin = MyPlugin
    plugin:init(mockPixelUI)
    
    local widget = plugin:createMyWidget({
        x = 10, y = 10,
        text = "Test Widget"
    })
    
    assert.notNil(widget, "Widget should be created")
    assert.equal(widget.x, 10, "Widget x position should be set")
    assert.equal(widget.text, "Test Widget", "Widget text should be set")
end)

-- Test plugin cleanup
tests:test("Plugin cleans up properly", function(assert)
    local mockPixelUI = TestFramework.createMockPixelUI()
    local plugin = MyPlugin
    plugin:init(mockPixelUI)
    
    plugin:destroy()
    
    assert.false(plugin.isInitialized, "Plugin should be deinitialized")
    assert.true(mockPixelUI.unregisterWidget.called, "Widgets should be unregistered")
end)

-- Run all tests
tests:run()</code></pre>
                    </div>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="search"></i>
                        Debug Mode Implementation
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">local DebuggablePlugin = {
    name = "DebuggablePlugin",
    version = "1.0.0",
    config = {
        debugMode = false,
        logLevel = "info" -- "debug", "info", "warn", "error"
    }
}

function DebuggablePlugin:init(pixelUI)
    self.PixelUI = pixelUI
    self.settings = self:mergeConfig(pixelUI.getPluginConfig(self.name))
    
    -- Initialize logger
    self.logger = self:createLogger()
    
    self.logger:info("Plugin initialized")
end

function DebuggablePlugin:createLogger()
    return {
        debug = function(_, message)
            if self.settings.debugMode and self:shouldLog("debug") then
                print("[DEBUG] " .. self.name .. ": " .. message)
            end
        end,
        
        info = function(_, message)
            if self:shouldLog("info") then
                print("[INFO] " .. self.name .. ": " .. message)
            end
        end,
        
        warn = function(_, message)
            if self:shouldLog("warn") then
                print("[WARN] " .. self.name .. ": " .. message)
            end
        end,
        
        error = function(_, message)
            if self:shouldLog("error") then
                print("[ERROR] " .. self.name .. ": " .. message)
            end
        end
    }
end

function DebuggablePlugin:shouldLog(level)
    local levels = {debug = 1, info = 2, warn = 3, error = 4}
    return levels[level] >= levels[self.settings.logLevel]
end

-- Validation helper
function DebuggablePlugin:validateProps(props, schema)
    for key, validation in pairs(schema) do
        local value = props[key]
        
        if validation.required and value == nil then
            self.logger:error("Missing required property: " .. key)
            error("Missing required property: " .. key)
        end
        
        if value and validation.type and type(value) ~= validation.type then
            self.logger:error("Invalid type for " .. key .. ": expected " .. validation.type)
            error("Invalid type for " .. key)
        end
    end
    
    self.logger:debug("Props validation passed")
end

return DebuggablePlugin</code></pre>
                    </div>
                </div>
            </div>

            <!-- Theme Plugins -->
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

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="palette"></i>
                        Creating a Theme Plugin
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">local DarkThemePlugin = {
    name = "DarkTheme",
    version = "1.0.0",
    description = "Professional dark theme for PixelUI"
}

function DarkThemePlugin:init(pixelUI)
    self.PixelUI = pixelUI
    
    -- Register the dark theme
    pixelUI.registerTheme("dark", {
        -- Base colors
        primary = colors.gray,
        secondary = colors.lightGray,
        accent = colors.cyan,
        background = colors.black,
        surface = colors.gray,
        
        -- Text colors
        textPrimary = colors.white,
        textSecondary = colors.lightGray,
        textDisabled = colors.gray,
        
        -- State colors
        success = colors.lime,
        warning = colors.yellow,
        error = colors.red,
        info = colors.lightBlue,
        
        -- Widget-specific colors
        button = {
            background = colors.gray,
            hover = colors.lightGray,
            active = colors.cyan,
            disabled = colors.black,
            text = colors.white
        },
        
        input = {
            background = colors.black,
            border = colors.gray,
            focus = colors.cyan,
            text = colors.white,
            placeholder = colors.gray
        },
        
        container = {
            background = colors.gray,
            border = colors.lightGray,
            shadow = colors.black
        }
    })
    
    -- Register theme variants
    pixelUI.registerTheme("dark-blue", self:createBlueVariant())
    pixelUI.registerTheme("dark-green", self:createGreenVariant())
end

function DarkThemePlugin:createBlueVariant()
    local baseTheme = self.PixelUI.getTheme("dark")
    local blueTheme = self:deepCopy(baseTheme)
    
    blueTheme.accent = colors.blue
    blueTheme.button.active = colors.blue
    blueTheme.input.focus = colors.blue
    
    return blueTheme
end

function DarkThemePlugin:createGreenVariant()
    local baseTheme = self.PixelUI.getTheme("dark")
    local greenTheme = self:deepCopy(baseTheme)
    
    greenTheme.accent = colors.lime
    greenTheme.button.active = colors.lime
    greenTheme.input.focus = colors.lime
    
    return greenTheme
end

function DarkThemePlugin:deepCopy(orig)
    local copy = {}
    for key, value in pairs(orig) do
        if type(value) == "table" then
            copy[key] = self:deepCopy(value)
        else
            copy[key] = value
        end
    end
    return copy
end

return DarkThemePlugin</code></pre>
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

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="zap"></i>
                        Custom Easing Functions
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">local AdvancedAnimationsPlugin = {
    name = "AdvancedAnimations",
    version = "1.0.0",
    description = "Advanced animation effects and easing functions"
}

function AdvancedAnimationsPlugin:init(pixelUI)
    self.PixelUI = pixelUI
    
    -- Register custom easing functions
    pixelUI.animations.registerEasing("bounce", self.bounceEasing)
    pixelUI.animations.registerEasing("elastic", self.elasticEasing)
    pixelUI.animations.registerEasing("back", self.backEasing)
    
    -- Register animation presets
    pixelUI.animations.registerPreset("slideIn", self.slideInPreset)
    pixelUI.animations.registerPreset("fadeIn", self.fadeInPreset)
    pixelUI.animations.registerPreset("scaleIn", self.scaleInPreset)
end

-- Bounce easing function
function AdvancedAnimationsPlugin:bounceEasing(t)
    if t < 1/2.75 then
        return 7.5625 * t * t
    elseif t < 2/2.75 then
        t = t - 1.5/2.75
        return 7.5625 * t * t + 0.75
    elseif t < 2.5/2.75 then
        t = t - 2.25/2.75
        return 7.5625 * t * t + 0.9375
    else
        t = t - 2.625/2.75
        return 7.5625 * t * t + 0.984375
    end
end

-- Elastic easing function
function AdvancedAnimationsPlugin:elasticEasing(t)
    if t == 0 or t == 1 then return t end
    
    local p = 0.3
    local s = p / 4
    
    t = t - 1
    return -(math.pow(2, 10 * t) * math.sin((t - s) * (2 * math.pi) / p))
end

-- Back easing function
function AdvancedAnimationsPlugin:backEasing(t)
    local s = 1.70158
    return t * t * ((s + 1) * t - s)
end

-- Animation presets
function AdvancedAnimationsPlugin:slideInPreset(widget, direction)
    direction = direction or "left"
    local startX, startY = widget.x, widget.y
    
    -- Set initial position off-screen
    if direction == "left" then
        widget.x = -widget.width
    elseif direction == "right" then
        widget.x = 100 -- Assuming screen width
    elseif direction == "top" then
        widget.y = -widget.height
    elseif direction == "bottom" then
        widget.y = 50 -- Assuming screen height
    end
    
    -- Animate to final position
    return self.PixelUI.animate(widget, {
        x = startX,
        y = startY
    }, {
        duration = 0.5,
        easing = "back"
    })
end

function AdvancedAnimationsPlugin:fadeInPreset(widget)
    widget.opacity = 0
    
    return self.PixelUI.animate(widget, {
        opacity = 1
    }, {
        duration = 0.3,
        easing = "easeOut"
    })
end

function AdvancedAnimationsPlugin:scaleInPreset(widget)
    widget.scale = 0
    
    return self.PixelUI.animate(widget, {
        scale = 1
    }, {
        duration = 0.4,
        easing = "elastic"
    })
end

return AdvancedAnimationsPlugin</code></pre>
                    </div>
                </div>
            </div>

            <!-- Custom Events -->
            <div class="widget-doc" id="custom-events">
                <div class="widget-header">
                    <h2 class="widget-title">Custom Events</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Create and manage custom events for plugin communication and
                        extending PixelUI's event system with your own event types.
                    </p>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="radio"></i>
                        Event System Implementation
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- Event-driven plugin using correct API
registerPlugin({
    id = "event_driven",
    name = "EventDriven",
    version = "1.0.0",
    description = "Demonstrates custom event usage",
    
    onLoad = function(plugin)
        -- Register custom event handlers using plugin environment
        on("widgetCreated", function(data)
            print("Widget created: " .. data.widgetType)
        end)
        
        on("themeChanged", function(data)
            print("Theme changed to: " .. data.themeName)
        end)
        
        on("userAction", function(data)
            print("User action: " .. data.action)
        end)
        
        -- Create custom widget that emits events
        registerWidget("eventWidget", function(props)
            local widget = {
                x = props.x or 1,
                y = props.y or 1,
                width = props.width or 10,
                height = props.height or 3,
                text = props.text or "Event Widget",
                clickCount = 0
            }
            
            widget.render = function(self)
                -- Render widget using drawing API
                draw.drawFilledRect(self.x, self.y, self.width, self.height, colors.blue)
                draw.drawText(self.x + 1, self.y + 1, self.text, colors.white)
            end
            
            widget.onMouseClick = function(self, x, y, button)
                self.clickCount = self.clickCount + 1
                
                -- Emit custom event using plugin environment
                emit("widgetClicked", {
                    widget = self,
                    clickCount = self.clickCount,
                    position = {x = x, y = y},
                    button = button
                })
                
                -- Emit achievement event if milestone reached
                if self.clickCount == 10 then
                    emit("achievement", {
                        type = "clickMaster",
                        widget = self,
                        description = "Clicked widget 10 times!"
                    })
                end
            end
            
            widget.onMouseEnter = function(self)
                -- Emit hover event using plugin environment
                emit("widgetHover", {
                    widget = self,
                    action = "enter"
                })
            end
            
            widget.onMouseLeave = function(self)
                -- Emit hover event using plugin environment
                emit("widgetHover", {
                    widget = self,
                    action = "leave"
                })
            end
            
            return widget
        end)
        
        -- Set up cross-plugin communication
        on("achievement", function(data)
            print("Achievement unlocked: " .. data.description)
            
            -- Forward to notification system if available
            local notificationService = getService("notifications")
            if notificationService then
                notificationService.show({
                    title = "Achievement!",
                    message = data.description,
                    type = "success"
                })
            end
        end)
    end
})</code></pre>
    print("Widget created: " .. data.widget.type)
end

function EventDrivenPlugin:onThemeChanged(data)
    print("Theme changed to: " .. data.themeName)
    
    -- Update plugin state based on theme
    self:adaptToTheme(data.theme)
end

function EventDrivenPlugin:onUserAction(data)
    -- Log user actions for analytics
    self:logUserAction(data.action, data.widget, data.details)
end

-- Custom event emitters
function EventDrivenPlugin:notifyDataUpdate(data)
    self.PixelUI.emit("dataUpdated", {
        source = self.name,
        data = data,
        timestamp = os.time()
    })
end

function EventDrivenPlugin:broadcastMessage(message, priority)
    self.PixelUI.emit("pluginMessage", {
        from = self.name,
        message = message,
        priority = priority or "normal"
    })
end

return EventDrivenPlugin</code></pre>
                    </div>
                </div>
            </div>

            <!-- Plugin Communication -->
            <div class="widget-doc" id="plugin-communication">
                <div class="widget-header">
                    <h2 class="widget-title">Plugin Communication</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Learn how plugins can communicate with each other through events,
                        shared services, and the PixelUI plugin registry.
                    </p>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="message-circle"></i>
                        Inter-Plugin Communication
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- Data Provider Plugin (using correct API)
registerPlugin({
    id = "data_provider",
    name = "DataProvider",
    version = "1.0.0",
    description = "Provides shared data services",
    
    onLoad = function(plugin)
        local dataStore = {}
        
        local service = {
            setData = function(key, value)
                dataStore[key] = value
                
                -- Notify subscribers using plugin environment
                emit("dataChanged", {
                    key = key,
                    value = value,
                    provider = plugin.name
                })
            end,
            
            getData = function(key)
                return dataStore[key]
            end,
            
            getAllData = function()
                return dataStore
            end
        }
        
        -- Register service using plugin environment function
        registerService("dataProvider", service)
        
        -- Listen for data requests using plugin environment
        on("dataRequest", function(request)
            local data = service.getData(request.key)
            
            -- Send response
            emit("dataResponse", {
                requestId = request.id,
                key = request.key,
                data = data,
                found = data ~= nil
            })
        end)
    end
})

-- Data Consumer Plugin (using correct API)
registerPlugin({
    id = "data_consumer", 
    name = "DataConsumer",
    version = "1.0.0",
    dependencies = {"data_provider@1.0.0"},
    
    onLoad = function(plugin)
        -- Get reference to data provider service using plugin environment
        local dataProvider = getService("dataProvider")
        
        if dataProvider then
            -- Use the service
            dataProvider.setData("user_preference", "dark_theme")
            local theme = dataProvider.getData("user_preference")
            print("Current theme: " .. theme)
        else
            print("Data provider service not available")
        end
        
        -- Listen for data changes
        on("dataChanged", function(data)
            print("Data changed: " .. data.key .. " = " .. tostring(data.value))
        end)
    end
})</code></pre>
    
    -- Listen for data changes
    pixelUI.on("dataChanged", function(event)
        self:onDataChanged(event)
    end)
    
    -- Request initial data
    self:requestData("userSettings")
end

function DataConsumerPlugin:requestData(key)
    if self.dataProvider then
        -- Direct service call
        return self.dataProvider:getData(key)
    else
        -- Event-based request
        local requestId = self:generateRequestId()
        
        self.PixelUI.emit("dataRequest", {
            id = requestId,
            key = key,
            requester = self.name
        })
        
        -- Wait for response (simplified)
        return self:waitForResponse(requestId)
    end
end

function DataConsumerPlugin:onDataChanged(event)
    if event.key == "userSettings" then
        self:updateSettings(event.value)
    end
end

-- Plugin Registry Communication
local RegistryPlugin = {
    name = "PluginRegistry",
    version = "1.0.0"
}

function RegistryPlugin:init(pixelUI)
    self.PixelUI = pixelUI
    self.plugins = {}
    
    -- Register registry service
    pixelUI.registerService("registry", self)
    
    -- Track plugin loading
    pixelUI.on("pluginLoaded", function(plugin)
        self:registerPlugin(plugin)
    end)
    
    pixelUI.on("pluginUnloaded", function(plugin)
        self:unregisterPlugin(plugin)
    end)
end

function RegistryPlugin:registerPlugin(plugin)
    self.plugins[plugin.name] = {
        plugin = plugin,
        loadTime = os.time(),
        status = "active"
    }
    
    -- Notify other plugins
    self.PixelUI.emit("pluginRegistered", {
        name = plugin.name,
        version = plugin.version
    })
end

function RegistryPlugin:findPluginsByType(type)
    local results = {}
    for name, info in pairs(self.plugins) do
        if info.plugin.type == type then
            table.insert(results, info.plugin)
        end
    end
    return results
end

function RegistryPlugin:getPluginDependents(pluginName)
    local dependents = {}
    for name, info in pairs(self.plugins) do
        local plugin = info.plugin
        if plugin.dependencies then
            for _, dep in ipairs(plugin.dependencies) do
                if dep:match(pluginName) then
                    table.insert(dependents, plugin)
                    break
                end
            end
        end
    end
    return dependents
end

return {DataProviderPlugin, DataConsumerPlugin, RegistryPlugin}</code></pre>
                    </div>
                </div>
            </div>

            <!-- Performance Tips -->
            <div class="widget-doc" id="performance">
                <div class="widget-header">
                    <h2 class="widget-title">Performance Tips</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Optimize your plugins for better performance with these best practices
                        for memory management, rendering efficiency, and event handling.
                    </p>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="zap"></i>
                        Performance Guidelines
                    </h3>
                    <ul class="note-content">
                        <li><strong>Lazy Loading:</strong> Load resources only when needed</li>
                        <li><strong>Event Debouncing:</strong> Limit frequent event handlers</li>
                        <li><strong>Memory Management:</strong> Clean up references and timers</li>
                        <li><strong>Efficient Rendering:</strong> Minimize drawing operations</li>
                        <li><strong>Caching:</strong> Cache expensive calculations</li>
                        <li><strong>Async Operations:</strong> Use coroutines for heavy tasks</li>
                    </ul>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Performance Optimized Plugin
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">local OptimizedPlugin = {
    name = "OptimizedPlugin",
    version = "1.0.0"
}

function OptimizedPlugin:init(pixelUI)
    self.PixelUI = pixelUI
    self.cache = {}
    self.timers = {}
    self.eventDebounce = {}
    
    -- Create object pool for widgets
    self.widgetPool = self:createWidgetPool()
end

-- Widget pooling for memory efficiency
function OptimizedPlugin:createWidgetPool()
    return {
        pool = {},
        active = {},
        
        acquire = function(self, type)
            local widget = table.remove(self.pool[type] or {})
            if not widget then
                widget = self:createWidget(type)
            end
            self.active[widget] = true
            return widget
        end,
        
        release = function(self, widget)
            if self.active[widget] then
                self.active[widget] = nil
                widget:reset()
                
                local type = widget.type
                self.pool[type] = self.pool[type] or {}
                table.insert(self.pool[type], widget)
            end
        end
    }
end

-- Debounced event handling
function OptimizedPlugin:debounce(func, delay, key)
    key = key or "default"
    
    if self.eventDebounce[key] then
        self.PixelUI.cancelTimer(self.eventDebounce[key])
    end
    
    self.eventDebounce[key] = self.PixelUI.setTimeout(func, delay)
end

-- Efficient rendering with dirty tracking
function OptimizedPlugin:createOptimizedWidget(props)
    local widget = {
        x = props.x or 1,
        y = props.y or 1,
        width = props.width or 10,
        height = props.height or 3,
        
        -- Dirty tracking
        isDirty = true,
        lastRender = nil,
        renderCache = nil
    }
    
    widget.render = function(self)
        -- Only render if dirty or first time
        if not self.isDirty and self.renderCache then
            self.PixelUI.drawCached(self.renderCache)
            return
        end
        
        -- Perform actual rendering
        local renderData = self:doRender()
        
        -- Cache the result
        self.renderCache = renderData
        self.isDirty = false
        self.lastRender = os.clock()
    end
    
    widget.markDirty = function(self)
        self.isDirty = true
    end
    
    widget.setPosition = function(self, x, y)
        if self.x ~= x or self.y ~= y then
            self.x, self.y = x, y
            self:markDirty()
        end
    end
    
    return widget
end

-- Async data loading
function OptimizedPlugin:loadDataAsync(source, callback)
    self.PixelUI.spawnThread(function()
        -- Simulate heavy data loading
        local data = {}
        for i = 1, 1000 do
            data[i] = math.random()
            
            -- Yield periodically to prevent blocking
            if i % 100 == 0 then
                coroutine.yield()
            end
        end
        
        -- Call back on main thread
        self.PixelUI.runOnMainThread(function()
            callback(data)
        end)
    end)
end

-- Memory cleanup
function OptimizedPlugin:destroy()
    -- Clear caches
    self.cache = {}
    
    -- Cancel timers
    for _, timer in pairs(self.timers) do
        self.PixelUI.cancelTimer(timer)
    end
    self.timers = {}
    
    -- Clear debounced events
    for _, timer in pairs(self.eventDebounce) do
        self.PixelUI.cancelTimer(timer)
    end
    self.eventDebounce = {}
    
    -- Release widget pool
    self.widgetPool = nil
    
    -- Unregister components
    self.PixelUI.unregisterWidget("optimizedWidget")
end

return OptimizedPlugin</code></pre>
                    </div>
                </div>
            </div>

            <!-- Best Practices -->
            <div class="widget-doc" id="best-practices">
                <div class="widget-header">
                    <h2 class="widget-title">Best Practices</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Follow these best practices to create maintainable, reliable,
                        and user-friendly plugins that integrate well with the PixelUI ecosystem.
                    </p>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="check-circle"></i>
                        Code Quality Guidelines
                    </h3>
                    <ul class="note-content">
                        <li><strong>Naming:</strong> Use clear, descriptive names for functions and variables</li>
                        <li><strong>Documentation:</strong> Document all public APIs and complex logic</li>
                        <li><strong>Error Handling:</strong> Handle errors gracefully with meaningful messages</li>
                        <li><strong>Validation:</strong> Validate all input parameters and configurations</li>
                        <li><strong>Modularity:</strong> Keep functions small and focused on single tasks</li>
                        <li><strong>Consistency:</strong> Follow consistent coding style and patterns</li>
                    </ul>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="shield"></i>
                        Security Considerations
                    </h3>
                    <ul class="note-content">
                        <li><strong>Input Sanitization:</strong> Sanitize all user inputs and file paths</li>
                        <li><strong>Privilege Separation:</strong> Request only necessary permissions</li>
                        <li><strong>Safe Defaults:</strong> Use secure default configurations</li>
                        <li><strong>Resource Limits:</strong> Implement limits to prevent resource exhaustion</li>
                        <li><strong>Safe Loading:</strong> Validate plugin files before execution</li>
                    </ul>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="code"></i>
                        Best Practice Example
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- Example of well-structured plugin following best practices
local BestPracticePlugin = {
    -- Clear metadata
    name = "BestPracticeExample",
    version = "1.2.3",
    author = "Plugin Developer",
    description = "Demonstrates plugin best practices and patterns",
    license = "MIT",
    
    -- Explicit dependencies
    dependencies = {
        "pixelui >= 1.0.0"
    },
    
    -- Default configuration with documentation
    config = {
        -- Widget appearance
        defaultColor = colors.blue,    -- Default widget color
        borderWidth = 1,               -- Border thickness in pixels
        cornerRadius = 2,              -- Corner radius for rounded widgets
        
        -- Behavior settings
        animationDuration = 0.3,       -- Default animation duration in seconds
        enableSounds = true,           -- Enable/disable sound effects
        autoSave = true,               -- Automatically save user preferences
        
        -- Performance settings
        maxWidgets = 50,               -- Maximum number of widgets
        cacheSize = 100,               -- Size of internal cache
        updateInterval = 0.1           -- Update interval in seconds
    }
}

---
-- Initialize the plugin with PixelUI context
-- @param pixelUI PixelUI framework instance
-- @return boolean success status
function BestPracticePlugin:init(pixelUI)
    -- Validate input
    if not pixelUI then
        error("PixelUI context is required for plugin initialization")
    end
    
    -- Store context
    self.PixelUI = pixelUI
    self.isInitialized = false
    
    -- Merge configuration
    self.settings = self:mergeConfig(pixelUI.getPluginConfig(self.name) or {})
    
    -- Initialize components
    local success, err = pcall(function()
        self:initializeComponents()
        self:setupEventHandlers()
        self:validateEnvironment()
    end)
    
    if not success then
        self:logError("Failed to initialize plugin: " .. tostring(err))
        return false
    end
    
    self.isInitialized = true
    self:logInfo("Plugin initialized successfully")
    return true
end

---
-- Merge user configuration with defaults
-- @param userConfig table User configuration
-- @return table Merged configuration
function BestPracticePlugin:mergeConfig(userConfig)
    local merged = {}
    
    -- Copy defaults
    for key, value in pairs(self.config) do
        merged[key] = value
    end
    
    -- Apply user overrides
    for key, value in pairs(userConfig) do
        if self.config[key] ~= nil then
            -- Validate type
            if type(value) == type(self.config[key]) then
                merged[key] = value
            else
                self:logWarning("Invalid type for config key '" .. key .. "', using default")
            end
        else
            self:logWarning("Unknown config key '" .. key .. "', ignoring")
        end
    end
    
    return merged
end

---
-- Initialize plugin components
function BestPracticePlugin:initializeComponents()
    -- Initialize state
    self.widgets = {}
    self.cache = {}
    self.timers = {}
    
    -- Register widgets with validation
    self.PixelUI.registerWidget("bestPracticeWidget", function(props)
        return self:createWidget(props)
    end)
    
    -- Register theme if available
    if self.settings.enableTheming then
        self.PixelUI.registerTheme("bestPractice", self:createTheme())
    end
end

---
-- Create a new widget instance
-- @param props table Widget properties
-- @return table Widget instance
function BestPracticePlugin:createWidget(props)
    -- Validate required properties
    self:validateProps(props, {
        x = {type = "number", required = true},
        y = {type = "number", required = true},
        text = {type = "string", required = false, default = "Widget"}
    })
    
    -- Check widget limit
    if #self.widgets >= self.settings.maxWidgets then
        error("Maximum widget limit reached: " .. self.settings.maxWidgets)
    end
    
    -- Create widget with safe defaults
    local widget = {
        id = self:generateId(),
        x = props.x,
        y = props.y,
        width = props.width or 10,
        height = props.height or 3,
        text = props.text or self.settings.defaultText,
        color = props.color or self.settings.defaultColor,
        
        -- Internal state
        isVisible = true,
        isDirty = true,
        created = os.time()
    }
    
    -- Add methods
    widget.render = function(self) return self:render() end
    widget.destroy = function(self) return self:destroy() end
    
    -- Track widget
    table.insert(self.widgets, widget)
    
    return widget
end

---
-- Validate widget properties
-- @param props table Properties to validate
-- @param schema table Validation schema
function BestPracticePlugin:validateProps(props, schema)
    for key, validation in pairs(schema) do
        local value = props[key]
        
        -- Check required
        if validation.required and value == nil then
            error("Missing required property: " .. key)
        end
        
        -- Apply default
        if value == nil and validation.default ~= nil then
            props[key] = validation.default
            value = validation.default
        end
        
        -- Check type
        if value ~= nil and validation.type and type(value) ~= validation.type then
            error("Invalid type for property '" .. key .. "': expected " .. validation.type .. ", got " .. type(value))
        end
    end
end

---
-- Safe cleanup during plugin unload
function BestPracticePlugin:destroy()
    if not self.isInitialized then
        return
    end
    
    self:logInfo("Shutting down plugin...")
    
    -- Clean up widgets
    for _, widget in pairs(self.widgets or {}) do
        if widget.destroy then
            pcall(widget.destroy, widget)
        end
    end
    
    -- Clear timers
    for _, timer in pairs(self.timers or {}) do
        if self.PixelUI.cancelTimer then
            pcall(self.PixelUI.cancelTimer, timer)
        end
    end
    
    -- Unregister components
    if self.PixelUI.unregisterWidget then
        pcall(self.PixelUI.unregisterWidget, "bestPracticeWidget")
    end
    
    -- Clear references
    self.widgets = nil
    self.cache = nil
    self.timers = nil
    self.isInitialized = false
    
    self:logInfo("Plugin shutdown complete")
end

---
-- Logging utilities
function BestPracticePlugin:logInfo(message)
    if self.PixelUI and self.PixelUI.log then
        self.PixelUI.log("INFO", self.name, message)
    else
        print("[INFO] " .. self.name .. ": " .. message)
    end
end

function BestPracticePlugin:logWarning(message)
    if self.PixelUI and self.PixelUI.log then
        self.PixelUI.log("WARN", self.name, message)
    else
        print("[WARN] " .. self.name .. ": " .. message)
    end
end

function BestPracticePlugin:logError(message)
    if self.PixelUI and self.PixelUI.log then
        self.PixelUI.log("ERROR", self.name, message)
    else
        print("[ERROR] " .. self.name .. ": " .. message)
    end
end

return BestPracticePlugin
                        </code></pre>
                    </div>
                </div>
            </div>

            <!-- Contributing -->
            <div class="widget-doc" id="contributing">
                <div class="widget-header">
                    <h2 class="widget-title">Contributing</h2>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">
                        Join the PixelUI community and contribute to the plugin ecosystem.
                        Learn how to share your plugins and collaborate with other developers.
                    </p>
                </div>

                <div class="property-section">
                    <h3 class="section-title">
                        <i data-lucide="git-branch"></i>
                        Contribution Guidelines
                    </h3>
                    <ul class="note-content">
                        <li><strong>Code Standards:</strong> Follow the established coding conventions</li>
                        <li><strong>Documentation:</strong> Provide comprehensive documentation</li>
                        <li><strong>Testing:</strong> Include unit tests for your plugins</li>
                        <li><strong>Examples:</strong> Provide working examples and demos</li>
                        <li><strong>Licensing:</strong> Use compatible open-source licenses</li>
                        <li><strong>Community:</strong> Engage with the community for feedback</li>
                    </ul>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="upload"></i>
                        Publishing Your Plugin
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">-- plugin-manifest.json
{
  "name": "my-awesome-plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "A brief description of your plugin",
  "license": "MIT",
  "homepage": "https://github.com/username/my-plugin",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/my-plugin.git"
  },
  "keywords": ["pixelui", "widget", "ui", "computercraft"],
  "main": "my-plugin.lua",
  "dependencies": {
    "pixelui": ">=1.0.0"
  },
  "files": [
    "my-plugin.lua",
    "README.md",
    "examples/",
    "docs/"
  ],
  "examples": [
    "examples/basic-usage.lua",
    "examples/advanced-features.lua"
  ],
  "documentation": "docs/README.md",
  "changelog": "CHANGELOG.md"
}</code></pre>
                    </div>
                </div>

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="book"></i>
                        Plugin Documentation Template
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-markdown"># My Awesome Plugin

A comprehensive PixelUI plugin that adds amazing functionality.

## Installation

\`\`\`lua
PixelUI.plugins.loadFromFile("my-awesome-plugin.lua")
\`\`\`

## Usage

\`\`\`lua
local widget = PixelUI.myAwesomeWidget({
    x = 10, y = 10,
    text = "Hello World!",
    color = colors.blue
})
\`\`\`

## Configuration

The plugin supports the following configuration options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`defaultColor\` | number | \`colors.blue\` | Default widget color |
| \`animationDuration\` | number | \`0.3\` | Animation duration in seconds |
| \`enableSounds\` | boolean | \`true\` | Enable sound effects |

## API Reference

### Methods

#### \`createAwesomeWidget(props)\`

Creates a new awesome widget instance.

**Parameters:**
- \`props\` (table): Widget properties
  - \`x\` (number): X position
  - \`y\` (number): Y position
  - \`text\` (string): Widget text
  - \`color\` (number, optional): Widget color

**Returns:**
- Widget instance

**Example:**
\`\`\`lua
local widget = plugin:createAwesomeWidget({
    x = 5, y = 5,
    text = "My Widget",
    color = colors.red
})
\`\`\`

## Examples

See the \`examples/\` directory for complete working examples.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.</code></pre>
                    </div>
                </div>

                <div class="quick-links">
                    <h3 class="quick-links-title">Community Resources</h3>
                    <div class="quick-links-grid">
                        <a href="https://github.com/Shlomo1412/PixelUI" class="quick-link">
                            <i data-lucide="github"></i>
                            <span>GitHub Repository</span>
                        </a>
                        <a href="#" class="quick-link">
                            <i data-lucide="message-circle"></i>
                            <span>Discord Community</span>
                        </a>
                        <a href="#" class="quick-link">
                            <i data-lucide="book"></i>
                            <span>Plugin Guidelines</span>
                        </a>
                        <a href="#" class="quick-link">
                            <i data-lucide="users"></i>
                            <span>Developer Forum</span>
                        </a>
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

            <!-- Utility Plugins -->
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

                <div class="example-section">
                    <h3 class="section-title">
                        <i data-lucide="tool"></i>
                        Helper Utilities Plugin
                    </h3>
                    
                    <div class="code-example">
                        <button class="copy-btn" aria-label="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                        <pre><code class="language-lua">local UtilityPlugin = {
    name = "PixelUIUtils",
    version = "1.0.0",
    description = "Utility functions and helpers for PixelUI development"
}

function UtilityPlugin:init(pixelUI)
    self.PixelUI = pixelUI
    
    -- Register utility functions globally
    pixelUI.utils = self:createUtilityAPI()
    
    -- Register helper widgets
    pixelUI.registerWidget("debugInfo", self.createDebugWidget)
    pixelUI.registerWidget("grid", self.createGridWidget)
    pixelUI.registerWidget("spacer", self.createSpacerWidget)
end

function UtilityPlugin:createUtilityAPI()
    return {
        -- Color utilities
        colors = {
            blend = function(color1, color2, factor)
                -- Simple color blending implementation
                return color1 -- Simplified for example
            end,
            
            darken = function(color, amount)
                return color -- Simplified implementation
            end,
            
            lighten = function(color, amount)
                return color -- Simplified implementation
            end,
            
            random = function()
                local colors = {colors.red, colors.blue, colors.green, colors.yellow}
                return colors[math.random(#colors)]
            end
        },
        
        -- Layout utilities
        layout = {
            center = function(parent, child)
                return {
                    x = parent.x + math.floor((parent.width - child.width) / 2),
                    y = parent.y + math.floor((parent.height - child.height) / 2)
                }
            end,
            
            grid = function(container, items, cols)
                local positions = {}
                local itemWidth = math.floor(container.width / cols)
                local itemHeight = 3 -- Default height
                
                for i, item in ipairs(items) do
                    local row = math.floor((i - 1) / cols)
                    local col = (i - 1) % cols
                    
                    positions[i] = {
                        x = container.x + col * itemWidth,
                        y = container.y + row * itemHeight
                    }
                end
                
                return positions
            end,
            
            stack = function(container, items, direction)
                local positions = {}
                local offset = 0
                
                for i, item in ipairs(items) do
                    if direction == "vertical" then
                        positions[i] = {
                            x = container.x,
                            y = container.y + offset
                        }
                        offset = offset + (item.height or 3) + 1
                    else
                        positions[i] = {
                            x = container.x + offset,
                            y = container.y
                        }
                        offset = offset + (item.width or 10) + 1
                    end
                end
                
                return positions
            end
        },
        
        -- Validation utilities
        validate = {
            required = function(value, name)
                if value == nil then
                    error(name .. " is required")
                end
                return value
            end,
            
            type = function(value, expectedType, name)
                if type(value) ~= expectedType then
                    error(name .. " must be of type " .. expectedType)
                end
                return value
            end,
            
            range = function(value, min, max, name)
                if value < min or value > max then
                    error(name .. " must be between " .. min .. " and " .. max)
                end
                return value
            end,
            
            props = function(props, schema)
                for key, validation in pairs(schema) do
                    local value = props[key]
                    
                    if validation.required and value == nil then
                        error("Missing required property: " .. key)
                    end
                    
                    if value and validation.type and type(value) ~= validation.type then
                        error("Invalid type for " .. key .. ": expected " .. validation.type)
                    end
                    
                    if value and validation.min and value < validation.min then
                        error(key .. " must be at least " .. validation.min)
                    end
                    
                    if value and validation.max and value > validation.max then
                        error(key .. " must be at most " .. validation.max)
                    end
                end
            end
        },
        
        -- Math utilities
        math = {
            clamp = function(value, min, max)
                return math.max(min, math.min(max, value))
            end,
            
            lerp = function(a, b, t)
                return a + (b - a) * t
            end,
            
            map = function(value, inMin, inMax, outMin, outMax)
                return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin)
            end,
            
            distance = function(x1, y1, x2, y2)
                local dx = x2 - x1
                local dy = y2 - y1
                return math.sqrt(dx * dx + dy * dy)
            end
        },
        
        -- String utilities
        string = {
            truncate = function(str, maxLength, suffix)
                suffix = suffix or "..."
                if #str <= maxLength then
                    return str
                end
                return str:sub(1, maxLength - #suffix) .. suffix
            end,
            
            wrap = function(str, width)
                local lines = {}
                local words = {}
                for word in str:gmatch("%S+") do
                    table.insert(words, word)
                end
                
                local currentLine = ""
                for _, word in ipairs(words) do
                    if #currentLine + #word + 1 <= width then
                        currentLine = currentLine .. (currentLine == "" and "" or " ") .. word
                    else
                        if currentLine ~= "" then
                            table.insert(lines, currentLine)
                        end
                        currentLine = word
                    end
                end
                
                if currentLine ~= "" then
                    table.insert(lines, currentLine)
                end
                
                return lines
            end,
            
            pad = function(str, length, char, side)
                char = char or " "
                side = side or "right"
                
                local padding = string.rep(char, math.max(0, length - #str))
                
                if side == "left" then
                    return padding .. str
                elseif side == "center" then
                    local leftPad = math.floor(#padding / 2)
                    local rightPad = #padding - leftPad
                    return string.rep(char, leftPad) .. str .. string.rep(char, rightPad)
                else
                    return str .. padding
                end
            end
        }
    }
end

-- Debug information widget
function UtilityPlugin:createDebugWidget(props)
    local widget = {
        x = props.x or 1,
        y = props.y or 1,
        width = props.width or 20,
        height = props.height or 10,
        target = props.target -- Widget to debug
    }
    
    widget.render = function(self)
        if not self.target then return end
        
        local info = {
            "Debug Info:",
            "X: " .. (self.target.x or "nil"),
            "Y: " .. (self.target.y or "nil"),
            "W: " .. (self.target.width or "nil"),
            "H: " .. (self.target.height or "nil"),
            "Type: " .. (self.target.type or "unknown"),
            "Visible: " .. tostring(self.target.isVisible or true)
        }
        
        for i, line in ipairs(info) do
            self.PixelUI.drawText(self.x, self.y + i - 1, line, colors.white)
        end
    end
    
    return widget
end

-- Grid layout widget
function UtilityPlugin:createGridWidget(props)
    local widget = {
        x = props.x or 1,
        y = props.y or 1,
        width = props.width or 20,
        height = props.height or 10,
        cols = props.cols or 4,
        rows = props.rows or 3,
        showGrid = props.showGrid ~= false,
        children = {}
    }
    
    widget.addChild = function(self, child, gridX, gridY)
        local cellWidth = math.floor(self.width / self.cols)
        local cellHeight = math.floor(self.height / self.rows)
        
        child.x = self.x + (gridX - 1) * cellWidth
        child.y = self.y + (gridY - 1) * cellHeight
        
        table.insert(self.children, child)
    end
    
    widget.render = function(self)
        -- Draw grid lines if enabled
        if self.showGrid then
            local cellWidth = math.floor(self.width / self.cols)
            local cellHeight = math.floor(self.height / self.rows)
            
            -- Draw vertical lines
            for i = 0, self.cols do
                local x = self.x + i * cellWidth
                for y = self.y, self.y + self.height - 1 do
                    self.PixelUI.drawPixel(x, y, colors.gray)
                end
            end
            
            -- Draw horizontal lines
            for i = 0, self.rows do
                local y = self.y + i * cellHeight
                for x = self.x, self.x + self.width - 1 do
                    self.PixelUI.drawPixel(x, y, colors.gray)
                end
            end
        end
        
        -- Render children
        for _, child in ipairs(self.children) do
            if child.render then
                child:render()
            end
        end
    end
    
    return widget
end

-- Spacer widget for layouts
function UtilityPlugin:createSpacerWidget(props)
    return {
        x = props.x or 1,
        y = props.y or 1,
        width = props.width or 1,
        height = props.height or 1,
        render = function() end -- Empty render function
    }
end

return UtilityPlugin</code></pre>
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
            'examples': ['basic-plugin', 'widget-plugins', 'theme-plugins', 'animation-plugins', 'utility-plugins', 'examples-gallery'],
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
