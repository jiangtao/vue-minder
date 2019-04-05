<template>
    <div class="minder-editor-container">
        <div v-if="showTopTab" class="top-tab" top-tab="minder" editor="editor" v-if="minder"></div>
        <div v-if="showSearchBox" search-box minder="minder" v-if="minder"></div>
        <div v-el:editor class="minder-editor"></div>
        <div v-if="showNote" class="km-note" note-editor minder="minder" v-if="minder"></div>
        <div v-if="showNote" class="note-previewer" note-previewer v-if="minder"></div>
        <div v-if="showNote" class="navigator" navigator minder="minder" v-if="minder"></div>
    </div>
</template>
<script>
		import Editor from '../../editor';

		export default {
				name: 'mind-editor',
				props: {
						showTopTab: {
								type: Boolean,
								default: false
						},
						showSearchBox: {
								type: Boolean,
								default: false
						},
						showNote: {
								type: Boolean,
								default: false
						},
						showHotBox: {
								type: Boolean,
								default: false
						},
						importData: [String, Object],
						enable: {
								default: true,
								type: Boolean
						}
				},
				data() {
						return {
								editor: null,
								minder: null
						};
				},
				watch: {
						enable(val, old) {
								if(val != old) {
										val ? this.minder.enable() : this.minder.disable();
								}
						},
				},
				ready() {
						var self = this;
						var editor = window.editor = new Editor(this.$els.editor);
						var importData = this.importData;
						if(typeof importData === 'string') {
								try {
										importData = JSON.parse(importData);
								} catch(e) {
										importData = JSON.parse(window.localStorage.__dev_minder_content);
										console.warn('hex minder import data format error');
								}
						}
						editor.minder.importJson(importData);

						editor.minder.on('contentchange', function() {
								var json = editor.minder.exportJson();
								self.$emit('content-change', json);
								// window.localStorage.__dev_minder_content = JSON.stringify(json);
						});
						window.minder = window.km = editor.minder;

						this.editor = editor;
						this.minder = minder;
						if(!this.enable) this.minder.disable();
				},
				methods: {
						getExportJson() {
								return this.minder.exportJson();
						},
						getSelectedNode() {
								return this.minder.getSelectedNode();
						},

						getSelectedNodes() {
								return this.minder.getSelectedNode();
						}
				},

		};
</script>