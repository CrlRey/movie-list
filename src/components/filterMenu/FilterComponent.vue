<script setup>
  import { ref, toRefs } from 'vue'
  import { Switch } from '@headlessui/vue'


  const props = defineProps({
    enabled: {
      type: Boolean,
      required : true
    }
  })

  const {modelValue} = toRefs(props)
</script>


<template>
    <Switch
      v-model="modelValue"
      :class="modelValue ? 'bg-teal-500' : 'bg-cyan-500'"
      class="relative inline-flex h-6 w-11 items-center rounded-full"
    >
      <span class="sr-only">Enable notifications</span>
      <span
        :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
      />
    </Switch>
  </template>


