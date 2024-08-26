<template>
  <button
      :class="buttonClasses"
      :disabled="disabled"
      @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'CustomButton',
  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'medium',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    style: {
      type: String,
      default: 'filled',
      validator: (value: string) => ['outlined', 'filled'].includes(value),
    },
  },
  setup(props) {
    const buttonClasses = computed(() => {
      return [
        'btn',
        `btn-${props.color}`,
        `btn-${props.size}`,
        props.style === 'outlined' ? `btn-outline-${props.color}` : `btn-${props.color}`,
      ];
    });

    const handleClick = (event: Event) => {
      if (!props.disabled) {
        props.onClick(event);
      }
    };

    return {
      buttonClasses,
      handleClick,
    };
  },
});
</script>

<style scoped>
.btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  display: inline-block;
  cursor: pointer;
}

.btn-small {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
}

.btn-medium {
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
}

.btn-large {
  font-size: 1.25rem;
  padding: 0.5rem 1rem;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary {
  color: #007bff;
  background-color: transparent;
  border-color: #007bff;
}

/* 根据不同颜色定义其他样式，例如 success, danger 等 */
</style>
