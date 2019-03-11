<template>
    <m-city-picker
        @select="handleSelect(3,arguments)"
        :selected-index="indexes"
        v-ref:picker :title="title" :cancel-txt="cancelTxt"
        :confirm-txt="confirmTxt"></m-city-picker>
</template>
<script>
		export default {
				data() {
						return {
								indexes: [0,0,0],
								cancelTxt: '取消',
								confirmTxt: '确认',
                                title: '省市区选择'
						}
				},
            ready() {
						this.$refs.picker.show()
            },
                methods: {
		                handleSelect: function(index) {
								console.log(index, arguments)
                        }
                }
		};

</script>