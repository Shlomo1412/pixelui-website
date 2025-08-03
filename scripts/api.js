// API Reference Page JavaScript

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// Theme management (reuse from main.js)
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
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
    }
    
    toggleTheme() {
        this.setTheme(this.theme === 'light' ? 'dark' : 'light');
    }
    
    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Comprehensive API Documentation Data
const apiDocumentation = {
    // Core Framework Functions
    init: {
        type: 'function',
        category: 'Core',
        title: 'PixelUI.init()',
        description: 'Initialize the PixelUI framework. Must be called before using any widgets.',
        syntax: 'PixelUI.init()',
        parameters: [],
        returns: { type: 'void', description: 'No return value' },
        example: {
            basic: `local PixelUI = require("pixelui")
PixelUI.init()

-- Now you can create widgets
PixelUI.label({
    x = 2, y = 2,
    text = "Hello, PixelUI!"
})`,
            advanced: `-- Initialize with custom terminal size
local PixelUI = require("pixelui")
PixelUI.init()

-- Set up your UI components
local mainContainer = PixelUI.container({
    x = 1, y = 1,
    width = 50, height = 19,
    background = colors.black
})`
        },
        notes: ['Must be called first before any other PixelUI functions', 'Only needs to be called once per program']
    },

    run: {
        type: 'function',
        category: 'Core',
        title: 'PixelUI.run()',
        description: 'Start the main event loop with optional configuration callbacks.',
        syntax: 'PixelUI.run(config)',
        parameters: [
            { name: 'config', type: 'table', optional: true, description: 'Configuration object with event callbacks' }
        ],
        returns: { type: 'void', description: 'Blocks until event loop exits' },
        example: {
            basic: `-- Simple event loop
PixelUI.run()`,
            advanced: `-- Event loop with custom handlers
PixelUI.run({
    onKey = function(key)
        if key == keys.q then
            return false -- Exit the loop
        elseif key == keys.r then
            print("Refreshing...")
            return true -- Continue loop
        end
    end,
    onEvent = function(event, ...)
        if event == "monitor_touch" then
            print("Monitor touched!")
        end
    end,
    onQuit = function()
        print("Thanks for using PixelUI!")
    end
})`
        },
        properties: [
            { name: 'config.onKey', type: 'function', description: 'Called when a key is pressed. Return false to quit.' },
            { name: 'config.onEvent', type: 'function', description: 'Called for all CC events' },
            { name: 'config.onQuit', type: 'function', description: 'Called when exiting the event loop' },
            { name: 'config.onStart', type: 'function', description: 'Called when the event loop starts' }
        ]
    },

    clear: {
        type: 'function',
        category: 'Core',
        title: 'PixelUI.clear()',
        description: 'Clear all widgets from the screen and reset the framework state.',
        syntax: 'PixelUI.clear()',
        parameters: [],
        returns: { type: 'void', description: 'No return value' },
        example: {
            basic: `-- Clear all widgets
PixelUI.clear()

-- Create new widgets
PixelUI.label({ x = 2, y = 2, text = "Fresh start!" })`,
            advanced: `-- Clear and rebuild UI
local function rebuildUI()
    PixelUI.clear()
    
    -- Recreate your interface
    createMainMenu()
    createSidebar()
    createStatusBar()
end`
        }
    },

    render: {
        type: 'function',
        category: 'Core',
        title: 'PixelUI.render()',
        description: 'Manually render all widgets to the screen. Usually called automatically.',
        syntax: 'PixelUI.render()',
        parameters: [],
        returns: { type: 'void', description: 'No return value' },
        example: {
            basic: `-- Manual render
PixelUI.render()`,
            advanced: `-- Custom render loop
while running do
    handleCustomLogic()
    PixelUI.render()
    sleep(0.05) -- 20 FPS
end`
        },
        notes: ['Usually not needed - PixelUI.run() handles rendering automatically', 'Useful for custom event loops']
    },

    animate: {
        type: 'function',
        category: 'Animation',
        title: 'PixelUI.animate()',
        description: 'Animate widget properties with custom easing and callbacks.',
        syntax: 'PixelUI.animate(widget, config)',
        parameters: [
            { name: 'widget', type: 'Widget', description: 'The widget to animate' },
            { name: 'config', type: 'table', description: 'Animation configuration' }
        ],
        returns: { type: 'Animation', description: 'Animation object for chaining' },
        example: {
            basic: `-- Simple position animation
PixelUI.animate(myButton, {
    to = { x = 10, y = 5 },
    duration = 1.0,
    easing = "outQuad"
})`,
            advanced: `-- Complex multi-property animation
PixelUI.animate(myWidget, {
    to = { 
        x = 20, 
        y = 10, 
        background = colors.red,
        width = 15
    },
    duration = 2.0,
    easing = "inOutQuad",
    onUpdate = function(widget, progress)
        -- Called each frame
        print("Progress: " .. (progress * 100) .. "%")
    end,
    onComplete = function(widget)
        print("Animation finished!")
        -- Chain another animation
        PixelUI.animate(widget, {
            to = { background = colors.green },
            duration = 0.5
        })
    end
})`
        },
        properties: [
            { name: 'config.to', type: 'table', description: 'Target property values' },
            { name: 'config.duration', type: 'number', description: 'Animation duration in seconds' },
            { name: 'config.easing', type: 'string', description: 'Easing function: "linear", "inQuad", "outQuad", "inOutQuad"' },
            { name: 'config.onUpdate', type: 'function', description: 'Called each frame with (widget, progress)' },
            { name: 'config.onComplete', type: 'function', description: 'Called when animation finishes' }
        ]
    },

    setTheme: {
        type: 'function',
        category: 'Theming',
        title: 'PixelUI.setTheme()',
        description: 'Set the global theme for all widgets.',
        syntax: 'PixelUI.setTheme(theme)',
        parameters: [
            { name: 'theme', type: 'table', description: 'Theme configuration object' }
        ],
        returns: { type: 'void', description: 'No return value' },
        example: {
            basic: `-- Simple theme
PixelUI.setTheme({
    primary = colors.blue,
    secondary = colors.lightGray,
    background = colors.black,
    text = colors.white
})`,
            advanced: `-- Comprehensive theme
PixelUI.setTheme({
    -- Global colors
    primary = colors.blue,
    secondary = colors.lightGray,
    background = colors.black,
    text = colors.white,
    
    -- Widget-specific themes
    button = {
        background = colors.blue,
        hoverBackground = colors.lightBlue,
        color = colors.white,
        border = colors.gray
    },
    textbox = {
        background = colors.black,
        border = colors.gray,
        focus = colors.blue,
        color = colors.white
    }
})`
        }
    },

    // Threading Functions
    spawnThread: {
        type: 'function',
        category: 'Threading',
        title: 'PixelUI.spawnThread()',
        description: 'Create a background thread for non-blocking operations.',
        syntax: 'PixelUI.spawnThread(func, name)',
        parameters: [
            { name: 'func', type: 'function', description: 'Function to run in background thread' },
            { name: 'name', type: 'string', optional: true, description: 'Optional name for the thread' }
        ],
        returns: { type: 'number', description: 'Thread ID for managing the thread' },
        example: {
            basic: `-- Simple background task
local threadId = PixelUI.spawnThread(function()
    for i = 1, 10 do
        print("Background task: " .. i)
        PixelUI.sleep(1)
    end
end, "CounterThread")`,
            advanced: `-- File processing with UI updates
local progressBar = PixelUI.progressBar({
    x = 5, y = 10, width = 30, value = 0
})

local threadId = PixelUI.spawnThread(function()
    local files = fs.list("data/")
    for i, file in ipairs(files) do
        -- Process file
        processFile("data/" .. file)
        
        -- Update progress bar
        progressBar.value = (i / #files) * 100
        PixelUI.sleep(0.1)
    end
    
    PixelUI.showToast("Processing complete!", "Success", "success")
end, "FileProcessor")`
        },
        notes: ['Threads run concurrently with the main UI', 'Use PixelUI.sleep() instead of os.sleep() in threads']
    },

    runAsync: {
        type: 'function',
        category: 'Threading',
        title: 'PixelUI.runAsync()',
        description: 'Run a function asynchronously with optional progress indication.',
        syntax: 'PixelUI.runAsync(func, options)',
        parameters: [
            { name: 'func', type: 'function', description: 'Function to run asynchronously' },
            { name: 'options', type: 'table', optional: true, description: 'Configuration options' }
        ],
        returns: { type: 'number', description: 'Thread ID' },
        example: {
            basic: `-- Simple async operation
PixelUI.runAsync(function()
    -- Long running task
    calculateComplexData()
end, {
    showProgress = true,
    progressText = "Calculating..."
})`,
            advanced: `-- Async with custom callbacks
PixelUI.runAsync(function()
    return downloadFile("http://example.com/data.txt")
end, {
    showProgress = true,
    progressX = 10, progressY = 5,
    progressText = "Downloading...",
    onSuccess = function(result)
        PixelUI.showToast("Download complete!", "Success", "success")
    end,
    onError = function(error)
        PixelUI.showToast("Download failed: " .. error, "Error", "error")
    end
})`
        }
    },

    showToast: {
        type: 'function',
        category: 'UI',
        title: 'PixelUI.showToast()',
        description: 'Display a temporary notification toast message.',
        syntax: 'PixelUI.showToast(message, title, type, duration)',
        parameters: [
            { name: 'message', type: 'string', description: 'Toast message content' },
            { name: 'title', type: 'string', optional: true, description: 'Toast title' },
            { name: 'type', type: 'string', optional: true, description: '"info", "success", "warning", or "error"' },
            { name: 'duration', type: 'number', optional: true, description: 'Duration in milliseconds (default: 3000)' }
        ],
        returns: { type: 'NotificationToast', description: 'Toast widget object' },
        example: {
            basic: `-- Simple toast
PixelUI.showToast("Operation completed!")`,
            advanced: `-- Styled toast with custom duration
PixelUI.showToast(
    "File saved successfully to disk",
    "File Manager",
    "success",
    5000
)`
        }
    },

    // Widget Documentation
    button: {
        type: 'widget',
        category: 'Input',
        title: 'PixelUI.button()',
        description: 'Interactive button widget with click events and customizable styling.',
        syntax: 'PixelUI.button(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Button properties and configuration' }
        ],
        returns: { type: 'Button', description: 'Button widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', default: 'auto', description: 'Button width (auto-sized if not specified)' },
            { name: 'height', type: 'number', default: '1', description: 'Button height' },
            { name: 'text', type: 'string', default: '""', description: 'Button text content' },
            { name: 'background', type: 'color', default: 'colors.gray', description: 'Background color' },
            { name: 'color', type: 'color', default: 'colors.white', description: 'Text color' },
            { name: 'enabled', type: 'boolean', default: 'true', description: 'Whether button is interactive' },
            { name: 'visible', type: 'boolean', default: 'true', description: 'Whether button is visible' }
        ],
        events: [
            { name: 'onClick', parameters: 'self', description: 'Called when button is clicked' }
        ],
        example: {
            basic: `-- Simple button
PixelUI.button({
    x = 5, y = 3,
    text = "Click Me",
    onClick = function(self)
        print("Button clicked!")
    end
})`,
            advanced: `-- Styled button with dynamic behavior
local clickCount = 0
PixelUI.button({
    x = 10, y = 5,
    width = 15,
    height = 3,
    text = "Advanced Button",
    background = colors.blue,
    color = colors.white,
    onClick = function(self)
        clickCount = clickCount + 1
        self.text = "Clicked " .. clickCount .. " times"
        
        -- Change color based on clicks
        if clickCount > 5 then
            self.background = colors.red
        elseif clickCount > 2 then
            self.background = colors.orange
        end
    end
})`
        },
        notes: ['Buttons auto-size to fit text if width is not specified', 'Use enabled=false to create disabled buttons']
    },

    textBox: {
        type: 'widget',
        category: 'Input',
        title: 'PixelUI.textBox()',
        description: 'Text input field with placeholder support, validation, and change events.',
        syntax: 'PixelUI.textBox(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'TextBox properties and configuration' }
        ],
        returns: { type: 'TextBox', description: 'TextBox widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Input field width' },
            { name: 'text', type: 'string', default: '""', description: 'Initial text content' },
            { name: 'placeholder', type: 'string', default: '""', description: 'Placeholder text when empty' },
            { name: 'maxLength', type: 'number', default: 'unlimited', description: 'Maximum text length' },
            { name: 'background', type: 'color', default: 'colors.black', description: 'Background color' },
            { name: 'color', type: 'color', default: 'colors.white', description: 'Text color' },
            { name: 'border', type: 'boolean', default: 'true', description: 'Whether to show border' },
            { name: 'enabled', type: 'boolean', default: 'true', description: 'Whether input is editable' }
        ],
        events: [
            { name: 'onChange', parameters: 'self, text', description: 'Called when text changes' },
            { name: 'onEnter', parameters: 'self, text', description: 'Called when Enter is pressed' },
            { name: 'onFocus', parameters: 'self', description: 'Called when input gains focus' },
            { name: 'onBlur', parameters: 'self', description: 'Called when input loses focus' }
        ],
        example: {
            basic: `-- Simple text input
PixelUI.textBox({
    x = 2, y = 5,
    width = 20,
    placeholder = "Enter your name",
    onChange = function(self, text)
        print("Text changed to: " .. text)
    end
})`,
            advanced: `-- Advanced text input with validation
PixelUI.textBox({
    x = 2, y = 8,
    width = 25,
    placeholder = "Enter email address",
    maxLength = 50,
    background = colors.black,
    color = colors.white,
    onChange = function(self, text)
        -- Simple email validation
        if text:find("@") and text:find("%.") then
            self.color = colors.lime
        else
            self.color = colors.red
        end
    end,
    onEnter = function(self, text)
        if text:find("@") and text:find("%.") then
            print("Valid email: " .. text)
        else
            print("Please enter a valid email")
        end
    end
})`
        },
        notes: ['Text scrolls horizontally if longer than width', 'Supports cursor positioning and text selection']
    },

    label: {
        type: 'widget',
        category: 'Display',
        title: 'PixelUI.label()',
        description: 'Static text display widget with alignment and color options.',
        syntax: 'PixelUI.label(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Label properties and configuration' }
        ],
        returns: { type: 'Label', description: 'Label widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'text', type: 'string', required: true, description: 'Text to display' },
            { name: 'color', type: 'color', default: 'colors.white', description: 'Text color' },
            { name: 'background', type: 'color', default: 'transparent', description: 'Background color' },
            { name: 'align', type: 'string', default: '"left"', description: 'Text alignment: "left", "center", "right"' },
            { name: 'width', type: 'number', default: 'auto', description: 'Label width for alignment' }
        ],
        events: [],
        example: {
            basic: `-- Simple label
PixelUI.label({
    x = 2, y = 2,
    text = "Hello, World!",
    color = colors.cyan
})`,
            advanced: `-- Styled label with alignment
PixelUI.label({
    x = 10, y = 5,
    width = 30,
    text = "Centered Title",
    color = colors.yellow,
    background = colors.blue,
    align = "center"
})`
        }
    },

    progressBar: {
        type: 'widget',
        category: 'Display',
        title: 'PixelUI.progressBar()',
        description: 'Visual progress indicator with customizable styling and value display.',
        syntax: 'PixelUI.progressBar(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'ProgressBar properties and configuration' }
        ],
        returns: { type: 'ProgressBar', description: 'ProgressBar widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Progress bar width' },
            { name: 'value', type: 'number', default: '0', description: 'Current progress value' },
            { name: 'max', type: 'number', default: '100', description: 'Maximum progress value' },
            { name: 'color', type: 'color', default: 'colors.lime', description: 'Progress bar color' },
            { name: 'background', type: 'color', default: 'colors.gray', description: 'Background color' },
            { name: 'showText', type: 'boolean', default: 'false', description: 'Whether to show percentage text' }
        ],
        events: [],
        example: {
            basic: `-- Simple progress bar
PixelUI.progressBar({
    x = 2, y = 10,
    width = 20,
    value = 75,
    max = 100,
    color = colors.lime
})`,
            advanced: `-- Animated progress bar
local progress = PixelUI.progressBar({
    x = 5, y = 8,
    width = 30,
    value = 0,
    max = 100,
    color = colors.blue,
    background = colors.gray,
    showText = true
})

-- Animate progress
for i = 0, 100, 5 do
    progress.value = i
    PixelUI.render()
    sleep(0.1)
end`
        }
    },

    container: {
        type: 'widget',
        category: 'Layout',
        title: 'PixelUI.container()',
        description: 'Layout container for organizing child widgets with optional scrolling.',
        syntax: 'PixelUI.container(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Container properties and configuration' }
        ],
        returns: { type: 'Container', description: 'Container widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Container width' },
            { name: 'height', type: 'number', required: true, description: 'Container height' },
            { name: 'background', type: 'color', default: 'transparent', description: 'Background color' },
            { name: 'border', type: 'boolean', default: 'false', description: 'Whether to show border' },
            { name: 'borderColor', type: 'color', default: 'colors.gray', description: 'Border color' },
            { name: 'isScrollable', type: 'boolean', default: 'false', description: 'Enable scrolling (WIP)' },
            { name: 'layout', type: 'string', default: '"absolute"', description: 'Layout mode: "absolute", "vertical", "horizontal"' }
        ],
        events: [],
        example: {
            basic: `-- Simple container
local container = PixelUI.container({
    x = 5, y = 3,
    width = 30,
    height = 15,
    background = colors.black,
    border = true
})

-- Add child widgets
container:addChild(PixelUI.label({
    x = 2, y = 2,
    text = "Inside container"
}))`,
            advanced: `-- Scrollable container (WIP)
local scrollContainer = PixelUI.container({
    x = 2, y = 2,
    width = 25,
    height = 10,
    background = colors.gray,
    border = true,
    isScrollable = true -- Note: Scrolling is Work In Progress
})

-- Add many child widgets
for i = 1, 20 do
    scrollContainer:addChild(PixelUI.label({
        x = 2, y = i,
        text = "Item " .. i,
        color = colors.white
    }))
end`
        },
        methods: [
            { name: 'addChild(widget)', description: 'Add a child widget to the container' },
            { name: 'removeChild(widget)', description: 'Remove a child widget from the container' },
            { name: 'clear()', description: 'Remove all child widgets' }
        ],
        warnings: ['Scrolling functionality (isScrollable) is currently Work In Progress', 'Child widget positions are relative to container']
    },

    scrollBar: {
        type: 'widget',
        category: 'Navigation',
        title: 'PixelUI.scrollBar()',
        description: 'Standalone scrollbar widget for custom scrolling interfaces.',
        syntax: 'PixelUI.scrollBar(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'ScrollBar properties and configuration' }
        ],
        returns: { type: 'ScrollBar', description: 'ScrollBar widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'length', type: 'number', required: true, description: 'Scrollbar length' },
            { name: 'orientation', type: 'string', default: '"vertical"', description: '"vertical" or "horizontal"' },
            { name: 'min', type: 'number', default: '0', description: 'Minimum scroll value' },
            { name: 'max', type: 'number', default: '100', description: 'Maximum scroll value' },
            { name: 'value', type: 'number', default: '0', description: 'Current scroll value' },
            { name: 'pageSize', type: 'number', default: '10', description: 'Size of scrollable page' },
            { name: 'color', type: 'color', default: 'colors.gray', description: 'Scrollbar track color' },
            { name: 'barColor', type: 'color', default: 'colors.lightGray', description: 'Scrollbar handle color' }
        ],
        events: [
            { name: 'onChange', parameters: 'self, value', description: 'Called when scroll value changes' }
        ],
        example: {
            basic: `-- Vertical scrollbar
PixelUI.scrollBar({
    x = 30, y = 2,
    length = 15,
    orientation = "vertical",
    min = 0,
    max = 100,
    value = 25,
    onChange = function(self, value)
        print("Scrolled to: " .. value)
    end
})`,
            advanced: `-- Horizontal scrollbar with page size
PixelUI.scrollBar({
    x = 2, y = 18,
    length = 25,
    orientation = "horizontal",
    min = 0,
    max = 200,
    value = 50,
    pageSize = 20,
    color = colors.gray,
    barColor = colors.blue,
    onChange = function(self, value)
        -- Scroll content based on value
        scrollContent(value)
    end
})`
        },
        warnings: ['Scrollbar functionality is currently Work In Progress', 'Integration with containers may have limitations']
    },
    
    passwordBox: {
        name: 'PasswordBox',
        category: 'Input Widgets',
        description: 'A secure text input field that masks typed characters, perfect for password entry and sensitive data.',
        syntax: 'passwordBox.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the password box' },
            { name: 'height', type: 'number', description: 'Height of the password box' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text when empty' },
            { name: 'maxLength', type: 'number', description: 'Maximum number of characters allowed' },
            { name: 'maskChar', type: 'string', description: 'Character used to mask input (default: "*")' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the input field' },
            { name: 'textColor', type: 'color', description: 'Color of the masked text' },
            { name: 'borderColor', type: 'color', description: 'Border color of the input field' },
            { name: 'focusColor', type: 'color', description: 'Border color when focused' },
            { name: 'enabled', type: 'boolean', description: 'Whether the password box is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the password box is visible' }
        ],
        methods: [
            { name: 'getText()', returns: 'string', description: 'Gets the actual password text' },
            { name: 'setText(text)', params: 'string', description: 'Sets the password text' },
            { name: 'clear()', description: 'Clears the password field' },
            { name: 'focus()', description: 'Focuses the password box for input' },
            { name: 'blur()', description: 'Removes focus from the password box' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the password box' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the password box' }
        ],
        events: [
            { name: 'onChange', params: 'self, text', description: 'Fired when the password text changes' },
            { name: 'onFocus', params: 'self', description: 'Fired when the password box gains focus' },
            { name: 'onBlur', params: 'self', description: 'Fired when the password box loses focus' },
            { name: 'onEnter', params: 'self, text', description: 'Fired when Enter key is pressed' }
        ],
        examples: {
            basic: `local passwordInput = passwordBox.new(parent, 5, 3, 20, 1, {
    placeholder = "Enter password...",
    maxLength = 50,
    maskChar = "•",
    backgroundColor = colors.white,
    textColor = colors.black,
    borderColor = colors.gray,
    focusColor = colors.blue,
    onChange = function(self, text)
        if #text >= 8 then
            -- Password meets minimum length
            self.borderColor = colors.green
        else
            self.borderColor = colors.red
        end
    end,
    onEnter = function(self, text)
        -- Handle password submission
        if validatePassword(text) then
            print("Password accepted")
        else
            print("Invalid password")
        end
    end
})`,
            advanced: `-- Login form with password validation
local loginForm = container.new(parent, 10, 5, 30, 15)

local usernameInput = textBox.new(loginForm, 2, 2, 26, 1, {
    placeholder = "Username"
})

local passwordInput = passwordBox.new(loginForm, 2, 5, 26, 1, {
    placeholder = "Password",
    maskChar = "●",
    onChange = function(self, text)
        local strength = calculatePasswordStrength(text)
        updatePasswordStrengthIndicator(strength)
    end
})

local loginButton = button.new(loginForm, 2, 8, 26, 3, {
    text = "Login",
    onClick = function()
        local username = usernameInput:getText()
        local password = passwordInput:getText()
        
        if authenticateUser(username, password) then
            redirectToMainScreen()
        else
            showErrorMessage("Invalid credentials")
        end
    end
})`
        },
        notes: ['Password text is never displayed visually', 'Use secure practices when handling password data', 'Consider implementing password strength indicators']
    },
    
    checkBox: {
        name: 'CheckBox',
        category: 'Input Widgets',
        description: 'A binary selection widget that allows users to toggle between checked and unchecked states.',
        syntax: 'checkBox.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the checkbox' },
            { name: 'height', type: 'number', description: 'Height of the checkbox' },
            { name: 'text', type: 'string', description: 'Label text displayed next to the checkbox' },
            { name: 'checked', type: 'boolean', description: 'Whether the checkbox is checked' },
            { name: 'checkChar', type: 'string', description: 'Character displayed when checked (default: "X")' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the checkbox' },
            { name: 'textColor', type: 'color', description: 'Color of the label text' },
            { name: 'checkColor', type: 'color', description: 'Color of the check character' },
            { name: 'borderColor', type: 'color', description: 'Border color of the checkbox' },
            { name: 'hoverColor', type: 'color', description: 'Background color when hovered' },
            { name: 'enabled', type: 'boolean', description: 'Whether the checkbox is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the checkbox is visible' }
        ],
        methods: [
            { name: 'isChecked()', returns: 'boolean', description: 'Returns whether the checkbox is checked' },
            { name: 'setChecked(checked)', params: 'boolean', description: 'Sets the checked state' },
            { name: 'toggle()', description: 'Toggles the checked state' },
            { name: 'setText(text)', params: 'string', description: 'Sets the label text' },
            { name: 'getText()', returns: 'string', description: 'Gets the label text' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the checkbox' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the checkbox' }
        ],
        events: [
            { name: 'onChange', params: 'self, checked', description: 'Fired when the checked state changes' },
            { name: 'onClick', params: 'self', description: 'Fired when the checkbox is clicked' },
            { name: 'onHover', params: 'self', description: 'Fired when mouse hovers over the checkbox' },
            { name: 'onLeave', params: 'self', description: 'Fired when mouse leaves the checkbox' }
        ],
        examples: {
            basic: `local agreeCheckbox = checkBox.new(parent, 5, 10, 25, 1, {
    text = "I agree to the terms",
    checked = false,
    checkChar = "✓",
    backgroundColor = colors.white,
    textColor = colors.black,
    checkColor = colors.green,
    borderColor = colors.gray,
    onChange = function(self, checked)
        if checked then
            print("User agreed to terms")
            enableSubmitButton()
        else
            print("User disagreed")
            disableSubmitButton()
        end
    end
})`,
            advanced: `-- Settings panel with multiple checkboxes
local settingsPanel = container.new(parent, 5, 5, 40, 20)

local settings = {
    { key = "sound", label = "Enable Sound Effects", default = true },
    { key = "notifications", label = "Show Notifications", default = true },
    { key = "autosave", label = "Auto-save Progress", default = false },
    { key = "analytics", label = "Share Analytics Data", default = false }
}

local checkboxes = {}

for i, setting in ipairs(settings) do
    checkboxes[setting.key] = checkBox.new(settingsPanel, 2, i * 3, 35, 1, {
        text = setting.label,
        checked = setting.default,
        checkChar = "●",
        onChange = function(self, checked)
            -- Save setting to config
            config.set(setting.key, checked)
            
            -- Special handling for certain settings
            if setting.key == "sound" then
                audio.setEnabled(checked)
            elseif setting.key == "notifications" then
                notification.setEnabled(checked)
            end
        end
    })
end

-- Select all / Deselect all functionality
local selectAllBtn = button.new(settingsPanel, 2, 16, 15, 1, {
    text = "Select All",
    onClick = function()
        for _, checkbox in pairs(checkboxes) do
            checkbox:setChecked(true)
        end
    end
})

local deselectAllBtn = button.new(settingsPanel, 20, 16, 15, 1, {
    text = "Deselect All",
    onClick = function()
        for _, checkbox in pairs(checkboxes) do
            checkbox:setChecked(false)
        end
    end
})`
        },
        notes: ['Checkbox state can be controlled programmatically', 'Consider grouping related checkboxes visually', 'Use consistent check characters throughout your application']
    },
    
    radioButton: {
        name: 'RadioButton',
        category: 'Input Widgets',
        description: 'A selection widget that allows users to choose one option from a group of mutually exclusive choices.',
        syntax: 'radioButton.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the radio button' },
            { name: 'height', type: 'number', description: 'Height of the radio button' },
            { name: 'text', type: 'string', description: 'Label text displayed next to the radio button' },
            { name: 'selected', type: 'boolean', description: 'Whether the radio button is selected' },
            { name: 'group', type: 'string', description: 'Group name for mutual exclusion' },
            { name: 'value', type: 'any', description: 'Value associated with this radio button' },
            { name: 'selectChar', type: 'string', description: 'Character displayed when selected (default: "●")' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the radio button' },
            { name: 'textColor', type: 'color', description: 'Color of the label text' },
            { name: 'selectColor', type: 'color', description: 'Color of the selection character' },
            { name: 'borderColor', type: 'color', description: 'Border color of the radio button' },
            { name: 'hoverColor', type: 'color', description: 'Background color when hovered' },
            { name: 'enabled', type: 'boolean', description: 'Whether the radio button is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the radio button is visible' }
        ],
        methods: [
            { name: 'isSelected()', returns: 'boolean', description: 'Returns whether the radio button is selected' },
            { name: 'setSelected(selected)', params: 'boolean', description: 'Sets the selected state' },
            { name: 'select()', description: 'Selects this radio button (deselects others in group)' },
            { name: 'getText()', returns: 'string', description: 'Gets the label text' },
            { name: 'setText(text)', params: 'string', description: 'Sets the label text' },
            { name: 'getValue()', returns: 'any', description: 'Gets the associated value' },
            { name: 'setValue(value)', params: 'any', description: 'Sets the associated value' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the radio button' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the radio button' }
        ],
        events: [
            { name: 'onChange', params: 'self, selected', description: 'Fired when the selection state changes' },
            { name: 'onSelect', params: 'self, value', description: 'Fired when this radio button is selected' },
            { name: 'onClick', params: 'self', description: 'Fired when the radio button is clicked' },
            { name: 'onHover', params: 'self', description: 'Fired when mouse hovers over the radio button' },
            { name: 'onLeave', params: 'self', description: 'Fired when mouse leaves the radio button' }
        ],
        examples: {
            basic: `-- Simple difficulty selection
local difficultyGroup = "difficulty"

local easyRadio = radioButton.new(parent, 5, 5, 20, 1, {
    text = "Easy",
    group = difficultyGroup,
    value = "easy",
    selected = true,
    selectChar = "◉",
    onSelect = function(self, value)
        setGameDifficulty(value)
        print("Selected difficulty: " .. value)
    end
})

local mediumRadio = radioButton.new(parent, 5, 7, 20, 1, {
    text = "Medium",
    group = difficultyGroup,
    value = "medium",
    onSelect = function(self, value)
        setGameDifficulty(value)
        print("Selected difficulty: " .. value)
    end
})

local hardRadio = radioButton.new(parent, 5, 9, 20, 1, {
    text = "Hard",
    group = difficultyGroup,
    value = "hard",
    onSelect = function(self, value)
        setGameDifficulty(value)
        print("Selected difficulty: " .. value)
    end
})`,
            advanced: `-- Configuration form with multiple radio button groups
local configForm = container.new(parent, 5, 5, 50, 25)

-- Theme selection group
local themeOptions = {
    { text = "Light Theme", value = "light" },
    { text = "Dark Theme", value = "dark" },
    { text = "Auto (System)", value = "auto" }
}

local themeRadios = {}
for i, option in ipairs(themeOptions) do
    themeRadios[option.value] = radioButton.new(configForm, 2, 2 + i, 25, 1, {
        text = option.text,
        group = "theme",
        value = option.value,
        selected = (option.value == "auto"),
        onSelect = function(self, value)
            config.theme = value
            applyTheme(value)
        end
    })
end

-- Language selection group
local languageOptions = {
    { text = "English", value = "en" },
    { text = "Español", value = "es" },
    { text = "Français", value = "fr" },
    { text = "Deutsch", value = "de" }
}

local languageRadios = {}
for i, option in ipairs(languageOptions) do
    languageRadios[option.value] = radioButton.new(configForm, 30, 2 + i, 18, 1, {
        text = option.text,
        group = "language",
        value = option.value,
        selected = (option.value == "en"),
        onSelect = function(self, value)
            config.language = value
            setApplicationLanguage(value)
        end
    })
end

-- Save settings button
local saveBtn = button.new(configForm, 15, 20, 20, 3, {
    text = "Save Settings",
    onClick = function()
        saveConfiguration(config)
        showNotification("Settings saved successfully!")
    end
})`
        },
        notes: ['Radio buttons in the same group are mutually exclusive', 'Only one radio button per group can be selected at a time', 'Use meaningful group names to organize related options']
    },
    
    toggleSwitch: {
        name: 'ToggleSwitch',
        category: 'Input Widgets',
        description: 'A modern toggle switch widget that provides an intuitive on/off control with smooth animations.',
        syntax: 'toggleSwitch.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the toggle switch' },
            { name: 'height', type: 'number', description: 'Height of the toggle switch' },
            { name: 'state', type: 'boolean', description: 'Whether the switch is on (true) or off (false)' },
            { name: 'label', type: 'string', description: 'Optional label text displayed next to the switch' },
            { name: 'onText', type: 'string', description: 'Text displayed when switch is on (default: "ON")' },
            { name: 'offText', type: 'string', description: 'Text displayed when switch is off (default: "OFF")' },
            { name: 'onColor', type: 'color', description: 'Background color when switch is on' },
            { name: 'offColor', type: 'color', description: 'Background color when switch is off' },
            { name: 'handleColor', type: 'color', description: 'Color of the switch handle' },
            { name: 'textColor', type: 'color', description: 'Color of the on/off text' },
            { name: 'borderColor', type: 'color', description: 'Border color of the switch' },
            { name: 'animationSpeed', type: 'number', description: 'Speed of the toggle animation (0-1)' },
            { name: 'enabled', type: 'boolean', description: 'Whether the toggle switch is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the toggle switch is visible' }
        ],
        methods: [
            { name: 'isOn()', returns: 'boolean', description: 'Returns whether the switch is on' },
            { name: 'isOff()', returns: 'boolean', description: 'Returns whether the switch is off' },
            { name: 'setState(state)', params: 'boolean', description: 'Sets the switch state' },
            { name: 'turnOn()', description: 'Turns the switch on' },
            { name: 'turnOff()', description: 'Turns the switch off' },
            { name: 'toggle()', description: 'Toggles the switch state' },
            { name: 'setLabel(label)', params: 'string', description: 'Sets the label text' },
            { name: 'getLabel()', returns: 'string', description: 'Gets the label text' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the toggle switch' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the toggle switch' }
        ],
        events: [
            { name: 'onChange', params: 'self, state', description: 'Fired when the switch state changes' },
            { name: 'onToggle', params: 'self, state', description: 'Fired when the switch is toggled' },
            { name: 'onTurnOn', params: 'self', description: 'Fired when the switch is turned on' },
            { name: 'onTurnOff', params: 'self', description: 'Fired when the switch is turned off' },
            { name: 'onClick', params: 'self', description: 'Fired when the switch is clicked' }
        ],
        examples: {
            basic: `local wifiToggle = toggleSwitch.new(parent, 10, 5, 12, 3, {
    state = true,
    label = "WiFi",
    onText = "ON",
    offText = "OFF",
    onColor = colors.green,
    offColor = colors.red,
    handleColor = colors.white,
    textColor = colors.white,
    animationSpeed = 0.5,
    onChange = function(self, state)
        if state then
            enableWifi()
            print("WiFi enabled")
        else
            disableWifi()
            print("WiFi disabled")
        end
    end
})`,
            advanced: `-- Settings panel with multiple toggle switches
local settingsPanel = container.new(parent, 5, 5, 45, 20)

local settings = {
    {
        key = "bluetooth",
        label = "Bluetooth",
        default = false,
        action = function(state) bluetooth.setEnabled(state) end
    },
    {
        key = "location",
        label = "Location Services",
        default = true,
        action = function(state) location.setEnabled(state) end
    },
    {
        key = "notifications",
        label = "Push Notifications",
        default = true,
        action = function(state) notifications.setEnabled(state) end
    },
    {
        key = "autoUpdate",
        label = "Auto Update Apps",
        default = false,
        action = function(state) autoUpdate.setEnabled(state) end
    }
}

local toggles = {}

for i, setting in ipairs(settings) do
    local yPos = 2 + (i - 1) * 4
    
    -- Setting label
    local settingLabel = label.new(settingsPanel, 2, yPos, 25, 1, {
        text = setting.label,
        textColor = colors.black
    })
    
    -- Toggle switch
    toggles[setting.key] = toggleSwitch.new(settingsPanel, 30, yPos, 10, 1, {
        state = setting.default,
        onColor = colors.green,
        offColor = colors.gray,
        handleColor = colors.white,
        animationSpeed = 0.3,
        onChange = function(self, state)
            -- Execute the setting action
            setting.action(state)
            
            -- Save to configuration
            config.settings[setting.key] = state
            saveConfig()
            
            -- Update UI feedback
            if state then
                settingLabel.textColor = colors.black
            else
                settingLabel.textColor = colors.gray
            end
        end
    })
end

-- Reset to defaults button
local resetBtn = button.new(settingsPanel, 15, 17, 15, 2, {
    text = "Reset Defaults",
    onClick = function()
        for i, setting in ipairs(settings) do
            toggles[setting.key]:setState(setting.default)
        end
    end
})`
        },
        notes: ['Toggle switches provide clear visual feedback', 'Use consistent colors across your application', 'Consider adding haptic feedback for better UX']
    },
    
    slider: {
        name: 'Slider',
        category: 'Input Widgets',
        description: 'A draggable slider widget for selecting numeric values within a specified range.',
        syntax: 'slider.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the slider' },
            { name: 'height', type: 'number', description: 'Height of the slider' },
            { name: 'value', type: 'number', description: 'Current value of the slider' },
            { name: 'min', type: 'number', description: 'Minimum value (default: 0)' },
            { name: 'max', type: 'number', description: 'Maximum value (default: 100)' },
            { name: 'step', type: 'number', description: 'Step increment (default: 1)' },
            { name: 'orientation', type: 'string', description: 'Orientation: "horizontal" or "vertical"' },
            { name: 'showValue', type: 'boolean', description: 'Whether to display the current value' },
            { name: 'valueFormat', type: 'string', description: 'Format string for value display (e.g., "%.1f%%")' },
            { name: 'trackColor', type: 'color', description: 'Color of the slider track' },
            { name: 'fillColor', type: 'color', description: 'Color of the filled portion' },
            { name: 'handleColor', type: 'color', description: 'Color of the slider handle' },
            { name: 'textColor', type: 'color', description: 'Color of the value text' },
            { name: 'enabled', type: 'boolean', description: 'Whether the slider is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the slider is visible' }
        ],
        methods: [
            { name: 'getValue()', returns: 'number', description: 'Gets the current slider value' },
            { name: 'setValue(value)', params: 'number', description: 'Sets the slider value' },
            { name: 'getMin()', returns: 'number', description: 'Gets the minimum value' },
            { name: 'setMin(min)', params: 'number', description: 'Sets the minimum value' },
            { name: 'getMax()', returns: 'number', description: 'Gets the maximum value' },
            { name: 'setMax(max)', params: 'number', description: 'Sets the maximum value' },
            { name: 'getStep()', returns: 'number', description: 'Gets the step increment' },
            { name: 'setStep(step)', params: 'number', description: 'Sets the step increment' },
            { name: 'getPercentage()', returns: 'number', description: 'Gets the value as a percentage (0-100)' },
            { name: 'setPercentage(percent)', params: 'number', description: 'Sets the value by percentage' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the slider' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the slider' }
        ],
        events: [
            { name: 'onChange', params: 'self, value', description: 'Fired when the slider value changes' },
            { name: 'onDrag', params: 'self, value', description: 'Fired continuously while dragging' },
            { name: 'onDragStart', params: 'self, value', description: 'Fired when dragging starts' },
            { name: 'onDragEnd', params: 'self, value', description: 'Fired when dragging ends' },
            { name: 'onClick', params: 'self, value', description: 'Fired when slider track is clicked' }
        ],
        examples: {
            basic: `local volumeSlider = slider.new(parent, 10, 5, 20, 3, {
    value = 50,
    min = 0,
    max = 100,
    step = 5,
    orientation = "horizontal",
    showValue = true,
    valueFormat = "%d%%",
    trackColor = colors.gray,
    fillColor = colors.blue,
    handleColor = colors.white,
    textColor = colors.black,
    onChange = function(self, value)
        setSystemVolume(value)
        print("Volume set to: " .. value .. "%")
    end
})`,
            advanced: `-- Audio mixer with multiple sliders
local mixerPanel = container.new(parent, 5, 5, 50, 25)

local channels = {
    { name = "Master", value = 80, color = colors.red },
    { name = "Music", value = 65, color = colors.blue },
    { name = "Effects", value = 70, color = colors.green },
    { name = "Voice", value = 85, color = colors.orange },
    { name = "Ambient", value = 40, color = colors.purple }
}

local sliders = {}

for i, channel in ipairs(channels) do
    local xPos = 2 + (i - 1) * 9
    
    -- Channel label
    local channelLabel = label.new(mixerPanel, xPos, 2, 8, 1, {
        text = channel.name,
        textAlign = "center",
        textColor = colors.black
    })
    
    -- Vertical slider
    sliders[channel.name] = slider.new(mixerPanel, xPos + 3, 4, 2, 15, {
        value = channel.value,
        min = 0,
        max = 100,
        step = 1,
        orientation = "vertical",
        showValue = false,
        trackColor = colors.lightGray,
        fillColor = channel.color,
        handleColor = colors.white,
        onChange = function(self, value)
            -- Update audio channel
            audio.setChannelVolume(channel.name:lower(), value / 100)
            
            -- Update value display
            valueLabel.text = tostring(value)
        end,
        onDragEnd = function(self, value)
            -- Save mixer state
            saveMixerSettings()
        end
    })
    
    -- Value display below slider
    local valueLabel = label.new(mixerPanel, xPos, 20, 8, 1, {
        text = tostring(channel.value),
        textAlign = "center",
        textColor = colors.black
    })
end

-- Master controls
local muteAllBtn = button.new(mixerPanel, 2, 22, 10, 2, {
    text = "Mute All",
    onClick = function()
        for _, slider in pairs(sliders) do
            slider:setValue(0)
        end
    end
})

local resetBtn = button.new(mixerPanel, 15, 22, 10, 2, {
    text = "Reset",
    onClick = function()
        for i, channel in ipairs(channels) do
            sliders[channel.name]:setValue(channel.value)
        end
    end
})`
        },
        notes: ['Sliders support both horizontal and vertical orientations', 'Use appropriate step values for smooth interaction', 'Consider showing value feedback during dragging']
    },
    
    rangeSlider: {
        name: 'RangeSlider',
        category: 'Input Widgets',
        description: 'A dual-handle slider widget for selecting a range of values with minimum and maximum bounds.',
        syntax: 'rangeSlider.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the range slider' },
            { name: 'height', type: 'number', description: 'Height of the range slider' },
            { name: 'minValue', type: 'number', description: 'Current minimum value of the range' },
            { name: 'maxValue', type: 'number', description: 'Current maximum value of the range' },
            { name: 'min', type: 'number', description: 'Absolute minimum value (default: 0)' },
            { name: 'max', type: 'number', description: 'Absolute maximum value (default: 100)' },
            { name: 'step', type: 'number', description: 'Step increment (default: 1)' },
            { name: 'orientation', type: 'string', description: 'Orientation: "horizontal" or "vertical"' },
            { name: 'showValues', type: 'boolean', description: 'Whether to display the current range values' },
            { name: 'valueFormat', type: 'string', description: 'Format string for value display' },
            { name: 'trackColor', type: 'color', description: 'Color of the slider track' },
            { name: 'rangeColor', type: 'color', description: 'Color of the selected range' },
            { name: 'handleColor', type: 'color', description: 'Color of the slider handles' },
            { name: 'textColor', type: 'color', description: 'Color of the value text' },
            { name: 'enabled', type: 'boolean', description: 'Whether the range slider is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the range slider is visible' }
        ],
        methods: [
            { name: 'getRange()', returns: 'table', description: 'Gets the current range as {min, max}' },
            { name: 'setRange(minValue, maxValue)', params: 'number, number', description: 'Sets the range values' },
            { name: 'getMinValue()', returns: 'number', description: 'Gets the current minimum value' },
            { name: 'setMinValue(value)', params: 'number', description: 'Sets the minimum value' },
            { name: 'getMaxValue()', returns: 'number', description: 'Gets the current maximum value' },
            { name: 'setMaxValue(value)', params: 'number', description: 'Sets the maximum value' },
            { name: 'getBounds()', returns: 'table', description: 'Gets the absolute bounds as {min, max}' },
            { name: 'setBounds(min, max)', params: 'number, number', description: 'Sets the absolute bounds' },
            { name: 'getRangeWidth()', returns: 'number', description: 'Gets the width of the selected range' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the range slider' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the range slider' }
        ],
        events: [
            { name: 'onChange', params: 'self, minValue, maxValue', description: 'Fired when the range changes' },
            { name: 'onRangeChange', params: 'self, range', description: 'Fired when the range changes (returns table)' },
            { name: 'onMinChange', params: 'self, minValue', description: 'Fired when minimum value changes' },
            { name: 'onMaxChange', params: 'self, maxValue', description: 'Fired when maximum value changes' },
            { name: 'onDragStart', params: 'self, handle', description: 'Fired when dragging starts ("min" or "max")' },
            { name: 'onDragEnd', params: 'self, handle', description: 'Fired when dragging ends' }
        ],
        examples: {
            basic: `local priceRange = rangeSlider.new(parent, 10, 5, 25, 3, {
    minValue = 100,
    maxValue = 500,
    min = 0,
    max = 1000,
    step = 25,
    orientation = "horizontal",
    showValues = true,
    valueFormat = "$%d",
    trackColor = colors.gray,
    rangeColor = colors.green,
    handleColor = colors.white,
    textColor = colors.black,
    onChange = function(self, minValue, maxValue)
        filterProductsByPrice(minValue, maxValue)
        print("Price range: $" .. minValue .. " - $" .. maxValue)
    end
})`,
            advanced: `-- Advanced filter panel with multiple range sliders
local filterPanel = container.new(parent, 5, 5, 40, 30)

-- Price range filter
local priceLabel = label.new(filterPanel, 2, 2, 35, 1, {
    text = "Price Range: $0 - $1000",
    textColor = colors.black
})

local priceRange = rangeSlider.new(filterPanel, 2, 4, 35, 2, {
    minValue = 100,
    maxValue = 800,
    min = 0,
    max = 1000,
    step = 50,
    trackColor = colors.lightGray,
    rangeColor = colors.green,
    handleColor = colors.white,
    onChange = function(self, minValue, maxValue)
        priceLabel.text = "Price Range: $" .. minValue .. " - $" .. maxValue
        applyPriceFilter(minValue, maxValue)
    end
})

-- Age range filter
local ageLabel = label.new(filterPanel, 2, 8, 35, 1, {
    text = "Age Range: 18 - 65",
    textColor = colors.black
})

local ageRange = rangeSlider.new(filterPanel, 2, 10, 35, 2, {
    minValue = 25,
    maxValue = 45,
    min = 18,
    max = 65,
    step = 1,
    trackColor = colors.lightGray,
    rangeColor = colors.blue,
    handleColor = colors.white,
    onChange = function(self, minValue, maxValue)
        ageLabel.text = "Age Range: " .. minValue .. " - " .. maxValue
        applyAgeFilter(minValue, maxValue)
    end
})

-- Experience range filter (in years)
local expLabel = label.new(filterPanel, 2, 14, 35, 1, {
    text = "Experience: 0 - 20 years",
    textColor = colors.black
})

local expRange = rangeSlider.new(filterPanel, 2, 16, 35, 2, {
    minValue = 2,
    maxValue = 10,
    min = 0,
    max = 20,
    step = 1,
    trackColor = colors.lightGray,
    rangeColor = colors.orange,
    handleColor = colors.white,
    onChange = function(self, minValue, maxValue)
        local minText = minValue == 0 and "0" or tostring(minValue)
        local maxText = maxValue == 20 and "20+" or tostring(maxValue)
        expLabel.text = "Experience: " .. minText .. " - " .. maxText .. " years"
        applyExperienceFilter(minValue, maxValue)
    end
})

-- Filter actions
local clearBtn = button.new(filterPanel, 2, 20, 15, 2, {
    text = "Clear Filters",
    onClick = function()
        priceRange:setRange(0, 1000)
        ageRange:setRange(18, 65)
        expRange:setRange(0, 20)
    end
})

local applyBtn = button.new(filterPanel, 20, 20, 15, 2, {
    text = "Apply Filters",
    onClick = function()
        local filters = {
            price = priceRange:getRange(),
            age = ageRange:getRange(),
            experience = expRange:getRange()
        }
        applyAllFilters(filters)
        showNotification("Filters applied successfully!")
    end
})`
        },
        notes: ['Range sliders are perfect for filtering and selection tasks', 'Ensure minimum value never exceeds maximum value', 'Consider providing preset range buttons for common selections']
    },
    
    numericUpDown: {
        name: 'NumericUpDown',
        category: 'Input Widgets',
        description: 'A numeric input widget with up/down arrow buttons for incrementing and decrementing values.',
        syntax: 'numericUpDown.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the numeric up-down control' },
            { name: 'height', type: 'number', description: 'Height of the numeric up-down control' },
            { name: 'value', type: 'number', description: 'Current numeric value' },
            { name: 'min', type: 'number', description: 'Minimum allowed value' },
            { name: 'max', type: 'number', description: 'Maximum allowed value' },
            { name: 'step', type: 'number', description: 'Step increment/decrement amount (default: 1)' },
            { name: 'decimals', type: 'number', description: 'Number of decimal places to display' },
            { name: 'prefix', type: 'string', description: 'Text prefix (e.g., "$", "x")' },
            { name: 'suffix', type: 'string', description: 'Text suffix (e.g., "%", "px", "kg")' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the input field' },
            { name: 'textColor', type: 'color', description: 'Color of the numeric text' },
            { name: 'borderColor', type: 'color', description: 'Border color of the control' },
            { name: 'buttonColor', type: 'color', description: 'Color of the up/down buttons' },
            { name: 'buttonHoverColor', type: 'color', description: 'Button color when hovered' },
            { name: 'focusColor', type: 'color', description: 'Border color when focused' },
            { name: 'enabled', type: 'boolean', description: 'Whether the control is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the control is visible' }
        ],
        methods: [
            { name: 'getValue()', returns: 'number', description: 'Gets the current numeric value' },
            { name: 'setValue(value)', params: 'number', description: 'Sets the numeric value' },
            { name: 'increment()', description: 'Increases value by step amount' },
            { name: 'decrement()', description: 'Decreases value by step amount' },
            { name: 'getMin()', returns: 'number', description: 'Gets the minimum value' },
            { name: 'setMin(min)', params: 'number', description: 'Sets the minimum value' },
            { name: 'getMax()', returns: 'number', description: 'Gets the maximum value' },
            { name: 'setMax(max)', params: 'number', description: 'Sets the maximum value' },
            { name: 'getStep()', returns: 'number', description: 'Gets the step amount' },
            { name: 'setStep(step)', params: 'number', description: 'Sets the step amount' },
            { name: 'setDecimals(decimals)', params: 'number', description: 'Sets number of decimal places' },
            { name: 'focus()', description: 'Focuses the numeric input' },
            { name: 'blur()', description: 'Removes focus from the input' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the control' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the control' }
        ],
        events: [
            { name: 'onChange', params: 'self, value', description: 'Fired when the value changes' },
            { name: 'onIncrement', params: 'self, value', description: 'Fired when value is incremented' },
            { name: 'onDecrement', params: 'self, value', description: 'Fired when value is decremented' },
            { name: 'onMin', params: 'self, value', description: 'Fired when minimum value is reached' },
            { name: 'onMax', params: 'self, value', description: 'Fired when maximum value is reached' },
            { name: 'onFocus', params: 'self', description: 'Fired when the input gains focus' },
            { name: 'onBlur', params: 'self', description: 'Fired when the input loses focus' }
        ],
        examples: {
            basic: `local quantityPicker = numericUpDown.new(parent, 10, 5, 15, 3, {
    value = 1,
    min = 1,
    max = 99,
    step = 1,
    decimals = 0,
    prefix = "Qty: ",
    backgroundColor = colors.white,
    textColor = colors.black,
    borderColor = colors.gray,
    buttonColor = colors.lightBlue,
    onChange = function(self, value)
        updateCartQuantity(value)
        print("Quantity updated to: " .. value)
    end,
    onMax = function(self, value)
        showNotification("Maximum quantity reached!")
    end
})`,
            advanced: `-- Product configuration panel
local configPanel = container.new(parent, 5, 5, 45, 25)

-- Price input with currency
local priceInput = numericUpDown.new(configPanel, 2, 2, 20, 2, {
    value = 29.99,
    min = 0.01,
    max = 9999.99,
    step = 0.01,
    decimals = 2,
    prefix = "$",
    backgroundColor = colors.white,
    textColor = colors.black,
    borderColor = colors.gray,
    onChange = function(self, value)
        updateProductPrice(value)
        calculateTotalCost()
    end
})

-- Quantity input
local quantityInput = numericUpDown.new(configPanel, 25, 2, 15, 2, {
    value = 50,
    min = 1,
    max = 1000,
    step = 1,
    decimals = 0,
    suffix = " units",
    onChange = function(self, value)
        updateInventoryQuantity(value)
        calculateTotalCost()
    end
})

-- Weight input with metric units
local weightInput = numericUpDown.new(configPanel, 2, 6, 20, 2, {
    value = 2.5,
    min = 0.1,
    max = 100.0,
    step = 0.1,
    decimals = 1,
    suffix = " kg",
    onChange = function(self, value)
        updateProductWeight(value)
        calculateShippingCost()
    end
})

-- Discount percentage
local discountInput = numericUpDown.new(configPanel, 25, 6, 15, 2, {
    value = 0,
    min = 0,
    max = 75,
    step = 5,
    decimals = 0,
    suffix = "%",
    buttonColor = colors.orange,
    onChange = function(self, value)
        applyDiscount(value)
        updatePriceDisplay()
    end,
    onMax = function(self, value)
        showWarning("Maximum discount applied!")
    end
})

-- Tax rate (read-only display)
local taxInput = numericUpDown.new(configPanel, 2, 10, 20, 2, {
    value = 8.25,
    min = 0,
    max = 20,
    step = 0.25,
    decimals = 2,
    suffix = "% tax",
    enabled = false,
    backgroundColor = colors.lightGray,
    textColor = colors.gray
})

-- Quick preset buttons
local presetQuantities = {10, 25, 50, 100}
for i, qty in ipairs(presetQuantities) do
    local presetBtn = button.new(configPanel, 2 + (i-1) * 10, 14, 8, 2, {
        text = tostring(qty),
        onClick = function()
            quantityInput:setValue(qty)
        end
    })
end

-- Total calculation display
local totalLabel = label.new(configPanel, 2, 18, 38, 2, {
    text = "Total: $0.00",
    textColor = colors.green,
    fontSize = 1.2,
    fontWeight = "bold"
})

-- Calculate total function
function calculateTotalCost()
    local price = priceInput:getValue()
    local quantity = quantityInput:getValue()
    local discount = discountInput:getValue() / 100
    local tax = taxInput:getValue() / 100
    
    local subtotal = price * quantity
    local discountAmount = subtotal * discount
    local taxAmount = (subtotal - discountAmount) * tax
    local total = subtotal - discountAmount + taxAmount
    
    totalLabel.text = string.format("Total: $%.2f", total)
end`
        },
        notes: ['Numeric up-down controls provide precise value input', 'Use appropriate step values for the data type', 'Consider min/max validation and user feedback', 'Prefix and suffix help provide context for values']
    },
    
    comboBox: {
        name: 'ComboBox',
        category: 'Input Widgets',
        description: 'A dropdown selection widget that allows users to choose from a predefined list of options.',
        syntax: 'comboBox.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the combo box' },
            { name: 'height', type: 'number', description: 'Height of the combo box' },
            { name: 'items', type: 'table', description: 'Array of items/options to display' },
            { name: 'selectedIndex', type: 'number', description: 'Index of the currently selected item' },
            { name: 'selectedValue', type: 'any', description: 'Value of the currently selected item' },
            { name: 'placeholder', type: 'string', description: 'Text shown when no item is selected' },
            { name: 'maxDropdownHeight', type: 'number', description: 'Maximum height of dropdown list' },
            { name: 'editable', type: 'boolean', description: 'Whether users can type custom values' },
            { name: 'searchable', type: 'boolean', description: 'Whether the dropdown is searchable' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the combo box' },
            { name: 'textColor', type: 'color', description: 'Color of the selected text' },
            { name: 'borderColor', type: 'color', description: 'Border color of the combo box' },
            { name: 'dropdownColor', type: 'color', description: 'Background color of the dropdown' },
            { name: 'hoverColor', type: 'color', description: 'Background color of hovered items' },
            { name: 'selectedColor', type: 'color', description: 'Background color of selected item' },
            { name: 'enabled', type: 'boolean', description: 'Whether the combo box is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the combo box is visible' }
        ],
        methods: [
            { name: 'getSelectedIndex()', returns: 'number', description: 'Gets the index of selected item' },
            { name: 'setSelectedIndex(index)', params: 'number', description: 'Sets the selected item by index' },
            { name: 'getSelectedValue()', returns: 'any', description: 'Gets the value of selected item' },
            { name: 'setSelectedValue(value)', params: 'any', description: 'Sets the selected item by value' },
            { name: 'getSelectedText()', returns: 'string', description: 'Gets the text of selected item' },
            { name: 'addItem(item)', params: 'string|table', description: 'Adds an item to the list' },
            { name: 'removeItem(index)', params: 'number', description: 'Removes an item by index' },
            { name: 'clearItems()', description: 'Removes all items from the list' },
            { name: 'getItems()', returns: 'table', description: 'Gets all items in the list' },
            { name: 'setItems(items)', params: 'table', description: 'Sets the entire items list' },
            { name: 'getItemCount()', returns: 'number', description: 'Gets the number of items' },
            { name: 'openDropdown()', description: 'Opens the dropdown list' },
            { name: 'closeDropdown()', description: 'Closes the dropdown list' },
            { name: 'focus()', description: 'Focuses the combo box' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the combo box' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the combo box' }
        ],
        events: [
            { name: 'onSelectionChanged', params: 'self, index, value, text', description: 'Fired when selection changes' },
            { name: 'onDropdownOpen', params: 'self', description: 'Fired when dropdown opens' },
            { name: 'onDropdownClose', params: 'self', description: 'Fired when dropdown closes' },
            { name: 'onItemClick', params: 'self, index, item', description: 'Fired when an item is clicked' },
            { name: 'onSearch', params: 'self, searchText', description: 'Fired when searching (if searchable)' },
            { name: 'onFocus', params: 'self', description: 'Fired when combo box gains focus' },
            { name: 'onBlur', params: 'self', description: 'Fired when combo box loses focus' }
        ],
        examples: {
            basic: `local countrySelector = comboBox.new(parent, 10, 5, 25, 3, {
    items = {
        "United States",
        "Canada",
        "United Kingdom",
        "Germany",
        "France",
        "Japan",
        "Australia"
    },
    placeholder = "Select a country...",
    backgroundColor = colors.white,
    textColor = colors.black,
    borderColor = colors.gray,
    dropdownColor = colors.lightGray,
    hoverColor = colors.blue,
    selectedColor = colors.lightBlue,
    onSelectionChanged = function(self, index, value, text)
        print("Selected country: " .. text)
        updateShippingOptions(value)
    end
})`,
            advanced: `-- Product category selector with nested data
local categoryForm = container.new(parent, 5, 5, 50, 30)

-- Main category dropdown
local categories = {
    { text = "Electronics", value = "electronics", subcategories = {"Phones", "Laptops", "Gaming"} },
    { text = "Clothing", value = "clothing", subcategories = {"Men's", "Women's", "Kids"} },
    { text = "Home & Garden", value = "home", subcategories = {"Furniture", "Decor", "Tools"} },
    { text = "Sports", value = "sports", subcategories = {"Fitness", "Outdoor", "Team Sports"} }
}

local mainCategoryBox = comboBox.new(categoryForm, 2, 2, 20, 2, {
    items = {},
    placeholder = "Select category...",
    searchable = true,
    onSelectionChanged = function(self, index, value, text)
        -- Update subcategory dropdown
        local selectedCategory = categories[index]
        if selectedCategory and selectedCategory.subcategories then
            subCategoryBox:setItems(selectedCategory.subcategories)
            subCategoryBox:setSelectedIndex(0) -- Clear selection
        end
        updateProductFilter("category", value)
    end
})

-- Populate main categories
local mainItems = {}
for _, category in ipairs(categories) do
    table.insert(mainItems, category.text)
end
mainCategoryBox:setItems(mainItems)

-- Subcategory dropdown
local subCategoryBox = comboBox.new(categoryForm, 25, 2, 20, 2, {
    items = {},
    placeholder = "Select subcategory...",
    enabled = false,
    onSelectionChanged = function(self, index, value, text)
        updateProductFilter("subcategory", value)
        loadProducts()
    end
})

-- Price range selector
local priceRanges = {
    { text = "Under $25", value = {min = 0, max = 25} },
    { text = "$25 - $50", value = {min = 25, max = 50} },
    { text = "$50 - $100", value = {min = 50, max = 100} },
    { text = "$100 - $250", value = {min = 100, max = 250} },
    { text = "Over $250", value = {min = 250, max = 99999} }
}

local priceBox = comboBox.new(categoryForm, 2, 6, 20, 2, {
    items = {},
    placeholder = "Any price range...",
    onSelectionChanged = function(self, index, value, text)
        local priceRange = priceRanges[index]
        if priceRange then
            updateProductFilter("price", priceRange.value)
            loadProducts()
        end
    end
})

-- Populate price ranges
local priceItems = {}
for _, range in ipairs(priceRanges) do
    table.insert(priceItems, range.text)
end
priceBox:setItems(priceItems)

-- Sort options
local sortOptions = {
    "Relevance",
    "Price: Low to High",
    "Price: High to Low",
    "Customer Rating",
    "Newest First",
    "Best Selling"
}

local sortBox = comboBox.new(categoryForm, 25, 6, 20, 2, {
    items = sortOptions,
    selectedIndex = 1, -- Default to "Relevance"
    onSelectionChanged = function(self, index, value, text)
        updateSortOrder(index)
        loadProducts()
    end
})

-- Search and filter button
local searchBtn = button.new(categoryForm, 15, 10, 15, 2, {
    text = "Search Products",
    onClick = function()
        executeProductSearch()
    end
})

-- Clear filters button
local clearBtn = button.new(categoryForm, 15, 13, 15, 2, {
    text = "Clear Filters",
    onClick = function()
        mainCategoryBox:setSelectedIndex(0)
        subCategoryBox:setSelectedIndex(0)
        subCategoryBox:setEnabled(false)
        priceBox:setSelectedIndex(0)
        sortBox:setSelectedIndex(1)
        clearProductFilters()
    end
})`
        },
        notes: ['ComboBox supports both simple strings and complex objects as items', 'Use searchable option for long lists', 'Consider providing default selections for better UX', 'Nested dropdowns can create powerful filtering interfaces']
    },
    
    colorPicker: {
        name: 'ColorPicker',
        category: 'Input Widgets',
        description: 'An interactive color selection widget with hue, saturation, brightness controls and color preview.',
        syntax: 'colorPicker.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the color picker' },
            { name: 'height', type: 'number', description: 'Height of the color picker' },
            { name: 'color', type: 'color', description: 'Currently selected color' },
            { name: 'hue', type: 'number', description: 'Hue value (0-360)' },
            { name: 'saturation', type: 'number', description: 'Saturation value (0-100)' },
            { name: 'brightness', type: 'number', description: 'Brightness value (0-100)' },
            { name: 'alpha', type: 'number', description: 'Alpha/transparency value (0-255)' },
            { name: 'showPreview', type: 'boolean', description: 'Whether to show color preview' },
            { name: 'showHex', type: 'boolean', description: 'Whether to show hex color input' },
            { name: 'showRGB', type: 'boolean', description: 'Whether to show RGB inputs' },
            { name: 'showHSB', type: 'boolean', description: 'Whether to show HSB sliders' },
            { name: 'showAlpha', type: 'boolean', description: 'Whether to show alpha/transparency control' },
            { name: 'showPalette', type: 'boolean', description: 'Whether to show preset color palette' },
            { name: 'palette', type: 'table', description: 'Array of preset colors for quick selection' },
            { name: 'borderColor', type: 'color', description: 'Border color of the picker' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the picker' },
            { name: 'enabled', type: 'boolean', description: 'Whether the color picker is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the color picker is visible' }
        ],
        methods: [
            { name: 'getColor()', returns: 'color', description: 'Gets the currently selected color' },
            { name: 'setColor(color)', params: 'color', description: 'Sets the selected color' },
            { name: 'getHex()', returns: 'string', description: 'Gets the color as hex string (#RRGGBB)' },
            { name: 'setHex(hex)', params: 'string', description: 'Sets color from hex string' },
            { name: 'getRGB()', returns: 'table', description: 'Gets RGB values as {r, g, b}' },
            { name: 'setRGB(r, g, b)', params: 'number, number, number', description: 'Sets color from RGB values' },
            { name: 'getHSB()', returns: 'table', description: 'Gets HSB values as {h, s, b}' },
            { name: 'setHSB(h, s, b)', params: 'number, number, number', description: 'Sets color from HSB values' },
            { name: 'getAlpha()', returns: 'number', description: 'Gets the alpha/transparency value' },
            { name: 'setAlpha(alpha)', params: 'number', description: 'Sets the alpha/transparency value' },
            { name: 'addPaletteColor(color)', params: 'color', description: 'Adds a color to the palette' },
            { name: 'removePaletteColor(index)', params: 'number', description: 'Removes a palette color by index' },
            { name: 'clearPalette()', description: 'Clears all palette colors' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the color picker' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the color picker' }
        ],
        events: [
            { name: 'onColorChange', params: 'self, color', description: 'Fired when the color changes' },
            { name: 'onHueChange', params: 'self, hue', description: 'Fired when hue value changes' },
            { name: 'onSaturationChange', params: 'self, saturation', description: 'Fired when saturation changes' },
            { name: 'onBrightnessChange', params: 'self, brightness', description: 'Fired when brightness changes' },
            { name: 'onAlphaChange', params: 'self, alpha', description: 'Fired when alpha value changes' },
            { name: 'onPaletteClick', params: 'self, color, index', description: 'Fired when palette color is clicked' },
            { name: 'onHexInput', params: 'self, hex', description: 'Fired when hex value is manually entered' }
        ],
        examples: {
            basic: `local backgroundPicker = colorPicker.new(parent, 10, 5, 25, 20, {
    color = colors.blue,
    showPreview = true,
    showHex = true,
    showRGB = true,
    showHSB = false,
    showAlpha = false,
    palette = {
        colors.white, colors.black, colors.red, colors.green, 
        colors.blue, colors.yellow, colors.cyan, colors.magenta,
        colors.orange, colors.pink, colors.purple, colors.brown
    },
    onColorChange = function(self, color)
        -- Update background color in real-time
        setBackgroundColor(color)
        print("Background color changed to: " .. self:getHex())
    end
})`,
            advanced: `-- Advanced theme editor with multiple color pickers
local themeEditor = container.new(parent, 5, 5, 60, 35)

-- Theme color definitions
local themeColors = {
    primary = { label = "Primary Color", default = colors.blue, x = 2, y = 2 },
    secondary = { label = "Secondary Color", default = colors.green, x = 32, y = 2 },
    background = { label = "Background", default = colors.white, x = 2, y = 22 },
    text = { label = "Text Color", default = colors.black, x = 32, y = 22 }
}

local colorPickers = {}
local currentTheme = {}

-- Create color pickers for each theme element
for key, config in pairs(themeColors) do
    -- Label
    local colorLabel = label.new(themeEditor, config.x, config.y - 1, 25, 1, {
        text = config.label,
        textColor = colors.black,
        fontWeight = "bold"
    })
    
    -- Color picker
    colorPickers[key] = colorPicker.new(themeEditor, config.x, config.y, 25, 18, {
        color = config.default,
        showPreview = true,
        showHex = true,
        showRGB = true,
        showHSB = true,
        showAlpha = true,
        showPalette = true,
        palette = {
            -- Material Design color palette
            0xF44336, 0xE91E63, 0x9C27B0, 0x673AB7,
            0x3F51B5, 0x2196F3, 0x03A9F4, 0x00BCD4,
            0x009688, 0x4CAF50, 0x8BC34A, 0xCDDC39,
            0xFFEB3B, 0xFFC107, 0xFF9800, 0xFF5722
        },
        onColorChange = function(self, color)
            -- Update theme in real-time
            currentTheme[key] = color
            applyThemePreview(currentTheme)
            
            -- Update preview box
            updateColorPreview(key, color)
        end,
        onPaletteClick = function(self, color, index)
            print("Selected palette color: " .. string.format("#%06X", color))
        end
    })
    
    -- Initialize theme
    currentTheme[key] = config.default
end

-- Theme preview area
local previewPanel = container.new(themeEditor, 2, 42, 56, 8, {
    backgroundColor = currentTheme.background,
    borderColor = currentTheme.primary
})

local previewTitle = label.new(previewPanel, 2, 1, 52, 1, {
    text = "Theme Preview",
    textColor = currentTheme.text,
    fontSize = 1.2,
    fontWeight = "bold"
})

local previewButton = button.new(previewPanel, 2, 3, 15, 2, {
    text = "Sample Button",
    backgroundColor = currentTheme.primary,
    textColor = currentTheme.background
})

local previewText = label.new(previewPanel, 20, 3, 30, 2, {
    text = "This is sample text in the selected theme colors.",
    textColor = currentTheme.text
})

-- Theme control buttons
local saveBtn = button.new(themeEditor, 2, 52, 12, 2, {
    text = "Save Theme",
    backgroundColor = colors.green,
    textColor = colors.white,
    onClick = function()
        saveThemeToFile(currentTheme)
        showNotification("Theme saved successfully!")
    end
})

local loadBtn = button.new(themeEditor, 16, 52, 12, 2, {
    text = "Load Theme",
    backgroundColor = colors.blue,
    textColor = colors.white,
    onClick = function()
        local loadedTheme = loadThemeFromFile()
        if loadedTheme then
            for key, color in pairs(loadedTheme) do
                if colorPickers[key] then
                    colorPickers[key]:setColor(color)
                end
            end
        end
    end
})

local resetBtn = button.new(themeEditor, 30, 52, 12, 2, {
    text = "Reset Default",
    backgroundColor = colors.orange,
    textColor = colors.white,
    onClick = function()
        for key, config in pairs(themeColors) do
            colorPickers[key]:setColor(config.default)
        end
    end
})

-- Export theme as code
local exportBtn = button.new(themeEditor, 44, 52, 12, 2, {
    text = "Export Code",
    backgroundColor = colors.purple,
    textColor = colors.white,
    onClick = function()
        local themeCode = generateThemeCode(currentTheme)
        copyToClipboard(themeCode)
        showNotification("Theme code copied to clipboard!")
    end
})`
        },
        notes: ['Color pickers support multiple color models (RGB, HSB, Hex)', 'Palette colors provide quick access to common choices', 'Real-time preview helps users see changes immediately', 'Consider accessibility when choosing color combinations']
    },
    
    colorPickerDialog: {
        name: 'ColorPickerDialog',
        category: 'Input Widgets',
        description: 'A modal dialog version of the color picker that opens in a separate window for detailed color selection.',
        syntax: 'colorPickerDialog.show(options)',
        properties: [
            { name: 'title', type: 'string', description: 'Title of the dialog window' },
            { name: 'initialColor', type: 'color', description: 'Initial color to display' },
            { name: 'width', type: 'number', description: 'Width of the dialog' },
            { name: 'height', type: 'number', description: 'Height of the dialog' },
            { name: 'modal', type: 'boolean', description: 'Whether dialog blocks interaction with parent' },
            { name: 'resizable', type: 'boolean', description: 'Whether dialog can be resized' },
            { name: 'showPreview', type: 'boolean', description: 'Whether to show color preview' },
            { name: 'showHex', type: 'boolean', description: 'Whether to show hex color input' },
            { name: 'showRGB', type: 'boolean', description: 'Whether to show RGB inputs' },
            { name: 'showHSB', type: 'boolean', description: 'Whether to show HSB sliders' },
            { name: 'showAlpha', type: 'boolean', description: 'Whether to show alpha/transparency control' },
            { name: 'showPalette', type: 'boolean', description: 'Whether to show preset color palette' },
            { name: 'palette', type: 'table', description: 'Array of preset colors for quick selection' },
            { name: 'showOkCancel', type: 'boolean', description: 'Whether to show OK/Cancel buttons' },
            { name: 'okText', type: 'string', description: 'Text for OK button (default: "OK")' },
            { name: 'cancelText', type: 'string', description: 'Text for Cancel button (default: "Cancel")' },
            { name: 'centerOnParent', type: 'boolean', description: 'Whether to center dialog on parent window' }
        ],
        methods: [
            { name: 'show(options)', params: 'table', returns: 'ColorPickerDialog', description: 'Shows the color picker dialog' },
            { name: 'hide()', description: 'Hides the dialog' },
            { name: 'close()', description: 'Closes the dialog and cleans up resources' },
            { name: 'getColor()', returns: 'color', description: 'Gets the currently selected color' },
            { name: 'setColor(color)', params: 'color', description: 'Sets the selected color' },
            { name: 'getHex()', returns: 'string', description: 'Gets the color as hex string' },
            { name: 'setTitle(title)', params: 'string', description: 'Sets the dialog title' },
            { name: 'center()', description: 'Centers the dialog on screen' },
            { name: 'bringToFront()', description: 'Brings dialog to front of other windows' }
        ],
        events: [
            { name: 'onColorSelect', params: 'color, hex', description: 'Fired when OK is clicked with selected color' },
            { name: 'onCancel', params: '', description: 'Fired when Cancel is clicked or dialog is closed' },
            { name: 'onColorChange', params: 'color', description: 'Fired when color changes during selection' },
            { name: 'onShow', params: 'dialog', description: 'Fired when dialog is shown' },
            { name: 'onHide', params: 'dialog', description: 'Fired when dialog is hidden' },
            { name: 'onClose', params: 'dialog', description: 'Fired when dialog is closed' }
        ],
        examples: {
            basic: `-- Simple color picker dialog
local function selectBackgroundColor()
    colorPickerDialog.show({
        title = "Choose Background Color",
        initialColor = colors.white,
        width = 35,
        height = 25,
        modal = true,
        showHex = true,
        showRGB = true,
        showPalette = true,
        palette = {
            colors.white, colors.lightGray, colors.gray, colors.black,
            colors.red, colors.orange, colors.yellow, colors.green,
            colors.cyan, colors.blue, colors.purple, colors.magenta
        },
        onColorSelect = function(color, hex)
            setBackgroundColor(color)
            print("Background set to: " .. hex)
        end,
        onCancel = function()
            print("Color selection cancelled")
        end
    })
end

-- Trigger with button click
local colorBtn = button.new(parent, 10, 5, 20, 3, {
    text = "Choose Color",
    onClick = selectBackgroundColor
})`,
            advanced: `-- Advanced theme customization with multiple color dialogs
local themeCustomizer = container.new(parent, 5, 5, 50, 25)

local themeConfig = {
    primary = { name = "Primary", color = colors.blue, x = 2, y = 2 },
    secondary = { name = "Secondary", color = colors.green, x = 2, y = 6 },
    accent = { name = "Accent", color = colors.orange, x = 2, y = 10 },
    background = { name = "Background", color = colors.white, x = 2, y = 14 },
    surface = { name = "Surface", color = colors.lightGray, x = 2, y = 18 },
    text = { name = "Text", color = colors.black, x = 26, y = 2 },
    textSecondary = { name = "Text Secondary", color = colors.gray, x = 26, y = 6 },
    border = { name = "Border", color = colors.gray, x = 26, y = 10 },
    error = { name = "Error", color = colors.red, x = 26, y = 14 },
    success = { name = "Success", color = colors.green, x = 26, y = 18 }
}

local colorPreviewBoxes = {}
local currentTheme = {}

-- Create color selection interface
for key, config in pairs(themeConfig) do
    -- Color preview box
    colorPreviewBoxes[key] = container.new(themeCustomizer, config.x, config.y, 3, 2, {
        backgroundColor = config.color,
        borderColor = colors.black,
        borderWidth = 1
    })
    
    -- Color label
    local colorLabel = label.new(themeCustomizer, config.x + 4, config.y, 15, 1, {
        text = config.name,
        textColor = colors.black
    })
    
    -- Edit button
    local editBtn = button.new(themeCustomizer, config.x + 4, config.y + 1, 8, 1, {
        text = "Edit",
        onClick = function()
            colorPickerDialog.show({
                title = "Choose " .. config.name .. " Color",
                initialColor = config.color,
                width = 40,
                height = 30,
                modal = true,
                resizable = true,
                showHex = true,
                showRGB = true,
                showHSB = true,
                showAlpha = true,
                showPalette = true,
                palette = {
                    -- Extended color palette
                    0xFFFFFF, 0xF5F5F5, 0xEEEEEE, 0xE0E0E0, 0xBDBDBD, 0x9E9E9E, 0x757575, 0x616161, 0x424242, 0x212121,
                    0xF44336, 0xE91E63, 0x9C27B0, 0x673AB7, 0x3F51B5, 0x2196F3, 0x03A9F4, 0x00BCD4, 0x009688, 0x4CAF50,
                    0x8BC34A, 0xCDDC39, 0xFFEB3B, 0xFFC107, 0xFF9800, 0xFF5722, 0x795548, 0x607D8B
                },
                centerOnParent = true,
                onColorSelect = function(color, hex)
                    -- Update theme configuration
                    themeConfig[key].color = color
                    currentTheme[key] = color
                    
                    -- Update preview box
                    colorPreviewBoxes[key].backgroundColor = color
                    
                    -- Apply theme preview
                    applyThemePreview(currentTheme)
                    
                    print(config.name .. " color updated to: " .. hex)
                end,
                onCancel = function()
                    print("Color selection cancelled for " .. config.name)
                end,
                onColorChange = function(color)
                    -- Real-time preview while selecting
                    if config.key == "background" then
                        previewBackgroundColor(color)
                    elseif config.key == "primary" then
                        previewPrimaryColor(color)
                    end
                end
            })
        end
    })
    
    -- Initialize current theme
    currentTheme[key] = config.color
end

-- Theme preset buttons
local presetContainer = container.new(themeCustomizer, 2, 22, 46, 3, {
    borderColor = colors.gray
})

local presetLabel = label.new(presetContainer, 1, 0, 44, 1, {
    text = "Quick Presets:",
    textColor = colors.black,
    fontWeight = "bold"
})

local presets = {
    { name = "Default", colors = { primary = colors.blue, secondary = colors.green, background = colors.white } },
    { name = "Dark", colors = { primary = colors.cyan, secondary = colors.purple, background = colors.black } },
    { name = "Nature", colors = { primary = colors.green, secondary = colors.brown, background = colors.lime } },
    { name = "Ocean", colors = { primary = colors.blue, secondary = colors.cyan, background = colors.lightBlue } }
}

for i, preset in ipairs(presets) do
    local presetBtn = button.new(presetContainer, 1 + (i-1) * 11, 1, 10, 1, {
        text = preset.name,
        onClick = function()
            -- Apply preset colors
            for colorKey, color in pairs(preset.colors) do
                if themeConfig[colorKey] then
                    themeConfig[colorKey].color = color
                    colorPreviewBoxes[colorKey].backgroundColor = color
                    currentTheme[colorKey] = color
                end
            end
            applyThemePreview(currentTheme)
            showNotification("Applied " .. preset.name .. " theme preset")
        end
    })
end`
        },
        notes: ['Dialog version provides more space for detailed color selection', 'Modal dialogs prevent interaction with parent until closed', 'Use callbacks to handle color selection and cancellation', 'Consider providing color presets for common use cases']
    },
    
    listView: {
        name: 'ListView',
        category: 'Display Widgets',
        description: 'A scrollable list widget for displaying and selecting items from a collection with support for icons, multi-selection, and custom rendering.',
        syntax: 'listView.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the list view' },
            { name: 'height', type: 'number', description: 'Height of the list view' },
            { name: 'items', type: 'table', description: 'Array of items to display' },
            { name: 'selectedIndex', type: 'number', description: 'Index of currently selected item' },
            { name: 'selectedIndices', type: 'table', description: 'Array of selected indices (multi-select)' },
            { name: 'multiSelect', type: 'boolean', description: 'Whether multiple items can be selected' },
            { name: 'showIcons', type: 'boolean', description: 'Whether to display item icons' },
            { name: 'showHeaders', type: 'boolean', description: 'Whether to show column headers' },
            { name: 'itemHeight', type: 'number', description: 'Height of each list item' },
            { name: 'scrollable', type: 'boolean', description: 'Whether the list is scrollable' },
            { name: 'showScrollbar', type: 'boolean', description: 'Whether to show scrollbar' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the list' },
            { name: 'itemColor', type: 'color', description: 'Background color of items' },
            { name: 'selectedColor', type: 'color', description: 'Background color of selected items' },
            { name: 'hoverColor', type: 'color', description: 'Background color when hovering' },
            { name: 'textColor', type: 'color', description: 'Color of item text' },
            { name: 'borderColor', type: 'color', description: 'Border color of the list' },
            { name: 'enabled', type: 'boolean', description: 'Whether the list view is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the list view is visible' }
        ],
        methods: [
            { name: 'addItem(item)', params: 'string|table', description: 'Adds an item to the list' },
            { name: 'removeItem(index)', params: 'number', description: 'Removes an item by index' },
            { name: 'clearItems()', description: 'Removes all items from the list' },
            { name: 'getItems()', returns: 'table', description: 'Gets all items in the list' },
            { name: 'setItems(items)', params: 'table', description: 'Sets the entire items list' },
            { name: 'getItemCount()', returns: 'number', description: 'Gets the number of items' },
            { name: 'getSelectedIndex()', returns: 'number', description: 'Gets the selected item index' },
            { name: 'setSelectedIndex(index)', params: 'number', description: 'Sets the selected item' },
            { name: 'getSelectedIndices()', returns: 'table', description: 'Gets all selected indices' },
            { name: 'setSelectedIndices(indices)', params: 'table', description: 'Sets multiple selected items' },
            { name: 'getSelectedItem()', returns: 'any', description: 'Gets the selected item data' },
            { name: 'getSelectedItems()', returns: 'table', description: 'Gets all selected items' },
            { name: 'selectAll()', description: 'Selects all items (multi-select mode)' },
            { name: 'clearSelection()', description: 'Clears all selections' },
            { name: 'scrollToItem(index)', params: 'number', description: 'Scrolls to make item visible' },
            { name: 'scrollToTop()', description: 'Scrolls to the top of the list' },
            { name: 'scrollToBottom()', description: 'Scrolls to the bottom of the list' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the list view' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the list view' }
        ],
        events: [
            { name: 'onSelectionChanged', params: 'self, index, item', description: 'Fired when selection changes' },
            { name: 'onItemClick', params: 'self, index, item, button', description: 'Fired when an item is clicked' },
            { name: 'onItemDoubleClick', params: 'self, index, item', description: 'Fired when an item is double-clicked' },
            { name: 'onItemHover', params: 'self, index, item', description: 'Fired when hovering over an item' },
            { name: 'onScroll', params: 'self, scrollPosition', description: 'Fired when the list is scrolled' },
            { name: 'onContextMenu', params: 'self, index, item, x, y', description: 'Fired on right-click (context menu)' }
        ],
        examples: {
            basic: `local fileList = listView.new(parent, 10, 5, 30, 15, {
    items = {
        { text = "document.txt", icon = "file", size = "2.3 KB" },
        { text = "image.png", icon = "image", size = "156 KB" },
        { text = "script.lua", icon = "code", size = "4.1 KB" },
        { text = "folder", icon = "folder", size = "---" },
        { text = "archive.zip", icon = "archive", size = "1.2 MB" }
    },
    showIcons = true,
    itemHeight = 2,
    backgroundColor = colors.white,
    selectedColor = colors.lightBlue,
    hoverColor = colors.lightGray,
    onSelectionChanged = function(self, index, item)
        if item then
            print("Selected: " .. item.text)
            showFileDetails(item)
        end
    end,
    onItemDoubleClick = function(self, index, item)
        if item.icon == "folder" then
            openFolder(item.text)
        else
            openFile(item.text)
        end
    end
})`,
            advanced: `-- Advanced file manager with ListView
local fileManager = container.new(parent, 5, 5, 70, 40)

-- File list with detailed view
local fileListView = listView.new(fileManager, 2, 4, 45, 30, {
    items = {},
    multiSelect = true,
    showIcons = true,
    showHeaders = true,
    itemHeight = 2,
    scrollable = true,
    showScrollbar = true,
    backgroundColor = colors.white,
    selectedColor = colors.blue,
    hoverColor = colors.lightGray,
    headers = {
        { text = "Name", width = 20 },
        { text = "Size", width = 10 },
        { text = "Modified", width = 15 }
    },
    onSelectionChanged = function(self, index, item)
        updateFileDetails(item)
        updateContextActions(self:getSelectedItems())
    end,
    onItemDoubleClick = function(self, index, item)
        if item.type == "folder" then
            navigateToFolder(item.path)
        else
            openFile(item.path)
        end
    end,
    onContextMenu = function(self, index, item, x, y)
        showContextMenu(item, x, y)
    end
})

-- Populate file list
function loadDirectoryContents(path)
    local files = scanDirectory(path)
    local listItems = {}
    
    for _, file in ipairs(files) do
        table.insert(listItems, {
            text = file.name,
            type = file.type,
            path = file.path,
            size = formatFileSize(file.size),
            modified = formatDate(file.modified),
            icon = getFileIcon(file.type, file.extension),
            columns = { file.name, formatFileSize(file.size), formatDate(file.modified) }
        })
    end
    
    fileListView:setItems(listItems)
end

-- File details panel
local detailsPanel = container.new(fileManager, 50, 4, 18, 30, {
    backgroundColor = colors.lightGray,
    borderColor = colors.gray
})

local detailsTitle = label.new(detailsPanel, 1, 1, 16, 1, {
    text = "File Details",
    fontWeight = "bold",
    textAlign = "center"
})

local fileNameLabel = label.new(detailsPanel, 1, 3, 16, 2, {
    text = "No file selected",
    textWrap = true
})

local fileSizeLabel = label.new(detailsPanel, 1, 6, 16, 1, {
    text = "Size: ---"
})

local fileTypeLabel = label.new(detailsPanel, 1, 8, 16, 1, {
    text = "Type: ---"
})

local fileModifiedLabel = label.new(detailsPanel, 1, 10, 16, 2, {
    text = "Modified: ---",
    textWrap = true
})

-- File operations toolbar
local toolbar = container.new(fileManager, 2, 1, 66, 2, {
    backgroundColor = colors.lightGray
})

local newFolderBtn = button.new(toolbar, 1, 0, 8, 2, {
    text = "New Folder",
    onClick = function()
        createNewFolder()
    end
})

local copyBtn = button.new(toolbar, 10, 0, 6, 2, {
    text = "Copy",
    enabled = false,
    onClick = function()
        copySelectedFiles()
    end
})

local cutBtn = button.new(toolbar, 17, 0, 6, 2, {
    text = "Cut",
    enabled = false,
    onClick = function()
        cutSelectedFiles()
    end
})

local pasteBtn = button.new(toolbar, 24, 0, 6, 2, {
    text = "Paste",
    enabled = hasClipboardContent(),
    onClick = function()
        pasteFiles()
    end
})

local deleteBtn = button.new(toolbar, 31, 0, 8, 2, {
    text = "Delete",
    enabled = false,
    backgroundColor = colors.red,
    onClick = function()
        deleteSelectedFiles()
    end
})

local refreshBtn = button.new(toolbar, 58, 0, 8, 2, {
    text = "Refresh",
    onClick = function()
        loadDirectoryContents(currentPath)
    end
})

-- Search functionality
local searchBox = textBox.new(fileManager, 2, 36, 20, 2, {
    placeholder = "Search files...",
    onChange = function(self, text)
        filterFileList(text)
    end
})

local searchBtn = button.new(fileManager, 23, 36, 8, 2, {
    text = "Search",
    onClick = function()
        performSearch(searchBox:getText())
    end
})

-- View options
local viewToggle = toggleSwitch.new(fileManager, 50, 36, 12, 2, {
    label = "Details View",
    state = true,
    onChange = function(self, state)
        fileListView.showHeaders = state
        fileListView.itemHeight = state and 2 or 1
        fileListView:refresh()
    end
})

-- Update file details function
function updateFileDetails(item)
    if item then
        fileNameLabel.text = item.text
        fileSizeLabel.text = "Size: " .. item.size
        fileTypeLabel.text = "Type: " .. (item.type or "File")
        fileModifiedLabel.text = "Modified: " .. item.modified
        
        -- Enable/disable action buttons
        local hasSelection = fileListView:getSelectedItems() and #fileListView:getSelectedItems() > 0
        copyBtn.enabled = hasSelection
        cutBtn.enabled = hasSelection
        deleteBtn.enabled = hasSelection
    end
end

-- Initialize with current directory
loadDirectoryContents(getCurrentPath())`
        },
        notes: ['ListView supports both simple text items and complex objects', 'Multi-selection mode allows selecting multiple items with Ctrl+click', 'Use icons and custom rendering for better visual presentation', 'Consider virtual scrolling for very large lists to improve performance']
    },
    
    chart: {
        name: 'Chart',
        category: 'Display Widgets',
        description: 'A comprehensive charting widget supporting multiple chart types including line, bar, pie, and area charts with legends, tooltips, and animations.',
        syntax: 'chart.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the chart' },
            { name: 'height', type: 'number', description: 'Height of the chart' },
            { name: 'type', type: 'string', description: 'Chart type: "line", "bar", "pie", "area", "scatter"' },
            { name: 'data', type: 'table', description: 'Chart data sets and values' },
            { name: 'title', type: 'string', description: 'Chart title' },
            { name: 'showLegend', type: 'boolean', description: 'Whether to show legend' },
            { name: 'showTooltips', type: 'boolean', description: 'Whether to show tooltips on hover' },
            { name: 'showGrid', type: 'boolean', description: 'Whether to show grid lines' },
            { name: 'showAxes', type: 'boolean', description: 'Whether to show X and Y axes' },
            { name: 'showLabels', type: 'boolean', description: 'Whether to show data labels' },
            { name: 'animated', type: 'boolean', description: 'Whether to animate chart rendering' },
            { name: 'animationDuration', type: 'number', description: 'Animation duration in seconds' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the chart' },
            { name: 'gridColor', type: 'color', description: 'Color of grid lines' },
            { name: 'axisColor', type: 'color', description: 'Color of axes' },
            { name: 'textColor', type: 'color', description: 'Color of text and labels' },
            { name: 'borderColor', type: 'color', description: 'Border color of the chart' },
            { name: 'enabled', type: 'boolean', description: 'Whether the chart is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the chart is visible' }
        ],
        methods: [
            { name: 'setData(data)', params: 'table', description: 'Sets the chart data' },
            { name: 'getData()', returns: 'table', description: 'Gets the chart data' },
            { name: 'addDataSet(dataset)', params: 'table', description: 'Adds a new data set' },
            { name: 'removeDataSet(index)', params: 'number', description: 'Removes a data set by index' },
            { name: 'updateDataSet(index, dataset)', params: 'number, table', description: 'Updates an existing data set' },
            { name: 'addDataPoint(datasetIndex, point)', params: 'number, any', description: 'Adds a data point to a set' },
            { name: 'removeDataPoint(datasetIndex, pointIndex)', params: 'number, number', description: 'Removes a data point' },
            { name: 'setChartType(type)', params: 'string', description: 'Changes the chart type' },
            { name: 'setTitle(title)', params: 'string', description: 'Sets the chart title' },
            { name: 'refresh()', description: 'Redraws the chart with current data' },
            { name: 'animate()', description: 'Triggers chart animation' },
            { name: 'exportImage(format)', params: 'string', returns: 'string', description: 'Exports chart as image' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the chart' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the chart' }
        ],
        events: [
            { name: 'onDataPointClick', params: 'self, datasetIndex, pointIndex, value', description: 'Fired when a data point is clicked' },
            { name: 'onDataPointHover', params: 'self, datasetIndex, pointIndex, value', description: 'Fired when hovering over a data point' },
            { name: 'onLegendClick', params: 'self, datasetIndex, dataset', description: 'Fired when legend item is clicked' },
            { name: 'onAnimationComplete', params: 'self', description: 'Fired when chart animation finishes' },
            { name: 'onRender', params: 'self', description: 'Fired when chart is rendered' },
            { name: 'onResize', params: 'self, width, height', description: 'Fired when chart is resized' }
        ],
        examples: {
            basic: `-- Simple line chart
local salesChart = chart.new(parent, 10, 5, 40, 20, {
    type = "line",
    title = "Monthly Sales",
    showLegend = true,
    showGrid = true,
    showTooltips = true,
    animated = true,
    data = {
        labels = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"},
        datasets = {
            {
                label = "Sales 2024",
                data = {12, 19, 8, 15, 25, 22},
                color = colors.blue,
                borderColor = colors.blue,
                fill = false
            },
            {
                label = "Sales 2023",
                data = {8, 15, 12, 18, 20, 16},
                color = colors.red,
                borderColor = colors.red,
                fill = false
            }
        }
    },
    onDataPointClick = function(self, datasetIndex, pointIndex, value)
        local dataset = self:getData().datasets[datasetIndex]
        local month = self:getData().labels[pointIndex]
        print("Clicked: " .. dataset.label .. " - " .. month .. " = " .. value)
    end
})`,
            advanced: `-- Advanced dashboard with multiple chart types
local dashboard = container.new(parent, 5, 5, 80, 50)

-- Revenue chart (Line chart)
local revenueChart = chart.new(dashboard, 2, 2, 35, 20, {
    type = "line",
    title = "Revenue Trend",
    showLegend = true,
    showGrid = true,
    showTooltips = true,
    animated = true,
    animationDuration = 1.5,
    data = {
        labels = {"Q1", "Q2", "Q3", "Q4"},
        datasets = {
            {
                label = "2024 Revenue",
                data = {150000, 180000, 220000, 280000},
                color = colors.green,
                borderColor = colors.green,
                fill = true,
                fillOpacity = 0.3
            },
            {
                label = "2023 Revenue",
                data = {120000, 140000, 170000, 200000},
                color = colors.blue,
                borderColor = colors.blue,
                fill = true,
                fillOpacity = 0.2
            }
        }
    },
    onDataPointHover = function(self, datasetIndex, pointIndex, value)
        showRevenueTooltip(value, pointIndex)
    end
})

-- Sales by category (Pie chart)
local categoryChart = chart.new(dashboard, 42, 2, 35, 20, {
    type = "pie",
    title = "Sales by Category",
    showLegend = true,
    showTooltips = true,
    animated = true,
    data = {
        labels = {"Electronics", "Clothing", "Home", "Books", "Sports"},
        datasets = {
            {
                data = {35, 25, 20, 12, 8},
                colors = {colors.blue, colors.red, colors.green, colors.yellow, colors.purple},
                borderColors = {colors.white, colors.white, colors.white, colors.white, colors.white}
            }
        }
    },
    onDataPointClick = function(self, datasetIndex, pointIndex, value)
        local category = self:getData().labels[pointIndex]
        showCategoryDetails(category, value)
    end
})

-- Monthly performance (Bar chart)
local performanceChart = chart.new(dashboard, 2, 25, 35, 20, {
    type = "bar",
    title = "Monthly Performance",
    showLegend = true,
    showGrid = true,
    showTooltips = true,
    data = {
        labels = {"Jan", "Feb", "Mar", "Apr", "May", "Jun"},
        datasets = {
            {
                label = "Target",
                data = {100, 100, 100, 100, 100, 100},
                color = colors.gray,
                borderColor = colors.gray
            },
            {
                label = "Actual",
                data = {85, 110, 95, 125, 140, 118},
                color = colors.green,
                borderColor = colors.green
            }
        }
    }
})

-- User activity (Area chart)
local activityChart = chart.new(dashboard, 42, 25, 35, 20, {
    type = "area",
    title = "User Activity",
    showLegend = true,
    showGrid = true,
    animated = true,
    data = {
        labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
        datasets = {
            {
                label = "Active Users",
                data = [120, 80, 350, 580, 720, 450],
                color = colors.cyan,
                borderColor = colors.cyan,
                fill = true,
                fillOpacity = 0.4
            }
        }
    }
})

-- Chart controls
local controlPanel = container.new(dashboard, 2, 47, 75, 3, {
    backgroundColor = colors.lightGray
})

-- Refresh data button
local refreshBtn = button.new(controlPanel, 1, 1, 12, 1, {
    text = "Refresh Data",
    onClick = function()
        -- Update all charts with new data
        updateRevenueData()
        updateCategoryData()
        updatePerformanceData()
        updateActivityData()
        
        -- Animate all charts
        revenueChart:animate()
        categoryChart:animate()
        performanceChart:animate()
        activityChart:animate()
    end
})

-- Export charts button
local exportBtn = button.new(controlPanel, 15, 1, 10, 1, {
    text = "Export",
    onClick = function()
        local images = {
            revenue = revenueChart:exportImage("png"),
            category = categoryChart:exportImage("png"),
            performance = performanceChart:exportImage("png"),
            activity = activityChart:exportImage("png")
        }
        exportDashboard(images)
    end
})

-- Time range selector
local timeRange = comboBox.new(controlPanel, 27, 1, 15, 1, {
    items = {"Last 7 days", "Last 30 days", "Last 3 months", "Last year"},
    selectedIndex = 2,
    onSelectionChanged = function(self, index, value, text)
        updateChartsTimeRange(value)
    end
})

-- Auto-refresh toggle
local autoRefresh = toggleSwitch.new(controlPanel, 45, 1, 15, 1, {
    label = "Auto-refresh",
    state = false,
    onChange = function(self, state)
        if state then
            startAutoRefresh(60) -- Refresh every 60 seconds
        else
            stopAutoRefresh()
        end
    end
})

-- Chart type toggles
local chartTypes = {"line", "bar", "area"}
for i, chartType in ipairs(chartTypes) do
    local typeBtn = button.new(controlPanel, 62 + (i-1) * 4, 1, 3, 1, {
        text = string.upper(chartType:sub(1,1)),
        onClick = function()
            revenueChart:setChartType(chartType)
            performanceChart:setChartType(chartType)
        end
    })
end`
        },
        notes: ['Charts support multiple data sets for comparison', 'Use animations to make data visualization more engaging', 'Interactive features like tooltips and click events enhance user experience', 'Consider performance when rendering large datasets', 'Export functionality allows saving charts for reports']
    },
    
    canvas: {
        name: 'Canvas',
        category: 'Display Widgets',
        description: 'A drawing canvas widget for custom graphics, pixel art, and interactive drawing applications with layers and drawing tools.',
        syntax: 'canvas.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the canvas in pixels' },
            { name: 'height', type: 'number', description: 'Height of the canvas in pixels' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the canvas' },
            { name: 'borderColor', type: 'color', description: 'Border color of the canvas' },
            { name: 'gridSize', type: 'number', description: 'Size of grid cells (if grid is enabled)' },
            { name: 'showGrid', type: 'boolean', description: 'Whether to show grid overlay' },
            { name: 'gridColor', type: 'color', description: 'Color of the grid lines' },
            { name: 'pixelPerfect', type: 'boolean', description: 'Whether to use pixel-perfect rendering' },
            { name: 'layers', type: 'table', description: 'Array of drawing layers' },
            { name: 'activeLayer', type: 'number', description: 'Index of currently active layer' },
            { name: 'zoom', type: 'number', description: 'Zoom level (1.0 = 100%)' },
            { name: 'maxZoom', type: 'number', description: 'Maximum zoom level' },
            { name: 'minZoom', type: 'number', description: 'Minimum zoom level' },
            { name: 'scrollable', type: 'boolean', description: 'Whether canvas can be scrolled' },
            { name: 'editable', type: 'boolean', description: 'Whether canvas can be edited' },
            { name: 'enabled', type: 'boolean', description: 'Whether the canvas is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the canvas is visible' }
        ],
        methods: [
            { name: 'setPixel(x, y, color)', params: 'number, number, color', description: 'Sets a pixel color at coordinates' },
            { name: 'getPixel(x, y)', params: 'number, number', returns: 'color', description: 'Gets pixel color at coordinates' },
            { name: 'drawLine(x1, y1, x2, y2, color)', params: 'number, number, number, number, color', description: 'Draws a line between two points' },
            { name: 'drawRect(x, y, width, height, color, filled)', params: 'number, number, number, number, color, boolean', description: 'Draws a rectangle' },
            { name: 'drawCircle(x, y, radius, color, filled)', params: 'number, number, number, color, boolean', description: 'Draws a circle' },
            { name: 'drawText(x, y, text, color)', params: 'number, number, string, color', description: 'Draws text at position' },
            { name: 'fill(color)', params: 'color', description: 'Fills entire canvas with color' },
            { name: 'clear()', description: 'Clears the canvas' },
            { name: 'addLayer(name)', params: 'string', returns: 'number', description: 'Adds a new drawing layer' },
            { name: 'removeLayer(index)', params: 'number', description: 'Removes a layer by index' },
            { name: 'setActiveLayer(index)', params: 'number', description: 'Sets the active drawing layer' },
            { name: 'getActiveLayer()', returns: 'number', description: 'Gets the active layer index' },
            { name: 'mergeLayer(fromIndex, toIndex)', params: 'number, number', description: 'Merges two layers' },
            { name: 'setZoom(zoom)', params: 'number', description: 'Sets the zoom level' },
            { name: 'zoomIn()', description: 'Increases zoom level' },
            { name: 'zoomOut()', description: 'Decreases zoom level' },
            { name: 'zoomToFit()', description: 'Zooms to fit canvas content' },
            { name: 'exportImage(format)', params: 'string', returns: 'string', description: 'Exports canvas as image' },
            { name: 'importImage(imageData)', params: 'string', description: 'Imports image data to canvas' },
            { name: 'undo()', description: 'Undoes last drawing action' },
            { name: 'redo()', description: 'Redoes last undone action' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the canvas' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the canvas' }
        ],
        events: [
            { name: 'onPixelChange', params: 'self, x, y, oldColor, newColor', description: 'Fired when a pixel is changed' },
            { name: 'onDraw', params: 'self, x, y, color, tool', description: 'Fired when drawing on canvas' },
            { name: 'onMouseDown', params: 'self, x, y, button', description: 'Fired when mouse is pressed on canvas' },
            { name: 'onMouseMove', params: 'self, x, y, button', description: 'Fired when mouse moves over canvas' },
            { name: 'onMouseUp', params: 'self, x, y, button', description: 'Fired when mouse is released' },
            { name: 'onZoomChange', params: 'self, zoom', description: 'Fired when zoom level changes' },
            { name: 'onLayerChange', params: 'self, layerIndex', description: 'Fired when active layer changes' }
        ],
        examples: {
            basic: `-- Simple drawing canvas
local drawingCanvas = canvas.new(parent, 10, 5, 40, 25, {
    backgroundColor = colors.white,
    borderColor = colors.black,
    showGrid = true,
    gridSize = 1,
    gridColor = colors.lightGray,
    pixelPerfect = true,
    editable = true,
    onDraw = function(self, x, y, color, tool)
        print("Drew at (" .. x .. ", " .. y .. ") with " .. color)
    end,
    onPixelChange = function(self, x, y, oldColor, newColor)
        -- Auto-save changes
        saveCanvasState(self:exportImage("png"))
    end
})

-- Basic drawing tools
local currentColor = colors.black
local currentTool = "brush"

-- Color palette
local palette = {colors.black, colors.white, colors.red, colors.green, colors.blue, colors.yellow}
for i, color in ipairs(palette) do
    local colorBtn = button.new(parent, 5 + i * 3, 32, 2, 2, {
        backgroundColor = color,
        onClick = function()
            currentColor = color
            print("Selected color: " .. color)
        end
    })
end`,
            advanced: `-- Advanced pixel art editor with layers and tools
local pixelEditor = container.new(parent, 5, 5, 70, 45)

-- Main canvas
local mainCanvas = canvas.new(pixelEditor, 15, 5, 40, 30, {
    backgroundColor = colors.white,
    borderColor = colors.black,
    showGrid = true,
    gridSize = 2,
    gridColor = colors.lightGray,
    pixelPerfect = true,
    editable = true,
    zoom = 2.0,
    layers = {
        { name = "Background", visible = true, opacity = 1.0 },
        { name = "Sketch", visible = true, opacity = 0.8 },
        { name = "Details", visible = true, opacity = 1.0 }
    },
    activeLayer = 1,
    onDraw = function(self, x, y, color, tool)
        -- Apply current tool effects
        if tool == "brush" then
            self:setPixel(x, y, currentColor)
        elseif tool == "eraser" then
            self:setPixel(x, y, colors.white)
        elseif tool == "eyedropper" then
            currentColor = self:getPixel(x, y)
            updateColorDisplay(currentColor)
        end
        
        -- Add to undo history
        addUndoState()
    end
})

-- Tool palette
local toolPanel = container.new(pixelEditor, 2, 5, 12, 30, {
    backgroundColor = colors.lightGray,
    borderColor = colors.gray
})

local tools = {
    { name = "Brush", icon = "brush", tool = "brush" },
    { name = "Eraser", icon = "eraser", tool = "eraser" },
    { name = "Fill", icon = "bucket", tool = "fill" },
    { name = "Line", icon = "line", tool = "line" },
    { name = "Rectangle", icon = "square", tool = "rect" },
    { name = "Circle", icon = "circle", tool = "circle" },
    { name = "Eyedropper", icon = "eyedropper", tool = "eyedropper" }
}

local currentTool = "brush"
local toolButtons = {}

for i, tool in ipairs(tools) do
    toolButtons[tool.tool] = button.new(toolPanel, 1, 1 + (i-1) * 3, 10, 2, {
        text = tool.name,
        selected = (tool.tool == "brush"),
        onClick = function()
            -- Deselect all tools
            for _, btn in pairs(toolButtons) do
                btn.selected = false
            end
            -- Select this tool
            toolButtons[tool.tool].selected = true
            currentTool = tool.tool
            setCursor(tool.tool)
        end
    })
end

-- Color palette panel
local colorPanel = container.new(pixelEditor, 57, 5, 12, 30, {
    backgroundColor = colors.lightGray,
    borderColor = colors.gray
})

-- Extended color palette
local colors_extended = {
    colors.white, colors.lightGray, colors.gray, colors.black,
    colors.red, colors.orange, colors.yellow, colors.lime,
    colors.green, colors.cyan, colors.lightBlue, colors.blue,
    colors.purple, colors.magenta, colors.pink, colors.brown
}

local currentColor = colors.black
local colorButtons = {}

for i, color in ipairs(colors_extended) do
    local row = math.floor((i-1) / 4)
    local col = (i-1) % 4
    
    colorButtons[color] = button.new(colorPanel, 1 + col * 2.5, 1 + row * 2, 2, 2, {
        backgroundColor = color,
        borderColor = color == currentColor and colors.yellow or colors.gray,
        onClick = function()
            -- Update current color
            for _, btn in pairs(colorButtons) do
                btn.borderColor = colors.gray
            end
            colorButtons[color].borderColor = colors.yellow
            currentColor = color
            updateColorDisplay(color)
        end
    })
end

-- Layer panel
local layerPanel = container.new(pixelEditor, 2, 37, 67, 7, {
    backgroundColor = colors.lightGray,
    borderColor = colors.gray
})

local layerLabel = label.new(layerPanel, 1, 1, 65, 1, {
    text = "Layers:",
    fontWeight = "bold"
})

-- Layer controls
local addLayerBtn = button.new(layerPanel, 1, 3, 8, 2, {
    text = "Add Layer",
    onClick = function()
        local layerName = "Layer " .. (mainCanvas:getLayerCount() + 1)
        mainCanvas:addLayer(layerName)
        updateLayerDisplay()
    end
})

local deleteLayerBtn = button.new(layerPanel, 10, 3, 8, 2, {
    text = "Delete",
    onClick = function()
        if mainCanvas:getLayerCount() > 1 then
            mainCanvas:removeLayer(mainCanvas:getActiveLayer())
            updateLayerDisplay()
        end
    end
})

local mergeLayerBtn = button.new(layerPanel, 19, 3, 8, 2, {
    text = "Merge Down",
    onClick = function()
        local activeLayer = mainCanvas:getActiveLayer()
        if activeLayer > 1 then
            mainCanvas:mergeLayer(activeLayer, activeLayer - 1)
            updateLayerDisplay()
        end
    end
})

-- Canvas controls
local undoBtn = button.new(layerPanel, 30, 3, 6, 2, {
    text = "Undo",
    onClick = function()
        mainCanvas:undo()
    end
})

local redoBtn = button.new(layerPanel, 37, 3, 6, 2, {
    text = "Redo",
    onClick = function()
        mainCanvas:redo()
    end
})

local clearBtn = button.new(layerPanel, 44, 3, 6, 2, {
    text = "Clear",
    onClick = function()
        if confirmDialog("Clear canvas?") then
            mainCanvas:clear()
        end
    end
})

-- Zoom controls
local zoomInBtn = button.new(layerPanel, 52, 3, 4, 2, {
    text = "Z+",
    onClick = function()
        mainCanvas:zoomIn()
    end
})

local zoomOutBtn = button.new(layerPanel, 57, 3, 4, 2, {
    text = "Z-",
    onClick = function()
        mainCanvas:zoomOut()
    end
})

-- Export button
local exportBtn = button.new(layerPanel, 62, 3, 5, 2, {
    text = "Export",
    onClick = function()
        local imageData = mainCanvas:exportImage("png")
        savePixelArt(imageData)
        showNotification("Pixel art exported!")
    end
})`
        },
        warnings: ['Canvas widget is currently Work In Progress', 'Some advanced features may not be fully implemented', 'Performance may vary with large canvas sizes'],
        notes: ['Canvas supports multiple layers for complex artwork', 'Pixel-perfect mode ensures crisp pixel art rendering', 'Undo/redo functionality helps with editing workflow', 'Export functionality allows saving artwork in various formats']
    },
    
    loadingIndicator: {
        name: 'LoadingIndicator',
        category: 'Feedback Widgets',
        description: 'A progress indicator widget that shows loading state with customizable progress bars, text, and animation styles.',
        syntax: 'loadingIndicator.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the loading indicator' },
            { name: 'height', type: 'number', description: 'Height of the loading indicator' },
            { name: 'progress', type: 'number', description: 'Current progress value (0-100)' },
            { name: 'text', type: 'string', description: 'Loading text to display' },
            { name: 'showText', type: 'boolean', description: 'Whether to show loading text' },
            { name: 'showProgress', type: 'boolean', description: 'Whether to show progress bar' },
            { name: 'showPercentage', type: 'boolean', description: 'Whether to show percentage' },
            { name: 'indeterminate', type: 'boolean', description: 'Whether progress is indeterminate (unknown duration)' },
            { name: 'animationSpeed', type: 'number', description: 'Speed of the loading animation' },
            { name: 'style', type: 'string', description: 'Loading style: "bar", "circle", "dots", "pulse"' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the indicator' },
            { name: 'progressColor', type: 'color', description: 'Color of the progress bar/indicator' },
            { name: 'textColor', type: 'color', description: 'Color of the loading text' },
            { name: 'borderColor', type: 'color', description: 'Border color of the indicator' },
            { name: 'enabled', type: 'boolean', description: 'Whether the loading indicator is active' },
            { name: 'visible', type: 'boolean', description: 'Whether the loading indicator is visible' }
        ],
        methods: [
            { name: 'start()', description: 'Starts the loading animation' },
            { name: 'stop()', description: 'Stops the loading animation' },
            { name: 'setProgress(progress)', params: 'number', description: 'Sets the progress value (0-100)' },
            { name: 'getProgress()', returns: 'number', description: 'Gets the current progress value' },
            { name: 'incrementProgress(amount)', params: 'number', description: 'Increments progress by specified amount' },
            { name: 'setText(text)', params: 'string', description: 'Sets the loading text' },
            { name: 'getText()', returns: 'string', description: 'Gets the loading text' },
            { name: 'setIndeterminate(indeterminate)', params: 'boolean', description: 'Sets indeterminate mode' },
            { name: 'isIndeterminate()', returns: 'boolean', description: 'Checks if in indeterminate mode' },
            { name: 'setStyle(style)', params: 'string', description: 'Sets the loading animation style' },
            { name: 'reset()', description: 'Resets progress to 0 and stops animation' },
            { name: 'complete()', description: 'Sets progress to 100% and shows completion' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the loading indicator' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the loading indicator' }
        ],
        events: [
            { name: 'onProgressChange', params: 'self, progress', description: 'Fired when progress value changes' },
            { name: 'onStart', params: 'self', description: 'Fired when loading starts' },
            { name: 'onStop', params: 'self', description: 'Fired when loading stops' },
            { name: 'onComplete', params: 'self', description: 'Fired when progress reaches 100%' },
            { name: 'onReset', params: 'self', description: 'Fired when indicator is reset' }
        ],
        examples: {
            basic: `-- Simple loading bar
local fileLoader = loadingIndicator.new(parent, 10, 15, 30, 3, {
    progress = 0,
    text = "Loading files...",
    showText = true,
    showProgress = true,
    showPercentage = true,
    style = "bar",
    backgroundColor = colors.lightGray,
    progressColor = colors.blue,
    textColor = colors.black,
    onProgressChange = function(self, progress)
        if progress >= 100 then
            self:setText("Loading complete!")
        end
    end,
    onComplete = function(self)
        print("File loading finished!")
        -- Hide loader after 2 seconds
        setTimeout(function()
            self:setVisible(false)
        end, 2000)
    end
})

-- Simulate file loading
function loadFiles()
    fileLoader:start()
    fileLoader:setText("Initializing...")
    
    -- Simulate loading steps
    local files = {"config.lua", "assets.dat", "sprites.png", "sounds.wav"}
    for i, filename in ipairs(files) do
        fileLoader:setText("Loading " .. filename)
        fileLoader:setProgress((i / #files) * 100)
        sleep(1) -- Simulate loading time
    end
    
    fileLoader:complete()
end`,
            advanced: `-- Advanced multi-stage loading system
local loadingSystem = container.new(parent, 10, 5, 50, 35)

-- Main loading indicator
local mainLoader = loadingIndicator.new(loadingSystem, 5, 5, 40, 4, {
    progress = 0,
    text = "Initializing application...",
    showText = true,
    showProgress = true,
    showPercentage = true,
    style = "bar",
    backgroundColor = colors.white,
    progressColor = colors.green,
    textColor = colors.black,
    borderColor = colors.gray
})

-- Secondary loading indicators for different tasks
local loaders = {
    assets = loadingIndicator.new(loadingSystem, 5, 12, 40, 3, {
        progress = 0,
        text = "Loading assets...",
        showText = true,
        showProgress = true,
        style = "bar",
        progressColor = colors.blue,
        visible = false
    }),
    
    database = loadingIndicator.new(loadingSystem, 5, 17, 40, 3, {
        progress = 0,
        text = "Connecting to database...",
        showText = true,
        showProgress = false,
        indeterminate = true,
        style = "dots",
        progressColor = colors.orange,
        visible = false
    }),
    
    ui = loadingIndicator.new(loadingSystem, 5, 22, 40, 3, {
        progress = 0,
        text = "Building interface...",
        showText = true,
        showProgress = true,
        style = "circle",
        progressColor = colors.purple,
        visible = false
    })
}

-- Loading status display
local statusPanel = container.new(loadingSystem, 5, 27, 40, 6, {
    backgroundColor = colors.lightGray,
    borderColor = colors.gray
})

local statusTitle = label.new(statusPanel, 2, 1, 36, 1, {
    text = "Loading Progress:",
    fontWeight = "bold"
})

local statusList = {}
local loadingSteps = {
    { name = "Initialize System", duration = 2000, loader = mainLoader },
    { name = "Load Assets", duration = 3000, loader = loaders.assets },
    { name = "Connect Database", duration = 1500, loader = loaders.database },
    { name = "Build Interface", duration = 2500, loader = loaders.ui },
    { name = "Finalize", duration = 1000, loader = mainLoader }
}

-- Create status items
for i, step in ipairs(loadingSteps) do
    statusList[i] = label.new(statusPanel, 2, 1 + i, 36, 1, {
        text = "⏸ " .. step.name,
        textColor = colors.gray
    })
end

-- Comprehensive loading function
function startApplicationLoading()
    mainLoader:start()
    local totalSteps = #loadingSteps
    local currentStep = 1
    
    local function processStep(stepIndex)
        if stepIndex > totalSteps then
            -- Loading complete
            mainLoader:setText("Application ready!")
            mainLoader:setProgress(100)
            mainLoader:complete()
            
            -- Update final status
            statusList[totalSteps].text = "✅ Loading Complete"
            statusList[totalSteps].textColor = colors.green
            
            -- Hide loading screen after delay
            setTimeout(function()
                loadingSystem:setVisible(false)
                showMainApplication()
            end, 2000)
            return
        end
        
        local step = loadingSteps[stepIndex]
        
        -- Update main progress
        local overallProgress = ((stepIndex - 1) / totalSteps) * 100
        mainLoader:setProgress(overallProgress)
        mainLoader:setText("Step " .. stepIndex .. "/" .. totalSteps .. ": " .. step.name)
        
        -- Update status display
        if stepIndex > 1 then
            statusList[stepIndex - 1].text = "✅ " .. loadingSteps[stepIndex - 1].name
            statusList[stepIndex - 1].textColor = colors.green
        end
        statusList[stepIndex].text = "🔄 " .. step.name
        statusList[stepIndex].textColor = colors.blue
        
        -- Show and configure step loader
        step.loader:setVisible(true)
        step.loader:reset()
        step.loader:start()
        
        -- Simulate step execution
        if step.name == "Connect Database" then
            -- Indeterminate progress for database connection
            setTimeout(function()
                step.loader:setText("Connected to database")
                step.loader:setIndeterminate(false)
                step.loader:setProgress(100)
                step.loader:complete()
                
                setTimeout(function()
                    step.loader:setVisible(false)
                    processStep(stepIndex + 1)
                end, 500)
            end, step.duration)
        else
            -- Determinate progress
            local progressIncrement = 100 / (step.duration / 100)
            local progressTimer = createTimer(100, function()
                local currentProgress = step.loader:getProgress()
                if currentProgress < 100 then
                    step.loader:incrementProgress(progressIncrement)
                else
                    destroyTimer(progressTimer)
                    step.loader:complete()
                    
                    setTimeout(function()
                        step.loader:setVisible(false)
                        processStep(stepIndex + 1)
                    end, 500)
                end
            end)
        end
    end
    
    -- Start loading process
    processStep(1)
end

-- Error handling loading indicator
local errorLoader = loadingIndicator.new(loadingSystem, 5, 35, 40, 3, {
    progress = 0,
    text = "Error occurred during loading",
    showText = true,
    showProgress = false,
    style = "pulse",
    progressColor = colors.red,
    textColor = colors.red,
    visible = false
})

-- Function to handle loading errors
function handleLoadingError(errorMessage)
    -- Hide all other loaders
    mainLoader:setVisible(false)
    for _, loader in pairs(loaders) do
        loader:setVisible(false)
    end
    
    -- Show error state
    errorLoader:setVisible(true)
    errorLoader:setText("Error: " .. errorMessage)
    errorLoader:start()
    
    -- Provide retry option
    local retryBtn = button.new(loadingSystem, 20, 30, 10, 2, {
        text = "Retry",
        backgroundColor = colors.orange,
        onClick = function()
            errorLoader:setVisible(false)
            retryBtn:setVisible(false)
            startApplicationLoading()
        end
    })
end`
        },
        notes: ['Loading indicators improve user experience during wait times', 'Use indeterminate mode when duration is unknown', 'Different styles (bar, circle, dots) suit different contexts', 'Provide meaningful status text to inform users of progress']
    },
    
    spinner: {
        name: 'Spinner',
        category: 'Feedback Widgets',
        description: 'A simple animated spinner widget for indicating loading or processing states with various animation styles.',
        syntax: 'spinner.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the spinner' },
            { name: 'height', type: 'number', description: 'Height of the spinner' },
            { name: 'style', type: 'string', description: 'Spinner style: "dots", "bars", "circle", "pulse", "wave"' },
            { name: 'speed', type: 'number', description: 'Animation speed (1.0 = normal, 2.0 = 2x speed)' },
            { name: 'size', type: 'string', description: 'Spinner size: "small", "medium", "large"' },
            { name: 'color', type: 'color', description: 'Primary color of the spinner' },
            { name: 'secondaryColor', type: 'color', description: 'Secondary color for some spinner styles' },
            { name: 'backgroundColor', type: 'color', description: 'Background color behind the spinner' },
            { name: 'text', type: 'string', description: 'Optional text to display with spinner' },
            { name: 'showText', type: 'boolean', description: 'Whether to show text alongside spinner' },
            { name: 'textPosition', type: 'string', description: 'Text position: "below", "above", "right", "left"' },
            { name: 'textColor', type: 'color', description: 'Color of the text' },
            { name: 'centerSpinner', type: 'boolean', description: 'Whether to center spinner in available space' },
            { name: 'enabled', type: 'boolean', description: 'Whether the spinner is active/animating' },
            { name: 'visible', type: 'boolean', description: 'Whether the spinner is visible' }
        ],
        methods: [
            { name: 'start()', description: 'Starts the spinner animation' },
            { name: 'stop()', description: 'Stops the spinner animation' },
            { name: 'pause()', description: 'Pauses the spinner animation' },
            { name: 'resume()', description: 'Resumes the spinner animation' },
            { name: 'isSpinning()', returns: 'boolean', description: 'Returns whether spinner is currently animating' },
            { name: 'setStyle(style)', params: 'string', description: 'Changes the spinner animation style' },
            { name: 'setSpeed(speed)', params: 'number', description: 'Sets the animation speed' },
            { name: 'setSize(size)', params: 'string', description: 'Sets the spinner size' },
            { name: 'setColor(color)', params: 'color', description: 'Sets the primary spinner color' },
            { name: 'setText(text)', params: 'string', description: 'Sets the text to display' },
            { name: 'setTextPosition(position)', params: 'string', description: 'Sets the text position relative to spinner' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the spinner' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the spinner' }
        ],
        events: [
            { name: 'onStart', params: 'self', description: 'Fired when spinner animation starts' },
            { name: 'onStop', params: 'self', description: 'Fired when spinner animation stops' },
            { name: 'onPause', params: 'self', description: 'Fired when spinner animation is paused' },
            { name: 'onResume', params: 'self', description: 'Fired when spinner animation resumes' }
        ],
        examples: {
            basic: `-- Simple loading spinner
local loadingSpinner = spinner.new(parent, 25, 15, 6, 6, {
    style = "circle",
    speed = 1.0,
    size = "medium",
    color = colors.blue,
    text = "Loading...",
    showText = true,
    textPosition = "below",
    textColor = colors.black,
    centerSpinner = true,
    onStart = function(self)
        print("Loading started")
    end,
    onStop = function(self)
        print("Loading finished")
    end
})

-- Start and stop the spinner
function startLoading()
    loadingSpinner:start()
end

function stopLoading()
    loadingSpinner:stop()
    loadingSpinner:setText("Complete!")
end`,
            advanced: `-- Multi-context spinner system
local spinnerContainer = container.new(parent, 5, 5, 60, 40)

-- Different spinner contexts
local spinnerContexts = {
    fileOperation = {
        position = { x = 5, y = 5 },
        config = {
            style = "bars",
            color = colors.green,
            text = "Processing files...",
            size = "medium"
        }
    },
    
    networkRequest = {
        position = { x = 25, y = 5 },
        config = {
            style = "dots",
            color = colors.blue,
            text = "Connecting...",
            size = "small",
            speed = 1.5
        }
    },
    
    dataProcessing = {
        position = { x = 45, y = 5 },
        config = {
            style = "wave",
            color = colors.orange,
            text = "Analyzing data...",
            size = "large",
            speed = 0.8
        }
    },
    
    backgroundTask = {
        position = { x = 5, y = 20 },
        config = {
            style = "pulse",
            color = colors.purple,
            text = "Background process",
            size = "medium",
            speed = 0.5
        }
    }
}

local spinners = {}
local spinnerLabels = {}

-- Create spinners for each context
for contextName, context in pairs(spinnerContexts) do
    -- Context label
    spinnerLabels[contextName] = label.new(spinnerContainer, context.position.x, context.position.y - 2, 15, 1, {
        text = string.upper(contextName:sub(1,1)) .. contextName:sub(2):gsub("([A-Z])", " %1"),
        fontWeight = "bold",
        textColor = colors.black
    })
    
    -- Spinner
    spinners[contextName] = spinner.new(spinnerContainer, 
        context.position.x, 
        context.position.y, 
        12, 8, 
        {
            style = context.config.style,
            speed = context.config.speed or 1.0,
            size = context.config.size,
            color = context.config.color,
            secondaryColor = colors.lightGray,
            text = context.config.text,
            showText = true,
            textPosition = "below",
            textColor = colors.black,
            centerSpinner = true,
            visible = false,
            onStart = function(self)
                print("Started: " .. contextName)
                updateSpinnerStatus(contextName, "active")
            end,
            onStop = function(self)
                print("Stopped: " .. contextName)
                updateSpinnerStatus(contextName, "idle")
            end
        }
    )
end

-- Control panel for spinner management
local controlPanel = container.new(spinnerContainer, 5, 30, 50, 8, {
    backgroundColor = colors.lightGray,
    borderColor = colors.gray
})

local controlTitle = label.new(controlPanel, 2, 1, 46, 1, {
    text = "Spinner Controls",
    fontWeight = "bold",
    textAlign = "center"
})

-- Context control buttons
local buttonY = 3
local buttonSpacing = 8
local contextIndex = 0

for contextName, context in pairs(spinnerContexts) do
    local startBtn = button.new(controlPanel, 2 + contextIndex * buttonSpacing, buttonY, 6, 1, {
        text = "Start",
        backgroundColor = context.config.color,
        textColor = colors.white,
        onClick = function()
            spinners[contextName]:setVisible(true)
            spinners[contextName]:start()
        end
    })
    
    local stopBtn = button.new(controlPanel, 2 + contextIndex * buttonSpacing, buttonY + 2, 6, 1, {
        text = "Stop",
        backgroundColor = colors.gray,
        textColor = colors.white,
        onClick = function()
            spinners[contextName]:stop()
            setTimeout(function()
                spinners[contextName]:setVisible(false)
            end, 1000)
        end
    })
    
    contextIndex = contextIndex + 1
end

-- Global spinner controls
local startAllBtn = button.new(controlPanel, 2, 7, 10, 1, {
    text = "Start All",
    backgroundColor = colors.green,
    onClick = function()
        for name, spinner in pairs(spinners) do
            spinner:setVisible(true)
            spinner:start()
        end
    end
})

local stopAllBtn = button.new(controlPanel, 14, 7, 10, 1, {
    text = "Stop All",
    backgroundColor = colors.red,
    onClick = function()
        for name, spinner in pairs(spinners) do
            spinner:stop()
            setTimeout(function()
                spinner:setVisible(false)
            end, 1000)
        end
    end
})

-- Speed control
local speedLabel = label.new(controlPanel, 26, 6, 8, 1, {
    text = "Speed:",
    textColor = colors.black
})

local speedSlider = slider.new(controlPanel, 26, 7, 15, 1, {
    value = 1.0,
    min = 0.1,
    max = 3.0,
    step = 0.1,
    showValue = true,
    valueFormat = "%.1fx",
    onChange = function(self, value)
        -- Update speed for all active spinners
        for name, spinner in pairs(spinners) do
            if spinner:isSpinning() then
                spinner:setSpeed(value)
            end
        end
    end
})

-- Status display
local statusPanel = container.new(spinnerContainer, 5, 40, 50, 3, {
    backgroundColor = colors.white,
    borderColor = colors.gray
})

local statusText = label.new(statusPanel, 2, 1, 46, 1, {
    text = "Status: All spinners idle",
    textColor = colors.black
})

-- Function to update spinner status display
function updateSpinnerStatus(contextName, status)
    local activeSpinners = {}
    for name, spinner in pairs(spinners) do
        if spinner:isSpinning() then
            table.insert(activeSpinners, name)
        end
    end
    
    if #activeSpinners == 0 then
        statusText.text = "Status: All spinners idle"
    elseif #activeSpinners == 1 then
        statusText.text = "Status: " .. activeSpinners[1] .. " active"
    else
        statusText.text = "Status: " .. #activeSpinners .. " spinners active"
    end
end

-- Demonstration sequence
function demonstrateSpinners()
    local sequence = {
        { context = "networkRequest", duration = 3000 },
        { context = "fileOperation", duration = 2000 },
        { context = "dataProcessing", duration = 4000 },
        { context = "backgroundTask", duration = 5000 }
    }
    
    for i, step in ipairs(sequence) do
        setTimeout(function()
            local spinner = spinners[step.context]
            spinner:setVisible(true)
            spinner:start()
            
            setTimeout(function()
                spinner:stop()
                setTimeout(function()
                    spinner:setVisible(false)
                end, 1000)
            end, step.duration)
        end, (i - 1) * 1000)
    end
end`
        },
        notes: ['Spinners provide visual feedback during indeterminate waiting periods', 'Different styles suit different UI contexts and themes', 'Keep spinner animations lightweight for smooth performance', 'Use appropriate colors that match your application theme']
    },
    
    groupBox: {
        name: 'GroupBox',
        category: 'Layout Widgets',
        description: 'A container widget that groups related controls together with a visible border and optional title for better organization.',
        syntax: 'groupBox.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X coordinate position' },
            { name: 'y', type: 'number', description: 'Y coordinate position' },
            { name: 'width', type: 'number', description: 'Width of the group box' },
            { name: 'height', type: 'number', description: 'Height of the group box' },
            { name: 'title', type: 'string', description: 'Title text displayed at the top of the group' },
            { name: 'showTitle', type: 'boolean', description: 'Whether to display the title' },
            { name: 'titlePosition', type: 'string', description: 'Title position: "top", "bottom"' },
            { name: 'titleAlignment', type: 'string', description: 'Title alignment: "left", "center", "right"' },
            { name: 'padding', type: 'number', description: 'Internal padding around child controls' },
            { name: 'margin', type: 'number', description: 'External margin around the group box' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the group box' },
            { name: 'borderColor', type: 'color', description: 'Border color of the group box' },
            { name: 'borderWidth', type: 'number', description: 'Width of the border line' },
            { name: 'borderStyle', type: 'string', description: 'Border style: "solid", "dashed", "dotted"' },
            { name: 'titleColor', type: 'color', description: 'Color of the title text' },
            { name: 'titleBackgroundColor', type: 'color', description: 'Background color behind title text' },
            { name: 'rounded', type: 'boolean', description: 'Whether to use rounded corners' },
            { name: 'collapsible', type: 'boolean', description: 'Whether the group can be collapsed' },
            { name: 'collapsed', type: 'boolean', description: 'Whether the group is currently collapsed' },
            { name: 'enabled', type: 'boolean', description: 'Whether the group box is interactive' },
            { name: 'visible', type: 'boolean', description: 'Whether the group box is visible' }
        ],
        methods: [
            { name: 'addChild(widget)', params: 'widget', description: 'Adds a child widget to the group' },
            { name: 'removeChild(widget)', params: 'widget', description: 'Removes a child widget from the group' },
            { name: 'getChildren()', returns: 'table', description: 'Gets all child widgets' },
            { name: 'clearChildren()', description: 'Removes all child widgets' },
            { name: 'setTitle(title)', params: 'string', description: 'Sets the group title' },
            { name: 'getTitle()', returns: 'string', description: 'Gets the group title' },
            { name: 'collapse()', description: 'Collapses the group (hides children)' },
            { name: 'expand()', description: 'Expands the group (shows children)' },
            { name: 'toggleCollapse()', description: 'Toggles the collapsed state' },
            { name: 'isCollapsed()', returns: 'boolean', description: 'Returns whether the group is collapsed' },
            { name: 'setPadding(padding)', params: 'number', description: 'Sets internal padding' },
            { name: 'setMargin(margin)', params: 'number', description: 'Sets external margin' },
            { name: 'arrangeChildren(layout)', params: 'string', description: 'Arranges children using layout: "vertical", "horizontal", "grid"' },
            { name: 'setEnabled(enabled)', params: 'boolean', description: 'Enables or disables the group box' },
            { name: 'setVisible(visible)', params: 'boolean', description: 'Shows or hides the group box' }
        ],
        events: [
            { name: 'onCollapse', params: 'self', description: 'Fired when the group is collapsed' },
            { name: 'onExpand', params: 'self', description: 'Fired when the group is expanded' },
            { name: 'onChildAdded', params: 'self, child', description: 'Fired when a child widget is added' },
            { name: 'onChildRemoved', params: 'self, child', description: 'Fired when a child widget is removed' },
            { name: 'onResize', params: 'self, width, height', description: 'Fired when the group box is resized' }
        ],
        examples: {
            basic: `-- Simple settings group
local audioSettings = groupBox.new(parent, 10, 5, 30, 15, {
    title = "Audio Settings",
    showTitle = true,
    titleAlignment = "center",
    padding = 2,
    backgroundColor = colors.lightGray,
    borderColor = colors.gray,
    borderWidth = 1,
    titleColor = colors.black,
    onExpand = function(self)
        print("Audio settings expanded")
    end
})

-- Add controls to the group
local volumeSlider = slider.new(audioSettings, 2, 3, 25, 2, {
    value = 75,
    min = 0,
    max = 100,
    text = "Volume"
})

local muteCheckbox = checkBox.new(audioSettings, 2, 6, 20, 1, {
    text = "Mute Audio",
    checked = false
})

local qualityCombo = comboBox.new(audioSettings, 2, 9, 25, 2, {
    items = {"Low", "Medium", "High", "Ultra"},
    selectedIndex = 2,
    placeholder = "Audio Quality"
})`,
            advanced: `-- Advanced form with multiple grouped sections
local settingsForm = container.new(parent, 5, 5, 70, 50)

-- Display settings group
local displayGroup = groupBox.new(settingsForm, 5, 5, 30, 20, {
    title = "Display Settings",
    showTitle = true,
    titleAlignment = "left",
    padding = 2,
    backgroundColor = colors.white,
    borderColor = colors.blue,
    borderWidth = 2,
    titleColor = colors.blue,
    titleBackgroundColor = colors.white,
    rounded = true,
    collapsible = true,
    collapsed = false
})

-- Resolution selection
local resolutionLabel = label.new(displayGroup, 2, 2, 25, 1, {
    text = "Resolution:",
    fontWeight = "bold"
})

local resolutionCombo = comboBox.new(displayGroup, 2, 4, 25, 2, {
    items = {"1920x1080", "1680x1050", "1440x900", "1280x720"},
    selectedIndex = 1
})

-- Display mode
local fullscreenCheck = checkBox.new(displayGroup, 2, 7, 20, 1, {
    text = "Fullscreen Mode",
    checked = true
})

local vsyncCheck = checkBox.new(displayGroup, 2, 9, 20, 1, {
    text = "Vertical Sync",
    checked = false
})

-- Brightness slider
local brightnessLabel = label.new(displayGroup, 2, 11, 20, 1, {
    text = "Brightness:"
})

local brightnessSlider = slider.new(displayGroup, 2, 13, 25, 2, {
    value = 80,
    min = 0,
    max = 100,
    showValue = true,
    valueFormat = "%d%%"
})

-- Audio settings group
local audioGroup = groupBox.new(settingsForm, 40, 5, 30, 20, {
    title = "Audio Settings",
    showTitle = true,
    titleAlignment = "left",
    padding = 2,
    backgroundColor = colors.white,
    borderColor = colors.green,
    borderWidth = 2,
    titleColor = colors.green,
    rounded = true,
    collapsible = true
})

-- Master volume
local masterVolumeLabel = label.new(audioGroup, 2, 2, 20, 1, {
    text = "Master Volume:"
})

local masterVolumeSlider = slider.new(audioGroup, 2, 4, 25, 2, {
    value = 75,
    min = 0,
    max = 100,
    showValue = true,
    valueFormat = "%d%%"
})

-- Audio device selection
local deviceLabel = label.new(audioGroup, 2, 7, 20, 1, {
    text = "Audio Device:"
})

local deviceCombo = comboBox.new(audioGroup, 2, 9, 25, 2, {
    items = {"Default Device", "Speakers", "Headphones", "USB Audio"},
    selectedIndex = 1
})

-- Audio quality
local qualityToggle = toggleSwitch.new(audioGroup, 2, 12, 20, 2, {
    label = "High Quality Audio",
    state = true
})

-- Controls group
local controlsGroup = groupBox.new(settingsForm, 5, 27, 30, 18, {
    title = "Control Settings",
    showTitle = true,
    titleAlignment = "left",
    padding = 2,
    backgroundColor = colors.white,
    borderColor = colors.orange,
    borderWidth = 2,
    titleColor = colors.orange,
    rounded = true,
    collapsible = true
})

-- Mouse sensitivity
local mouseSensLabel = label.new(controlsGroup, 2, 2, 20, 1, {
    text = "Mouse Sensitivity:"
})

local mouseSensSlider = slider.new(controlsGroup, 2, 4, 25, 2, {
    value = 50,
    min = 1,
    max = 100,
    showValue = true
})

-- Control options
local invertMouseCheck = checkBox.new(controlsGroup, 2, 7, 22, 1, {
    text = "Invert Mouse Y-Axis",
    checked = false
})

local mouseAccelCheck = checkBox.new(controlsGroup, 2, 9, 22, 1, {
    text = "Mouse Acceleration",
    checked = true
})

-- Keyboard layout
local layoutLabel = label.new(controlsGroup, 2, 11, 20, 1, {
    text = "Keyboard Layout:"
})

local layoutCombo = comboBox.new(controlsGroup, 2, 13, 25, 2, {
    items = {"QWERTY", "AZERTY", "DVORAK", "COLEMAK"},
    selectedIndex = 1
})

-- Advanced group (collapsible)
local advancedGroup = groupBox.new(settingsForm, 40, 27, 30, 18, {
    title = "Advanced Settings",
    showTitle = true,
    titleAlignment = "left",
    padding = 2,
    backgroundColor = colors.white,
    borderColor = colors.red,
    borderWidth = 2,
    titleColor = colors.red,
    rounded = true,
    collapsible = true,
    collapsed = true, -- Start collapsed
    onExpand = function(self)
        showWarningDialog("Changing advanced settings may affect performance!")
    end
})

-- Debug options
local debugCheck = checkBox.new(advancedGroup, 2, 2, 22, 1, {
    text = "Enable Debug Mode",
    checked = false
})

local loggingCheck = checkBox.new(advancedGroup, 2, 4, 22, 1, {
    text = "Verbose Logging",
    checked = false
})

-- Performance settings
local performanceLabel = label.new(advancedGroup, 2, 6, 20, 1, {
    text = "Performance Mode:"
})

local performanceCombo = comboBox.new(advancedGroup, 2, 8, 25, 2, {
    items = {"Balanced", "Performance", "Quality", "Power Saving"},
    selectedIndex = 1
})

-- Memory limit
local memoryLabel = label.new(advancedGroup, 2, 11, 20, 1, {
    text = "Memory Limit (MB):"
})

local memoryUpDown = numericUpDown.new(advancedGroup, 2, 13, 15, 2, {
    value = 512,
    min = 128,
    max = 2048,
    step = 64
})

-- Action buttons
local buttonPanel = container.new(settingsForm, 5, 47, 65, 3, {
    backgroundColor = colors.lightGray
})

local applyBtn = button.new(buttonPanel, 2, 1, 12, 2, {
    text = "Apply Settings",
    backgroundColor = colors.green,
    onClick = function()
        -- Collect all settings from groups
        local settings = {
            display = {
                resolution = resolutionCombo:getSelectedValue(),
                fullscreen = fullscreenCheck:isChecked(),
                vsync = vsyncCheck:isChecked(),
                brightness = brightnessSlider:getValue()
            },
            audio = {
                masterVolume = masterVolumeSlider:getValue(),
                device = deviceCombo:getSelectedValue(),
                highQuality = qualityToggle:isOn()
            },
            controls = {
                mouseSensitivity = mouseSensSlider:getValue(),
                invertMouse = invertMouseCheck:isChecked(),
                mouseAccel = mouseAccelCheck:isChecked(),
                keyboardLayout = layoutCombo:getSelectedValue()
            },
            advanced = {
                debug = debugCheck:isChecked(),
                logging = loggingCheck:isChecked(),
                performanceMode = performanceCombo:getSelectedValue(),
                memoryLimit = memoryUpDown:getValue()
            }
        }
        
        applySettings(settings)
        showNotification("Settings applied successfully!")
    end
})

local resetBtn = button.new(buttonPanel, 16, 1, 12, 2, {
    text = "Reset Defaults",
    backgroundColor = colors.orange,
    onClick = function()
        if confirmDialog("Reset all settings to defaults?") then
            resetAllSettingsToDefaults()
        end
    end
})

local cancelBtn = button.new(buttonPanel, 50, 1, 12, 2, {
    text = "Cancel",
    backgroundColor = colors.gray,
    onClick = function()
        closeSettingsForm()
    end
})`
        },
        notes: ['GroupBox helps organize related controls visually', 'Collapsible groups save space in complex forms', 'Use consistent styling across groups for better UX', 'Proper padding and margins improve readability']
    },
    
    modal: {
        name: 'Modal',
        category: 'Layout Widgets',
        description: 'A modal dialog widget that displays content in an overlay window, blocking interaction with the underlying interface until dismissed.',
        syntax: 'modal.show(options)',
        properties: [
            { name: 'title', type: 'string', description: 'Title displayed at the top of the modal' },
            { name: 'content', type: 'string|widget', description: 'Content to display in the modal body' },
            { name: 'width', type: 'number', description: 'Width of the modal dialog' },
            { name: 'height', type: 'number', description: 'Height of the modal dialog' },
            { name: 'modal', type: 'boolean', description: 'Whether to block interaction with background (default: true)' },
            { name: 'closable', type: 'boolean', description: 'Whether the modal can be closed by user' },
            { name: 'draggable', type: 'boolean', description: 'Whether the modal can be dragged' },
            { name: 'resizable', type: 'boolean', description: 'Whether the modal can be resized' },
            { name: 'centered', type: 'boolean', description: 'Whether to center the modal on screen' },
            { name: 'showCloseButton', type: 'boolean', description: 'Whether to show close button in header' },
            { name: 'showButtons', type: 'boolean', description: 'Whether to show action buttons' },
            { name: 'buttons', type: 'table', description: 'Array of button configurations' },
            { name: 'overlayColor', type: 'color', description: 'Color of the background overlay' },
            { name: 'overlayOpacity', type: 'number', description: 'Opacity of the background overlay (0-1)' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the modal' },
            { name: 'borderColor', type: 'color', description: 'Border color of the modal' },
            { name: 'titleColor', type: 'color', description: 'Color of the title text' },
            { name: 'textColor', type: 'color', description: 'Color of the content text' },
            { name: 'animation', type: 'string', description: 'Animation style: "fade", "slide", "zoom", "none"' },
            { name: 'animationDuration', type: 'number', description: 'Animation duration in milliseconds' }
        ],
        methods: [
            { name: 'show(options)', params: 'table', returns: 'Modal', description: 'Shows the modal with specified options' },
            { name: 'hide()', description: 'Hides the modal' },
            { name: 'close()', description: 'Closes the modal and cleans up resources' },
            { name: 'setTitle(title)', params: 'string', description: 'Sets the modal title' },
            { name: 'setContent(content)', params: 'string|widget', description: 'Sets the modal content' },
            { name: 'addButton(button)', params: 'table', description: 'Adds a button to the modal' },
            { name: 'removeButton(index)', params: 'number', description: 'Removes a button by index' },
            { name: 'setSize(width, height)', params: 'number, number', description: 'Sets the modal size' },
            { name: 'center()', description: 'Centers the modal on screen' },
            { name: 'bringToFront()', description: 'Brings modal to front of other windows' },
            { name: 'isVisible()', returns: 'boolean', description: 'Returns whether the modal is visible' }
        ],
        events: [
            { name: 'onShow', params: 'modal', description: 'Fired when the modal is shown' },
            { name: 'onHide', params: 'modal', description: 'Fired when the modal is hidden' },
            { name: 'onClose', params: 'modal', description: 'Fired when the modal is closed' },
            { name: 'onButtonClick', params: 'modal, buttonIndex, buttonId', description: 'Fired when a modal button is clicked' },
            { name: 'onResize', params: 'modal, width, height', description: 'Fired when the modal is resized' },
            { name: 'onDrag', params: 'modal, x, y', description: 'Fired when the modal is dragged' }
        ],
        examples: {
            basic: `-- Simple confirmation modal
function showConfirmDialog(message, onConfirm, onCancel)
    modal.show({
        title = "Confirm Action",
        content = message,
        width = 30,
        height = 10,
        centered = true,
        showButtons = true,
        buttons = {
            {
                id = "confirm",
                text = "Confirm",
                style = "primary",
                onClick = function(modal)
                    modal:close()
                    if onConfirm then onConfirm() end
                end
            },
            {
                id = "cancel",
                text = "Cancel",
                style = "secondary",
                onClick = function(modal)
                    modal:close()
                    if onCancel then onCancel() end
                end
            }
        },
        onShow = function(modal)
            print("Confirmation dialog shown")
        end
    })
end

-- Usage
showConfirmDialog(
    "Are you sure you want to delete this file?",
    function() deleteFile() end,
    function() print("Deletion cancelled") end
)`,
            advanced: `-- Advanced modal system with different types
local modalManager = {
    activeModals = {},
    zIndex = 1000
}

-- Alert modal
function modalManager.alert(title, message, onOk)
    return modal.show({
        title = title,
        content = message,
        width = 35,
        height = 12,
        centered = true,
        modal = true,
        closable = true,
        animation = "fade",
        animationDuration = 300,
        backgroundColor = colors.white,
        titleColor = colors.black,
        textColor = colors.black,
        showButtons = true,
        buttons = {
            {
                id = "ok",
                text = "OK",
                style = "primary",
                backgroundColor = colors.blue,
                onClick = function(modal)
                    modal:close()
                    if onOk then onOk() end
                end
            }
        },
        onShow = function(modal)
            table.insert(modalManager.activeModals, modal)
        end,
        onClose = function(modal)
            for i, m in ipairs(modalManager.activeModals) do
                if m == modal then
                    table.remove(modalManager.activeModals, i)
                    break
                end
            end
        end
    })
end

-- Input modal
function modalManager.prompt(title, message, defaultValue, onSubmit, onCancel)
    local inputWidget
    
    return modal.show({
        title = title,
        content = function(container)
            -- Message label
            local messageLabel = label.new(container, 2, 2, 30, 2, {
                text = message,
                textWrap = true,
                textColor = colors.black
            })
            
            -- Input field
            inputWidget = textBox.new(container, 2, 5, 30, 2, {
                text = defaultValue or "",
                placeholder = "Enter value...",
                backgroundColor = colors.white,
                textColor = colors.black,
                borderColor = colors.gray,
                onEnter = function(self, text)
                    if onSubmit then onSubmit(text) end
                    modal:close()
                end
            })
            
            -- Focus the input
            inputWidget:focus()
        end,
        width = 35,
        height = 15,
        centered = true,
        draggable = true,
        animation = "slide",
        showButtons = true,
        buttons = {
            {
                id = "submit",
                text = "Submit",
                style = "primary",
                onClick = function(modal)
                    local value = inputWidget:getText()
                    modal:close()
                    if onSubmit then onSubmit(value) end
                end
            },
            {
                id = "cancel",
                text = "Cancel",
                style = "secondary",
                onClick = function(modal)
                    modal:close()
                    if onCancel then onCancel() end
                end
            }
        }
    })
end

-- Settings modal with tabs
function modalManager.showSettings()
    local tabContainer
    local currentTab = 1
    local tabs = {"General", "Display", "Audio", "Advanced"}
    
    return modal.show({
        title = "Application Settings",
        content = function(container)
            -- Tab buttons
            local tabPanel = container.new(container, 2, 2, 46, 3, {
                backgroundColor = colors.lightGray
            })
            
            for i, tabName in ipairs(tabs) do
                local tabBtn = button.new(tabPanel, 2 + (i-1) * 11, 1, 10, 1, {
                    text = tabName,
                    selected = (i == currentTab),
                    onClick = function()
                        currentTab = i
                        updateTabContent()
                    end
                })
            end
            
            -- Tab content area
            tabContainer = container.new(container, 2, 6, 46, 25, {
                backgroundColor = colors.white,
                borderColor = colors.gray
            })
            
            updateTabContent()
        end,
        width = 50,
        height = 35,
        centered = true,
        draggable = true,
        resizable = true,
        animation = "zoom",
        showButtons = true,
        buttons = {
            {
                id = "apply",
                text = "Apply",
                style = "primary",
                onClick = function(modal)
                    applySettings()
                    showNotification("Settings applied!")
                end
            },
            {
                id = "ok",
                text = "OK",
                style = "primary",
                onClick = function(modal)
                    applySettings()
                    modal:close()
                end
            },
            {
                id = "cancel",
                text = "Cancel",
                style = "secondary",
                onClick = function(modal)
                    modal:close()
                end
            }
        }
    })
end

-- Progress modal
function modalManager.showProgress(title, onCancel)
    local progressBar
    local statusLabel
    
    local progressModal = modal.show({
        title = title,
        content = function(container)
            statusLabel = label.new(container, 2, 2, 40, 1, {
                text = "Initializing...",
                textColor = colors.black
            })
            
            progressBar = progressBar.new(container, 2, 4, 40, 2, {
                value = 0,
                min = 0,
                max = 100,
                showPercentage = true,
                backgroundColor = colors.lightGray,
                progressColor = colors.blue
            })
        end,
        width = 45,
        height = 12,
        centered = true,
        closable = false,
        modal = true,
        animation = "fade",
        showButtons = onCancel and true or false,
        buttons = onCancel and {
            {
                id = "cancel",
                text = "Cancel",
                style = "secondary",
                onClick = function(modal)
                    if onCancel then onCancel() end
                    modal:close()
                end
            }
        } or {}
    })
    
    -- Return control interface
    return {
        setProgress = function(value)
            progressBar:setValue(value)
        end,
        setStatus = function(text)
            statusLabel.text = text
        end,
        close = function()
            progressModal:close()
        end
    }
end

-- Usage examples
local function demonstrateModals()
    -- Simple alert
    modalManager.alert("Information", "This is an information message.", function()
        print("Alert acknowledged")
    end)
    
    -- Input prompt
    setTimeout(function()
        modalManager.prompt("Enter Name", "Please enter your name:", "User", function(name)
            print("Hello, " .. name .. "!")
        end)
    end, 2000)
    
    -- Progress dialog
    setTimeout(function()
        local progress = modalManager.showProgress("Processing Files", function()
            print("Operation cancelled")
        end)
        
        -- Simulate progress
        for i = 0, 100, 10 do
            setTimeout(function()
                progress.setStatus("Processing file " .. (i/10 + 1) .. " of 10...")
                progress.setProgress(i)
                
                if i == 100 then
                    progress.setStatus("Complete!")
                    setTimeout(function()
                        progress.close()
                    end, 1000)
                end
            end, i * 100)
        end
    end, 4000)
end`
        },
        notes: ['Modals should be used sparingly to avoid interrupting user workflow', 'Always provide clear ways to close or dismiss modals', 'Use appropriate animations to make modals feel natural', 'Consider accessibility when implementing modal dialogs']
    },
    
    window: {
        name: 'Window',
        category: 'Layout Widgets',
        description: 'A movable, resizable window container that can hold other widgets and provide standard window controls like minimize, maximize, and close.',
        syntax: 'window.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'title', type: 'string', description: 'Title displayed in the window title bar' },
            { name: 'x', type: 'number', description: 'X position of the window' },
            { name: 'y', type: 'number', description: 'Y position of the window' },
            { name: 'width', type: 'number', description: 'Width of the window' },
            { name: 'height', type: 'number', description: 'Height of the window' },
            { name: 'minimizable', type: 'boolean', description: 'Whether the window can be minimized' },
            { name: 'maximizable', type: 'boolean', description: 'Whether the window can be maximized' },
            { name: 'closable', type: 'boolean', description: 'Whether the window can be closed' },
            { name: 'resizable', type: 'boolean', description: 'Whether the window can be resized' },
            { name: 'draggable', type: 'boolean', description: 'Whether the window can be moved' },
            { name: 'minimized', type: 'boolean', description: 'Whether the window is minimized' },
            { name: 'maximized', type: 'boolean', description: 'Whether the window is maximized' },
            { name: 'active', type: 'boolean', description: 'Whether the window is active/focused' },
            { name: 'showTitleBar', type: 'boolean', description: 'Whether to show the title bar' },
            { name: 'showBorder', type: 'boolean', description: 'Whether to show window border' },
            { name: 'titleBarColor', type: 'color', description: 'Color of the title bar' },
            { name: 'titleColor', type: 'color', description: 'Color of the title text' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the window content' },
            { name: 'borderColor', type: 'color', description: 'Color of the window border' },
            { name: 'shadow', type: 'boolean', description: 'Whether to show window shadow' },
            { name: 'opacity', type: 'number', description: 'Window opacity (0-1)' }
        ],
        methods: [
            { name: 'show()', description: 'Shows the window' },
            { name: 'hide()', description: 'Hides the window' },
            { name: 'close()', description: 'Closes the window' },
            { name: 'minimize()', description: 'Minimizes the window' },
            { name: 'maximize()', description: 'Maximizes the window' },
            { name: 'restore()', description: 'Restores window to normal state' },
            { name: 'focus()', description: 'Brings window to front and focuses it' },
            { name: 'blur()', description: 'Removes focus from the window' },
            { name: 'setTitle(title)', params: 'string', description: 'Sets the window title' },
            { name: 'setPosition(x, y)', params: 'number, number', description: 'Sets window position' },
            { name: 'setSize(width, height)', params: 'number, number', description: 'Sets window size' },
            { name: 'center()', description: 'Centers the window on screen' },
            { name: 'bringToFront()', description: 'Brings window to front of other windows' },
            { name: 'sendToBack()', description: 'Sends window to back of other windows' },
            { name: 'isVisible()', returns: 'boolean', description: 'Returns whether window is visible' },
            { name: 'isMinimized()', returns: 'boolean', description: 'Returns whether window is minimized' },
            { name: 'isMaximized()', returns: 'boolean', description: 'Returns whether window is maximized' }
        ],
        events: [
            { name: 'onShow', params: 'window', description: 'Fired when window is shown' },
            { name: 'onHide', params: 'window', description: 'Fired when window is hidden' },
            { name: 'onClose', params: 'window', description: 'Fired when window is closed' },
            { name: 'onMinimize', params: 'window', description: 'Fired when window is minimized' },
            { name: 'onMaximize', params: 'window', description: 'Fired when window is maximized' },
            { name: 'onRestore', params: 'window', description: 'Fired when window is restored' },
            { name: 'onFocus', params: 'window', description: 'Fired when window gains focus' },
            { name: 'onBlur', params: 'window', description: 'Fired when window loses focus' },
            { name: 'onMove', params: 'window, x, y', description: 'Fired when window is moved' },
            { name: 'onResize', params: 'window, width, height', description: 'Fired when window is resized' }
        ],
        examples: {
            basic: `-- Simple application window
local mainWindow = window.new(screen, 10, 5, 60, 30, {
    title = "Text Editor",
    minimizable = true,
    maximizable = true,
    closable = true,
    resizable = true,
    draggable = true,
    backgroundColor = colors.white,
    titleBarColor = colors.blue,
    titleColor = colors.white,
    borderColor = colors.gray,
    shadow = true,
    onClose = function(win)
        -- Save work before closing
        if hasUnsavedChanges() then
            local result = showConfirmDialog("Save changes before closing?")
            if result == "yes" then
                saveDocument()
            elseif result == "cancel" then
                return false -- Prevent closing
            end
        end
        return true -- Allow closing
    end,
    onResize = function(win, width, height)
        -- Adjust content layout
        textArea:setSize(width - 4, height - 6)
        statusBar:setPosition(2, height - 2)
    end
})

-- Add content to window
local textArea = textBox.new(mainWindow, 2, 2, 56, 26, {
    multiline = true,
    wordWrap = true,
    scrollable = true
})

local statusBar = label.new(mainWindow, 2, 28, 56, 1, {
    text = "Ready",
    backgroundColor = colors.lightGray
})

mainWindow:show()`,
            advanced: `-- Advanced window manager system
local WindowManager = {
    windows = {},
    activeWindow = nil,
    zIndex = 100,
    taskbar = nil
}

function WindowManager.createWindow(config)
    local win = window.new(screen, config.x or 10, config.y or 10, 
                          config.width or 50, config.height or 30, {
        title = config.title or "Untitled",
        minimizable = config.minimizable ~= false,
        maximizable = config.maximizable ~= false,
        closable = config.closable ~= false,
        resizable = config.resizable ~= false,
        draggable = config.draggable ~= false,
        backgroundColor = config.backgroundColor or colors.white,
        titleBarColor = config.titleBarColor or colors.blue,
        titleColor = config.titleColor or colors.white,
        shadow = true,
        
        onFocus = function(window)
            WindowManager.setActiveWindow(window)
        end,
        
        onClose = function(window)
            WindowManager.removeWindow(window)
            return true
        end,
        
        onMinimize = function(window)
            WindowManager.addToTaskbar(window)
        end,
        
        onMove = function(window, x, y)
            -- Snap to edges
            local snapDistance = 10
            local screenW, screenH = screen.getSize()
            
            if math.abs(x) < snapDistance then x = 1 end
            if math.abs(y) < snapDistance then y = 1 end
            if math.abs(x + window.width - screenW) < snapDistance then
                x = screenW - window.width + 1
            end
            if math.abs(y + window.height - screenH) < snapDistance then
                y = screenH - window.height + 1
            end
            
            window:setPosition(x, y)
        end
    })
    
    -- Register window
    table.insert(WindowManager.windows, win)
    WindowManager.setActiveWindow(win)
    
    -- Add content based on type
    if config.content then
        config.content(win)
    end
    
    return win
end

function WindowManager.setActiveWindow(window)
    -- Deactivate current window
    if WindowManager.activeWindow then
        WindowManager.activeWindow.active = false
    end
    
    -- Activate new window
    WindowManager.activeWindow = window
    window.active = true
    window:bringToFront()
end

function WindowManager.removeWindow(window)
    for i, win in ipairs(WindowManager.windows) do
        if win == window then
            table.remove(WindowManager.windows, i)
            break
        end
    end
    
    -- Focus next window
    if #WindowManager.windows > 0 then
        WindowManager.setActiveWindow(WindowManager.windows[#WindowManager.windows])
    else
        WindowManager.activeWindow = nil
    end
end

function WindowManager.addToTaskbar(window)
    if not WindowManager.taskbar then
        WindowManager.createTaskbar()
    end
    
    local taskButton = button.new(WindowManager.taskbar, 
                                 #WindowManager.taskbar.children * 15 + 2, 1, 
                                 14, 1, {
        text = window.title,
        onClick = function()
            window:restore()
            WindowManager.setActiveWindow(window)
        end
    })
    
    window.taskButton = taskButton
end

function WindowManager.createTaskbar()
    local screenW, screenH = screen.getSize()
    WindowManager.taskbar = container.new(screen, 1, screenH, screenW, 1, {
        backgroundColor = colors.lightGray,
        borderColor = colors.gray
    })
end

-- Application windows
function WindowManager.createFileManager()
    return WindowManager.createWindow({
        title = "File Manager",
        width = 70,
        height = 35,
        content = function(win)
            -- File tree
            local fileTree = treeView.new(win, 2, 2, 25, 31, {
                items = getFileTree("/"),
                onSelect = function(node)
                    if node.type == "file" then
                        openFile(node.path)
                    end
                end
            })
            
            -- File list
            local fileList = listView.new(win, 29, 2, 39, 31, {
                columns = {"Name", "Size", "Modified"},
                onDoubleClick = function(item)
                    if item.type == "file" then
                        openFileInEditor(item.path)
                    end
                end
            })
            
            -- Status bar
            local statusBar = label.new(win, 2, 33, 66, 1, {
                text = "Ready",
                backgroundColor = colors.lightGray
            })
        end
    })
end

function WindowManager.createCalculator()
    return WindowManager.createWindow({
        title = "Calculator",
        width = 30,
        height = 20,
        resizable = false,
        content = function(win)
            local display = textBox.new(win, 2, 2, 26, 3, {
                text = "0",
                readonly = true,
                textAlign = "right",
                fontSize = 2
            })
            
            local buttons = {
                {"C", "±", "%", "÷"},
                {"7", "8", "9", "×"},
                {"4", "5", "6", "-"},
                {"1", "2", "3", "+"},
                {"0", ".", "="}
            }
            
            for row, buttonRow in ipairs(buttons) do
                for col, buttonText in ipairs(buttonRow) do
                    local btnWidth = (buttonText == "0") and 12 or 6
                    local btnX = 2 + (col - 1) * 6
                    if buttonText == "." then btnX = 14 end
                    if buttonText == "=" then btnX = 20 end
                    
                    button.new(win, btnX, 6 + (row - 1) * 2, btnWidth, 2, {
                        text = buttonText,
                        onClick = function()
                            handleCalculatorInput(buttonText, display)
                        end
                    })
                end
            end
        end
    })
end

function WindowManager.createNotepad()
    return WindowManager.createWindow({
        title = "Notepad",
        width = 60,
        height = 40,
        content = function(win)
            local menuBar = container.new(win, 1, 1, 58, 1, {
                backgroundColor = colors.lightGray
            })
            
            -- Menu items
            local fileMenu = button.new(menuBar, 1, 1, 8, 1, {
                text = "File",
                onClick = function()
                    showContextMenu({"New", "Open", "Save", "Exit"})
                end
            })
            
            local editMenu = button.new(menuBar, 9, 1, 8, 1, {
                text = "Edit",
                onClick = function()
                    showContextMenu({"Cut", "Copy", "Paste", "Find"})
                end
            })
            
            -- Text area
            local textArea = textBox.new(win, 2, 3, 56, 35, {
                multiline = true,
                wordWrap = true,
                scrollable = true,
                placeholder = "Start typing..."
            })
            
            -- Status bar
            local statusBar = label.new(win, 2, 39, 56, 1, {
                text = "Line 1, Column 1",
                backgroundColor = colors.lightGray
            })
        end
    })
end

-- Initialize window manager
function initializeDesktop()
    -- Create taskbar
    WindowManager.createTaskbar()
    
    -- Create desktop icons
    local desktopIcons = {
        {name = "File Manager", icon = "📁", app = WindowManager.createFileManager},
        {name = "Calculator", icon = "🧮", app = WindowManager.createCalculator},
        {name = "Notepad", icon = "📝", app = WindowManager.createNotepad}
    }
    
    for i, icon in ipairs(desktopIcons) do
        button.new(screen, 5, 5 + (i-1) * 8, 12, 6, {
            text = icon.icon .. "\\n" .. icon.name,
            backgroundColor = colors.transparent,
            onDoubleClick = function()
                icon.app()
            end
        })
    end
end

-- Start the desktop
initializeDesktop()`
        },
        notes: ['Windows should have consistent behavior across the application', 'Implement proper z-index management for overlapping windows', 'Consider window snapping and docking features for better UX', 'Save and restore window positions between sessions']
    },
    
    spacer: {
        name: 'Spacer',
        category: 'Layout Widgets',
        description: 'A flexible spacing widget used to create consistent gaps between elements or push elements apart in layouts.',
        syntax: 'spacer.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X position of the spacer' },
            { name: 'y', type: 'number', description: 'Y position of the spacer' },
            { name: 'width', type: 'number', description: 'Width of the spacer' },
            { name: 'height', type: 'number', description: 'Height of the spacer' },
            { name: 'flexible', type: 'boolean', description: 'Whether the spacer should expand to fill available space' },
            { name: 'minWidth', type: 'number', description: 'Minimum width when flexible' },
            { name: 'minHeight', type: 'number', description: 'Minimum height when flexible' },
            { name: 'maxWidth', type: 'number', description: 'Maximum width when flexible' },
            { name: 'maxHeight', type: 'number', description: 'Maximum height when flexible' },
            { name: 'priority', type: 'number', description: 'Layout priority when multiple flexible spacers exist' },
            { name: 'backgroundColor', type: 'color', description: 'Background color (usually transparent)' },
            { name: 'visible', type: 'boolean', description: 'Whether the spacer is visible for debugging' },
            { name: 'expandHorizontal', type: 'boolean', description: 'Whether to expand horizontally' },
            { name: 'expandVertical', type: 'boolean', description: 'Whether to expand vertically' }
        ],
        methods: [
            { name: 'setSize(width, height)', params: 'number, number', description: 'Sets the spacer size' },
            { name: 'setFlexible(flexible)', params: 'boolean', description: 'Sets whether spacer is flexible' },
            { name: 'setConstraints(minW, minH, maxW, maxH)', params: 'number, number, number, number', description: 'Sets size constraints' },
            { name: 'setPriority(priority)', params: 'number', description: 'Sets layout priority' },
            { name: 'expand()', description: 'Makes the spacer expand to fill available space' },
            { name: 'contract()', description: 'Makes the spacer use minimum size' },
            { name: 'getComputedSize()', returns: 'number, number', description: 'Returns actual computed width and height' }
        ],
        events: [
            { name: 'onResize', params: 'spacer, width, height', description: 'Fired when spacer is resized by layout' }
        ],
        examples: {
            basic: `-- Simple spacing between buttons
local toolbar = container.new(screen, 10, 5, 60, 5, {
    layout = "horizontal",
    backgroundColor = colors.lightGray
})

-- Left buttons
local newBtn = button.new(toolbar, 2, 2, 8, 1, {
    text = "New",
    onClick = function() createNewFile() end
})

local openBtn = button.new(toolbar, 12, 2, 8, 1, {
    text = "Open",
    onClick = function() openFile() end
})

-- Flexible spacer to push right buttons to the end
local flexSpacer = spacer.new(toolbar, 22, 2, 10, 1, {
    flexible = true,
    expandHorizontal = true,
    backgroundColor = colors.transparent
})

-- Right buttons
local settingsBtn = button.new(toolbar, 45, 2, 10, 1, {
    text = "Settings",
    onClick = function() showSettings() end
})

local exitBtn = button.new(toolbar, 56, 2, 6, 1, {
    text = "Exit",
    onClick = function() exitApp() end
})

-- The spacer will automatically expand to push the right buttons
-- to the far right of the toolbar`,
            advanced: `-- Advanced layout system with multiple spacers
local LayoutManager = {
    containers = {},
    spacers = {}
}

function LayoutManager.createResponsiveForm(parent, x, y, width, height)
    local form = container.new(parent, x, y, width, height, {
        layout = "vertical",
        padding = 2,
        backgroundColor = colors.white,
        borderColor = colors.gray
    })
    
    -- Form header
    local header = container.new(form, 0, 0, width, 5, {
        layout = "horizontal",
        backgroundColor = colors.blue
    })
    
    local titleLabel = label.new(header, 2, 2, 20, 1, {
        text = "User Registration",
        textColor = colors.white,
        backgroundColor = colors.transparent
    })
    
    -- Spacer to center the title
    local headerSpacer = spacer.new(header, 22, 2, 10, 1, {
        flexible = true,
        expandHorizontal = true
    })
    
    local helpBtn = button.new(header, width - 8, 2, 6, 1, {
        text = "Help",
        backgroundColor = colors.lightBlue
    })
    
    -- Spacer between header and form content
    local topSpacer = spacer.new(form, 0, 5, width, 2, {
        backgroundColor = colors.transparent
    })
    
    -- Form fields with consistent spacing
    local fieldSpacing = 4
    local currentY = 7
    
    local fields = {
        {label = "First Name:", id = "firstName"},
        {label = "Last Name:", id = "lastName"},
        {label = "Email:", id = "email"},
        {label = "Password:", id = "password", type = "password"},
        {label = "Confirm Password:", id = "confirmPassword", type = "password"}
    }
    
    local fieldWidgets = {}
    
    for i, field in ipairs(fields) do
        -- Field container
        local fieldContainer = container.new(form, 2, currentY, width - 4, 3, {
            layout = "horizontal",
            backgroundColor = colors.transparent
        })
        
        -- Label
        local fieldLabel = label.new(fieldContainer, 0, 1, 15, 1, {
            text = field.label,
            textColor = colors.black,
            textAlign = "right"
        })
        
        -- Small spacer between label and input
        local labelSpacer = spacer.new(fieldContainer, 15, 1, 2, 1, {
            backgroundColor = colors.transparent
        })
        
        -- Input field
        local inputWidget
        if field.type == "password" then
            inputWidget = passwordBox.new(fieldContainer, 17, 1, 25, 1, {
                placeholder = "Enter " .. field.label:lower():gsub(":", ""),
                backgroundColor = colors.white,
                borderColor = colors.gray
            })
        else
            inputWidget = textBox.new(fieldContainer, 17, 1, 25, 1, {
                placeholder = "Enter " .. field.label:lower():gsub(":", ""),
                backgroundColor = colors.white,
                borderColor = colors.gray
            })
        end
        
        fieldWidgets[field.id] = inputWidget
        
        -- Flexible spacer to fill remaining space
        local fieldSpacer = spacer.new(fieldContainer, 42, 1, 5, 1, {
            flexible = true,
            expandHorizontal = true,
            backgroundColor = colors.transparent
        })
        
        currentY = currentY + fieldSpacing
    end
    
    -- Large spacer before buttons to push them to bottom
    local buttonSpacer = spacer.new(form, 2, currentY, width - 4, 5, {
        flexible = true,
        expandVertical = true,
        priority = 1,
        backgroundColor = colors.transparent
    })
    
    -- Button container
    local buttonContainer = container.new(form, 2, height - 5, width - 4, 3, {
        layout = "horizontal",
        backgroundColor = colors.transparent
    })
    
    -- Left button spacer
    local leftBtnSpacer = spacer.new(buttonContainer, 0, 1, 10, 1, {
        flexible = true,
        expandHorizontal = true,
        priority = 2
    })
    
    -- Buttons
    local cancelBtn = button.new(buttonContainer, 15, 1, 10, 1, {
        text = "Cancel",
        backgroundColor = colors.lightGray,
        onClick = function()
            form:close()
        end
    })
    
    -- Small spacer between buttons
    local buttonSpacing = spacer.new(buttonContainer, 25, 1, 2, 1, {
        backgroundColor = colors.transparent
    })
    
    local submitBtn = button.new(buttonContainer, 27, 1, 10, 1, {
        text = "Submit",
        backgroundColor = colors.green,
        onClick = function()
            validateAndSubmitForm(fieldWidgets)
        end
    })
    
    -- Right button spacer
    local rightBtnSpacer = spacer.new(buttonContainer, 37, 1, 10, 1, {
        flexible = true,
        expandHorizontal = true,
        priority = 2
    })
    
    return form, fieldWidgets
end

-- Grid layout with spacers
function LayoutManager.createGridLayout(parent, x, y, width, height, cols, rows)
    local grid = container.new(parent, x, y, width, height, {
        backgroundColor = colors.white,
        borderColor = colors.gray
    })
    
    local cellWidth = math.floor(width / cols)
    local cellHeight = math.floor(height / rows)
    local remainingWidth = width % cols
    local remainingHeight = height % rows
    
    local cells = {}
    
    for row = 1, rows do
        cells[row] = {}
        for col = 1, cols do
            local cellX = (col - 1) * cellWidth
            local cellY = (row - 1) * cellHeight
            
            -- Create cell container
            local cell = container.new(grid, cellX, cellY, cellWidth, cellHeight, {
                backgroundColor = colors.lightGray,
                borderColor = colors.gray,
                padding = 1
            })
            
            cells[row][col] = cell
            
            -- Add flexible spacer to fill extra space
            if col == cols and remainingWidth > 0 then
                local hSpacer = spacer.new(grid, cellX + cellWidth, cellY, 
                                         remainingWidth, cellHeight, {
                    flexible = true,
                    expandHorizontal = true,
                    backgroundColor = colors.transparent
                })
            end
            
            if row == rows and remainingHeight > 0 then
                local vSpacer = spacer.new(grid, cellX, cellY + cellHeight, 
                                         cellWidth, remainingHeight, {
                    flexible = true,
                    expandVertical = true,
                    backgroundColor = colors.transparent
                })
            end
        end
    end
    
    return grid, cells
end

-- Responsive sidebar layout
function LayoutManager.createSidebarLayout(parent, x, y, width, height)
    local mainContainer = container.new(parent, x, y, width, height, {
        layout = "horizontal",
        backgroundColor = colors.white
    })
    
    -- Sidebar
    local sidebar = container.new(mainContainer, 0, 0, 20, height, {
        backgroundColor = colors.lightGray,
        borderColor = colors.gray
    })
    
    -- Resizable spacer between sidebar and content
    local dividerSpacer = spacer.new(mainContainer, 20, 0, 2, height, {
        backgroundColor = colors.gray,
        resizable = true,
        minWidth = 1,
        maxWidth = 5,
        onResize = function(spacer, newWidth, newHeight)
            -- Adjust sidebar and content area
            local newSidebarWidth = 20 + (newWidth - 2)
            sidebar:setSize(newSidebarWidth, height)
            
            -- Update content area position
            local contentX = newSidebarWidth + newWidth
            local contentWidth = width - contentX
            contentArea:setPosition(contentX, 0)
            contentArea:setSize(contentWidth, height)
        end
    })
    
    -- Main content area
    local contentArea = container.new(mainContainer, 22, 0, width - 22, height, {
        backgroundColor = colors.white,
        borderColor = colors.gray
    })
    
    return mainContainer, sidebar, contentArea
end

-- Usage example
local function demonstrateSpacers()
    -- Create responsive form
    local form, fields = LayoutManager.createResponsiveForm(screen, 10, 5, 60, 30)
    
    -- Create grid layout
    setTimeout(function()
        local grid, cells = LayoutManager.createGridLayout(screen, 80, 5, 40, 20, 3, 2)
        
        -- Add content to grid cells
        for row = 1, 2 do
            for col = 1, 3 do
                button.new(cells[row][col], 1, 1, 
                          cells[row][col].width - 2, 
                          cells[row][col].height - 2, {
                    text = "Cell " .. row .. "," .. col,
                    onClick = function()
                        print("Clicked cell " .. row .. "," .. col)
                    end
                })
            end
        end
    end, 1000)
    
    -- Create sidebar layout
    setTimeout(function()
        local layout, sidebar, content = LayoutManager.createSidebarLayout(screen, 10, 40, 80, 25)
        
        -- Add sidebar content
        label.new(sidebar, 2, 2, 16, 1, {
            text = "Navigation",
            textColor = colors.black
        })
        
        -- Add main content
        label.new(content, 2, 2, 30, 1, {
            text = "Main Content Area",
            textColor = colors.black
        })
    end, 2000)
end`
        },
        notes: ['Spacers are essential for responsive layouts', 'Use flexible spacers to create adaptive interfaces', 'Combine multiple spacers with different priorities for complex layouts', 'Invisible spacers help maintain consistent spacing']
    },
    
    grid: {
        name: 'Grid',
        category: 'Layout Widgets',
        description: 'A powerful grid layout container that arranges child widgets in rows and columns with automatic sizing and alignment.',
        syntax: 'grid.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X position of the grid' },
            { name: 'y', type: 'number', description: 'Y position of the grid' },
            { name: 'width', type: 'number', description: 'Width of the grid' },
            { name: 'height', type: 'number', description: 'Height of the grid' },
            { name: 'columns', type: 'number', description: 'Number of columns in the grid' },
            { name: 'rows', type: 'number', description: 'Number of rows in the grid (auto if not set)' },
            { name: 'columnWidths', type: 'table', description: 'Array of column widths (numbers or "auto", "*")' },
            { name: 'rowHeights', type: 'table', description: 'Array of row heights (numbers or "auto", "*")' },
            { name: 'gap', type: 'number', description: 'Gap between grid cells' },
            { name: 'columnGap', type: 'number', description: 'Horizontal gap between columns' },
            { name: 'rowGap', type: 'number', description: 'Vertical gap between rows' },
            { name: 'padding', type: 'number', description: 'Padding inside the grid' },
            { name: 'autoFlow', type: 'string', description: 'Auto-placement direction: "row", "column"' },
            { name: 'alignItems', type: 'string', description: 'Align items: "start", "center", "end", "stretch"' },
            { name: 'justifyItems', type: 'string', description: 'Justify items: "start", "center", "end", "stretch"' },
            { name: 'alignContent', type: 'string', description: 'Align content: "start", "center", "end", "stretch"' },
            { name: 'justifyContent', type: 'string', description: 'Justify content: "start", "center", "end", "stretch"' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the grid' },
            { name: 'borderColor', type: 'color', description: 'Border color of the grid' },
            { name: 'showGridLines', type: 'boolean', description: 'Whether to show grid lines for debugging' },
            { name: 'gridLineColor', type: 'color', description: 'Color of the grid lines' }
        ],
        methods: [
            { name: 'addItem(widget, column, row, columnSpan, rowSpan)', params: 'widget, number, number, number, number', description: 'Adds widget to specific grid position' },
            { name: 'removeItem(widget)', params: 'widget', description: 'Removes widget from grid' },
            { name: 'setColumnWidth(column, width)', params: 'number, number|string', description: 'Sets width of specific column' },
            { name: 'setRowHeight(row, height)', params: 'number, number|string', description: 'Sets height of specific row' },
            { name: 'setGap(gap)', params: 'number', description: 'Sets gap between all cells' },
            { name: 'setColumnGap(gap)', params: 'number', description: 'Sets horizontal gap' },
            { name: 'setRowGap(gap)', params: 'number', description: 'Sets vertical gap' },
            { name: 'getItemPosition(widget)', params: 'widget', returns: 'number, number, number, number', description: 'Gets widget position (col, row, colSpan, rowSpan)' },
            { name: 'moveItem(widget, column, row)', params: 'widget, number, number', description: 'Moves widget to new position' },
            { name: 'resizeItem(widget, columnSpan, rowSpan)', params: 'widget, number, number', description: 'Changes widget span' },
            { name: 'autoSize()', description: 'Automatically sizes columns and rows to fit content' },
            { name: 'refresh()', description: 'Recalculates layout' },
            { name: 'getAvailableSpace()', returns: 'number, number', description: 'Returns available width and height' },
            { name: 'findEmptyCell()', returns: 'number, number', description: 'Finds next empty cell position' }
        ],
        events: [
            { name: 'onItemAdded', params: 'grid, widget, column, row', description: 'Fired when item is added to grid' },
            { name: 'onItemRemoved', params: 'grid, widget', description: 'Fired when item is removed from grid' },
            { name: 'onItemMoved', params: 'grid, widget, oldCol, oldRow, newCol, newRow', description: 'Fired when item is moved' },
            { name: 'onResize', params: 'grid, width, height', description: 'Fired when grid is resized' },
            { name: 'onLayoutChanged', params: 'grid', description: 'Fired when layout is recalculated' }
        ],
        examples: {
            basic: `-- Simple grid layout for a form
local formGrid = grid.new(screen, 10, 5, 50, 30, {
    columns = 3,
    rows = 5,
    gap = 2,
    padding = 2,
    backgroundColor = colors.white,
    borderColor = colors.gray,
    alignItems = "center"
})

-- Add form elements
local nameLabel = label.new(formGrid, {
    text = "Name:",
    textAlign = "right"
})
formGrid:addItem(nameLabel, 1, 1, 1, 1)

local nameInput = textBox.new(formGrid, {
    placeholder = "Enter your name"
})
formGrid:addItem(nameInput, 2, 1, 2, 1) -- Spans 2 columns

local emailLabel = label.new(formGrid, {
    text = "Email:",
    textAlign = "right"
})
formGrid:addItem(emailLabel, 1, 2, 1, 1)

local emailInput = textBox.new(formGrid, {
    placeholder = "Enter your email"
})
formGrid:addItem(emailInput, 2, 2, 2, 1)

local phoneLabel = label.new(formGrid, {
    text = "Phone:",
    textAlign = "right"
})
formGrid:addItem(phoneLabel, 1, 3, 1, 1)

local phoneInput = textBox.new(formGrid, {
    placeholder = "Enter your phone"
})
formGrid:addItem(phoneInput, 2, 3, 2, 1)

-- Buttons spanning multiple columns
local submitBtn = button.new(formGrid, {
    text = "Submit",
    backgroundColor = colors.green,
    onClick = function()
        submitForm({
            name = nameInput:getText(),
            email = emailInput:getText(),
            phone = phoneInput:getText()
        })
    end
})
formGrid:addItem(submitBtn, 1, 5, 1, 1)

local cancelBtn = button.new(formGrid, {
    text = "Cancel",
    backgroundColor = colors.red,
    onClick = function()
        clearForm()
    end
})
formGrid:addItem(cancelBtn, 3, 5, 1, 1)`,
            advanced: `-- Advanced responsive dashboard grid
local DashboardGrid = {
    grid = nil,
    widgets = {},
    layouts = {}
}

function DashboardGrid.create(parent, x, y, width, height)
    DashboardGrid.grid = grid.new(parent, x, y, width, height, {
        columns = 12, -- 12-column grid system
        rows = 0, -- Auto rows
        columnWidths = {"*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"}, -- Equal columns
        gap = 2,
        padding = 2,
        backgroundColor = colors.black,
        autoFlow = "row",
        alignItems = "stretch",
        justifyItems = "stretch",
        
        onResize = function(grid, newWidth, newHeight)
            DashboardGrid.handleResize(newWidth, newHeight)
        end
    })
    
    return DashboardGrid.grid
end

function DashboardGrid.addWidget(widgetConfig)
    local widget = DashboardGrid.createWidget(widgetConfig)
    
    -- Store widget configuration
    DashboardGrid.widgets[widget] = {
        config = widgetConfig,
        layouts = {
            desktop = {col = widgetConfig.col or 1, row = widgetConfig.row or 1, 
                      colSpan = widgetConfig.colSpan or 3, rowSpan = widgetConfig.rowSpan or 2},
            tablet = {col = widgetConfig.tabletCol or 1, row = widgetConfig.tabletRow or 1,
                     colSpan = widgetConfig.tabletColSpan or 6, rowSpan = widgetConfig.tabletRowSpan or 2},
            mobile = {col = 1, row = widgetConfig.mobileRow or 1,
                     colSpan = 12, rowSpan = widgetConfig.mobileRowSpan or 3}
        }
    }
    
    -- Add to grid with current layout
    local layout = DashboardGrid.getCurrentLayout()
    local pos = DashboardGrid.widgets[widget].layouts[layout]
    DashboardGrid.grid:addItem(widget, pos.col, pos.row, pos.colSpan, pos.rowSpan)
    
    return widget
end

function DashboardGrid.createWidget(config)
    local widget
    
    if config.type == "chart" then
        widget = DashboardGrid.createChartWidget(config)
    elseif config.type == "stats" then
        widget = DashboardGrid.createStatsWidget(config)
    elseif config.type == "list" then
        widget = DashboardGrid.createListWidget(config)
    elseif config.type == "control" then
        widget = DashboardGrid.createControlWidget(config)
    end
    
    return widget
end

function DashboardGrid.createChartWidget(config)
    local container = container.new(nil, 0, 0, 1, 1, {
        backgroundColor = colors.white,
        borderColor = colors.gray,
        padding = 1
    })
    
    -- Title
    local title = label.new(container, 1, 1, 20, 1, {
        text = config.title or "Chart",
        textColor = colors.black,
        backgroundColor = colors.lightGray,
        textAlign = "center"
    })
    
    -- Chart area
    local chart = chart.new(container, 1, 3, 18, 8, {
        type = config.chartType or "line",
        data = config.data or {},
        backgroundColor = colors.white,
        gridColor = colors.lightGray,
        onDataUpdate = function(chart, newData)
            print("Chart data updated: " .. config.title)
        end
    })
    
    container.chart = chart
    container.title = title
    
    return container
end

function DashboardGrid.createStatsWidget(config)
    local container = container.new(nil, 0, 0, 1, 1, {
        backgroundColor = config.backgroundColor or colors.blue,
        borderColor = colors.gray,
        padding = 1
    })
    
    -- Value
    local valueLabel = label.new(container, 1, 2, 10, 2, {
        text = config.value or "0",
        textColor = colors.white,
        backgroundColor = colors.transparent,
        textAlign = "center",
        fontSize = 2
    })
    
    -- Label
    local titleLabel = label.new(container, 1, 5, 10, 1, {
        text = config.title or "Stat",
        textColor = colors.white,
        backgroundColor = colors.transparent,
        textAlign = "center"
    })
    
    -- Trend indicator
    local trendLabel = label.new(container, 1, 6, 10, 1, {
        text = config.trend or "",
        textColor = colors.lightGray,
        backgroundColor = colors.transparent,
        textAlign = "center"
    })
    
    container.valueLabel = valueLabel
    container.titleLabel = titleLabel
    container.trendLabel = trendLabel
    
    return container
end

function DashboardGrid.createListWidget(config)
    local container = container.new(nil, 0, 0, 1, 1, {
        backgroundColor = colors.white,
        borderColor = colors.gray,
        padding = 1
    })
    
    -- Title
    local title = label.new(container, 1, 1, 20, 1, {
        text = config.title or "List",
        textColor = colors.black,
        backgroundColor = colors.lightGray,
        textAlign = "center"
    })
    
    -- List view
    local list = listView.new(container, 1, 3, 18, 8, {
        items = config.items or {},
        backgroundColor = colors.white,
        onItemClick = function(list, item, index)
            if config.onItemClick then
                config.onItemClick(item, index)
            end
        end
    })
    
    container.list = list
    container.title = title
    
    return container
end

function DashboardGrid.createControlWidget(config)
    local container = container.new(nil, 0, 0, 1, 1, {
        backgroundColor = colors.white,
        borderColor = colors.gray,
        padding = 1
    })
    
    -- Title
    local title = label.new(container, 1, 1, 20, 1, {
        text = config.title or "Controls",
        textColor = colors.black,
        backgroundColor = colors.lightGray,
        textAlign = "center"
    })
    
    -- Control buttons grid
    local controlGrid = grid.new(container, 1, 3, 18, 8, {
        columns = 2,
        gap = 1,
        backgroundColor = colors.transparent
    })
    
    if config.controls then
        for i, control in ipairs(config.controls) do
            local btn = button.new(controlGrid, {
                text = control.text,
                backgroundColor = control.color or colors.blue,
                onClick = control.action
            })
            
            local col = ((i - 1) % 2) + 1
            local row = math.ceil(i / 2)
            controlGrid:addItem(btn, col, row, 1, 1)
        end
    end
    
    container.controlGrid = controlGrid
    container.title = title
    
    return container
end

function DashboardGrid.getCurrentLayout()
    local width = DashboardGrid.grid.width
    if width < 40 then
        return "mobile"
    elseif width < 80 then
        return "tablet"
    else
        return "desktop"
    end
end

function DashboardGrid.handleResize(width, height)
    local newLayout = DashboardGrid.getCurrentLayout()
    
    -- Rearrange widgets for new layout
    for widget, data in pairs(DashboardGrid.widgets) do
        local pos = data.layouts[newLayout]
        DashboardGrid.grid:moveItem(widget, pos.col, pos.row)
        DashboardGrid.grid:resizeItem(widget, pos.colSpan, pos.rowSpan)
    end
    
    DashboardGrid.grid:refresh()
end

-- Create dashboard
function createDashboard()
    local dashboard = DashboardGrid.create(screen, 5, 5, 120, 50)
    
    -- Add dashboard widgets
    DashboardGrid.addWidget({
        type = "stats",
        title = "Users Online",
        value = "1,234",
        trend = "+5.2%",
        backgroundColor = colors.blue,
        col = 1, row = 1, colSpan = 3, rowSpan = 2,
        tabletColSpan = 4, mobileRowSpan = 2
    })
    
    DashboardGrid.addWidget({
        type = "stats",
        title = "Revenue",
        value = "$45.6K",
        trend = "+12.8%",
        backgroundColor = colors.green,
        col = 4, row = 1, colSpan = 3, rowSpan = 2,
        tabletColSpan = 4, mobileRowSpan = 2
    })
    
    DashboardGrid.addWidget({
        type = "chart",
        title = "Traffic Chart",
        chartType = "line",
        data = generateChartData(),
        col = 7, row = 1, colSpan = 6, rowSpan = 4,
        tabletCol = 1, tabletRow = 2, tabletColSpan = 8, tabletRowSpan = 4,
        mobileRowSpan = 5
    })
    
    DashboardGrid.addWidget({
        type = "list",
        title = "Recent Activities",
        items = getRecentActivities(),
        col = 1, row = 3, colSpan = 6, rowSpan = 4,
        tabletCol = 9, tabletRow = 2, tabletColSpan = 4, tabletRowSpan = 4,
        mobileRowSpan = 6
    })
    
    DashboardGrid.addWidget({
        type = "control",
        title = "Quick Actions",
        controls = {
            {text = "Backup", color = colors.orange, action = function() startBackup() end},
            {text = "Deploy", color = colors.red, action = function() deployApp() end},
            {text = "Monitor", color = colors.purple, action = function() openMonitor() end},
            {text = "Settings", color = colors.gray, action = function() openSettings() end}
        },
        col = 7, row = 5, colSpan = 6, rowSpan = 3,
        tabletCol = 1, tabletRow = 6, tabletColSpan = 12, tabletRowSpan = 2,
        mobileRowSpan = 4
    })
    
    return dashboard
end

-- Demonstrate responsive behavior
function demonstrateResponsiveGrid()
    local dashboard = createDashboard()
    
    -- Simulate different screen sizes
    local sizes = {
        {width = 120, height = 50, name = "Desktop"},
        {width = 70, height = 40, name = "Tablet"},
        {width = 35, height = 60, name = "Mobile"}
    }
    
    for i, size in ipairs(sizes) do
        setTimeout(function()
            print("Switching to " .. size.name .. " layout")
            dashboard:setSize(size.width, size.height)
        end, i * 3000)
    end
end`
        },
        notes: ['Grid layouts provide powerful responsive design capabilities', 'Use star (*) widths for flexible columns that adapt to content', 'Consider mobile-first design when defining grid breakpoints', 'Test grid layouts with different content sizes and screen resolutions']
    },
    
    breadcrumb: {
        name: 'Breadcrumb',
        category: 'Navigation Widgets',
        description: 'A navigation widget that shows the current location within a hierarchical structure, allowing users to navigate back to previous levels.',
        syntax: 'breadcrumb.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X position of the breadcrumb' },
            { name: 'y', type: 'number', description: 'Y position of the breadcrumb' },
            { name: 'width', type: 'number', description: 'Width of the breadcrumb' },
            { name: 'height', type: 'number', description: 'Height of the breadcrumb' },
            { name: 'items', type: 'table', description: 'Array of breadcrumb items with text and optional data' },
            { name: 'separator', type: 'string', description: 'Separator between breadcrumb items (default: " > ")' },
            { name: 'maxItems', type: 'number', description: 'Maximum number of items to show before truncation' },
            { name: 'truncateMode', type: 'string', description: 'How to truncate: "start", "middle", "end"' },
            { name: 'ellipsisText', type: 'string', description: 'Text to show for truncated items (default: "...")' },
            { name: 'clickable', type: 'boolean', description: 'Whether breadcrumb items are clickable' },
            { name: 'showHome', type: 'boolean', description: 'Whether to show a home icon/button' },
            { name: 'homeText', type: 'string', description: 'Text for the home button (default: "Home")' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the breadcrumb' },
            { name: 'textColor', type: 'color', description: 'Color of breadcrumb text' },
            { name: 'linkColor', type: 'color', description: 'Color of clickable breadcrumb links' },
            { name: 'separatorColor', type: 'color', description: 'Color of the separator' },
            { name: 'currentColor', type: 'color', description: 'Color of the current (last) item' },
            { name: 'hoverColor', type: 'color', description: 'Color when hovering over clickable items' },
            { name: 'fontSize', type: 'number', description: 'Font size of the breadcrumb text' },
            { name: 'padding', type: 'number', description: 'Padding inside the breadcrumb' }
        ],
        methods: [
            { name: 'addItem(text, data)', params: 'string, any', description: 'Adds a new item to the end of the breadcrumb' },
            { name: 'removeItem(index)', params: 'number', description: 'Removes item at specified index' },
            { name: 'removeLastItem()', description: 'Removes the last item from the breadcrumb' },
            { name: 'setItems(items)', params: 'table', description: 'Sets the entire breadcrumb path' },
            { name: 'getItems()', returns: 'table', description: 'Returns array of all breadcrumb items' },
            { name: 'getCurrentItem()', returns: 'table', description: 'Returns the current (last) item' },
            { name: 'navigateToItem(index)', params: 'number', description: 'Navigates to item at specified index' },
            { name: 'navigateToHome()', description: 'Navigates to the home/root level' },
            { name: 'clear()', description: 'Clears all breadcrumb items' },
            { name: 'setSeparator(separator)', params: 'string', description: 'Sets the separator between items' },
            { name: 'setMaxItems(maxItems)', params: 'number', description: 'Sets maximum visible items' },
            { name: 'refresh()', description: 'Refreshes the breadcrumb display' }
        ],
        events: [
            { name: 'onItemClick', params: 'breadcrumb, item, index', description: 'Fired when a breadcrumb item is clicked' },
            { name: 'onNavigate', params: 'breadcrumb, fromIndex, toIndex', description: 'Fired when navigation occurs' },
            { name: 'onItemAdded', params: 'breadcrumb, item, index', description: 'Fired when an item is added' },
            { name: 'onItemRemoved', params: 'breadcrumb, item, index', description: 'Fired when an item is removed' },
            { name: 'onHomeClick', params: 'breadcrumb', description: 'Fired when home button is clicked' }
        ],
        examples: {
            basic: `-- Simple file system breadcrumb
local fileBreadcrumb = breadcrumb.new(screen, 5, 3, 70, 3, {
    separator = " / ",
    clickable = true,
    showHome = true,
    homeText = "🏠",
    backgroundColor = colors.lightGray,
    textColor = colors.black,
    linkColor = colors.blue,
    currentColor = colors.darkGray,
    
    onItemClick = function(breadcrumb, item, index)
        navigateToPath(item.path)
    end,
    
    onHomeClick = function(breadcrumb)
        navigateToPath("/")
    end
})

-- Function to update breadcrumb based on current path
function updateBreadcrumb(currentPath)
    local pathParts = {}
    local path = ""
    
    -- Split path and build breadcrumb items
    for part in currentPath:gmatch("[^/]+") do
        path = path .. "/" .. part
        table.insert(pathParts, {
            text = part,
            path = path
        })
    end
    
    fileBreadcrumb:setItems(pathParts)
end

-- Navigation functions
function navigateToPath(path)
    print("Navigating to: " .. path)
    updateBreadcrumb(path)
    loadDirectoryContents(path)
end

-- Example usage
updateBreadcrumb("/home/user/documents/projects")`,
            advanced: `-- Advanced breadcrumb system with different contexts
local BreadcrumbManager = {
    breadcrumbs = {},
    contexts = {}
}

function BreadcrumbManager.create(parent, x, y, width, height, context)
    local breadcrumb = breadcrumb.new(parent, x, y, width, height, {
        separator = " › ",
        maxItems = 5,
        truncateMode = "middle",
        clickable = true,
        showHome = true,
        homeText = "🏠 Root",
        backgroundColor = colors.white,
        textColor = colors.black,
        linkColor = colors.blue,
        separatorColor = colors.gray,
        currentColor = colors.black,
        hoverColor = colors.lightBlue,
        padding = 1,
        
        onItemClick = function(breadcrumb, item, index)
            BreadcrumbManager.handleNavigation(context, item, index)
        end,
        
        onHomeClick = function(breadcrumb)
            BreadcrumbManager.navigateToHome(context)
        end
    })
    
    BreadcrumbManager.breadcrumbs[context] = breadcrumb
    BreadcrumbManager.contexts[context] = {
        history = {},
        currentIndex = 0
    }
    
    return breadcrumb
end

-- File system breadcrumb
function BreadcrumbManager.createFileSystemBreadcrumb(parent, x, y, width, height)
    local breadcrumb = BreadcrumbManager.create(parent, x, y, width, height, "filesystem")
    
    breadcrumb.onItemClick = function(breadcrumb, item, index)
        -- Navigate to directory
        if item.type == "directory" then
            changeDirectory(item.path)
            BreadcrumbManager.updateFileSystemPath(item.path)
        end
    end
    
    return breadcrumb
end

-- Application navigation breadcrumb
function BreadcrumbManager.createAppBreadcrumb(parent, x, y, width, height)
    local breadcrumb = BreadcrumbManager.create(parent, x, y, width, height, "application")
    
    breadcrumb.separator = " → "
    breadcrumb.showHome = true
    breadcrumb.homeText = "📱 Dashboard"
    
    breadcrumb.onItemClick = function(breadcrumb, item, index)
        -- Navigate to application screen
        if item.screen then
            navigateToScreen(item.screen)
            -- Truncate breadcrumb to clicked item
            local newItems = {}
            for i = 1, index do
                table.insert(newItems, breadcrumb:getItems()[i])
            end
            breadcrumb:setItems(newItems)
        end
    end
    
    return breadcrumb
end

-- Website navigation breadcrumb
function BreadcrumbManager.createWebBreadcrumb(parent, x, y, width, height)
    local breadcrumb = BreadcrumbManager.create(parent, x, y, width, height, "website")
    
    breadcrumb.separator = " / "
    breadcrumb.maxItems = 4
    breadcrumb.showHome = true
    breadcrumb.homeText = "🌐 Home"
    
    breadcrumb.onItemClick = function(breadcrumb, item, index)
        -- Navigate to page
        if item.url then
            navigateToPage(item.url)
            updateWebBreadcrumb(item.url)
        end
    end
    
    return breadcrumb
end

function BreadcrumbManager.updateFileSystemPath(path)
    local breadcrumb = BreadcrumbManager.breadcrumbs["filesystem"]
    if not breadcrumb then return end
    
    local items = {}
    local currentPath = ""
    
    -- Handle root
    if path == "/" then
        breadcrumb:clear()
        return
    end
    
    -- Build path segments
    for segment in path:gmatch("[^/]+") do
        currentPath = currentPath .. "/" .. segment
        
        local item = {
            text = segment,
            path = currentPath,
            type = "directory"
        }
        
        -- Add icons for common directories
        if segment == "home" then
            item.text = "🏠 " .. segment
        elseif segment == "documents" then
            item.text = "📄 " .. segment
        elseif segment == "downloads" then
            item.text = "📥 " .. segment
        elseif segment == "pictures" then
            item.text = "🖼️ " .. segment
        end
        
        table.insert(items, item)
    end
    
    breadcrumb:setItems(items)
end

function BreadcrumbManager.updateAppNavigation(screens)
    local breadcrumb = BreadcrumbManager.breadcrumbs["application"]
    if not breadcrumb then return end
    
    local items = {}
    for i, screen in ipairs(screens) do
        table.insert(items, {
            text = screen.title,
            screen = screen.id,
            icon = screen.icon or "📱"
        })
    end
    
    breadcrumb:setItems(items)
end

function BreadcrumbManager.updateWebBreadcrumb(url)
    local breadcrumb = BreadcrumbManager.breadcrumbs["website"]
    if not breadcrumb then return end
    
    local items = {}
    local path = url:gsub("^https?://[^/]+", "") -- Remove domain
    
    if path == "" or path == "/" then
        breadcrumb:clear()
        return
    end
    
    local currentPath = ""
    for segment in path:gmatch("[^/]+") do
        currentPath = currentPath .. "/" .. segment
        
        local displayText = segment:gsub("%-", " "):gsub("_", " ")
        displayText = displayText:gsub("(%l)(%w*)", function(a, b) return a:upper() .. b end)
        
        table.insert(items, {
            text = displayText,
            url = currentPath,
            segment = segment
        })
    end
    
    breadcrumb:setItems(items)
end

-- Smart breadcrumb that adapts to content
function BreadcrumbManager.createSmartBreadcrumb(parent, x, y, width, height)
    local breadcrumb = breadcrumb.new(parent, x, y, width, height, {
        separator = " • ",
        maxItems = 6,
        truncateMode = "middle",
        clickable = true,
        showHome = true,
        homeText = "⌂",
        backgroundColor = colors.white,
        textColor = colors.darkGray,
        linkColor = colors.blue,
        separatorColor = colors.lightGray,
        currentColor = colors.black,
        hoverColor = colors.lightBlue,
        padding = 2,
        
        onItemClick = function(breadcrumb, item, index)
            BreadcrumbManager.handleSmartNavigation(item, index)
        end
    })
    
    -- Auto-resize based on content
    breadcrumb.onItemAdded = function(breadcrumb, item, index)
        BreadcrumbManager.optimizeBreadcrumbLayout(breadcrumb)
    end
    
    return breadcrumb
end

function BreadcrumbManager.optimizeBreadcrumbLayout(breadcrumb)
    local totalWidth = 0
    local items = breadcrumb:getItems()
    
    -- Calculate required width
    for i, item in ipairs(items) do
        totalWidth = totalWidth + #item.text
        if i < #items then
            totalWidth = totalWidth + #breadcrumb.separator
        end
    end
    
    -- Add padding and margins
    totalWidth = totalWidth + breadcrumb.padding * 2 + 4
    
    -- Adjust max items based on available space
    if totalWidth > breadcrumb.width then
        local newMaxItems = math.floor(breadcrumb.width / 15) -- Estimate
        breadcrumb:setMaxItems(math.max(2, newMaxItems))
    end
end

function BreadcrumbManager.handleSmartNavigation(item, index)
    if item.action then
        item.action(item)
    elseif item.path then
        navigateToPath(item.path)
    elseif item.url then
        navigateToPage(item.url)
    elseif item.screen then
        navigateToScreen(item.screen)
    end
end

-- Usage examples
function demonstrateBreadcrumbs()
    -- File system breadcrumb
    local fileBreadcrumb = BreadcrumbManager.createFileSystemBreadcrumb(screen, 5, 5, 70, 3)
    BreadcrumbManager.updateFileSystemPath("/home/user/documents/projects/myapp")
    
    -- Application breadcrumb
    local appBreadcrumb = BreadcrumbManager.createAppBreadcrumb(screen, 5, 10, 70, 3)
    BreadcrumbManager.updateAppNavigation({
        {id = "dashboard", title = "Dashboard", icon = "📊"},
        {id = "settings", title = "Settings", icon = "⚙️"},
        {id = "user-profile", title = "User Profile", icon = "👤"}
    })
    
    -- Website breadcrumb
    local webBreadcrumb = BreadcrumbManager.createWebBreadcrumb(screen, 5, 15, 70, 3)
    BreadcrumbManager.updateWebBreadcrumb("https://example.com/products/electronics/computers")
    
    -- Smart breadcrumb
    local smartBreadcrumb = BreadcrumbManager.createSmartBreadcrumb(screen, 5, 20, 70, 3)
    smartBreadcrumb:setItems({
        {text = "Store", action = function() print("Navigate to store") end},
        {text = "Electronics", action = function() print("Navigate to electronics") end},
        {text = "Computers", action = function() print("Navigate to computers") end},
        {text = "Laptops", action = function() print("Navigate to laptops") end}
    })
end`
        },
        notes: ['Breadcrumbs improve navigation UX by showing current location', 'Keep breadcrumb text concise to fit in available space', 'Consider truncation strategies for long paths', 'Make breadcrumb items clearly clickable with proper visual feedback']
    },
    
    treeView: {
        name: 'TreeView',
        category: 'Data Widgets',
        description: 'A hierarchical tree widget for displaying and navigating nested data structures with expandable/collapsible nodes.',
        syntax: 'treeView.new(parent, x, y, width, height, options)',
        properties: [
            { name: 'x', type: 'number', description: 'X position of the tree view' },
            { name: 'y', type: 'number', description: 'Y position of the tree view' },
            { name: 'width', type: 'number', description: 'Width of the tree view' },
            { name: 'height', type: 'number', description: 'Height of the tree view' },
            { name: 'data', type: 'table', description: 'Hierarchical data structure for the tree' },
            { name: 'showLines', type: 'boolean', description: 'Whether to show connection lines between nodes' },
            { name: 'showCheckboxes', type: 'boolean', description: 'Whether to show checkboxes for selection' },
            { name: 'allowMultiSelect', type: 'boolean', description: 'Whether multiple nodes can be selected' },
            { name: 'expandOnClick', type: 'boolean', description: 'Whether clicking a node expands/collapses it' },
            { name: 'lazyLoad', type: 'boolean', description: 'Whether to load child nodes on demand' },
            { name: 'scrollable', type: 'boolean', description: 'Whether the tree view is scrollable' },
            { name: 'indentSize', type: 'number', description: 'Size of indentation for each level' },
            { name: 'nodeHeight', type: 'number', description: 'Height of each tree node' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the tree view' },
            { name: 'textColor', type: 'color', description: 'Default text color for nodes' },
            { name: 'selectedColor', type: 'color', description: 'Background color for selected nodes' },
            { name: 'hoverColor', type: 'color', description: 'Background color when hovering over nodes' },
            { name: 'lineColor', type: 'color', description: 'Color of connection lines' },
            { name: 'iconColor', type: 'color', description: 'Color of expand/collapse icons' },
            { name: 'borderColor', type: 'color', description: 'Border color of the tree view' },
            { name: 'expandIcon', type: 'string', description: 'Icon for expandable nodes (default: "+")' },
            { name: 'collapseIcon', type: 'string', description: 'Icon for collapsible nodes (default: "-")' },
            { name: 'leafIcon', type: 'string', description: 'Icon for leaf nodes (default: "•")' }
        ],
        methods: [
            { name: 'setData(data)', params: 'table', description: 'Sets the tree data' },
            { name: 'addNode(parentNode, nodeData)', params: 'node, table', description: 'Adds a new node to the tree' },
            { name: 'removeNode(node)', params: 'node', description: 'Removes a node from the tree' },
            { name: 'expandNode(node)', params: 'node', description: 'Expands a specific node' },
            { name: 'collapseNode(node)', params: 'node', description: 'Collapses a specific node' },
            { name: 'expandAll()', description: 'Expands all nodes in the tree' },
            { name: 'collapseAll()', description: 'Collapses all nodes in the tree' },
            { name: 'selectNode(node)', params: 'node', description: 'Selects a specific node' },
            { name: 'deselectNode(node)', params: 'node', description: 'Deselects a specific node' },
            { name: 'clearSelection()', description: 'Clears all selected nodes' },
            { name: 'getSelectedNodes()', returns: 'table', description: 'Returns array of selected nodes' },
            { name: 'findNode(predicate)', params: 'function', returns: 'node', description: 'Finds first node matching predicate' },
            { name: 'findAllNodes(predicate)', params: 'function', returns: 'table', description: 'Finds all nodes matching predicate' },
            { name: 'getNodePath(node)', params: 'node', returns: 'table', description: 'Returns path from root to node' },
            { name: 'scrollToNode(node)', params: 'node', description: 'Scrolls to make node visible' },
            { name: 'refresh()', description: 'Refreshes the tree view display' },
            { name: 'sort(compareFn)', params: 'function', description: 'Sorts tree nodes using compare function' }
        ],
        events: [
            { name: 'onNodeClick', params: 'treeView, node, event', description: 'Fired when a node is clicked' },
            { name: 'onNodeDoubleClick', params: 'treeView, node, event', description: 'Fired when a node is double-clicked' },
            { name: 'onNodeExpand', params: 'treeView, node', description: 'Fired when a node is expanded' },
            { name: 'onNodeCollapse', params: 'treeView, node', description: 'Fired when a node is collapsed' },
            { name: 'onNodeSelect', params: 'treeView, node', description: 'Fired when a node is selected' },
            { name: 'onNodeDeselect', params: 'treeView, node', description: 'Fired when a node is deselected' },
            { name: 'onSelectionChanged', params: 'treeView, selectedNodes', description: 'Fired when selection changes' },
            { name: 'onNodeContextMenu', params: 'treeView, node, x, y', description: 'Fired when right-clicking a node' },
            { name: 'onLazyLoad', params: 'treeView, node, callback', description: 'Fired when child nodes need to be loaded' }
        ],
        examples: {
            basic: `-- Simple file system tree
local fileTree = treeView.new(screen, 10, 5, 40, 30, {
    showLines = true,
    showCheckboxes = false,
    expandOnClick = true,
    scrollable = true,
    backgroundColor = colors.white,
    textColor = colors.black,
    selectedColor = colors.lightBlue,
    hoverColor = colors.lightGray,
    lineColor = colors.gray,
    expandIcon = "📁",
    collapseIcon = "📂",
    leafIcon = "📄",
    
    onNodeClick = function(tree, node, event)
        if node.type == "file" then
            openFile(node.path)
        end
    end,
    
    onNodeDoubleClick = function(tree, node, event)
        if node.type == "directory" then
            if node.expanded then
                tree:collapseNode(node)
            else
                tree:expandNode(node)
            end
        end
    end
})

-- Sample file system data
local fileSystemData = {
    {
        text = "Documents",
        type = "directory",
        path = "/home/user/Documents",
        expanded = true,
        children = {
            {
                text = "Projects",
                type = "directory",
                path = "/home/user/Documents/Projects",
                children = {
                    {
                        text = "MyApp",
                        type = "directory",
                        path = "/home/user/Documents/Projects/MyApp",
                        children = {
                            {text = "main.lua", type = "file", path = "/home/user/Documents/Projects/MyApp/main.lua"},
                            {text = "config.lua", type = "file", path = "/home/user/Documents/Projects/MyApp/config.lua"},
                            {text = "README.md", type = "file", path = "/home/user/Documents/Projects/MyApp/README.md"}
                        }
                    }
                }
            },
            {
                text = "Notes",
                type = "directory",
                path = "/home/user/Documents/Notes",
                children = {
                    {text = "todo.txt", type = "file", path = "/home/user/Documents/Notes/todo.txt"},
                    {text = "ideas.txt", type = "file", path = "/home/user/Documents/Notes/ideas.txt"}
                }
            }
        }
    },
    {
        text = "Downloads",
        type = "directory",
        path = "/home/user/Downloads",
        children = {
            {text = "image.png", type = "file", path = "/home/user/Downloads/image.png"},
            {text = "archive.zip", type = "file", path = "/home/user/Downloads/archive.zip"}
        }
    }
}

fileTree:setData(fileSystemData)`,
            advanced: `-- Advanced tree view system with multiple features
local TreeViewManager = {
    trees = {},
    contextMenus = {}
}

-- Create a comprehensive file explorer tree
function TreeViewManager.createFileExplorer(parent, x, y, width, height)
    local tree = treeView.new(parent, x, y, width, height, {
        showLines = true,
        showCheckboxes = true,
        allowMultiSelect = true,
        expandOnClick = false,
        lazyLoad = true,
        scrollable = true,
        indentSize = 3,
        nodeHeight = 2,
        backgroundColor = colors.white,
        textColor = colors.black,
        selectedColor = colors.blue,
        hoverColor = colors.lightGray,
        lineColor = colors.lightGray,
        expandIcon = "▶",
        collapseIcon = "▼",
        leafIcon = "●",
        
        onNodeClick = function(tree, node, event)
            TreeViewManager.handleFileClick(tree, node, event)
        end,
        
        onNodeDoubleClick = function(tree, node, event)
            TreeViewManager.handleFileDoubleClick(tree, node, event)
        end,
        
        onNodeExpand = function(tree, node)
            print("Expanded: " .. node.text)
        end,
        
        onNodeContextMenu = function(tree, node, x, y)
            TreeViewManager.showFileContextMenu(tree, node, x, y)
        end,
        
        onLazyLoad = function(tree, node, callback)
            TreeViewManager.loadDirectoryContents(node, callback)
        end,
        
        onSelectionChanged = function(tree, selectedNodes)
            TreeViewManager.updateStatusBar(selectedNodes)
        end
    })
    
    TreeViewManager.trees["fileExplorer"] = tree
    return tree
end

-- Create organization chart tree
function TreeViewManager.createOrgChart(parent, x, y, width, height)
    local tree = treeView.new(parent, x, y, width, height, {
        showLines = true,
        showCheckboxes = false,
        allowMultiSelect = false,
        expandOnClick = true,
        scrollable = true,
        backgroundColor = colors.lightGray,
        textColor = colors.black,
        selectedColor = colors.yellow,
        hoverColor = colors.white,
        lineColor = colors.gray,
        expandIcon = "👥",
        collapseIcon = "👤",
        leafIcon = "🧑",
        
        onNodeClick = function(tree, node, event)
            TreeViewManager.showEmployeeDetails(node)
        end
    })
    
    local orgData = {
        {
            text = "CEO - John Smith",
            position = "Chief Executive Officer",
            department = "Executive",
            expanded = true,
            children = {
                {
                    text = "CTO - Jane Doe",
                    position = "Chief Technology Officer",
                    department = "Technology",
                    children = {
                        {
                            text = "Dev Manager - Bob Wilson",
                            position = "Development Manager",
                            department = "Engineering",
                            children = {
                                {text = "Alice Johnson - Senior Dev", position = "Senior Developer"},
                                {text = "Charlie Brown - Junior Dev", position = "Junior Developer"}
                            }
                        },
                        {
                            text = "QA Manager - Sarah Davis",
                            position = "Quality Assurance Manager",
                            department = "Quality",
                            children = {
                                {text = "Mike Taylor - QA Lead", position = "QA Lead"},
                                {text = "Lisa Garcia - Tester", position = "Software Tester"}
                            }
                        }
                    }
                },
                {
                    text = "CFO - Robert Miller",
                    position = "Chief Financial Officer",
                    department = "Finance",
                    children = {
                        {text = "Amy Chen - Accountant", position = "Senior Accountant"},
                        {text = "David Kim - Analyst", position = "Financial Analyst"}
                    }
                }
            }
        }
    }
    
    tree:setData(orgData)
    TreeViewManager.trees["orgChart"] = tree
    return tree
end

-- Create API documentation tree
function TreeViewManager.createAPITree(parent, x, y, width, height)
    local tree = treeView.new(parent, x, y, width, height, {
        showLines = true,
        showCheckboxes = false,
        allowMultiSelect = false,
        expandOnClick = true,
        scrollable = true,
        backgroundColor = colors.black,
        textColor = colors.white,
        selectedColor = colors.blue,
        hoverColor = colors.gray,
        lineColor = colors.lightGray,
        expandIcon = "📦",
        collapseIcon = "📂",
        leafIcon = "🔧",
        
        onNodeClick = function(tree, node, event)
            if node.type == "method" or node.type == "property" then
                TreeViewManager.showAPIDocumentation(node)
            end
        end
    })
    
    local apiData = {
        {
            text = "PixelUI API",
            type = "namespace",
            expanded = true,
            children = {
                {
                    text = "Widgets",
                    type = "category",
                    expanded = true,
                    children = {
                        {
                            text = "Button",
                            type = "class",
                            children = {
                                {text = "new()", type = "method", signature = "button.new(parent, x, y, width, height, options)"},
                                {text = "setText()", type = "method", signature = "button:setText(text)"},
                                {text = "onClick", type = "property", description = "Click event handler"},
                                {text = "backgroundColor", type = "property", description = "Button background color"}
                            }
                        },
                        {
                            text = "TextBox",
                            type = "class",
                            children = {
                                {text = "new()", type = "method", signature = "textBox.new(parent, x, y, width, height, options)"},
                                {text = "getText()", type = "method", signature = "textBox:getText() -> string"},
                                {text = "setText()", type = "method", signature = "textBox:setText(text)"},
                                {text = "placeholder", type = "property", description = "Placeholder text"}
                            }
                        }
                    }
                },
                {
                    text = "Utilities",
                    type = "category",
                    children = {
                        {
                            text = "Animation",
                            type = "class",
                            children = {
                                {text = "ease()", type = "method", signature = "animation.ease(start, end, duration, easing)"},
                                {text = "tween()", type = "method", signature = "animation.tween(object, properties, duration)"}
                            }
                        }
                    }
                }
            }
        }
    }
    
    tree:setData(apiData)
    TreeViewManager.trees["apiTree"] = tree
    return tree
end

function TreeViewManager.handleFileClick(tree, node, event)
    if node.type == "directory" then
        if event.isShiftClick then
            -- Shift+click to expand/collapse
            if node.expanded then
                tree:collapseNode(node)
            else
                tree:expandNode(node)
            end
        else
            -- Normal click to select
            tree:selectNode(node)
        end
    elseif node.type == "file" then
        tree:selectNode(node)
        TreeViewManager.previewFile(node)
    end
end

function TreeViewManager.handleFileDoubleClick(tree, node, event)
    if node.type == "file" then
        TreeViewManager.openFile(node)
    elseif node.type == "directory" then
        if node.expanded then
            tree:collapseNode(node)
        else
            tree:expandNode(node)
        end
    end
end

function TreeViewManager.showFileContextMenu(tree, node, x, y)
    local menuItems = {}
    
    if node.type == "file" then
        table.insert(menuItems, {text = "Open", action = function() TreeViewManager.openFile(node) end})
        table.insert(menuItems, {text = "Edit", action = function() TreeViewManager.editFile(node) end})
        table.insert(menuItems, {text = "Copy", action = function() TreeViewManager.copyFile(node) end})
        table.insert(menuItems, {text = "Delete", action = function() TreeViewManager.deleteFile(node) end})
    elseif node.type == "directory" then
        table.insert(menuItems, {text = "Open", action = function() tree:expandNode(node) end})
        table.insert(menuItems, {text = "New File", action = function() TreeViewManager.createFile(node) end})
        table.insert(menuItems, {text = "New Folder", action = function() TreeViewManager.createFolder(node) end})
        table.insert(menuItems, {text = "Copy", action = function() TreeViewManager.copyDirectory(node) end})
        table.insert(menuItems, {text = "Delete", action = function() TreeViewManager.deleteDirectory(node) end})
    end
    
    TreeViewManager.showContextMenu(x, y, menuItems)
end

function TreeViewManager.loadDirectoryContents(node, callback)
    -- Simulate async loading
    setTimeout(function()
        local children = {}
        
        -- Simulate file system scan
        local files = getDirectoryListing(node.path)
        for _, file in ipairs(files) do
            table.insert(children, {
                text = file.name,
                type = file.isDirectory and "directory" or "file",
                path = node.path .. "/" .. file.name,
                size = file.size,
                modified = file.modified,
                hasChildren = file.isDirectory and file.hasSubdirectories
            })
        end
        
        -- Sort: directories first, then files
        table.sort(children, function(a, b)
            if a.type ~= b.type then
                return a.type == "directory"
            end
            return a.text:lower() < b.text:lower()
        end)
        
        callback(children)
    end, 500) -- Simulate loading delay
end

function TreeViewManager.updateStatusBar(selectedNodes)
    local count = #selectedNodes
    local totalSize = 0
    
    for _, node in ipairs(selectedNodes) do
        if node.size then
            totalSize = totalSize + node.size
        end
    end
    
    local statusText = count .. " items selected"
    if totalSize > 0 then
        statusText = statusText .. " (" .. formatFileSize(totalSize) .. ")"
    end
    
    updateStatusBar(statusText)
end

function TreeViewManager.showEmployeeDetails(node)
    modal.show({
        title = "Employee Details",
        content = function(container)
            label.new(container, 2, 2, 30, 1, {text = "Name: " .. node.text})
            label.new(container, 2, 4, 30, 1, {text = "Position: " .. (node.position or "N/A")})
            label.new(container, 2, 6, 30, 1, {text = "Department: " .. (node.department or "N/A")})
        end,
        width = 35,
        height = 15
    })
end

function TreeViewManager.showAPIDocumentation(node)
    local content = "Type: " .. (node.type or "Unknown") .. "\\n"
    if node.signature then
        content = content .. "Signature: " .. node.signature .. "\\n"
    end
    if node.description then
        content = content .. "Description: " .. node.description
    end
    
    showTooltip(content)
end

-- Search functionality
function TreeViewManager.searchTree(tree, query)
    local results = tree:findAllNodes(function(node)
        return node.text:lower():find(query:lower()) ~= nil
    end)
    
    -- Expand path to each result
    for _, node in ipairs(results) do
        local path = tree:getNodePath(node)
        for _, pathNode in ipairs(path) do
            if pathNode ~= node then
                tree:expandNode(pathNode)
            end
        end
        tree:scrollToNode(node)
    end
    
    return results
end

-- Usage example
function demonstrateTreeViews()
    -- File explorer
    local fileTree = TreeViewManager.createFileExplorer(screen, 5, 5, 40, 35)
    
    -- Organization chart
    local orgTree = TreeViewManager.createOrgChart(screen, 50, 5, 35, 25)
    
    -- API documentation
    local apiTree = TreeViewManager.createAPITree(screen, 90, 5, 35, 35)
    
    -- Search functionality
    local searchBox = textBox.new(screen, 5, 42, 30, 2, {
        placeholder = "Search files...",
        onTextChanged = function(self, text)
            if #text >= 2 then
                TreeViewManager.searchTree(fileTree, text)
            end
        end
    })
end`
        },
        notes: ['TreeView is perfect for hierarchical data like file systems and organization charts', 'Implement lazy loading for large datasets to improve performance', 'Use consistent iconography to help users understand node types', 'Consider keyboard navigation for accessibility (arrow keys, enter, space)']
    },
    
    msgBox: {
        name: 'MsgBox',
        category: 'Dialog Widgets',
        description: 'A versatile message box widget for displaying alerts, confirmations, prompts, and custom dialogs with various button configurations.',
        syntax: 'msgBox.show(message, title, type, options)',
        properties: [
            { name: 'message', type: 'string', description: 'Main message text to display' },
            { name: 'title', type: 'string', description: 'Title of the message box' },
            { name: 'type', type: 'string', description: 'Type: "info", "warning", "error", "question", "success"' },
            { name: 'buttons', type: 'string|table', description: 'Button configuration: "ok", "okcancel", "yesno", "yesnocancel", or custom array' },
            { name: 'defaultButton', type: 'number', description: 'Index of the default button (1-based)' },
            { name: 'icon', type: 'string', description: 'Custom icon to display' },
            { name: 'width', type: 'number', description: 'Width of the message box' },
            { name: 'height', type: 'number', description: 'Height of the message box' },
            { name: 'modal', type: 'boolean', description: 'Whether the message box is modal' },
            { name: 'timeout', type: 'number', description: 'Auto-close timeout in milliseconds' },
            { name: 'sound', type: 'boolean', description: 'Whether to play a sound' },
            { name: 'animation', type: 'string', description: 'Animation type: "fade", "slide", "bounce", "zoom"' },
            { name: 'position', type: 'string', description: 'Position: "center", "top", "bottom"' },
            { name: 'backgroundColor', type: 'color', description: 'Background color of the message box' },
            { name: 'titleColor', type: 'color', description: 'Color of the title text' },
            { name: 'messageColor', type: 'color', description: 'Color of the message text' },
            { name: 'borderColor', type: 'color', description: 'Border color' },
            { name: 'iconColor', type: 'color', description: 'Color of the icon' },
            { name: 'showCloseButton', type: 'boolean', description: 'Whether to show X close button' },
            { name: 'escapeToClose', type: 'boolean', description: 'Whether ESC key closes the dialog' },
            { name: 'clickOutsideToClose', type: 'boolean', description: 'Whether clicking outside closes the dialog' }
        ],
        methods: [
            { name: 'show(message, title, type, options)', params: 'string, string, string, table', returns: 'Promise', description: 'Shows message box and returns promise with result' },
            { name: 'alert(message, title)', params: 'string, string', returns: 'Promise', description: 'Shows simple alert dialog' },
            { name: 'confirm(message, title)', params: 'string, string', returns: 'Promise', description: 'Shows confirmation dialog' },
            { name: 'prompt(message, defaultValue, title)', params: 'string, string, string', returns: 'Promise', description: 'Shows input prompt dialog' },
            { name: 'error(message, title)', params: 'string, string', returns: 'Promise', description: 'Shows error dialog' },
            { name: 'warning(message, title)', params: 'string, string', returns: 'Promise', description: 'Shows warning dialog' },
            { name: 'info(message, title)', params: 'string, string', returns: 'Promise', description: 'Shows information dialog' },
            { name: 'success(message, title)', params: 'string, string', returns: 'Promise', description: 'Shows success dialog' },
            { name: 'custom(config)', params: 'table', returns: 'Promise', description: 'Shows custom configured dialog' },
            { name: 'close(result)', params: 'any', description: 'Closes the message box with result' },
            { name: 'setPosition(x, y)', params: 'number, number', description: 'Sets message box position' },
            { name: 'setSize(width, height)', params: 'number, number', description: 'Sets message box size' }
        ],
        events: [
            { name: 'onShow', params: 'msgBox', description: 'Fired when message box is shown' },
            { name: 'onClose', params: 'msgBox, result', description: 'Fired when message box is closed' },
            { name: 'onButtonClick', params: 'msgBox, buttonIndex, buttonText', description: 'Fired when any button is clicked' },
            { name: 'onTimeout', params: 'msgBox', description: 'Fired when timeout expires' },
            { name: 'onKeyPress', params: 'msgBox, key', description: 'Fired when key is pressed' }
        ],
        examples: {
            basic: `-- Simple message box examples
function showBasicExamples()
    -- Simple alert
    msgBox.alert("Hello, World!", "Information")
        :then(function()
            print("Alert closed")
        end)
    
    -- Confirmation dialog
    msgBox.confirm("Are you sure you want to delete this file?", "Confirm Delete")
        :then(function(result)
            if result == "yes" then
                deleteFile()
                print("File deleted")
            else
                print("Delete cancelled")
            end
        end)
    
    -- Input prompt
    msgBox.prompt("Enter your name:", "", "User Input")
        :then(function(result)
            if result then
                print("Hello, " .. result .. "!")
            else
                print("Input cancelled")
            end
        end)
    
    -- Error message
    msgBox.error("Connection failed! Please check your network.", "Network Error")
        :then(function()
            print("Error acknowledged")
        end)
    
    -- Success message
    msgBox.success("File saved successfully!", "Success")
        :then(function()
            print("Success acknowledged")
        end)
end`,
            advanced: `-- Advanced message box system
local MsgBoxManager = {
    queue = {},
    currentBox = nil,
    config = {
        defaultWidth = 40,
        defaultHeight = 15,
        defaultTimeout = 0,
        defaultAnimation = "fade",
        soundEnabled = true
    }
}

-- Enhanced alert with custom styling
function MsgBoxManager.alert(message, title, options)
    options = options or {}
    
    return msgBox.show(message, title or "Alert", "info", {
        buttons = "ok",
        icon = options.icon or "ℹ️",
        width = options.width or MsgBoxManager.config.defaultWidth,
        height = options.height or MsgBoxManager.config.defaultHeight,
        backgroundColor = options.backgroundColor or colors.white,
        titleColor = options.titleColor or colors.black,
        messageColor = options.messageColor or colors.darkGray,
        borderColor = options.borderColor or colors.blue,
        animation = options.animation or MsgBoxManager.config.defaultAnimation,
        sound = options.sound ~= false and MsgBoxManager.config.soundEnabled,
        timeout = options.timeout or MsgBoxManager.config.defaultTimeout,
        
        onShow = function(box)
            if options.onShow then options.onShow(box) end
            print("Alert shown: " .. message)
        end,
        
        onClose = function(box, result)
            if options.onClose then options.onClose(box, result) end
            print("Alert closed with result: " .. tostring(result))
        end
    })
end

-- Progress dialog
function MsgBoxManager.showProgress(title, message, cancelable)
    local progressBox = msgBox.custom({
        title = title or "Processing",
        message = message or "Please wait...",
        buttons = cancelable and {
            {text = "Cancel", value = "cancel", style = "secondary"}
        } or {},
        width = 50,
        height = 20,
        modal = true,
        showCloseButton = false,
        animation = "slide",
        
        content = function(container)
            -- Progress bar
            local progressBar = progressBar.new(container, 2, 8, 46, 2, {
                value = 0,
                min = 0,
                max = 100,
                showPercentage = true,
                backgroundColor = colors.lightGray,
                progressColor = colors.blue
            })
            
            -- Status label
            local statusLabel = label.new(container, 2, 12, 46, 1, {
                text = "Initializing...",
                textAlign = "center",
                textColor = colors.gray
            })
            
            return {
                progressBar = progressBar,
                statusLabel = statusLabel
            }
        end
    })
    
    return {
        setProgress = function(value)
            if progressBox.content and progressBox.content.progressBar then
                progressBox.content.progressBar:setValue(value)
            end
        end,
        setStatus = function(status)
            if progressBox.content and progressBox.content.statusLabel then
                progressBox.content.statusLabel.text = status
            end
        end,
        close = function()
            progressBox:close()
        end
    }
end

-- Notification system
function MsgBoxManager.notify(message, type, duration)
    type = type or "info"
    duration = duration or 3000
    
    local icons = {
        info = "ℹ️",
        success = "✅",
        warning = "⚠️",
        error = "❌"
    }
    
    local colors = {
        info = {bg = colors.blue, text = colors.white},
        success = {bg = colors.green, text = colors.white},
        warning = {bg = colors.orange, text = colors.white},
        error = {bg = colors.red, text = colors.white}
    }
    
    local theme = colors[type] or colors.info
    
    return msgBox.show(message, "", type, {
        buttons = {},
        icon = icons[type],
        width = 35,
        height = 8,
        position = "top",
        timeout = duration,
        showCloseButton = true,
        backgroundColor = theme.bg,
        messageColor = theme.text,
        borderColor = theme.bg,
        animation = "slide"
    })
end

-- Usage examples
function demonstrateMsgBoxes()
    -- Basic examples
    showBasicExamples()
    
    -- Progress dialog example
    setTimeout(function()
        local progress = MsgBoxManager.showProgress("Installing", "Installing application components...", true)
        
        for i = 0, 100, 10 do
            setTimeout(function()
                progress.setProgress(i)
                progress.setStatus("Installing component " .. (i/10 + 1) .. " of 10...")
                
                if i == 100 then
                    progress.setStatus("Installation complete!")
                    setTimeout(function()
                        progress.close()
                        MsgBoxManager.notify("Installation completed successfully!", "success")
                    end, 1000)
                end
            end, i * 100)
        end
    end, 2000)
end`
        },
        notes: ['MsgBox provides a unified interface for all user dialogs', 'Use appropriate message types (info, warning, error) for semantic clarity', 'Consider timeout for non-critical notifications', 'Queue multiple messages to prevent dialog overlap and improve UX']
    },

    // Additional Widgets from PixelUI Repository
    notificationToast: {
        type: 'widget',
        category: 'Display',
        title: 'PixelUI.notificationToast()',
        description: 'Animated toast notification with auto-hide and positioning.',
        syntax: 'PixelUI.notificationToast(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Toast properties and configuration' }
        ],
        returns: { type: 'NotificationToast', description: 'Toast notification widget object' },
        properties: [
            { name: 'message', type: 'string', required: true, description: 'Toast message content' },
            { name: 'title', type: 'string', default: '""', description: 'Optional toast title' },
            { name: 'type', type: 'string', default: '"info"', description: 'Toast type: "info", "success", "warning", "error"' },
            { name: 'duration', type: 'number', default: '3000', description: 'Auto-hide duration in milliseconds' },
            { name: 'x', type: 'number', default: 'auto', description: 'X position (auto-positioned if not specified)' },
            { name: 'y', type: 'number', default: 'auto', description: 'Y position (auto-positioned if not specified)' },
            { name: 'closeable', type: 'boolean', default: 'true', description: 'Whether toast can be manually closed' },
            { name: 'animateIn', type: 'boolean', default: 'true', description: 'Enable slide-in animation' },
            { name: 'animateOut', type: 'boolean', default: 'true', description: 'Enable slide-out animation' }
        ],
        methods: [
            { name: 'show()', description: 'Display the toast notification' },
            { name: 'hide()', description: 'Hide the toast notification' }
        ],
        example: {
            basic: `-- Simple notification
local toast = PixelUI.notificationToast({
    message = "Operation completed successfully!",
    type = "success"
})
toast:show()`,
            advanced: `-- Custom positioned toast with callbacks
local toast = PixelUI.notificationToast({
    message = "Processing file...",
    title = "File Manager",
    type = "info",
    x = 5, y = 2,
    duration = 5000,
    onShow = function()
        print("Toast appeared")
    end,
    onHide = function()
        print("Toast disappeared")
    end
})
toast:show()`
        }
    },

    dataGrid: {
        type: 'widget',
        category: 'Display',
        title: 'PixelUI.dataGrid()',
        description: 'Advanced data table with sorting, selection, and scrolling.',
        syntax: 'PixelUI.dataGrid(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Data grid properties and configuration' }
        ],
        returns: { type: 'DataGrid', description: 'Data grid widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Grid width' },
            { name: 'height', type: 'number', required: true, description: 'Grid height' },
            { name: 'columns', type: 'table', default: '{}', description: 'Column definitions' },
            { name: 'data', type: 'table', default: '{}', description: 'Table data rows' },
            { name: 'headers', type: 'table', default: '{}', description: 'Column headers' },
            { name: 'showHeaders', type: 'boolean', default: 'true', description: 'Show column headers' },
            { name: 'sortable', type: 'boolean', default: 'true', description: 'Enable column sorting' },
            { name: 'selectable', type: 'boolean', default: 'true', description: 'Enable row selection' },
            { name: 'multiSelect', type: 'boolean', default: 'false', description: 'Allow multiple row selection' },
            { name: 'alternatingRows', type: 'boolean', default: 'true', description: 'Alternate row background colors' }
        ],
        events: [
            { name: 'onRowSelect', parameters: 'self, rowIndex, rowData', description: 'Called when row is selected' },
            { name: 'onCellClick', parameters: 'self, row, col, value', description: 'Called when cell is clicked' },
            { name: 'onSort', parameters: 'self, column, direction', description: 'Called when column is sorted' }
        ],
        example: {
            basic: `-- Simple data table
PixelUI.dataGrid({
    x = 2, y = 3, width = 40, height = 15,
    headers = {"Name", "Age", "City"},
    data = {
        {"Alice", 25, "New York"},
        {"Bob", 30, "London"},
        {"Charlie", 35, "Tokyo"}
    }
})`,
            advanced: `-- Feature-rich data grid
PixelUI.dataGrid({
    x = 5, y = 5, width = 60, height = 20,
    columns = {
        {name = "id", width = 5, align = "right"},
        {name = "name", width = 20, sortable = true},
        {name = "email", width = 25},
        {name = "status", width = 10}
    },
    data = loadUserData(),
    sortable = true,
    multiSelect = true,
    onRowSelect = function(self, rowIndex, rowData)
        print("Selected user: " .. rowData.name)
    end,
    onSort = function(self, column, direction)
        -- Custom sorting logic
        sortDataByColumn(self.data, column, direction)
    end
})`
        }
    },

    filePicker: {
        type: 'widget',
        category: 'Input',
        title: 'PixelUI.filePicker()',
        description: 'Full-featured file browser and picker dialog.',
        syntax: 'PixelUI.filePicker(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'File picker properties and configuration' }
        ],
        returns: { type: 'FilePicker', description: 'File picker widget object' },
        properties: [
            { name: 'title', type: 'string', default: '"Select File"', description: 'Dialog title' },
            { name: 'currentPath', type: 'string', default: '"/"', description: 'Initial directory path' },
            { name: 'mode', type: 'string', default: '"open"', description: 'Picker mode: "open" or "save"' },
            { name: 'fileFilter', type: 'string', default: '"*"', description: 'File pattern filter (e.g., "*.lua")' },
            { name: 'allowDirectories', type: 'boolean', default: 'false', description: 'Allow selecting directories' },
            { name: 'showHiddenFiles', type: 'boolean', default: 'false', description: 'Show hidden files' },
            { name: 'modal', type: 'boolean', default: 'true', description: 'Display as modal dialog' }
        ],
        events: [
            { name: 'onSelect', parameters: 'self, path', description: 'Called when file is selected' },
            { name: 'onCancel', parameters: 'self', description: 'Called when dialog is cancelled' }
        ],
        methods: [
            { name: 'show()', description: 'Display the file picker dialog' },
            { name: 'hide()', description: 'Hide the file picker dialog' }
        ],
        example: {
            basic: `-- Simple file open dialog
local picker = PixelUI.filePicker({
    title = "Open Lua Script",
    fileFilter = "*.lua",
    onSelect = function(self, path)
        local content = readFile(path)
        loadScript(content)
    end
})
picker:show()`,
            advanced: `-- Save dialog with custom filtering
local picker = PixelUI.filePicker({
    title = "Save Configuration",
    mode = "save",
    currentPath = "/config/",
    fileFilter = "*.cfg",
    onSelect = function(self, path)
        saveConfiguration(path)
        PixelUI.showToast("Configuration saved!", "Success", "success")
    end,
    onCancel = function(self)
        print("Save cancelled")
    end
})
picker:show()`
        }
    },

    richTextBox: {
        type: 'widget',
        category: 'Input',
        title: 'PixelUI.richTextBox()',
        description: 'Multi-line text editor with formatting and advanced features.',
        syntax: 'PixelUI.richTextBox(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Rich text box properties and configuration' }
        ],
        returns: { type: 'RichTextBox', description: 'Rich text box widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Text box width' },
            { name: 'height', type: 'number', required: true, description: 'Text box height' },
            { name: 'lines', type: 'table', default: '{""}', description: 'Array of text lines' },
            { name: 'wordWrap', type: 'boolean', default: 'true', description: 'Enable word wrapping' },
            { name: 'showLineNumbers', type: 'boolean', default: 'false', description: 'Display line numbers' },
            { name: 'readonly', type: 'boolean', default: 'false', description: 'Make text read-only' },
            { name: 'maxLines', type: 'number', default: '1000', description: 'Maximum number of lines' },
            { name: 'tabSize', type: 'number', default: '4', description: 'Tab character width' }
        ],
        events: [
            { name: 'onChange', parameters: 'self, lines, cursorX, cursorY', description: 'Called when text changes' },
            { name: 'onCursorMove', parameters: 'self, x, y', description: 'Called when cursor moves' }
        ],
        methods: [
            { name: 'insertText(text)', description: 'Insert text at cursor position' },
            { name: 'getText()', description: 'Get all text as string' },
            { name: 'getLines()', description: 'Get text as array of lines' },
            { name: 'setCursor(x, y)', description: 'Set cursor position' }
        ],
        example: {
            basic: `-- Simple multi-line editor
PixelUI.richTextBox({
    x = 5, y = 3, width = 40, height = 15,
    lines = {"-- Lua script", "print('Hello World')"},
    onChange = function(self, lines)
        -- Auto-save functionality
        saveToFile(table.concat(lines, "\\n"))
    end
})`,
            advanced: `-- Feature-rich text editor
PixelUI.richTextBox({
    x = 2, y = 2, width = 70, height = 20,
    showLineNumbers = true,
    wordWrap = true,
    tabSize = 2,
    onChange = function(self, lines, cursorX, cursorY)
        -- Update status bar
        statusBar.text = "Line " .. cursorY .. ", Col " .. cursorX
        
        -- Syntax validation
        validateLuaSyntax(table.concat(lines, "\\n"))
    end,
    onCursorMove = function(self, x, y)
        highlightCurrentLine(y)
    end
})`
        }
    },

    codeEditor: {
        type: 'widget',
        category: 'Input',
        title: 'PixelUI.codeEditor()',
        description: 'Specialized code editor with syntax highlighting and programming features.',
        syntax: 'PixelUI.codeEditor(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Code editor properties and configuration' }
        ],
        returns: { type: 'CodeEditor', description: 'Code editor widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Editor width' },
            { name: 'height', type: 'number', required: true, description: 'Editor height' },
            { name: 'language', type: 'string', default: '"lua"', description: 'Programming language for syntax highlighting' },
            { name: 'syntaxHighlight', type: 'boolean', default: 'true', description: 'Enable syntax highlighting' },
            { name: 'autoIndent', type: 'boolean', default: 'true', description: 'Enable automatic indentation' },
            { name: 'matchBrackets', type: 'boolean', default: 'true', description: 'Highlight matching brackets' },
            { name: 'showLineNumbers', type: 'boolean', default: 'true', description: 'Display line numbers' }
        ],
        events: [
            { name: 'onChange', parameters: 'self, lines, cursorX, cursorY', description: 'Called when code changes' },
            { name: 'onCursorMove', parameters: 'self, x, y', description: 'Called when cursor moves' }
        ],
        methods: [
            { name: 'insertText(text)', description: 'Insert text at cursor position' },
            { name: 'getCode()', description: 'Get all code as string' },
            { name: 'setLanguage(lang)', description: 'Change syntax highlighting language' },
            { name: 'format()', description: 'Auto-format the code' }
        ],
        example: {
            basic: `-- Lua code editor
PixelUI.codeEditor({
    x = 5, y = 3, width = 60, height = 20,
    language = "lua",
    onChange = function(self, lines)
        -- Check syntax on change
        checkLuaSyntax(table.concat(lines, "\\n"))
    end
})`,
            advanced: `-- Full-featured IDE editor
local editor = PixelUI.codeEditor({
    x = 10, y = 5, width = 80, height = 30,
    language = "lua",
    syntaxHighlight = true,
    autoIndent = true,
    matchBrackets = true,
    onChange = function(self, lines, cursorX, cursorY)
        -- Update status
        updateStatus("Line " .. cursorY .. ", Col " .. cursorX)
        
        -- Auto-save every 5 seconds
        scheduleAutoSave(table.concat(lines, "\\n"))
    end
})

-- Add key bindings
editor.onKey = function(self, key)
    if key == keys.f5 then
        -- Run code
        runCode(self:getCode())
        return true
    end
    return false
end`
        }
    },

    accordion: {
        type: 'widget',
        category: 'Layout',
        title: 'PixelUI.accordion()',
        description: 'Collapsible sections container for organizing content.',
        syntax: 'PixelUI.accordion(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Accordion properties and configuration' }
        ],
        returns: { type: 'Accordion', description: 'Accordion widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Accordion width' },
            { name: 'height', type: 'number', required: true, description: 'Accordion height' },
            { name: 'sections', type: 'table', default: '{}', description: 'Array of section definitions' },
            { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allow multiple sections open' },
            { name: 'expandedSections', type: 'table', default: '{}', description: 'Initially expanded sections' }
        ],
        events: [
            { name: 'onSectionToggle', parameters: 'self, index, expanded', description: 'Called when section is toggled' }
        ],
        methods: [
            { name: 'expandSection(index)', description: 'Expand a specific section' },
            { name: 'collapseSection(index)', description: 'Collapse a specific section' },
            { name: 'toggleSection(index)', description: 'Toggle a specific section' }
        ],
        example: {
            basic: `-- Simple accordion
PixelUI.accordion({
    x = 5, y = 3, width = 40, height = 20,
    sections = {
        {title = "Settings", content = {"Option 1", "Option 2"}},
        {title = "Advanced", content = {"Advanced option"}}
    }
})`,
            advanced: `-- Complex accordion with widgets
PixelUI.accordion({
    x = 10, y = 5, width = 50, height = 25,
    allowMultiple = true,
    sections = {
        {
            title = "User Settings",
            content = {
                "Username: " .. getUserName(),
                "Email: " .. getUserEmail(),
                "Theme: " .. getCurrentTheme()
            }
        },
        {
            title = "System Information",
            content = {
                "OS: " .. os.version(),
                "Memory: " .. getMemoryUsage() .. "MB",
                "Uptime: " .. getUptime()
            }
        }
    },
    onSectionToggle = function(self, index, expanded)
        print("Section " .. index .. " " .. (expanded and "opened" or "closed"))
    end
})`
        }
    },

    minimap: {
        type: 'widget',
        category: 'Display',
        title: 'PixelUI.minimap()',
        description: 'Overview widget showing a scaled view of larger content.',
        syntax: 'PixelUI.minimap(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Minimap properties and configuration' }
        ],
        returns: { type: 'Minimap', description: 'Minimap widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Minimap width' },
            { name: 'height', type: 'number', required: true, description: 'Minimap height' },
            { name: 'sourceWidget', type: 'Widget', required: true, description: 'Widget to create minimap for' },
            { name: 'scale', type: 'number', default: '4', description: 'Scale factor (source pixels per minimap pixel)' },
            { name: 'showViewport', type: 'boolean', default: 'true', description: 'Show current viewport indicator' },
            { name: 'interactive', type: 'boolean', default: 'true', description: 'Allow clicking to navigate' }
        ],
        events: [
            { name: 'onClick', parameters: 'self, x, y', description: 'Called when minimap is clicked' }
        ],
        example: {
            basic: `-- Document minimap
local editor = PixelUI.richTextBox({...})
PixelUI.minimap({
    x = 60, y = 5, width = 15, height = 20,
    sourceWidget = editor,
    scale = 3
})`,
            advanced: `-- Interactive code editor minimap
local codeEditor = PixelUI.codeEditor({
    x = 5, y = 3, width = 50, height = 25
})

PixelUI.minimap({
    x = 58, y = 3, width = 12, height = 25,
    sourceWidget = codeEditor,
    scale = 4,
    showViewport = true,
    interactive = true,
    onClick = function(self, x, y)
        -- Jump to clicked location
        local targetLine = math.floor(y * codeEditor.totalLines / self.height)
        codeEditor:setCursor(1, targetLine)
    end
})`
        }
    },

    statusBar: {
        type: 'widget',
        category: 'Display',
        title: 'PixelUI.statusBar()',
        description: 'Bottom status bar for displaying application information.',
        syntax: 'PixelUI.statusBar(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Status bar properties and configuration' }
        ],
        returns: { type: 'StatusBar', description: 'Status bar widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Status bar width' },
            { name: 'sections', type: 'table', default: '{}', description: 'Array of status sections' },
            { name: 'separator', type: 'string', default: '" | "', description: 'Section separator string' },
            { name: 'align', type: 'string', default: '"left"', description: 'Text alignment: "left", "center", "right"' },
            { name: 'showTime', type: 'boolean', default: 'false', description: 'Show current time' },
            { name: 'timeFormat', type: 'string', default: '"%H:%M"', description: 'Time format string' }
        ],
        methods: [
            { name: 'addSection(section)', description: 'Add a new status section' },
            { name: 'removeSection(index)', description: 'Remove a status section' },
            { name: 'updateSection(index, value)', description: 'Update a status section' },
            { name: 'clearSections()', description: 'Remove all sections' }
        ],
        example: {
            basic: `-- Simple status bar
PixelUI.statusBar({
    x = 1, y = 24, width = 80,
    sections = {"Ready", "Lines: 42", "Col: 8"},
    showTime = true
})`,
            advanced: `-- Dynamic status bar
local statusBar = PixelUI.statusBar({
    x = 1, y = 25, width = 80,
    sections = {
        function() return "Mode: " .. getCurrentMode() end,
        function() return "Memory: " .. getMemoryUsage() .. "KB" end,
        function() return "Users: " .. getActiveUsers() end
    },
    separator = " │ ",
    align = "left",
    showTime = true,
    timeFormat = "%H:%M:%S"
})

-- Update sections dynamically
statusBar:updateSection(1, "Mode: Edit")
statusBar:addSection("Saved")`
        }
    },

    tabControl: {
        type: 'widget',
        category: 'Navigation',
        title: 'PixelUI.tabControl()',
        description: 'Tabbed interface container for organizing content into switchable panels.',
        syntax: 'PixelUI.tabControl(props)',
        parameters: [
            { name: 'props', type: 'table', description: 'Tab control properties and configuration' }
        ],
        returns: { type: 'TabControl', description: 'Tab control widget object' },
        properties: [
            { name: 'x', type: 'number', required: true, description: 'X position on screen' },
            { name: 'y', type: 'number', required: true, description: 'Y position on screen' },
            { name: 'width', type: 'number', required: true, description: 'Tab control width' },
            { name: 'height', type: 'number', required: true, description: 'Tab control height' },
            { name: 'tabs', type: 'table', default: '{}', description: 'Array of tab definitions' },
            { name: 'selectedIndex', type: 'number', default: '1', description: 'Initially selected tab index' },
            { name: 'color', type: 'color', default: 'colors.white', description: 'Text color for tabs' },
            { name: 'background', type: 'color', default: 'colors.black', description: 'Background color for content area' }
        ],
        events: [
            { name: 'onChange', parameters: 'self, index', description: 'Called when active tab changes' }
        ],
        methods: [
            { name: 'selectTab(index)', description: 'Switch to a specific tab by index' },
            { name: 'addTab(tab)', description: 'Add a new tab to the control' },
            { name: 'removeTab(index)', description: 'Remove a tab by index' },
            { name: 'getSelectedTab()', description: 'Get the currently selected tab object' }
        ],
        example: {
            basic: `-- Simple tab control
PixelUI.tabControl({
    x = 5, y = 3, width = 40, height = 15,
    tabs = {
        {text = "Home", content = homePanel},
        {text = "Settings", content = settingsPanel},
        {text = "About", content = aboutPanel}
    },
    onChange = function(self, index)
        print("Switched to tab: " .. index)
    end
})`,
            advanced: `-- Dynamic tab control with complex content
local mainTabs = PixelUI.tabControl({
    x = 2, y = 2, width = 70, height = 25,
    selectedIndex = 1,
    tabs = {
        {
            text = "Dashboard",
            content = PixelUI.container({
                x = 1, y = 1, width = 68, height = 22,
                -- Dashboard widgets here
            })
        },
        {
            text = "File Manager",
            content = PixelUI.container({
                x = 1, y = 1, width = 68, height = 22,
                -- File manager widgets here
            })
        },
        {
            text = "Terminal",
            content = PixelUI.container({
                x = 1, y = 1, width = 68, height = 22,
                -- Terminal widgets here
            })
        }
    },
    onChange = function(self, index)
        local tabNames = {"Dashboard", "File Manager", "Terminal"}
        statusBar:updateSection(1, "Active: " .. tabNames[index])
        
        -- Perform tab-specific initialization
        if index == 2 then
            refreshFileList()
        elseif index == 3 then
            focusTerminal()
        end
    end
})

-- Add new tab dynamically
mainTabs:addTab({
    text = "Settings",
    content = createSettingsPanel()
})`
        },
        notes: [
            'Each tab should have a "text" property for the tab header',
            'Content can be any widget or container',
            'Tab headers are automatically sized based on text length',
            'Use containers for complex tab content with multiple widgets'
        ]
    }
};

