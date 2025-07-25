// PixelUI Generator Core
class PixelUIGenerator {
    constructor() {
        this.canvas = null;
        this.elements = new Map();
        this.selectedElement = null;
        this.clipboard = null;
        this.history = [];
        this.historyIndex = -1;
        this.zoom = 1;
        this.pan = { x: 0, y: 0 };
        this.grid = { visible: false, snap: true };
        this.rulers = { visible: false };
        this.currentTool = 'select';
        this.dragState = null;
        this.resizeState = null;
        this.elementCounter = 0;
        
        this.init();
    }
    
    init() {
        this.canvas = document.getElementById('design-canvas');
        this.setupEventListeners();
        this.setupToolbar();
        this.setupWidgetLibrary();
        this.setupPropertiesPanel();
        this.setupLayersPanel();
        this.setupContextMenu();
        this.setupKeyboardShortcuts();
        
        // Initialize with root container
        this.addToHistory();
    }
    
    setupEventListeners() {
        // Canvas events
        this.canvas.addEventListener('mousedown', this.handleCanvasMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasMouseUp.bind(this));
        this.canvas.addEventListener('contextmenu', this.handleCanvasContextMenu.bind(this));
        this.canvas.addEventListener('wheel', this.handleCanvasWheel.bind(this));
        
        // Window events
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
    }
    
