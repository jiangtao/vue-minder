# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vue Minder is a Vue.js wrapper around Baidu's KityMinder Core (百度脑图) - a mind mapping library. This project makes KityMinder easily usable within Vue 3.x ecosystems with Vue component integration.

**Important**: This is now a Vue 3.x project (3.x branch). Historical versions:
- **3.x branch** - Vue 3.x version (current, default)
- **2.x branch** - Vue 2.x version
- **master branch** - Vue 1.x version (historical, no longer maintained)

## Development Commands

```bash
# Development with hot reload (Vite dev server)
npm run dev

# Build styles (LESS -> CSS with gulp)
npm run build:style

# Build for production
npm run build

# Preview production build
npm run preview
```

**Note**: `npm run dev` is the primary command for local development. It:
1. Builds styles with gulp
2. Starts Vite dev server with hot reload

## Architecture

### Core Architecture Pattern

The project uses a **runtime-based modular architecture** inherited from KityMinder:

- **Editor** (`src/editor.js`): Main entry point that assembles runtime modules using a modular pattern
- **Runtime Modules** (`src/runtime/`): Independent modules that extend the Editor functionality:
  - `container.js` - DOM container management
  - `fsm.js` - Finite State Machine for editor states
  - `minder.js` - Core KityMinder instance initialization
  - `receiver.js` - Keyboard input handling
  - `hotbox.js` - Context menu interaction
  - `input.js` - Text editing input
  - `clipboard*.js` - Copy/paste functionality
  - `drag.js` - Node drag handling
  - `node.js` - Node operations
  - `history.js` - Undo/redo history
  - `jumping.js` - Node navigation
  - `priority.js` - Priority markers
  - `progress.js` - Progress indicators

### Component Structure

The main Vue component is `<minder>` (registered as `Minder` from `src/components/editor/index.vue`):

**Props:**
- `showSearchBox`, `showTemplate`, `showTheme`, `showNavigator`, `showBreadcrumb` - UI toggles
- `enable` - Enable/disable editing (boolean)
- `importData` - Initial mind map data (JSON string or object)
- `remember` - Enable localStorage memory for expand states, theme, template
- `memorySuffix` - Suffix for localStorage keys (for multiple instances)
- `uniqueIndexFn` - Function to generate unique IDs for nodes (required for memory/selection features)

**Key Methods:**
- `getExportJson()` - Export current mind map as JSON
- `getSelectedNode()` / `getSelectedNodes()` - Get selected nodes
- `setMemory()` - Save current state to localStorage
- `getMemory(data)` - Load data with restored expand states from memory

**Events:**
- `content-change` - Emitted when mind map content changes

**Vue 3 Usage:**
```vue
<script setup>
import { ref } from 'vue'
import Minder from 'vue-minder'

const minderRef = ref(null)

// Access component methods
const exportData = () => {
  const json = minderRef.value.getExportJson()
  console.log(json)
}
</script>

<template>
  <Minder ref="minderRef" />
</template>
```

### Data Format

**Key Difference from KityMinder**: Node `text` field is renamed to `name`.

```javascript
{
  root: {
    data: {
      name: '中心主题',
      id: 1,              // Used by uniqueIndexFn for memory
      expandState: 'expand' // or 'collapse'
    },
    children: [
      {
        data: { name: 'Child Node', id: 2 },
        children: []
      }
    ]
  },
  template: 'default',
  theme: 'fresh-blue'
}
```

### Build System

- **Vite 5.x** - Modern build tool for dev/prod
- **Gulp** - LESS compilation and asset processing
- **@vitejs/plugin-vue** - Vue 3 SFC compilation
- ES modules output with UMD fallback

Output:
- `dist/minder.es.js` - ES module bundle (Vue is external, peer dependency)
- `dist/minder.min.js` - UMD library bundle
- `dist/styles/minder.css` - Compiled styles

### Services

- `src/services/memory.js` - LocalStorage wrapper with quota handling
- `src/services/config.js` - Configuration management

### Directives

- `v-visible` - Custom directive in `src/directives/visible.js` for conditional rendering

### Styling

- LESS-based with imports in `src/styles/editor.less`
- Top tab styles organized in `src/styles/topTab/` by feature (appearance, idea, view, searchBox)
- Component-specific styles like `_navigator.less`, `_tool_group.less`

## Key Implementation Notes

1. **Vue 3 Syntax**: Uses Composition API (`<script setup>`) and Options API patterns. Component refs use `ref()` in setup or string refs in Options API.

2. **Global Dependencies**: The editor exposes `window.minder` and `window.km` for debugging/external access

3. **KityMinder Integration**: The core `kity` and `kityminder-core` libraries are bundled, while `hotbox` (context menu) is a dependency

4. **Memory System**: Uses localStorage keys with suffixes:
   - `__EXPAND_MEMORY__{suffix}` - Node expand states
   - `__THEME_MEMORY__{suffix}` - Selected theme
   - `__TEMPLATE_MEMORY__{suffix}` - Selected template
   - `__SELECTED_MEMORY__{suffix}` - Selected node IDs

5. **Event System**: KityMinder uses custom events:
   - `contentchange` - Content modified
   - `import` - Data imported
   - `selectionchange` - Selection changed
   - `beforeExecCommand` / `AfterExecCommand` - Command execution
   - `editText` - Text editing
   - `searchNode` - Search triggered

6. **Peer Dependency**: Vue 3.x is a peer dependency and must be installed in the host project
