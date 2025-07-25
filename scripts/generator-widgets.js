// Properties Panel and Widget Configuration
class WidgetPropertiesManager {
    constructor(generator) {
        this.generator = generator;
        this.propertiesPanel = document.getElementById('properties-content');
        this.setupPropertyChangeHandlers();
    }
    
    setupPropertyChangeHandlers() {
        // Delegate event handling for dynamic property inputs
        this.propertiesPanel.addEventListener('input', this.handlePropertyChange.bind(this));
        this.propertiesPanel.addEventListener('change', this.handlePropertyChange.bind(this));
    }
    
    updatePropertiesPanel(element) {
        if (!element) {
            this.propertiesPanel.innerHTML = `
                <div class="no-selection">
                    <i class="icon-info"></i>
                    <p>Select an element to edit its properties</p>
                </div>
            `;
            return;
        }
        
        const properties = this.getWidgetProperties(element);
        this.propertiesPanel.innerHTML = this.renderPropertiesForm(element, properties);
    }
    
    getWidgetProperties(element) {
        const commonProperties = {
            position: {
                title: 'Position',
                fields: {
                    x: { type: 'number', label: 'X', value: element.x, min: 0 },
                    y: { type: 'number', label: 'Y', value: element.y, min: 0 }
                }
            },
            size: {
                title: 'Size',
                fields: {
                    width: { type: 'number', label: 'Width', value: element.width, min: 1 },
                    height: { type: 'number', label: 'Height', value: element.height, min: 1 }
                }
            },
            general: {
                title: 'General',
                fields: {
                    name: { type: 'text', label: 'Name', value: element.name }
                }
            }
        };
        
        const typeSpecificProperties = {
            button: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        text: { type: 'text', label: 'Text', value: element.text || 'Button' },
                        background: { type: 'color', label: 'Background', value: element.background || 'gray' },
                        color: { type: 'color', label: 'Text Color', value: element.color || 'white' },
                        border: { type: 'checkbox', label: 'Show Border', value: element.border }
                    }
                },
                behavior: {
                    title: 'Behavior',
                    fields: {
                        enabled: { type: 'checkbox', label: 'Enabled', value: element.enabled !== false }
                    }
                }
            },
            label: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        text: { type: 'text', label: 'Text', value: element.text || 'Label' },
                        color: { type: 'color', label: 'Color', value: element.color || 'white' },
                        align: { 
                            type: 'select', 
                            label: 'Alignment', 
                            value: element.align || 'left',
                            options: [
                                { value: 'left', label: 'Left' },
                                { value: 'center', label: 'Center' },
                                { value: 'right', label: 'Right' }
                            ]
                        }
                    }
                }
            },
            textBox: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        text: { type: 'text', label: 'Text', value: element.text || '' },
                        placeholder: { type: 'text', label: 'Placeholder', value: element.placeholder || 'Type here...' },
                        background: { type: 'color', label: 'Background', value: element.background || 'black' },
                        color: { type: 'color', label: 'Text Color', value: element.color || 'white' },
                        border: { type: 'checkbox', label: 'Show Border', value: element.border }
                    }
                },
                behavior: {
                    title: 'Behavior',
                    fields: {
                        readOnly: { type: 'checkbox', label: 'Read Only', value: element.readOnly || false },
                        maxLength: { type: 'number', label: 'Max Length', value: element.maxLength || 50, min: 1 }
                    }
                }
            },
            checkBox: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        text: { type: 'text', label: 'Text', value: element.text || 'Checkbox' },
                        color: { type: 'color', label: 'Color', value: element.color || 'white' },
                        checked: { type: 'checkbox', label: 'Checked', value: element.checked || false }
                    }
                }
            },
            radioButton: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        text: { type: 'text', label: 'Text', value: element.text || 'Radio' },
                        color: { type: 'color', label: 'Color', value: element.color || 'white' },
                        checked: { type: 'checkbox', label: 'Checked', value: element.checked || false }
                    }
                },
                behavior: {
                    title: 'Behavior',
                    fields: {
                        group: { type: 'text', label: 'Group', value: element.group || 'group1' }
                    }
                }
            },
            toggleSwitch: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        text: { type: 'text', label: 'Text', value: element.text || 'Toggle' },
                        color: { type: 'color', label: 'Color', value: element.color || 'white' },
                        checked: { type: 'checkbox', label: 'Checked', value: element.checked || false }
                    }
                }
            },
            slider: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        trackColor: { type: 'color', label: 'Track Color', value: element.trackColor || 'gray' },
                        fillColor: { type: 'color', label: 'Fill Color', value: element.fillColor || 'blue' },
                        knobColor: { type: 'color', label: 'Knob Color', value: element.knobColor || 'white' }
                    }
                },
                behavior: {
                    title: 'Values',
                    fields: {
                        value: { type: 'number', label: 'Value', value: element.value || 50 },
                        min: { type: 'number', label: 'Minimum', value: element.min || 0 },
                        max: { type: 'number', label: 'Maximum', value: element.max || 100 },
                        step: { type: 'number', label: 'Step', value: element.step || 1, min: 0.1, step: 0.1 }
                    }
                }
            },
            progressBar: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        text: { type: 'text', label: 'Text', value: element.text || 'Loading...' },
                        color: { type: 'color', label: 'Progress Color', value: element.color || 'green' },
                        background: { type: 'color', label: 'Background', value: element.background || 'gray' }
                    }
                },
                behavior: {
                    title: 'Progress',
                    fields: {
                        progress: { type: 'number', label: 'Progress (%)', value: element.progress || 0, min: 0, max: 100 }
                    }
                }
            },
            container: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        background: { type: 'color', label: 'Background', value: element.background || '', allowEmpty: true },
                        border: { type: 'checkbox', label: 'Show Border', value: element.border },
                        borderColor: { type: 'color', label: 'Border Color', value: element.borderColor || 'lightGray' }
                    }
                },
                behavior: {
                    title: 'Behavior',
                    fields: {
                        isScrollable: { type: 'checkbox', label: 'Scrollable', value: element.isScrollable || false }
                    }
                }
            },
            listView: {
                appearance: {
                    title: 'Appearance',
                    fields: {
                        color: { type: 'color', label: 'Text Color', value: element.color || 'white' },
                        background: { type: 'color', label: 'Background', value: element.background || 'black' },
                        selectedColor: { type: 'color', label: 'Selected Color', value: element.selectedColor || 'blue' }
                    }
                },
                data: {
                    title: 'Data',
                    fields: {
                        items: { type: 'textarea', label: 'Items (one per line)', value: (element.items || []).join('\n') },
                        selected: { type: 'number', label: 'Selected Index', value: element.selected || 1, min: 1 }
                    }
                }
            }
        };
        
        const properties = { ...commonProperties };
        const typeProperties = typeSpecificProperties[element.type];
        if (typeProperties) {
            Object.assign(properties, typeProperties);
        }
        
        return properties;
    }
    
    renderPropertiesForm(element, properties) {
        let html = `
            <div class="properties-header">
                <h3>${element.name}</h3>
                <span class="element-type">${element.type}</span>
            </div>
        `;
        
        Object.entries(properties).forEach(([key, section]) => {
            html += `
                <div class="property-section">
                    <h4 class="section-title">${section.title}</h4>
                    <div class="section-content">
            `;
            
            Object.entries(section.fields).forEach(([fieldKey, field]) => {
                html += this.renderPropertyField(fieldKey, field);
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        return html;
    }
    
    renderPropertyField(key, field) {
        const fieldId = `prop_${key}`;
        let input = '';
        
        switch (field.type) {
            case 'text':
                input = `<input type="text" id="${fieldId}" name="${key}" value="${field.value || ''}" class="property-input">`;
                break;
            case 'textarea':
                input = `<textarea id="${fieldId}" name="${key}" class="property-input" rows="3">${field.value || ''}</textarea>`;
                break;
            case 'number':
                const min = field.min !== undefined ? `min="${field.min}"` : '';
                const max = field.max !== undefined ? `max="${field.max}"` : '';
                const step = field.step !== undefined ? `step="${field.step}"` : '';
                input = `<input type="number" id="${fieldId}" name="${key}" value="${field.value || 0}" ${min} ${max} ${step} class="property-input">`;
                break;
            case 'checkbox':
                const checked = field.value ? 'checked' : '';
                input = `<input type="checkbox" id="${fieldId}" name="${key}" ${checked} class="property-checkbox">`;
                break;
            case 'select':
                input = `<select id="${fieldId}" name="${key}" class="property-select">`;
                field.options.forEach(option => {
                    const selected = option.value === field.value ? 'selected' : '';
                    input += `<option value="${option.value}" ${selected}>${option.label}</option>`;
                });
                input += `</select>`;
                break;
            case 'color':
                input = `
                    <div class="color-picker-field">
                        <select id="${fieldId}" name="${key}" class="property-select color-select">
                            ${this.renderColorOptions(field.value, field.allowEmpty)}
                        </select>
                        <div class="color-preview" style="background-color: ${this.getComputerCraftColorHex(field.value)}"></div>
                    </div>
                `;
                break;
        }
        
        return `
            <div class="property-field">
                <label for="${fieldId}" class="property-label">${field.label}</label>
                ${input}
            </div>
        `;
    }
    
    renderColorOptions(selectedValue, allowEmpty = false) {
        const colors = [
            { name: 'white', hex: '#F0F0F0' },
            { name: 'orange', hex: '#F2B233' },
            { name: 'magenta', hex: '#E57FD8' },
            { name: 'lightBlue', hex: '#99B2F2' },
            { name: 'yellow', hex: '#DEDE6C' },
            { name: 'lime', hex: '#7FCC19' },
            { name: 'pink', hex: '#F2B2CC' },
            { name: 'gray', hex: '#4C4C4C' },
            { name: 'lightGray', hex: '#999999' },
            { name: 'cyan', hex: '#4C99B2' },
            { name: 'purple', hex: '#B266E5' },
            { name: 'blue', hex: '#3366CC' },
            { name: 'brown', hex: '#7F664C' },
            { name: 'green', hex: '#57A64E' },
            { name: 'red', hex: '#CC4C4C' },
            { name: 'black', hex: '#191919' }
        ];
        
        let options = '';
        
        if (allowEmpty) {
            options += `<option value="" ${selectedValue === '' ? 'selected' : ''}>None</option>`;
        }
        
        colors.forEach(color => {
            const selected = color.name === selectedValue ? 'selected' : '';
            options += `<option value="${color.name}" ${selected}>${color.name.charAt(0).toUpperCase() + color.name.slice(1)}</option>`;
        });
        
        return options;
    }
    
    getComputerCraftColorHex(colorName) {
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
        
        return colors[colorName] || 'transparent';
    }
    
    handlePropertyChange(e) {
        if (!this.generator.selectedElement) return;
        
        const field = e.target;
        const key = field.name;
        const element = this.generator.selectedElement;
        
        if (!key) return;
        
        let value;
        if (field.type === 'checkbox') {
            value = field.checked;
        } else if (field.type === 'number') {
            value = parseFloat(field.value) || 0;
        } else if (field.name === 'items' && field.tagName === 'TEXTAREA') {
            value = field.value.split('\n').filter(item => item.trim());
        } else {
            value = field.value;
        }
        
        // Update element property
        element[key] = value;
        
        // Update color preview if it's a color field
        if (field.classList.contains('color-select')) {
            const preview = field.parentElement.querySelector('.color-preview');
            if (preview) {
                preview.style.backgroundColor = this.getComputerCraftColorHex(value);
            }
        }
        
        // Re-render the element
        this.generator.renderElement(element);
        
        // Update layers list if name changed
        if (key === 'name') {
            this.generator.updateLayersList();
        }
        
        // Add to history for undo/redo (debounced)
        clearTimeout(this.historyTimeout);
        this.historyTimeout = setTimeout(() => {
            this.generator.addToHistory();
        }, 500);
    }
}

// Layers Panel Management
class LayersManager {
    constructor(generator) {
        this.generator = generator;
        this.layersList = document.getElementById('layers-list');
        this.setupLayerHandlers();
    }
    
    setupLayerHandlers() {
        // Layer buttons
        document.getElementById('add-layer').addEventListener('click', () => this.addLayer());
        document.getElementById('duplicate-layer').addEventListener('click', () => this.duplicateLayer());
        document.getElementById('delete-layer').addEventListener('click', () => this.deleteLayer());
        
        // Layer list events (delegated)
        this.layersList.addEventListener('click', this.handleLayerClick.bind(this));
        this.layersList.addEventListener('change', this.handleLayerChange.bind(this));
    }
    
    updateLayersList() {
        const elements = Array.from(this.generator.elements.values());
        
        if (elements.length === 0) {
            this.layersList.innerHTML = `
                <div class="no-layers">
                    <p>No elements</p>
                </div>
            `;
            return;
        }
        
        // Sort by creation order (id)
        elements.sort((a, b) => {
            const aNum = parseInt(a.id.split('_')[1]);
            const bNum = parseInt(b.id.split('_')[1]);
            return bNum - aNum; // Reverse order (newest first)
        });
        
        let html = '';
        elements.forEach(element => {
            const selected = this.generator.selectedElement?.id === element.id ? 'selected' : '';
            const visible = element.visible !== false;
            const locked = element.locked || false;
            
            html += `
                <div class="layer-item ${selected}" data-element-id="${element.id}">
                    <div class="layer-controls">
                        <button class="layer-visibility ${visible ? 'visible' : 'hidden'}" 
                                data-action="toggle-visibility"
                                title="${visible ? 'Hide' : 'Show'} element">
                            <i class="icon-${visible ? 'eye' : 'eye-off'}"></i>
                        </button>
                        <button class="layer-lock ${locked ? 'locked' : 'unlocked'}" 
                                data-action="toggle-lock"
                                title="${locked ? 'Unlock' : 'Lock'} element">
                            <i class="icon-${locked ? 'lock' : 'unlock'}"></i>
                        </button>
                    </div>
                    <div class="layer-info">
                        <div class="layer-name" title="${element.name}">${element.name}</div>
                        <div class="layer-type">${element.type}</div>
                    </div>
                    <div class="layer-thumbnail">
                        <div class="thumbnail-content" style="background: ${this.getElementThumbnailColor(element)}">
                            ${this.getElementIcon(element.type)}
                        </div>
                    </div>
                </div>
            `;
        });
        
        this.layersList.innerHTML = html;
    }
    
    getElementThumbnailColor(element) {
        if (element.background) {
            return this.generator.getComputerCraftColor(element.background);
        }
        if (element.color) {
            return this.generator.getComputerCraftColor(element.color);
        }
        return '#4C4C4C';
    }
    
    getElementIcon(type) {
        const icons = {
            button: '🔘',
            label: '📝',
            textBox: '📄',
            checkBox: '☑️',
            radioButton: '🔘',
            toggleSwitch: '🔀',
            slider: '🎚️',
            progressBar: '📊',
            container: '📦',
            listView: '📋'
        };
        
        return icons[type] || '🔧';
    }
    
    handleLayerClick(e) {
        const layerItem = e.target.closest('.layer-item');
        if (!layerItem) return;
        
        const elementId = layerItem.dataset.elementId;
        const element = this.generator.elements.get(elementId);
        
        if (!element) return;
        
        const action = e.target.closest('[data-action]')?.dataset.action;
        
        if (action) {
            e.stopPropagation();
            this.handleLayerAction(action, element);
        } else {
            // Select element
            this.generator.selectElement(element);
        }
    }
    
    handleLayerAction(action, element) {
        switch (action) {
            case 'toggle-visibility':
                element.visible = element.visible === false;
                this.updateElementVisibility(element);
                break;
            case 'toggle-lock':
                element.locked = !element.locked;
                break;
        }
        
        this.updateLayersList();
        this.generator.addToHistory();
    }
    
    updateElementVisibility(element) {
        const domElement = document.getElementById(element.id);
        if (domElement) {
            domElement.style.display = element.visible === false ? 'none' : 'block';
        }
    }
    
    addLayer() {
        // For now, add a default container
        this.generator.addWidget('container');
    }
    
    duplicateLayer() {
        if (this.generator.selectedElement) {
            this.generator.duplicate();
        }
    }
    
    deleteLayer() {
        if (this.generator.selectedElement) {
            this.generator.deleteSelected();
        }
    }
    
    handleLayerChange(e) {
        // Handle layer reordering, renaming, etc.
        // To be implemented later
    }
}

// Extend the main generator class
if (typeof PixelUIGenerator !== 'undefined') {
    PixelUIGenerator.prototype.initializeManagers = function() {
        this.propertiesManager = new WidgetPropertiesManager(this);
        this.layersManager = new LayersManager(this);
    };
    
    PixelUIGenerator.prototype.updatePropertiesPanel = function() {
        this.propertiesManager?.updatePropertiesPanel(this.selectedElement);
    };
    
    PixelUIGenerator.prototype.updateLayersList = function() {
        this.layersManager?.updateLayersList();
    };
    
    // Add initialization to the constructor
    const originalInit = PixelUIGenerator.prototype.init;
    PixelUIGenerator.prototype.init = function() {
        originalInit.call(this);
        this.initializeManagers();
    };
}
