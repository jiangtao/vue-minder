/**
 * @Date 2019-06-04
 * @author jiangtao
 * Updated for Vue 3 compatibility
 */
export default {
  mounted(el, binding) {
    const vm = binding.instance;
    const expression = binding.value;

    const updateVisibility = () => {
      let flag = true;
      if (expression) {
        const splits = expression.split(/\&\&/g);
        for (const key of splits) {
          const trimmedKey = key.trim();
          if (trimmedKey && vm && vm[trimmedKey] === false) {
            flag = false;
            break;
          }
        }
      }
      el.style.visibility = !flag ? 'hidden' : 'visible';
    };

    el._visibleHandler = updateVisibility;
    el._visibleRafId = window.requestAnimationFrame(updateVisibility);
  },
  updated(el, binding) {
    // Cancel previous RAF
    if (el._visibleRafId) {
      window.cancelAnimationFrame(el._visibleRafId);
    }
    // Schedule new update
    const vm = binding.instance;
    const expression = binding.value;

    const updateVisibility = () => {
      let flag = true;
      if (expression) {
        const splits = expression.split(/\&\&/g);
        for (const key of splits) {
          const trimmedKey = key.trim();
          if (trimmedKey && vm && vm[trimmedKey] === false) {
            flag = false;
            break;
          }
        }
      }
      el.style.visibility = !flag ? 'hidden' : 'visible';
    };

    el._visibleHandler = updateVisibility;
    el._visibleRafId = window.requestAnimationFrame(updateVisibility);
  },
  unmounted(el) {
    if (el._visibleRafId) {
      window.cancelAnimationFrame(el._visibleRafId);
    }
  }
};
