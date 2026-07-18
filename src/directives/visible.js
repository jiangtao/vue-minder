function updateVisibility(el, binding) {
  el.style.visibility = binding.value ? 'visible' : 'hidden';
}

export default {
  mounted: updateVisibility,
  updated: updateVisibility
};
