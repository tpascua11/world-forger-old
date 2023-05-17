<template>
  <div>
    <input type="file" @change="handleFileInput" accept=".json">
  </div>
</template>

<script>
export default {
  name: 'LoadJson',
  methods: {
    handleFileInput(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const jsonContent = e.target.result;
        const jsonData = JSON.parse(jsonContent);
        this.$emit('json-loaded', jsonData);
        // Use jsonData as needed, e.g., update component data, call methods, etc.
      };

      reader.readAsText(file);
    }
  }
}
</script>