// API Documentation Manager
class APIDocumentationManager {
    constructor() {
        this.docs = apiDocumentation;
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.currentWidget = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadInitialContent();
        this.setupScrollToTop();
    }

    bindEvents() {
        // Search functionality
        const mainSearch = document.getElementById('main-search');
        if (mainSearch) {
            mainSearch.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterAndRenderContent();
            });
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.filterAndRenderContent();
            });
        });

        // Sidebar navigation
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const widgetId = link.getAttribute('href').substring(1);
                this.showWidget(widgetId);
                this.updateActiveSidebarLink(link);
            });
        });

        // Handle URL hash navigation
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && this.docs[hash]) {
                this.showWidget(hash);
            }
        });
    }

    loadInitialContent() {
        // Check if there's a hash in URL
        const hash = window.location.hash.substring(1);
        if (hash && this.docs[hash]) {
            this.showWidget(hash);
        } else {
            this.showOverview();
        }
    }

    showOverview() {
        const content = document.getElementById('api-docs-content');
        content.innerHTML = `
            <div class="api-overview">
                <h1>PixelUI API Reference</h1>
                <p class="overview-description">
                    Welcome to the comprehensive PixelUI API documentation. Use the sidebar navigation 
                    or search above to find specific widgets and functions.
                </p>
                
                <div class="quick-links">
                    <h3 class="quick-links-title">Quick Start</h3>
                    <div class="quick-links-grid">
                        <a href="#init" class="quick-link">
                            <i data-lucide="play"></i>
                            Initialize Framework
                        </a>
                        <a href="#button" class="quick-link">
                            <i data-lucide="square"></i>
                            Create Button
                        </a>
                        <a href="#textBox" class="quick-link">
                            <i data-lucide="type"></i>
                            Text Input
                        </a>
                        <a href="#container" class="quick-link">
                            <i data-lucide="layout"></i>
                            Layout Container
                        </a>
                        <a href="#animate" class="quick-link">
                            <i data-lucide="move"></i>
                            Animation System
                        </a>
                        <a href="#run" class="quick-link">
                            <i data-lucide="play-circle"></i>
                            Event Loop
                        </a>
                    </div>
                </div>
                
                <div class="note">
                    <div class="note-title">
                        <i data-lucide="info"></i>
                        Work In Progress Features
                    </div>
                    <div class="note-content">
                        Some features like scrolling systems are currently in development. 
                        These are marked with WIP badges in the documentation.
                    </div>
                </div>
            </div>
        `;
        
        // Re-bind quick link events
        document.querySelectorAll('.quick-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const widgetId = link.getAttribute('href').substring(1);
                this.showWidget(widgetId);
            });
        });
        
        lucide.createIcons();
    }

    showWidget(widgetId) {
        const widget = this.docs[widgetId];
        if (!widget) return;

        this.currentWidget = widgetId;
        window.location.hash = widgetId;

        const content = document.getElementById('api-docs-content');
        content.innerHTML = this.renderWidgetDocumentation(widget);
        
        // Bind example tab events
        this.bindExampleTabs();
        
        // Add copy buttons to code blocks
        this.addCopyButtons();
        
        // Re-initialize icons
        lucide.createIcons();
        
        // Scroll to top
        content.scrollTop = 0;
    }

    renderWidgetDocumentation(widget) {
        const hasAdvancedExample = widget.example && widget.example.advanced;
        const widgetTitle = widget.title || widget.name;
        
        return `
            <div class="widget-doc">
                <div class="widget-header">
                    <h1 class="widget-title">
                        ${widgetTitle}
                        <span class="widget-category-badge">${widget.category}</span>
                        ${widget.warnings ? '<span class="wip-badge">WIP</span>' : ''}
                    </h1>
                    
                    <div class="widget-syntax">
                        <pre><code class="language-lua">${widget.syntax}</code></pre>
                    </div>
                </div>
                
                <div class="widget-description">
                    <p class="widget-subtitle">${widget.description}</p>
                </div>

                ${widget.parameters ? this.renderParameters(widget.parameters) : ''}
                ${widget.returns ? this.renderReturns(widget.returns) : ''}
                ${widget.properties ? this.renderProperties(widget.properties) : ''}
                ${widget.events ? this.renderEvents(widget.events) : ''}
                ${widget.methods ? this.renderMethods(widget.methods) : ''}
                ${widget.example || widget.examples ? this.renderExamples(widget.examples || widget.example, hasAdvancedExample) : ''}
                ${widget.notes ? this.renderNotes(widget.notes) : ''}
                ${widget.warnings ? this.renderWarnings(widget.warnings) : ''}
            </div>
        `;
    }

    renderParameters(parameters) {
        return `
            <div class="property-section">
                <h2 class="section-title">
                    <i data-lucide="settings"></i>
                    Parameters
                </h2>
                <table class="property-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${parameters.map(param => `
                            <tr>
                                <td data-label="Name"><code class="property-name">${param.name}</code></td>
                                <td data-label="Type"><span class="property-type">${param.type}</span></td>
                                <td data-label="Required">${param.optional ? 'No' : 'Yes'}</td>
                                <td data-label="Description" class="property-description">${param.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderReturns(returns) {
        return `
            <div class="property-section">
                <h2 class="section-title">
                    <i data-lucide="corner-down-left"></i>
                    Returns
                </h2>
                <p><span class="property-type">${returns.type}</span> - ${returns.description}</p>
            </div>
        `;
    }

    renderProperties(properties) {
        return `
            <div class="property-section">
                <h2 class="section-title">
                    <i data-lucide="list"></i>
                    Properties
                </h2>
                <table class="property-table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${properties.map(prop => `
                            <tr>
                                <td data-label="Property">
                                    <code class="property-name">${prop.name}</code>
                                    ${prop.required ? ' <span style="color: var(--danger);">*</span>' : ''}
                                </td>
                                <td data-label="Type"><span class="property-type">${prop.type}</span></td>
                                <td data-label="Default"><code>${prop.default || 'N/A'}</code></td>
                                <td data-label="Description" class="property-description">${prop.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderEvents(events) {
        if (!events.length) return '';
        
        return `
            <div class="property-section">
                <h2 class="section-title">
                    <i data-lucide="zap"></i>
                    Events
                </h2>
                <table class="property-table">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Parameters</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${events.map(event => `
                            <tr>
                                <td data-label="Event"><code class="property-name">${event.name}</code></td>
                                <td data-label="Parameters"><code>${event.parameters}</code></td>
                                <td data-label="Description" class="property-description">${event.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderMethods(methods) {
        return `
            <div class="property-section">
                <h2 class="section-title">
                    <i data-lucide="function-square"></i>
                    Methods
                </h2>
                <table class="property-table">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${methods.map(method => `
                            <tr>
                                <td data-label="Method"><code class="property-name">${method.name}</code></td>
                                <td data-label="Description" class="property-description">${method.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderExamples(examples, hasAdvanced) {
        return `
            <div class="example-section">
                <h2 class="section-title">
                    <i data-lucide="code"></i>
                    Examples
                </h2>
                
                ${hasAdvanced ? `
                    <div class="example-tabs">
                        <button class="example-tab active" data-tab="basic">Basic Usage</button>
                        <button class="example-tab" data-tab="advanced">Advanced</button>
                    </div>
                ` : ''}
                
                <div class="example-content active" data-content="basic">
                    <div class="code-example">
                        <pre><code class="language-lua">${examples.basic || examples}</code></pre>
                        <button class="copy-btn" title="Copy code">
                            <i data-lucide="copy"></i>
                        </button>
                    </div>
                </div>
                
                ${hasAdvanced ? `
                    <div class="example-content" data-content="advanced">
                        <div class="code-example">
                            <pre><code class="language-lua">${examples.advanced}</code></pre>
                            <button class="copy-btn" title="Copy code">
                                <i data-lucide="copy"></i>
                            </button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderNotes(notes) {
        return `
            <div class="note">
                <div class="note-title">
                    <i data-lucide="info"></i>
                    Notes
                </div>
                <div class="note-content">
                    <ul>
                        ${notes.map(note => `<li>${note}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    renderWarnings(warnings) {
        return `
            <div class="warning">
                <div class="warning-title">
                    <i data-lucide="alert-triangle"></i>
                    Work In Progress
                </div>
                <div class="warning-content">
                    <ul>
                        ${warnings.map(warning => `<li>${warning}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    bindExampleTabs() {
        document.querySelectorAll('.example-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.example-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update active content
                document.querySelectorAll('.example-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.querySelector(`[data-content="${tabName}"]`).classList.add('active');
            });
        });
    }

    addCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const codeBlock = btn.parentElement.querySelector('code');
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    btn.innerHTML = '<i data-lucide="check"></i>';
                    setTimeout(() => {
                        btn.innerHTML = '<i data-lucide="copy"></i>';
                        lucide.createIcons();
                    }, 2000);
                });
            });
        });
    }

    updateActiveSidebarLink(activeLink) {
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    filterAndRenderContent() {
        // If there's a search term or filter, show filtered results
        if (this.searchTerm || this.currentFilter !== 'all') {
            this.showFilteredResults();
        } else {
            this.showOverview();
        }
    }

    showFilteredResults() {
        const filteredDocs = this.filterDocumentation();
        const content = document.getElementById('api-docs-content');
        
        if (filteredDocs.length === 0) {
            content.innerHTML = `
                <div class="no-results">
                    <i data-lucide="search-x"></i>
                    <h3>No results found</h3>
                    <p>Try adjusting your search terms or filters.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }
        
        content.innerHTML = `
            <div class="search-results">
                <div class="search-stats">
                    Found ${filteredDocs.length} result(s) for "${this.searchTerm}" 
                    ${this.currentFilter !== 'all' ? `in ${this.currentFilter}` : ''}
                </div>
                ${filteredDocs.map(doc => this.renderSearchResult(doc)).join('')}
            </div>
        `;
        
        lucide.createIcons();
    }

    filterDocumentation() {
        return Object.entries(this.docs).filter(([key, doc]) => {
            // Filter by category
            if (this.currentFilter !== 'all') {
                const categoryMatch = {
                    'widgets': doc.type === 'widget',
                    'functions': doc.type === 'function',
                    'events': doc.events && doc.events.length > 0,
                    'properties': doc.properties && doc.properties.length > 0
                };
                
                if (!categoryMatch[this.currentFilter]) return false;
            }
            
            // Filter by search term
            if (this.searchTerm) {
                const searchableText = [
                    doc.title,
                    doc.description,
                    doc.category,
                    ...(doc.properties || []).map(p => p.name + ' ' + p.description),
                    ...(doc.events || []).map(e => e.name + ' ' + e.description)
                ].join(' ').toLowerCase();
                
                return searchableText.includes(this.searchTerm);
            }
            
            return true;
        }).map(([key, doc]) => ({ key, ...doc }));
    }

    renderSearchResult(doc) {
        return `
            <div class="search-result-item" onclick="apiManager.showWidget('${doc.key}')">
                <h3>${doc.title} <span class="widget-category-badge">${doc.category}</span></h3>
                <p>${doc.description}</p>
            </div>
        `;
    }

    setupScrollToTop() {
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

        lucide.createIcons();
    }
}

// Mobile menu (reuse from main.js but disable for API page)
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobile-menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        // Don't initialize the regular mobile menu on API page
        // The mobile sidebar will handle the mobile menu toggle button
        console.log('MobileMenu: Skipping initialization on API page');
    }
}

// Mobile Sidebar Toggle for API page
class MobileSidebar {
    constructor() {
        this.sidebar = document.querySelector('.api-sidebar');
        this.content = document.querySelector('.api-content');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.init();
    }

    init() {
        // Wait for DOM to be fully ready
        if (!this.sidebar || !this.content) {
            console.warn('MobileSidebar: Required elements not found');
            return;
        }
        
        this.createToggleButton();
        this.bindEvents();
    }

    createToggleButton() {
        // Check if button already exists
        if (document.querySelector('.mobile-sidebar-toggle')) {
            this.toggleBtn = document.querySelector('.mobile-sidebar-toggle');
            return;
        }

        // Create mobile sidebar toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-sidebar-toggle';
        toggleBtn.innerHTML = '<i data-lucide="menu"></i><span>Navigation</span>';
        toggleBtn.setAttribute('aria-label', 'Toggle API Navigation');
        toggleBtn.setAttribute('type', 'button');

        // Insert before the API content
        const container = this.content.parentNode;
        container.insertBefore(toggleBtn, this.content);
        this.toggleBtn = toggleBtn;

        // Initialize lucide icons for the new button
        if (window.lucide) {
            window.lucide.createIcons();
        }

        console.log('MobileSidebar: Toggle button created');
    }

    bindEvents() {
        if (!this.toggleBtn) {
            console.warn('MobileSidebar: Toggle button not found');
            return;
        }

        // Add click event to toggle button
        this.toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleSidebar();
            console.log('MobileSidebar: Toggle clicked');
        });

        // Bind top navbar mobile menu toggle to API sidebar
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleSidebar();
                console.log('MobileSidebar: Top nav toggle clicked');
            });
        }

        // Close sidebar when clicking on content area
        this.content?.addEventListener('click', () => {
            this.closeSidebar();
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.sidebar.contains(e.target) && 
                !this.toggleBtn.contains(e.target) && 
                (!this.mobileMenuToggle || !this.mobileMenuToggle.contains(e.target))) {
                this.closeSidebar();
            }
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
            }
        });

        // Handle sidebar link clicks
        const sidebarLinks = this.sidebar.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Let the link navigate naturally, but close the sidebar
                setTimeout(() => {
                    this.closeSidebar();
                }, 100);
                console.log('MobileSidebar: Sidebar link clicked, closing sidebar');
            });
        });

        console.log('MobileSidebar: Events bound');
    }

    toggleSidebar() {
        const isOpen = this.sidebar.classList.contains('mobile-open');
        if (isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        this.sidebar.classList.add('mobile-open');
        this.toggleBtn.classList.add('active');
        this.toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        console.log('MobileSidebar: Sidebar opened');
    }

    closeSidebar() {
        this.sidebar.classList.remove('mobile-open');
        this.toggleBtn.classList.remove('active');
        this.toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
        console.log('MobileSidebar: Sidebar closed');
    }
}

// Initialize everything
let apiManager;

document.addEventListener('DOMContentLoaded', function() {
    console.log('API page: DOM loaded, initializing components...');
    
    new ThemeManager();
    new MobileMenu();
    
    // Initialize mobile sidebar with a small delay to ensure DOM is ready
    setTimeout(() => {
        new MobileSidebar();
    }, 100);
    
    new ScrollToTop();
    apiManager = new APIDocumentationManager();
    
    // Highlight code
    if (window.Prism) {
        Prism.highlightAll();
    }
    
    console.log('API page: All components initialized');
});

// Scroll to Top functionality
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scroll-top');
        this.init();
    }

    init() {
        if (!this.button) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });

        // Smooth scroll to top when clicked
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
