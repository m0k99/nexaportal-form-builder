<template>
  <div>
    <pre v-html="formattedJson"></pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  jsonData: Record<string, unknown> | unknown[]
}>()

// Function to format JSON with HTML tags
const formatJsonWithHtml = (json: any): string => {
  // Convert JSON to a formatted string
  const jsonString = JSON.stringify(json, null, 2);

  // Apply styling to different parts of the JSON string
  return jsonString
    .replace(/"(.*?)"/g, (match, p1) => {
      if (p1.includes(":")) {
        return `<span class="key">"${p1}"</span>`; // Apply color to keys
      } else {
        return `<span class="string">"${p1}"</span>`; // Apply color to strings
      }
    })
    .replace(/(\b\d+\b)/g, '<span class="number">$1</span>') // Apply color to numbers
    .replace(/(\btrue\b|\bfalse\b|\bnull\b)/g, '<span class="boolean">$1</span>'); // Apply color to booleans and null
};


// Format JSON data and apply HTML tags
const formattedJson = computed(() => formatJsonWithHtml(props.jsonData))
</script>

<style>
/* Base styles for the pre tag */
pre {
  background-color: #2b2b2b; /* Dark background */
  color: #dcdcdc; /* Light text color */
  font-family: 'Courier New', Courier, monospace;
  font-style: italic; /* Italicize the text */
  padding: 15px;
  border-radius: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
}

/* Style for string values (values inside quotes) */
pre span.string {
  color: #50fa7b; /* Vivid pink for strings */
}

/* Style for keys (property names) */
pre span.key {
  color: #ff5555; /* Red color for keys */
  font-weight: bold;
}

/* Style for numbers */
pre span.number {
  color: #f1fa8c; /* Vivid yellow for numbers */
}

/* Style for booleans and null */
pre span.boolean,
pre span.null {
  color: #8be9fd; /* Vivid cyan for booleans and null */
}

/* Optional: Style for objects and arrays */
pre span.object,
pre span.array {
  color: #bd93f9; /* Vivid purple for objects and arrays */
}
</style>
