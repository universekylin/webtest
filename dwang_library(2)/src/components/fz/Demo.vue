<template>
  <div>
    <MyButton
      label="Submit"
      color="primary"
      size="small"
      :disabled="false"
      :onClick="handleSubmit"
    />
    <MyButton
      label="Submit"
      color="success"
      size="large"
      :disabled="false"
      :onClick="handleSubmit"
    />
    <MyButton
      label="Submit"
      color="primary"
      size="medium"
      :disabled="false"
      :onClick="handleSubmit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyButton from './MyButton.vue'

export default defineComponent({
  name: 'App',
  components: {
    MyButton
  },
  methods: {
    handleSubmit() {
      console.log('Button clicked!')
    }
  }
})
</script>
