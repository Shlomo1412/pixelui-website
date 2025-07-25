// Code Export and Preview Manager
class CodeExportManager {
    constructor(generator) {
        this.generator = generator;
        this.setupExportHandlers();
    }
    
    setupExportHandlers() {
        // Export modal buttons
        document.getElementById('copy-code').addEventListener('click', () => this.copyCode());
        document.getElementById('download-code').addEventListener('click', () => this.downloadCode());
        document.getElementById('close-export').addEventListener('click', () => this.hideExport());
        
        // Export format buttons
        document.querySelectorAll('.export-format').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setExportFormat(e.target.dataset.format);
            });
        });
        
        // Close modal on backdrop click
        document.getElementById('export-modal').addEventListener('click', (e) => {
            if (e.target.id === 'export-modal') {
                this.hideExport();
            }
        });
    }
    
    showExport() {
        this.generateCode();
        document.getElementById('export-modal').classList.add('visible');
        document.body.style.overflow = 'hidden';
    }
    
    hideExport() {
        document.getElementById('export-modal').classList.remove('visible');
        document.body.style.overflow = '';
    }
    
    setExportFormat(format) {
        document.querySelectorAll('.export-format').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-format="${format}"]`).classList.add('active');
        
        this.currentFormat = format;
        this.generateCode();
    }
    
    generateCode() {
        const format = this.currentFormat || 'full';
        let code = '';
        
        switch (format) {
            case 'full':
                code = this.generateFullProgram();
                break;
            case 'widgets':
                code = this.generateWidgetsOnly();
                break;
            case 'function':
                code = this.generateFunction();
                break;
        }
        
        document.getElementById('export-code').textContent = code;
        this.highlightCode();
    }
    
    generateFullProgram() {
        const elements = Array.from(this.generator.elements.values());
        if (elements.length === 0) {
            return '-- No widgets to export';
        }
        
        let code = `-- Generated PixelUI Code
-- Created with PixelUI Visual Designer

local pixelui = require("pixelui")

-- Get the terminal dimensions
local termW, termH = term.getSize()

-- Create the root container
local root = pixelui.create("container", {
    x = 1,
    y = 1,
    width = termW,
    height = termH,
    isScrollable = false
})

`;
        
        // Generate widget variables and creation
        elements.forEach(element => {
            code += this.generateWidgetCode(element) + '\n';
        });
        
        code += `
-- Show the UI
root:show()

-- Main event loop
while true do
    local event, p1, p2, p3 = os.pullEvent()
    
    -- Handle events
    if event == "mouse_click" or event == "mouse_drag" or event == "mouse_up" then
        pixelui.handleMouse(event, p1, p2, p3)
    elseif event == "char" or event == "key" or event == "key_up" then
        pixelui.handleKeyboard(event, p1, p2)
    end
    
    -- Add your custom event handling here
    
    -- Exit condition (optional)
    if event == "key" and p1 == keys.q then
        break
    end
end

-- Clean up
pixelui.cleanup()`;
        
        return code;
    }
    
    generateWidgetsOnly() {
        const elements = Array.from(this.generator.elements.values());
        if (elements.length === 0) {
            return '-- No widgets to export';
        }
        
        let code = '-- Widget Creation Code\n\n';
        
        elements.forEach(element => {
            code += this.generateWidgetCode(element) + '\n';
        });
        
        return code;
    }
    
    generateFunction() {
        const elements = Array.from(this.generator.elements.values());
        if (elements.length === 0) {
            return '-- No widgets to export';
        }
        
        let code = `-- UI Creation Function
local function createUI(parent)
    local widgets = {}
    
`;
        
        elements.forEach(element => {
            const widgetCode = this.generateWidgetCode(element, 'parent');
            const varName = this.getVariableName(element);
            code += `    ${widgetCode}\n`;
            code += `    widgets.${varName} = ${varName}\n\n`;
        });
        
        code += `    return widgets
end

