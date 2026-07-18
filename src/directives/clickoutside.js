/**
 * Click outside directive for Vue 3
 * Updated for Vue 3 compatibility
 */
export default {
  mounted(el, binding) {
    el._clickOutsideCallback = binding.value;
    el._clickOutsideHandler = (e) => {
      if (!el.contains(e.target) && typeof el._clickOutsideCallback === 'function') {
        el._clickOutsideCallback(e);
      }
    };
    document.addEventListener('click', el._clickOutsideHandler);
  },
  updated(el, binding) {
    el._clickOutsideCallback = binding.value;
  },
  unmounted(el) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler);
    }
    delete el._clickOutsideCallback;
    delete el._clickOutsideHandler;
  }
};
