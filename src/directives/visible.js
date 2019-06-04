/**
 * @Date 2019-06-04
 * @author jiangtao
 * 目的是支持子组件中的method可以被父调用
 * 处理vue1.0中 v-if v-show false情况下， refs为空的问题
 *
 */
export default {
  bind() {
    this.documentHandler = null;
    this._i = 0;
  },
  update() {
    let flag = true;
    this._i = 0;
    if(this.expression) {
      let splits = this.expression.split(/\&\&/g), key;
      while(flag && this._i < splits.length) {
        key = splits[this._i++];
        if(key && (key = key.trim())) {
          flag &= this.vm[key];
        }
      }
    }
    this.documentHandler = (e) => {
      this.el.style.visibility = !flag ? 'hidden' : 'visible';
    };
    window.requestAnimationFrame(this.documentHandler);
  },
  unbind() {
    if(this.documentHandler) window.cancelAnimationFrame(this.documentHandler);
    this._i = 0;
    this.documentHandler = null;
  }
};
