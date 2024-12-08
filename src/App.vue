<template>
  <div class="min-h-screen bg-[#f5f2f7] py-6 flex flex-col justify-center sm:py-12 px-3">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl rounded-md"
      ></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl rounded-md sm:p-20">
        <DynamicForm :schema="schema" title="Register Form" />
        <div v-if="formStore.currentRole === 'Admin'" class="mt-6">
          <h3 class="text-xl font-bold mb-4">Submission History</h3>
          <JsonViewer :jsonData="history" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicForm from '@/components/DynamicForm.vue'
import { useFormStore } from '@/stores/formStore'
import schema from '@/schemas/exampleSchema.json';
import JsonViewer from '@/components/JsonViwer.vue'

import { computed } from 'vue'

const formStore = useFormStore()

const history = computed(() => formStore.getSubmissionHistory())
</script>