-- Usage:
-- local widgets = createUI(rootContainer)
-- Access widgets with: widgets.button1, widgets.label1, etc.`;
        
        return code;
    }
    
    generateWidgetCode(element, parentVar = 'root') {
        const varName = this.getVariableName(element);
        const config = this.getWidgetConfig(element);
        
        let code = `local ${varName} = pixelui.create("${element.type}", {\n`;
        
        // Add all configuration properties
        Object.entries(config).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (typeof value === 'string') {
                    code += `    ${key} = "${value}",\n`;
                } else if (Array.isArray(value)) {
                    code += `    ${key} = {${value.map(v => `"${v}"`).join(', ')}},\n`;
                } else {
                    code += `    ${key} = ${value},\n`;
                }
            }
        });
        
        code += `})`;
        
        if (parentVar && parentVar !== 'root') {
            code += `\n${parentVar}:addChild(${varName})`;
        }
        
        return code;
    }
    
    getVariableName(element) {
        // Convert element name to valid Lua variable name
        return element.name
            .replace(/[^a-zA-Z0-9]/g, '')
            .replace(/^[0-9]/, '_$&')
            .toLowerCase() || `${element.type}${element.id.split('_')[1]}`;
    }
    
    getWidgetConfig(element) {
        const config = {
            x: element.x,
            y: element.y,
            width: element.width,
            height: element.height
        };
        
        // Add type-specific properties
        switch (element.type) {
            case 'button':
                if (element.text) config.text = element.text;
                if (element.background) config.background = element.background;
                if (element.color) config.color = element.color;
                if (element.border !== undefined) config.border = element.border;
                if (element.enabled !== undefined) config.enabled = element.enabled;
                break;
                
            case 'label':
                if (element.text) config.text = element.text;
                if (element.color) config.color = element.color;
                if (element.align && element.align !== 'left') config.align = element.align;
                break;
                
            case 'textBox':
                if (element.text) config.text = element.text;
                if (element.placeholder) config.placeholder = element.placeholder;
                if (element.background) config.background = element.background;
                if (element.color) config.color = element.color;
                if (element.border !== undefined) config.border = element.border;
                if (element.readOnly) config.readOnly = element.readOnly;
                if (element.maxLength) config.maxLength = element.maxLength;
                break;
                
            case 'checkBox':
                if (element.text) config.text = element.text;
                if (element.color) config.color = element.color;
                if (element.checked) config.checked = element.checked;
                break;
                
            case 'radioButton':
                if (element.text) config.text = element.text;
                if (element.color) config.color = element.color;
                if (element.checked) config.checked = element.checked;
                if (element.group) config.group = element.group;
                break;
                
            case 'toggleSwitch':
                if (element.text) config.text = element.text;
                if (element.color) config.color = element.color;
                if (element.checked) config.checked = element.checked;
                break;
                
            case 'slider':
                if (element.value !== undefined) config.value = element.value;
                if (element.min !== undefined) config.min = element.min;
                if (element.max !== undefined) config.max = element.max;
                if (element.step !== undefined) config.step = element.step;
                if (element.trackColor) config.trackColor = element.trackColor;
                if (element.fillColor) config.fillColor = element.fillColor;
                if (element.knobColor) config.knobColor = element.knobColor;
                break;
                
            case 'progressBar':
                if (element.progress !== undefined) config.progress = element.progress;
                if (element.text) config.text = element.text;
                if (element.color) config.color = element.color;
                if (element.background) config.background = element.background;
                break;
                
            case 'container':
                if (element.background) config.background = element.background;
                if (element.border !== undefined) config.border = element.border;
                if (element.borderColor) config.borderColor = element.borderColor;
                if (element.isScrollable) config.isScrollable = element.isScrollable;
                break;
                
            case 'listView':
                if (element.items && element.items.length > 0) config.items = element.items;
                if (element.selected !== undefined) config.selected = element.selected;
                if (element.color) config.color = element.color;
                if (element.background) config.background = element.background;
                if (element.selectedColor) config.selectedColor = element.selectedColor;
                break;
        }
        
        return config;
    }
    
    copyCode() {
        const code = document.getElementById('export-code').textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
                this.showCopySuccess();
            }).catch(() => {
                this.fallbackCopy(code);
            });
        } else {
            this.fallbackCopy(code);
        }
    }
    
    fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            this.showCopyError();
        }
        
        document.body.removeChild(textarea);
    }
    
    showCopySuccess() {
        const btn = document.getElementById('copy-code');
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('success');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('success');
        }, 2000);
    }
    
    showCopyError() {
        const btn = document.getElementById('copy-code');
        const originalText = btn.textContent;
        btn.textContent = 'Copy Failed';
        btn.classList.add('error');
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('error');
        }, 2000);
    }
    
    downloadCode() {
        const code = document.getElementById('export-code').textContent;
        const filename = this.getFilename();
        
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }
    
    getFilename() {
        const format = this.currentFormat || 'full';
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
        
        const baseName = 'pixelui_design';
        const extension = '.lua';
        
        return `${baseName}_${format}_${timestamp}${extension}`;
    }
    
    highlightCode() {
        // Simple syntax highlighting for Lua
        const codeElement = document.getElementById('export-code');
        let code = codeElement.textContent;
        
        // Highlight Lua keywords
        const keywords = [
            'local', 'function', 'end', 'if', 'then', 'else', 'elseif', 'while', 'do', 'for', 'in',
            'repeat', 'until', 'break', 'return', 'and', 'or', 'not', 'true', 'false', 'nil'
        ];
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        code = code.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
        
        // Highlight comments
        code = code.replace(/--([^\n]*)/g, '<span class="comment">--$1</span>');
        
        // Highlight numbers
        code = code.replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>');
        
        codeElement.innerHTML = code;
    }
}

// Preview Manager
class PreviewManager {
    constructor(generator) {
        this.generator = generator;
        this.setupPreviewHandlers();
    }
    
    setupPreviewHandlers() {
        // Preview modal buttons
        document.getElementById('close-preview').addEventListener('click', () => this.hidePreview());
        
        // Close modal on backdrop click
        document.getElementById('preview-modal').addEventListener('click', (e) => {
            if (e.target.id === 'preview-modal') {
                this.hidePreview();
            }
        });
    }
    
    showPreview() {
        this.generatePreview();
        document.getElementById('preview-modal').classList.add('visible');
        document.body.style.overflow = 'hidden';
    }
    
    hidePreview() {
        document.getElementById('preview-modal').classList.remove('visible');
        document.body.style.overflow = '';
    }
    
    generatePreview() {
        const previewContainer = document.getElementById('preview-content');
        const elements = Array.from(this.generator.elements.values());
        
        if (elements.length === 0) {
            previewContainer.innerHTML = `
                <div class="no-preview">
                    <p>No widgets to preview</p>
                </div>
            `;
            return;
        }
        
        // Calculate canvas bounds
        const bounds = this.getCanvasBounds(elements);
        
        // Create preview canvas
        previewContainer.innerHTML = `
            <div class="preview-canvas" style="
                width: ${bounds.width * 8}px;
                height: ${bounds.height * 16}px;
                position: relative;
                background: #000;
                border: 1px solid #333;
                font-family: 'Courier New', monospace;
                font-size: 8px;
                margin: 0 auto;
            ">
                ${this.renderPreviewElements(elements, bounds)}
            </div>
        `;
    }
    
    getCanvasBounds(elements) {
        if (elements.length === 0) {
            return { minX: 0, minY: 0, width: 51, height: 19 };
        }
        
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        
        elements.forEach(element => {
            minX = Math.min(minX, element.x);
            minY = Math.min(minY, element.y);
            maxX = Math.max(maxX, element.x + element.width);
            maxY = Math.max(maxY, element.y + element.height);
        });
        
        // Add padding
        const padding = 2;
        minX = Math.max(0, minX - padding);
        minY = Math.max(0, minY - padding);
        maxX += padding;
        maxY += padding;
        
        // Ensure minimum size (ComputerCraft terminal)
        const width = Math.max(51, maxX - minX);
        const height = Math.max(19, maxY - minY);
        
        return { minX, minY, width, height };
    }
    
    renderPreviewElements(elements, bounds) {
        let html = '';
        
        elements.forEach(element => {
            if (element.visible === false) return;
            
            const x = (element.x - bounds.minX) * 8;
            const y = (element.y - bounds.minY) * 16;
            const width = element.width * 8;
            const height = element.height * 16;
            
            html += `
                <div style="
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${width}px;
                    height: ${height}px;
                    z-index: ${this.getElementZIndex(element)};
                ">
                    ${this.renderPreviewElement(element)}
                </div>
            `;
        });
        
        return html;
    }
    
    renderPreviewElement(element) {
        switch (element.type) {
            case 'button':
                return `
                    <div style="
                        width: 100%;
                        height: 100%;
                        background-color: ${this.generator.getComputerCraftColor(element.background)};
                        color: ${this.generator.getComputerCraftColor(element.color)};
                        border: ${element.border ? '1px solid #666' : 'none'};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        cursor: pointer;
                    ">${element.text || 'Button'}</div>
                `;
                
            case 'label':
                return `
                    <div style="
                        width: 100%;
                        height: 100%;
                        color: ${this.generator.getComputerCraftColor(element.color)};
                        display: flex;
                        align-items: center;
                        justify-content: ${element.align === 'center' ? 'center' : element.align === 'right' ? 'flex-end' : 'flex-start'};
                    ">${element.text || 'Label'}</div>
                `;
                
            case 'textBox':
                return `
                    <div style="
                        width: 100%;
                        height: 100%;
                        background-color: ${this.generator.getComputerCraftColor(element.background)};
                        color: ${this.generator.getComputerCraftColor(element.color)};
                        border: ${element.border ? '1px solid #666' : 'none'};
                        display: flex;
                        align-items: center;
                        padding: 0 4px;
                        overflow: hidden;
                    ">${element.text || element.placeholder || ''}</div>
                `;
                
            case 'container':
                return `
                    <div style="
                        width: 100%;
                        height: 100%;
                        background-color: ${element.background ? this.generator.getComputerCraftColor(element.background) : 'transparent'};
                        border: ${element.border ? `1px solid ${this.generator.getComputerCraftColor(element.borderColor || 'lightGray')}` : 'none'};
                    "></div>
                `;
                
            default:
                return this.generator.renderWidgetContent(element);
        }
    }
    
    getElementZIndex(element) {
        // Simple z-index based on creation order
        const num = parseInt(element.id.split('_')[1]);
        return num;
    }
}

// Extend the main generator class
if (typeof PixelUIGenerator !== 'undefined') {
    PixelUIGenerator.prototype.initializeExportManagers = function() {
        this.codeExportManager = new CodeExportManager(this);
        this.previewManager = new PreviewManager(this);
    };
    
    PixelUIGenerator.prototype.showExport = function() {
        this.codeExportManager?.showExport();
    };
    
    PixelUIGenerator.prototype.showPreview = function() {
        this.previewManager?.showPreview();
    };
    
    // Add initialization to the constructor
    const originalInitManagers = PixelUIGenerator.prototype.initializeManagers;
    PixelUIGenerator.prototype.initializeManagers = function() {
        if (originalInitManagers) {
            originalInitManagers.call(this);
        }
        this.initializeExportManagers();
    };
}
