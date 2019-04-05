<template>
    <minder :style="defaultStyle"></minder>
</template>
<script>
		export default {
				data() {
						return {
								defaultStyle: {
								}
						};
				},
				computed: {},
				methods: {},
                ready() {
						console.log('minder loader is finished')
                }
		};
</script>
<style>
</style>