    setupToolbar() {
        // Tool selection
        document.querySelectorAll('[data-tool]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTool(e.target.closest('[data-tool]').dataset.tool);
            });
        });
        
        // Zoom controls
        document.getElementById('zoom-in').addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomOut());
        document.getElementById('zoom-fit').addEventListener('click', () => this.zoomToFit());
        
        // Edit actions
        document.getElementById('undo').addEventListener('click', () => this.undo());
        document.getElementById('redo').addEventListener('click', () => this.redo());
        document.getElementById('copy').addEventListener('click', () => this.copy());
        document.getElementById('paste').addEventListener('click', () => this.paste());
        document.getElementById('delete').addEventListener('click', () => this.deleteSelected());
        
        // Canvas controls
        document.getElementById('grid-toggle').addEventListener('click', () => this.toggleGrid());
        document.getElementById('snap-toggle').addEventListener('click', () => this.toggleSnap());
        document.getElementById('rulers-toggle').addEventListener('click', () => this.toggleRulers());
        
        // Main actions
        document.getElementById('preview').addEventListener('click', () => this.showPreview());
        document.getElementById('export').addEventListener('click', () => this.showExport());
    }
    
    setupWidgetLibrary() {
        const library = document.querySelector('.library-content');
        const search = document.querySelector('.library-search');
        
        // Search functionality
        search.addEventListener('input', (e) => {
            this.filterWidgets(e.target.value);
        });
        
        // Widget drag and drop
        document.querySelectorAll('.widget-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('widget-type', item.dataset.widget);
                e.dataTransfer.effectAllowed = 'copy';
            });
            
            item.addEventListener('click', (e) => {
                this.addWidget(item.dataset.widget);
            });
        });
        
        // Canvas drop zone
        this.canvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });
        
        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            const widgetType = e.dataTransfer.getData('widget-type');
            if (widgetType) {
                const rect = this.canvas.getBoundingClientRect();
                const x = Math.round((e.clientX - rect.left) / 12);
                const y = Math.round((e.clientY - rect.top) / 12);
                this.addWidget(widgetType, { x, y });
            }
        });
    }
    
    setupPropertiesPanel() {
        // Properties panel will be populated dynamically
        this.propertiesContent = document.getElementById('properties-content');
    }
    
    setupLayersPanel() {
        this.layersList = document.getElementById('layers-list');
        
        // Layer actions
        document.getElementById('add-layer').addEventListener('click', () => this.addLayer());
        document.getElementById('duplicate-layer').addEventListener('click', () => this.duplicateLayer());
        document.getElementById('delete-layer').addEventListener('click', () => this.deleteLayer());
    }
    
    setupContextMenu() {
        this.contextMenu = document.getElementById('context-menu');
        
        document.addEventListener('click', () => {
            this.hideContextMenu();
        });
        
        document.querySelectorAll('.context-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = item.dataset.action;
                this.executeContextAction(action);
                this.hideContextMenu();
            });
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            const ctrl = e.ctrlKey || e.metaKey;
            
            switch (e.key) {
                case 'Delete':
                case 'Backspace':
                    this.deleteSelected();
                    e.preventDefault();
                    break;
                case 'c':
                    if (ctrl) {
                        this.copy();
                        e.preventDefault();
                    }
                    break;
                case 'v':
                    if (ctrl) {
                        this.paste();
                        e.preventDefault();
                    }
                    break;
                case 'd':
                    if (ctrl) {
                        this.duplicate();
                        e.preventDefault();
                    }
                    break;
                case 'z':
                    if (ctrl && !e.shiftKey) {
                        this.undo();
                        e.preventDefault();
                    } else if (ctrl && e.shiftKey) {
                        this.redo();
                        e.preventDefault();
                    }
                    break;
                case 'a':
                    if (ctrl) {
                        this.selectAll();
                        e.preventDefault();
                    }
                    break;
                case 'Escape':
                    this.deselectAll();
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    if (this.selectedElement) {
                        this.moveSelectedElement(e.key, e.shiftKey ? 10 : 1);
                        e.preventDefault();
                    }
                    break;
            }
        });
    }
    
    // Tool Management
    setTool(tool) {
        this.currentTool = tool;
        
        // Update toolbar UI
        document.querySelectorAll('[data-tool]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tool="${tool}"]`)?.classList.add('active');
        
        // Update cursor
        this.updateCanvasCursor();
    }
    
    updateCanvasCursor() {
        const cursors = {
            select: 'default',
            pan: 'grab'
        };
        
        this.canvas.style.cursor = cursors[this.currentTool] || 'crosshair';
    }
    
    // Widget Management
    addWidget(type, position = null) {
        const element = this.createWidgetElement(type, position);
        if (element) {
            this.elements.set(element.id, element);
            this.renderElement(element);
            this.selectElement(element);
            this.addToHistory();
            this.updateLayersList();
        }
    }
    
    createWidgetElement(type, position = null) {
        const id = `widget_${++this.elementCounter}`;
        const defaultPos = position || { x: 5, y: 5 };
        
        const widgetConfigs = {
            button: {
                type: 'button',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 8,
                height: 3,
                text: 'Button',
                background: 'gray',
                color: 'white',
                border: true
            },
            label: {
                type: 'label',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 5,
                height: 1,
                text: 'Label',
                color: 'white',
                align: 'left'
            },
            textBox: {
                type: 'textBox',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 16,
                height: 1,
                text: '',
                placeholder: 'Type here...',
                color: 'white',
                background: 'black',
                border: true
            },
            checkBox: {
                type: 'checkBox',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 8,
                height: 1,
                checked: false,
                text: 'Checkbox',
                color: 'white'
            },
            radioButton: {
                type: 'radioButton',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 10,
                height: 1,
                checked: false,
                text: 'Radio',
                group: 'group1',
                color: 'white'
            },
            toggleSwitch: {
                type: 'toggleSwitch',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 12,
                height: 1,
                checked: false,
                text: 'Toggle',
                color: 'white'
            },
            slider: {
                type: 'slider',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 20,
                height: 1,
                value: 50,
                min: 0,
                max: 100,
                trackColor: 'gray',
                fillColor: 'blue',
                knobColor: 'white'
            },
            progressBar: {
                type: 'progressBar',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 20,
                height: 1,
                progress: 75,
                color: 'green',
                background: 'gray',
                text: 'Loading...'
            },
            container: {
                type: 'container',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 20,
                height: 10,
                border: true,
                borderColor: 'lightGray',
                background: null,
                isScrollable: false
            },
            listView: {
                type: 'listView',
                x: defaultPos.x,
                y: defaultPos.y,
                width: 15,
                height: 8,
                items: ['Item 1', 'Item 2', 'Item 3'],
                selected: 1,
                color: 'white',
                background: 'black',
                selectedColor: 'blue'
            }
        };
        
        const config = widgetConfigs[type];
        if (!config) return null;
        
        return {
            id,
            ...config,
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${this.elementCounter}`
        };
    }
    
    renderElement(element) {
        // Remove existing element if it exists
        const existing = document.getElementById(element.id);
        if (existing) {
            existing.remove();
        }
        
        // Create DOM element
        const div = document.createElement('div');
        div.id = element.id;
        div.className = 'canvas-element';
        div.style.left = `${element.x * 12}px`;
        div.style.top = `${element.y * 12}px`;
        div.style.width = `${element.width * 12}px`;
        div.style.height = `${element.height * 12}px`;
        
        // Render widget content
        div.innerHTML = this.renderWidgetContent(element);
        
        // Add event listeners
        div.addEventListener('mousedown', (e) => this.handleElementMouseDown(e, element));
        div.addEventListener('contextmenu', (e) => this.handleElementContextMenu(e, element));
        
        // Add to canvas
        this.canvas.querySelector('.canvas-content').appendChild(div);
        
        // Add resize handles if selected
        if (this.selectedElement?.id === element.id) {
            this.showResizeHandles(div);
        }
    }
    
    renderWidgetContent(element) {
        const renderers = {
            button: (el) => `
                <div style="
                    width: 100%;
                    height: 100%;
                    background-color: ${this.getComputerCraftColor(el.background)};
                    color: ${this.getComputerCraftColor(el.color)};
                    border: ${el.border ? '1px solid #666' : 'none'};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Courier New', monospace;
                    font-size: 10px;
                    font-weight: bold;
                    border-radius: 2px;
                ">${el.text || 'Button'}</div>
            `,
            label: (el) => `
                <div style="
                    width: 100%;
                    height: 100%;
                    color: ${this.getComputerCraftColor(el.color)};
                    font-family: 'Courier New', monospace;
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: ${el.align === 'center' ? 'center' : el.align === 'right' ? 'flex-end' : 'flex-start'};
                ">${el.text || 'Label'}</div>
            `,
            textBox: (el) => `
                <div style="
                    width: 100%;
                    height: 100%;
                    background-color: ${this.getComputerCraftColor(el.background)};
                    color: ${this.getComputerCraftColor(el.color)};
                    border: ${el.border ? '1px solid #666' : 'none'};
                    font-family: 'Courier New', monospace;
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    padding: 0 2px;
                    overflow: hidden;
                ">${el.text || el.placeholder || ''}</div>
            `,
            checkBox: (el) => `
                <div style="
                    width: 100%;
                    height: 100%;
                    color: ${this.getComputerCraftColor(el.color)};
                    font-family: 'Courier New', monospace;
                    font-size: 10px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                ">
                    <span style="color: #888;">[${el.checked ? 'X' : ' '}]</span>
                    <span>${el.text || 'Checkbox'}</span>
                </div>
            `,
            container: (el) => `
                <div style="
                    width: 100%;
                    height: 100%;
                    background-color: ${el.background ? this.getComputerCraftColor(el.background) : 'transparent'};
                    border: ${el.border ? `1px solid ${this.getComputerCraftColor(el.borderColor || 'lightGray')}` : 'none'};
                    border-radius: 2px;
                "></div>
            `,
            progressBar: (el) => `
                <div style="
                    width: 100%;
                    height: 100%;
                    background-color: ${this.getComputerCraftColor(el.background)};
                    border-radius: 2px;
                    overflow: hidden;
                    position: relative;
                    font-family: 'Courier New', monospace;
                    font-size: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <div style="
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: ${el.progress || 0}%;
                        background-color: ${this.getComputerCraftColor(el.color)};
                    "></div>
                    <span style="position: relative; z-index: 1; color: white;">${el.text || ''}</span>
                </div>
            `
        };
        
        const renderer = renderers[element.type];
        return renderer ? renderer(element) : `<div style="background: #333; color: #fff; padding: 2px; font-size: 8px;">${element.type}</div>`;
    }
    
    getComputerCraftColor(colorName) {
        const colors = {
            white: '#F0F0F0',
            orange: '#F2B233',
            magenta: '#E57FD8',
            lightBlue: '#99B2F2',
            yellow: '#DEDE6C',
            lime: '#7FCC19',
            pink: '#F2B2CC',
            gray: '#4C4C4C',
            lightGray: '#999999',
            cyan: '#4C99B2',
            purple: '#B266E5',
            blue: '#3366CC',
            brown: '#7F664C',
            green: '#57A64E',
            red: '#CC4C4C',
            black: '#191919'
        };
        
        return colors[colorName] || colors.white;
    }
    
    // Selection Management
    selectElement(element) {
        this.deselectAll();
        this.selectedElement = element;
        
        const domElement = document.getElementById(element.id);
        if (domElement) {
            domElement.classList.add('selected');
            this.showResizeHandles(domElement);
        }
        
        this.updatePropertiesPanel();
        this.updateLayersList();
        this.updateToolbarState();
    }
    
    deselectAll() {
        if (this.selectedElement) {
            const domElement = document.getElementById(this.selectedElement.id);
            if (domElement) {
                domElement.classList.remove('selected');
                this.hideResizeHandles();
            }
        }
        
        this.selectedElement = null;
        this.updatePropertiesPanel();
        this.updateLayersList();
        this.updateToolbarState();
    }
    
    showResizeHandles(element) {
        this.hideResizeHandles();
        
        const handles = document.createElement('div');
        handles.className = 'resize-handles';
        handles.innerHTML = `
            <div class="resize-handle nw" data-direction="nw"></div>
            <div class="resize-handle n" data-direction="n"></div>
            <div class="resize-handle ne" data-direction="ne"></div>
            <div class="resize-handle e" data-direction="e"></div>
            <div class="resize-handle se" data-direction="se"></div>
            <div class="resize-handle s" data-direction="s"></div>
            <div class="resize-handle sw" data-direction="sw"></div>
            <div class="resize-handle w" data-direction="w"></div>
        `;
        
        handles.querySelectorAll('.resize-handle').forEach(handle => {
            handle.addEventListener('mousedown', (e) => this.handleResizeStart(e, handle.dataset.direction));
        });
        
        element.appendChild(handles);
    }
    
    hideResizeHandles() {
        document.querySelectorAll('.resize-handles').forEach(handles => {
            handles.remove();
        });
    }
    
    // Mouse Event Handlers
    handleCanvasMouseDown(e) {
        if (e.target === this.canvas || e.target.classList.contains('canvas-background') || 
            e.target.classList.contains('canvas-grid') || e.target.classList.contains('canvas-content')) {
            this.deselectAll();
        }
    }
    
    handleElementMouseDown(e, element) {
        e.stopPropagation();
        
        if (this.currentTool === 'select') {
            this.selectElement(element);
            
            // Start drag
            this.dragState = {
                element,
                startX: e.clientX,
                startY: e.clientY,
                elementStartX: element.x,
                elementStartY: element.y
            };
        }
    }
    
    handleCanvasMouseMove(e) {
        if (this.dragState) {
            const deltaX = Math.round((e.clientX - this.dragState.startX) / 12);
            const deltaY = Math.round((e.clientY - this.dragState.startY) / 12);
            
            const newX = this.dragState.elementStartX + deltaX;
            const newY = this.dragState.elementStartY + deltaY;
            
            this.updateElementPosition(this.dragState.element, newX, newY);
        } else if (this.resizeState) {
            this.handleResize(e);
        }
    }
    
    handleCanvasMouseUp(e) {
        if (this.dragState) {
            this.addToHistory();
            this.dragState = null;
        } else if (this.resizeState) {
            this.addToHistory();
            this.resizeState = null;
        }
    }
    
    handleElementContextMenu(e, element) {
        e.preventDefault();
        e.stopPropagation();
        this.selectElement(element);
        this.showContextMenu(e.clientX, e.clientY);
    }
    
    handleCanvasContextMenu(e) {
        e.preventDefault();
        if (e.target === this.canvas || e.target.closest('.canvas-content')) {
            this.showContextMenu(e.clientX, e.clientY);
        }
    }
    
    // Resize Handling
    handleResizeStart(e, direction) {
        e.stopPropagation();
        
        this.resizeState = {
            direction,
            startX: e.clientX,
            startY: e.clientY,
            element: this.selectedElement,
            startWidth: this.selectedElement.width,
            startHeight: this.selectedElement.height,
            startPosX: this.selectedElement.x,
            startPosY: this.selectedElement.y
        };
    }
    
    handleResize(e) {
        if (!this.resizeState) return;
        
        const deltaX = Math.round((e.clientX - this.resizeState.startX) / 12);
        const deltaY = Math.round((e.clientY - this.resizeState.startY) / 12);
        
        const { direction, element, startWidth, startHeight, startPosX, startPosY } = this.resizeState;
        
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newX = startPosX;
        let newY = startPosY;
        
        // Handle different resize directions
        if (direction.includes('e')) newWidth = Math.max(1, startWidth + deltaX);
        if (direction.includes('w')) {
            newWidth = Math.max(1, startWidth - deltaX);
            newX = startPosX + deltaX;
        }
        if (direction.includes('s')) newHeight = Math.max(1, startHeight + deltaY);
        if (direction.includes('n')) {
            newHeight = Math.max(1, startHeight - deltaY);
            newY = startPosY + deltaY;
        }
        
        // Apply constraints
        if (newWidth !== element.width || newHeight !== element.height || newX !== element.x || newY !== element.y) {
            element.width = newWidth;
            element.height = newHeight;
            element.x = newX;
            element.y = newY;
            
            this.renderElement(element);
            this.updatePropertiesPanel();
        }
    }
    
    // Utility Methods
    updateElementPosition(element, x, y) {
        element.x = Math.max(0, x);
        element.y = Math.max(0, y);
        this.renderElement(element);
        this.updatePropertiesPanel();
    }
    
    filterWidgets(searchTerm) {
        const items = document.querySelectorAll('.widget-item');
        const term = searchTerm.toLowerCase();
        
        items.forEach(item => {
            const name = item.querySelector('span').textContent.toLowerCase();
            const visible = name.includes(term);
            item.style.display = visible ? 'flex' : 'none';
        });
    }
    
    updateToolbarState() {
        const hasSelection = !!this.selectedElement;
        const hasClipboard = !!this.clipboard;
        
        document.getElementById('copy').disabled = !hasSelection;
        document.getElementById('paste').disabled = !hasClipboard;
        document.getElementById('delete').disabled = !hasSelection;
        document.getElementById('undo').disabled = this.historyIndex <= 0;
        document.getElementById('redo').disabled = this.historyIndex >= this.history.length - 1;
    }
    
    showContextMenu(x, y) {
        const menu = this.contextMenu;
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.classList.add('visible');
        
        // Position adjustment if menu goes off screen
        setTimeout(() => {
            const rect = menu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                menu.style.left = `${x - rect.width}px`;
            }
            if (rect.bottom > window.innerHeight) {
                menu.style.top = `${y - rect.height}px`;
            }
        }, 0);
    }
    
    hideContextMenu() {
        this.contextMenu.classList.remove('visible');
    }
    
    // History Management
    addToHistory() {
        const state = this.saveState();
        
        // Remove any history after current index
        this.history = this.history.slice(0, this.historyIndex + 1);
        
        // Add new state
        this.history.push(state);
        this.historyIndex = this.history.length - 1;
        
        // Limit history size
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
        
        this.updateToolbarState();
    }
    
    saveState() {
        return {
            elements: new Map(this.elements),
            selectedElementId: this.selectedElement?.id || null
        };
    }
    
    loadState(state) {
        this.elements = new Map(state.elements);
        this.selectedElement = state.selectedElementId ? this.elements.get(state.selectedElementId) : null;
        
        // Re-render all elements
        this.canvas.querySelector('.canvas-content').innerHTML = '';
        this.elements.forEach(element => {
            this.renderElement(element);
        });
        
        if (this.selectedElement) {
            const domElement = document.getElementById(this.selectedElement.id);
            if (domElement) {
                domElement.classList.add('selected');
                this.showResizeHandles(domElement);
            }
        }
        
        this.updatePropertiesPanel();
        this.updateLayersList();
        this.updateToolbarState();
    }
    
    // Actions
    copy() {
        if (this.selectedElement) {
            this.clipboard = JSON.parse(JSON.stringify(this.selectedElement));
            this.updateToolbarState();
        }
    }
    
    paste() {
        if (this.clipboard) {
            const element = JSON.parse(JSON.stringify(this.clipboard));
            element.id = `widget_${++this.elementCounter}`;
            element.name = `${element.type.charAt(0).toUpperCase() + element.type.slice(1)} ${this.elementCounter}`;
            element.x += 2;
            element.y += 2;
            
            this.elements.set(element.id, element);
            this.renderElement(element);
            this.selectElement(element);
            this.addToHistory();
            this.updateLayersList();
        }
    }
    
    duplicate() {
        this.copy();
        this.paste();
    }
    
    deleteSelected() {
        if (this.selectedElement) {
            const element = this.selectedElement;
            this.elements.delete(element.id);
            document.getElementById(element.id)?.remove();
            this.deselectAll();
            this.addToHistory();
            this.updateLayersList();
        }
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.loadState(this.history[this.historyIndex]);
        }
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.loadState(this.history[this.historyIndex]);
        }
    }
    
    // Canvas Controls
    zoomIn() {
        this.setZoom(Math.min(this.zoom * 1.2, 3));
    }
    
    zoomOut() {
        this.setZoom(Math.max(this.zoom / 1.2, 0.25));
    }
    
    zoomToFit() {
        this.setZoom(1);
        this.pan = { x: 0, y: 0 };
        this.updateCanvasTransform();
    }
    
    setZoom(zoom) {
        this.zoom = zoom;
        this.updateCanvasTransform();
        this.updateZoomDisplay();
    }
    
    updateCanvasTransform() {
        const content = this.canvas.querySelector('.canvas-content');
        content.style.transform = `scale(${this.zoom}) translate(${this.pan.x}px, ${this.pan.y}px)`;
    }
    
    updateZoomDisplay() {
        document.querySelector('.zoom-level').textContent = `${Math.round(this.zoom * 100)}%`;
    }
    
    toggleGrid() {
        this.grid.visible = !this.grid.visible;
        const gridElement = this.canvas.querySelector('.canvas-grid');
        gridElement.classList.toggle('visible', this.grid.visible);
        document.getElementById('grid-toggle').classList.toggle('active', this.grid.visible);
    }
    
    toggleSnap() {
        this.grid.snap = !this.grid.snap;
        document.getElementById('snap-toggle').classList.toggle('active', this.grid.snap);
    }
    
    toggleRulers() {
        this.rulers.visible = !this.rulers.visible;
        const rulers = this.canvas.querySelector('.canvas-rulers');
        rulers.style.display = this.rulers.visible ? 'block' : 'none';
        document.getElementById('rulers-toggle').classList.toggle('active', this.rulers.visible);
    }
    
    // Initialize placeholder methods for panels
    updatePropertiesPanel() {
        // Will be implemented in generator-widgets.js
    }
    
    updateLayersList() {
        // Will be implemented in generator-widgets.js
    }
    
    showPreview() {
        // Will be implemented in generator-preview.js
    }
    
    showExport() {
        // Will be implemented in generator-export.js
    }
    
    executeContextAction(action) {
        switch (action) {
            case 'copy': this.copy(); break;
            case 'paste': this.paste(); break;
            case 'duplicate': this.duplicate(); break;
            case 'delete': this.deleteSelected(); break;
            case 'bring-forward': this.bringForward(); break;
            case 'send-backward': this.sendBackward(); break;
        }
    }
    
    bringForward() {
        if (this.selectedElement) {
            // Bring element forward in z-index
            const domElement = document.getElementById(this.selectedElement.id);
            if (domElement) {
                domElement.style.zIndex = (parseInt(domElement.style.zIndex || '0') + 1).toString();
            }
        }
    }
    
    sendBackward() {
        if (this.selectedElement) {
            // Send element backward in z-index
            const domElement = document.getElementById(this.selectedElement.id);
            if (domElement) {
                domElement.style.zIndex = Math.max(0, parseInt(domElement.style.zIndex || '0') - 1).toString();
            }
        }
    }
    
    moveSelectedElement(direction, distance) {
        if (!this.selectedElement) return;
        
        let { x, y } = this.selectedElement;
        
        switch (direction) {
            case 'ArrowUp': y -= distance; break;
            case 'ArrowDown': y += distance; break;
            case 'ArrowLeft': x -= distance; break;
            case 'ArrowRight': x += distance; break;
        }
        
        this.updateElementPosition(this.selectedElement, x, y);
        this.addToHistory();
    }
    
    selectAll() {
        // For now, just select the first element
        const firstElement = this.elements.values().next().value;
        if (firstElement) {
            this.selectElement(firstElement);
        }
    }
    
    handleCanvasWheel(e) {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.setZoom(Math.max(0.25, Math.min(3, this.zoom * delta)));
        }
    }
    
    handleWindowResize() {
        // Update canvas dimensions if needed
        this.updateCanvasTransform();
    }
    
    handleBeforeUnload(e) {
        if (this.elements.size > 0) {
            e.preventDefault();
            e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        }
    }
}

// Initialize generator when DOM is loaded
let generator;
document.addEventListener('DOMContentLoaded', () => {
    generator = new PixelUIGenerator();
});
