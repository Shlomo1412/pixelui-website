/**
 * PixelUI Plugin Showcase
 * Dynamically loads and displays plugins from the GitHub repository
 */

class PluginShowcase {
    constructor() {
        this.plugins = [];
        this.filteredPlugins = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.isLoading = false;
        
        this.apiBaseUrl = 'https://api.github.com/repos/Shlomo1412/PixelUI-plugins';
        this.rawBaseUrl = 'https://raw.githubusercontent.com/Shlomo1412/PixelUI-plugins/main';
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadPlugins();
    }
    
    initializeElements() {
        this.loadingSection = document.getElementById('loading-section');
        this.errorSection = document.getElementById('error-section');
        this.pluginsSection = document.getElementById('plugins');
        this.pluginsGrid = document.getElementById('plugins-grid');
        this.emptyState = document.getElementById('empty-state');
        this.searchInput = document.getElementById('plugin-search');
        this.modal = document.getElementById('plugin-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalBody = document.getElementById('modal-body');
        this.modalClose = document.getElementById('modal-close');
        
        // Stats elements
        this.totalPluginsEl = document.getElementById('total-plugins');
        this.widgetPluginsEl = document.getElementById('widget-plugins');
        this.themePluginsEl = document.getElementById('theme-plugins');
    }
    
    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.filter);
                this.applyFilters();
            });
        });
        
        // Search input
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.applyFilters();
        });
        
        // Modal close
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display !== 'none') {
                this.closeModal();
            }
        });
    }
    
    async loadPlugins() {
        this.isLoading = true;
        this.showLoading();
        
        try {
            // Get the root directory of the plugins repository
            const repoResponse = await fetch(`${this.apiBaseUrl}/contents`);
            
            if (!repoResponse.ok) {
                throw new Error(`Failed to fetch repository contents: ${repoResponse.status}`);
            }
            
            const repoData = await repoResponse.json();
            
            // Filter for .lua files (plugin files)
            const pluginFiles = repoData.filter(item => 
                item.type === 'file' && 
                item.name.endsWith('.lua') && 
                !item.name.startsWith('.')
            );
            
            if (pluginFiles.length === 0) {
                this.showEmptyRepository();
                return;
            }
            
            // Load each plugin's metadata
            const pluginPromises = pluginFiles.map(async (file) => {
                try {
                    return await this.loadPluginMetadata(file.name);
                } catch (error) {
                    console.warn(`Failed to load plugin ${file.name}:`, error);
                    return null;
                }
            });
            
            const pluginResults = await Promise.all(pluginPromises);
            this.plugins = pluginResults.filter(plugin => plugin !== null);
            
            if (this.plugins.length === 0) {
                this.showEmptyRepository();
                return;
            }
            
            this.updateStats();
            this.filteredPlugins = [...this.plugins];
            this.renderPlugins();
            this.showPluginsSection();
            
        } catch (error) {
            console.error('Error loading plugins:', error);
            this.showError(error.message);
        } finally {
            this.isLoading = false;
        }
    }
    
    async loadPluginMetadata(fileName) {
        try {
            // Load the plugin file directly
            const luaResponse = await fetch(`${this.rawBaseUrl}/${fileName}`);
            
            if (!luaResponse.ok) {
                throw new Error(`Failed to fetch plugin file: ${luaResponse.status}`);
            }
            
            const pluginCode = await luaResponse.text();
            
            // Parse metadata from Lua comments
            const metadata = this.parsePluginMetadata(pluginCode);
            
            // Extract plugin name from filename (remove .lua extension)
            const pluginId = fileName.replace('.lua', '');
            
            // Set defaults
            const finalMetadata = {
                name: pluginId,
                version: '1.0.0',
                type: 'widget',
                description: 'A PixelUI plugin',
                author: 'Unknown',
                dependencies: [],
                tags: [],
                ...metadata
            };
            
            return {
                ...finalMetadata,
                id: pluginId,
                fileName: fileName,
                code: pluginCode,
                url: `https://github.com/Shlomo1412/PixelUI-plugins/blob/main/${fileName}`,
                downloadUrl: `${this.rawBaseUrl}/${fileName}`
            };
            
        } catch (error) {
            throw new Error(`Failed to load plugin ${fileName}: ${error.message}`);
        }
    }
    
    parsePluginMetadata(code) {
        const metadata = {};
        const lines = code.split('\n');
        let currentDescription = '';
        let isMultiLineDescription = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Stop parsing after first non-comment section
            if (line && !line.startsWith('--')) {
                break;
            }
            
            const commentMatch = line.match(/^--\s*@(\w+)\s+(.*)$/);
            if (commentMatch) {
                const [, key, value] = commentMatch;
                switch (key.toLowerCase()) {
                    case 'name':
                        metadata.name = value.trim();
                        break;
                    case 'version':
                        metadata.version = value.trim();
                        break;
                    case 'description':
                        currentDescription = value.trim();
                        isMultiLineDescription = true;
                        // Check if description continues on next lines
                        let j = i + 1;
                        while (j < lines.length) {
                            const nextLine = lines[j].trim();
                            if (nextLine.startsWith('-- ') && !nextLine.includes('@')) {
                                // Continuation of description
                                const descLine = nextLine.replace(/^--\s*/, '');
                                if (descLine) {
                                    currentDescription += ' ' + descLine;
                                }
                                j++;
                            } else {
                                break;
                            }
                        }
                        metadata.description = currentDescription.trim();
                        isMultiLineDescription = false;
                        i = j - 1; // Skip the lines we've already processed
                        break;
                    case 'author':
                        metadata.author = value.trim();
                        break;
                    case 'type':
                        metadata.type = value.trim().toLowerCase();
                        break;
                    case 'tag':
                    case 'tags':
                        metadata.tags = metadata.tags || [];
                        metadata.tags.push(...value.split(',').map(t => t.trim()));
                        break;
                    case 'dependency':
                    case 'dependencies':
                        metadata.dependencies = metadata.dependencies || [];
                        metadata.dependencies.push(...value.split(',').map(d => d.trim()));
                        break;
                }
            }
        }
        
        return metadata;
    }
    
    updateStats() {
        const stats = this.calculateStats();
        this.totalPluginsEl.textContent = stats.total;
        this.widgetPluginsEl.textContent = stats.widgets;
        this.themePluginsEl.textContent = stats.themes;
    }
    
    calculateStats() {
        const total = this.plugins.length;
        const widgets = this.plugins.filter(p => p.type === 'widget').length;
        const themes = this.plugins.filter(p => p.type === 'theme').length;
        
        return { total, widgets, themes };
    }
    
    setActiveFilter(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.currentFilter = filter;
    }
    
    applyFilters() {
        this.filteredPlugins = this.plugins.filter(plugin => {
            // Type filter
            if (this.currentFilter !== 'all' && plugin.type !== this.currentFilter) {
                return false;
            }
            
            // Search filter
            if (this.searchQuery) {
                const searchableText = [
                    plugin.name,
                    plugin.description,
                    plugin.author,
                    ...(plugin.tags || [])
                ].join(' ').toLowerCase();
                
                if (!searchableText.includes(this.searchQuery)) {
                    return false;
                }
            }
            
            return true;
        });
        
        this.renderPlugins();
    }
    
    renderPlugins() {
        if (this.filteredPlugins.length === 0) {
            this.showEmptyState();
            return;
        }
        
        this.hideEmptyState();
        
        this.pluginsGrid.innerHTML = this.filteredPlugins.map(plugin => 
            this.createPluginCard(plugin)
        ).join('');
        
        // Add click listeners to plugin cards
        this.pluginsGrid.querySelectorAll('.plugin-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.showPluginDetail(this.filteredPlugins[index]);
            });
        });
        
        // Add animation
        this.pluginsGrid.querySelectorAll('.plugin-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.05}s`;
            card.classList.add('fade-in');
        });
    }
    
    createPluginCard(plugin) {
        const typeIcon = this.getTypeIcon(plugin.type);
        const typeClass = `type-${plugin.type}`;
        
        return `
            <div class="plugin-card" data-plugin-id="${plugin.id}">
                <div class="plugin-header">
                    <div class="plugin-icon">
                        <i data-lucide="${typeIcon}"></i>
                    </div>
                    <div class="plugin-info">
                        <h3 class="plugin-name">${this.escapeHtml(plugin.name)}</h3>
                        <span class="plugin-version">v${plugin.version}</span>
                        <div class="plugin-author">by ${this.escapeHtml(plugin.author)}</div>
                    </div>
                </div>
                
                <p class="plugin-description">${this.escapeHtml(plugin.description)}</p>
                
                <div class="plugin-tags">
                    <span class="plugin-tag ${typeClass}">${plugin.type}</span>
                    ${(plugin.tags || []).slice(0, 3).map(tag => 
                        `<span class="plugin-tag">${this.escapeHtml(tag)}</span>`
                    ).join('')}
                    ${(plugin.tags || []).length > 3 ? 
                        `<span class="plugin-tag">+${(plugin.tags || []).length - 3} more</span>` : ''
                    }
                </div>
                
                <div class="plugin-footer">
                    <div class="plugin-stats">
                        <div class="plugin-stat">
                            <i data-lucide="download"></i>
                            <span>Free</span>
                        </div>
                        ${plugin.dependencies && plugin.dependencies.length > 0 ? `
                            <div class="plugin-stat">
                                <i data-lucide="package"></i>
                                <span>${plugin.dependencies.length} deps</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="plugin-actions">
                        <button class="plugin-action primary" onclick="event.stopPropagation(); window.open('${plugin.downloadUrl}', '_blank')">
                            <i data-lucide="download"></i>
                            Download
                        </button>
                        <button class="plugin-action" onclick="event.stopPropagation(); window.open('${plugin.url}', '_blank')">
                            <i data-lucide="external-link"></i>
                            View
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    showPluginDetail(plugin) {
        this.modalTitle.textContent = plugin.name;
        
        const typeIcon = this.getTypeIcon(plugin.type);
        const codePreview = plugin.code ? plugin.code.split('\n').slice(0, 20).join('\n') : 'No code preview available';
        
        this.modalBody.innerHTML = `
            <div class="plugin-detail">
                <div class="plugin-detail-header">
                    <div class="plugin-detail-icon">
                        <i data-lucide="${typeIcon}"></i>
                    </div>
                    <div class="plugin-detail-info">
                        <h3>${this.escapeHtml(plugin.name)}</h3>
                        <div class="plugin-detail-meta">
                            <div class="plugin-detail-meta-item">
                                <i data-lucide="tag"></i>
                                <span>v${plugin.version}</span>
                            </div>
                            <div class="plugin-detail-meta-item">
                                <i data-lucide="user"></i>
                                <span>${this.escapeHtml(plugin.author)}</span>
                            </div>
                            <div class="plugin-detail-meta-item">
                                <i data-lucide="puzzle"></i>
                                <span>${plugin.type}</span>
                            </div>
                        </div>
                        ${(plugin.tags && plugin.tags.length > 0) ? `
                            <div class="plugin-tags">
                                ${plugin.tags.map(tag => 
                                    `<span class="plugin-tag">${this.escapeHtml(tag)}</span>`
                                ).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="plugin-detail-description">
                    <p>${this.escapeHtml(plugin.description)}</p>
                </div>
                
                ${plugin.dependencies && plugin.dependencies.length > 0 ? `
                    <div class="plugin-detail-section">
                        <h4>Dependencies</h4>
                        <ul>
                            ${plugin.dependencies.map(dep => 
                                `<li><code>${this.escapeHtml(dep)}</code></li>`
                            ).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="plugin-detail-code">
                    <div class="plugin-detail-code-header">
                        <span class="plugin-detail-code-title">Code Preview</span>
                        <button class="plugin-action" onclick="window.open('${plugin.url}', '_blank')">
                            <i data-lucide="external-link"></i>
                            View Full Source
                        </button>
                    </div>
                    <div class="plugin-detail-code-content">
                        <pre><code class="language-lua">${this.escapeHtml(codePreview)}</code></pre>
                    </div>
                </div>
                
                <div class="plugin-detail-actions">
                    <a href="${plugin.downloadUrl}" class="btn btn-primary" download>
                        <i data-lucide="download"></i>
                        Download Plugin
                    </a>
                    <a href="${plugin.url}" class="btn btn-secondary" target="_blank">
                        <i data-lucide="github"></i>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;
        
        // Initialize Lucide icons in modal
        if (window.lucide) {
            window.lucide.createIcons();
        }
        
        // Highlight code
        if (window.Prism) {
            window.Prism.highlightAll();
        }
        
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    getTypeIcon(type) {
        const icons = {
            widget: 'puzzle',
            theme: 'palette',
            hook: 'zap',
            api: 'code'
        };
        return icons[type] || 'puzzle';
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showLoading() {
        this.loadingSection.style.display = 'block';
        this.errorSection.style.display = 'none';
        this.pluginsSection.style.display = 'none';
    }
    
    showError(message) {
        this.loadingSection.style.display = 'none';
        this.errorSection.style.display = 'block';
        this.pluginsSection.style.display = 'none';
        
        document.getElementById('error-message').textContent = message;
    }
    
    showPluginsSection() {
        this.loadingSection.style.display = 'none';
        this.errorSection.style.display = 'none';
        this.pluginsSection.style.display = 'block';
    }
    
    showEmptyState() {
        this.pluginsGrid.style.display = 'none';
        this.emptyState.style.display = 'block';
    }
    
    hideEmptyState() {
        this.pluginsGrid.style.display = 'grid';
        this.emptyState.style.display = 'none';
    }
    
    showEmptyRepository() {
        this.showPluginsSection();
        this.updateStats(); // Will show 0s
        this.showEmptyState();
        this.emptyState.innerHTML = `
            <div class="empty-icon">
                <i data-lucide="package"></i>
            </div>
            <h3>No plugins available yet</h3>
            <p>Be the first to contribute a plugin to the PixelUI community!</p>
            <a href="./plugins.html" class="btn btn-primary">
                <i data-lucide="book"></i>
                Learn Plugin Development
            </a>
        `;
        
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PluginShowcase();
});
