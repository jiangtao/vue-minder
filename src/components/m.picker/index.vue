<template>
        <div transition="picker-fade" class="picker" v-show="state===1" @touchmove.prevent @click="cancel">
                <div transition="picker-move" class="picker-panel" v-show="state===1" @click.stop>
                    <div class="picker-choose border-bottom-1px">
                        <span class="cancel" @click="cancel">{{cancelTxt}}</span>
                        <span class="confirm" @click="confirm">{{confirmTxt}}</span>
                        <h1 class="picker-title">{{title}}</h1>
                    </div>
                    <div class="picker-content">
                        <div class="mask-top border-bottom-1px"></div>
                        <div class="mask-bottom border-top-1px"></div>
                        <div class="wheel-wrapper" v-el:wheel-wrapper>
                            <div class="wheel" v-for="data in pickerData">
                                <ul class="wheel-scroll">
                                    <li v-for="item in data" :class="{'wheel-disabled-item':item.disabled}" class="wheel-item">{{item.text}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="picker-footer"></div>
                </div>
        </div>
</template>

<script type="text/ecmascript-6">
		import BScroll from 'better-scroll'

		const STATE_HIDE = 0
		const STATE_SHOW = 1

		const COMPONENT_NAME = 'm-picker'
		const EVENT_SELECT = 'select'
		const EVENT_VALUE_CHANGE = 'valuechange'
		const EVENT_CANCEL = 'cancel'
		const EVENT_CHANGE = 'change'

		export default {
				name: COMPONENT_NAME,
				props: {
						data: {
								type: Array,
								default() {
										return []
								}
						},
						title: {
								type: String
						},
						cancelTxt: {
								type: String,
								default: 'cancel'
						},
						confirmTxt: {
								type: String,
								default: 'confirm'
						},
						selectedIndex: {
								type: Array,
								default() {
										return []
								}
						},
						value: {
								type: Boolean,
								default: false
						}
				},
				data() {
						return {
								state: STATE_HIDE,
								pickerData: this.data.slice(),
								pickerSelectedIndex: this.selectedIndex,
								pickerSelectedVal: [],
								pickerSelectedText: []
						}
				},
				ready() {
						if (!this.pickerSelectedIndex.length) {
								this.pickerSelectedIndex = []
								for (let i = 0; i < this.pickerData.length; i++) {
										this.pickerSelectedIndex[i] = 0
								}
						}
				},
				methods: {
						confirm() {
								if (!this._canConfirm()) {
										return
								}
								this.hide()

								let changed = false
								for (let i = 0; i < this.pickerData.length; i++) {
										let index = this.wheels[i].getSelectedIndex()
										this.pickerSelectedIndex[i] = index

										let value = null
										if (this.pickerData[i].length) {
												value = this.pickerData[i][index].value
										}
										if (this.pickerSelectedVal[i] !== value) {
												changed = true
										}
										this.pickerSelectedText[i] = this.pickerData[i][index].text
								}

								this.$emit(EVENT_SELECT, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)

								if (changed) {
										this.$emit(EVENT_VALUE_CHANGE, this.pickerSelectedVal, this.pickerSelectedIndex, this.pickerSelectedText)
								}
						},
						cancel() {
								this.hide()
								this.$emit(EVENT_CANCEL)
						},
						show() {
								if (this.state === STATE_SHOW) {
										return
								}
								this.state = STATE_SHOW

								if (!this.wheels || this.dirty) {
										this.$nextTick(() => {
												this.wheels = []
												let wheelWrapper = this.$els.wheelWrapper
												for (let i = 0; i < this.pickerData.length; i++) {
														this._createWheel(wheelWrapper, i)
												}
												this.dirty = false
										})
								} else {
										for (let i = 0; i < this.pickerData.length; i++) {
												this.wheels[i].enable()
												this.wheels[i].wheelTo(this.pickerSelectedIndex[i])
										}
								}
						},
						hide() {
								this.state = STATE_HIDE

								for (let i = 0; i < this.pickerData.length; i++) {
										this.wheels[i].disable()
								}
						},
						setData(data) {
								this.pickerData = data.slice()
								this.dirty = true
						},
						setSelectedIndex(index) {
								this.pickerSelectedIndex = index
						},
						refill(datas) {
								let ret = []
								if (!datas.length) {
										return ret
								}
								datas.forEach((data, index) => {
										ret[index] = this.refillColumn(index, data)
								})
								return ret
						},
						refillColumn(index, data) {
								if (this.state !== STATE_SHOW) {
										console.error('can not use refillColumn when picker is not show')
										return
								}

								const wheelWrapper = this.$els.wheelWrapper
								let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
								let wheel = this.wheels[index]
								if (scroll && wheel) {
										let oldData = this.pickerData[index]
										this.$set(this.pickerData, index, data)
										let selectedIndex = wheel.getSelectedIndex()
										let dist = 0
										if (oldData.length) {
												let oldValue = oldData[selectedIndex].value
												for (let i = 0; i < data.length; i++) {
														if (data[i].value === oldValue) {
																dist = i
																break
														}
												}
										}
										this.pickerSelectedIndex[index] = dist
										this.$nextTick(() => {
												// recreate wheel so that the wrapperHeight will be correct.
												wheel = this._createWheel(wheelWrapper, index)
												wheel.wheelTo(dist)
										})
										return dist
								}
						},
						scrollTo(index, dist) {
								const wheel = this.wheels[index]
								this.pickerSelectedIndex[index] = dist
								wheel.wheelTo(dist)
						},
						refresh() {
								this.$nextTick(() => {
										this.wheels.forEach((wheel, index) => {
												wheel.refresh()
										})
								})
						},
						_createWheel(wheelWrapper, i) {
								console.log(wheelWrapper, i)
								if (!this.wheels[i]) {
										this.wheels[i] = new BScroll(wheelWrapper.children[i], {
												wheel: {
														selectedIndex: this.pickerSelectedIndex[i],
														/** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
														wheelWrapperClass: 'wheel-scroll',
														wheelItemClass: 'wheel-item'
												},
												probeType: 3
										})

										this.wheels[i].on('scrollEnd', () => {
												this.$emit(EVENT_CHANGE, i, this.wheels[i].getSelectedIndex())
										})
								} else {
										this.wheels[i].refresh()
								}

								return this.wheels[i]
						},
						_canConfirm() {
								return this.wheels.every((wheel) => {
										return !wheel.isInTransition
								})
						}
				},
				watch: {
						data(newData) {
								this.setData(newData)
						}
				}
		}
</script>

<style scoped lang="less" rel="stylesheet/less">
    .picker {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
        background-color: rgba(37, 38, 45, .4);
    }
    .picker.picker-fade-enter,
    .picker.picker-fade-leave-active {
        opacity: 0;
    }
    .picker.picker-fade-enter-active,
    .picker.picker-fade-leave-active {
        transition: all 0.3s ease-in-out;
    }
    .picker .picker-panel {
        position: absolute;
        z-index: 600;
        bottom: 0;
        width: 100%;
        height: 273px;
        background: #fff;
    }
    .picker .picker-panel.picker-move-enter,
    .picker .picker-panel.picker-move-leave-active {
        transform: translate3d(0, 273px, 0);
    }
    .picker .picker-panel.picker-move-enter-active,
    .picker .picker-panel.picker-move-leave-active {
        transition: all 0.3s ease-in-out;
    }
    .picker .picker-panel .picker-choose {
        position: relative;
        height: 60px;
        color: #999;
    }
    .picker .picker-panel .picker-choose .picker-title {
        margin: 0;
        line-height: 60px;
        font-weight: normal;
        text-align: center;
        font-size: 20px;
        color: #333;
        border-bottom: 1px solid #eee;
    }
    .picker .picker-panel .picker-choose .confirm,
    .picker .picker-panel .picker-choose .cancel {
        position: absolute;
        top: 6px;
        padding: 16px;
        font-size: 14px;
    }
    .picker .picker-panel .picker-choose .confirm {
        right: 0;
        color: #007bff;
    }
    .picker .picker-panel .picker-choose .confirm:active {
        color: #5aaaff;
    }
    .picker .picker-panel .picker-choose .cancel {
        left: 0;
    }
    .picker .picker-panel .picker-choose .cancel:active {
        color: #c2c2c2;
    }
    .picker .picker-panel .picker-content {
        position: relative;
        top: 5px;
    }
    .picker .picker-panel .picker-content .mask-top,
    .picker .picker-panel .picker-content .mask-bottom {
        z-index: 10;
        width: 100%;
        height: 68px;
        pointer-events: none;
        transform: translateZ(0);
    }
    .picker .picker-panel .picker-content .mask-top {
        position: absolute;
        top: 0;
        background: linear-gradient(to top, rgba(255,255,255,0.4), rgba(255,255,255,0.8));
    }
    .picker .picker-panel .picker-content .mask-bottom {
        position: absolute;
        bottom: 1px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.8));
    }
    .picker .picker-panel .wheel-wrapper {
        display: flex;
        padding-left: 10px;
    }
    .picker .picker-panel .wheel-wrapper .wheel {
        height: 173px;
        overflow: hidden;
        font-size: 20px;
        flex: 1;

    }
    .picker .picker-panel .wheel-wrapper .wheel .wheel-scroll {
        padding: 0;
        margin-top: 60px;
        line-height: 36px;
        list-style: none;
    }
    .picker .picker-panel .wheel-wrapper .wheel .wheel-scroll .wheel-item {
        list-style: none;
        height: 36px;
        overflow: hidden;
        white-space: nowrap;
        color: #333;
    }
    .picker .picker-panel .wheel-wrapper .wheel .wheel-scroll .wheel-item.wheel-disabled-item {
        opacity: 0.2;
    }
    .picker .picker-footer {
        height: 20px;
    }
</style>
