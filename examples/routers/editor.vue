<template>
    <minder v-ref:minder :style="defaultStyle"></minder>
</template>
<script>
		export default {
				data() {
						return {
								defaultStyle: {
										width: '1000px',
										height: '600px'
								},
                                snap: {}
						};
				},
				computed: {},
				methods: {},
				ready() {
						console.log('minder loader is finished');
                        var self = this
						this.$nextTick(function() {
								var minder = this.$refs.minder.minder;
								minder.importJson({
									root: {
										data: {
											name: 'App'
										}
									}
								})
								var snap = this.snap;
								// contentchange
								minder.on('editText', function(e, minder) {
                                        var node = e.minder.getSelectedNode();
										console.log(e, node)
								});
								// 只有选中的时候会触发
								minder.on('selectionchange', function(e) {
										self.minder = e.minder;
										var node = e.minder.getSelectedNode();
										self.currentNode = node;
										if(self.lock && node) {
										}
										self.lock = true;
								});

								minder.on('beforeExecCommand', function(e) {
										var node = e.minder.getSelectedNode();
										console.log(node);
										if(/append/i.test(e.commandName)) {
												console.log('add', node);
												self.snap[node.data.id] = node;
										} else if(/remove/i.test(e.commandName)) {
												console.log('remove', node);
												delete self.snap[node.data.id];
										}
								});
								minder.on('beforeExecCommand', function(e) {
										var node = e.minder.getSelectedNode();
										console.log(node);
										if(/append/i.test(e.commandName)) {
												console.log('add', node);
												self.snap[node.data.id] = node;
										} else if(/remove/i.test(e.commandName)) {
												console.log('remove', node);
												delete self.snap[node.data.id];
										}
								});
						});
				}
		};
</script>
<style>
</style>
