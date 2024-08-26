<template>
  <button :class="buttonClasses" :disabled="disabled" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup>
import { computed } from 'vue'
import PropTypes from 'vue-types'

const props = defineProps({
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'success', 'danger', 'warning']).def('primary'),
  size: PropTypes.oneOf(['small', 'medium', 'large']).def('medium'),
  disabled: PropTypes.bool.def(false),
  onClick: PropTypes.func.def(() => {}),
  style: PropTypes.oneOf(['outlined', 'filled']).def('filled')
})

const buttonClasses = computed(() => {
  return [
    'btn',
    `btn-${props.style === 'outlined' ? `outline-${props.color}` : props.color}`,
    `btn-${props.size}`
  ]
})
</script>

<style scoped>
/* Add any custom styling here */
</style>
