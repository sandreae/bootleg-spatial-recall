<template>
  <div class="input-control">
    <label><slot /></label>
    <input
      v-if="controlType === 'input'"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-if="controlType === 'passord'"
      v-bind="$attrs"
      :value="value"
      type="password"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-if="controlType === 'date'"
      :value="value"
      type="date"
      @input="$emit('input', $event.target.value)"
    />
    <textarea
      v-if="controlType === 'textarea'"
      rows="5"
      :value="value"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <input
      v-if="controlType === 'audio-file'"
      type="file"
      :value="value"
      accept="audio/*"
      class="input-file"
      @change="$emit('fileChange', $event.target.files[0])"
    />
    <input
      v-if="controlType === 'image-file'"
      type="file"
      :value="value"
      accept="image/*"
      class="input-file"
      @change="$emit('fileChange', $event.target.files[0])"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInputControl',
  props: {
    controlType: {
      type: String,
      default: 'input',
    },
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.input-control {
  margin: 5px 0;
}

.input-control label {
  display: block;
  font-weight: bold;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid white;
  background-color: var(--secondary-bg-color);
  padding: 3px;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: white;
  outline: none;
}
</style>
