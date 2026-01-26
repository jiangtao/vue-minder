/**
 * Click outside directive for Vue 3
 * Updated for Vue 3 compatibility
 */
export default {
  mounted(el, binding) {
    const vm = binding.instance;
    const expression = binding.value;

    el._clickOutsideHandler = (e) => {
      if (el.contains(e.target)) {
        return false;
      }
      if (expression && vm && vm[expression]) {
        vm[expression]();
      }
    };
    document.addEventListener('click', el._clickOutsideHandler);
  },
  updated(el, binding) {
    // Update the handler if the expression changes
    const vm = binding.instance;
    const expression = binding.value;

    el._clickOutsideHandler = (e) => {
      if (el.contains(e.target)) {
        return false;
      }
      if (expression && vm && vm[expression]) {
        vm[expression]();
      }
    };
  },
  unmounted(el) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler);
    }
  }
};
