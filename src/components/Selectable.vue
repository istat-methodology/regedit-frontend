/* eslint-disable prettier/prettier */
<template>
  <CCard>
    <CCardHeader>
      Process steps
    </CCardHeader>
    <CCardBody>
      <div
        class="alert"
        v-for="(opt, index) in selectableOptions"
        :key="opt.id"
        :class="opt.selected ? 'alert-selected' : 'alert-secondary'"
        @click="toggleSelected(index)"
      >
        <cog-icon class="mr-2" /><span>{{ opt.name }} </span>
        <success-icon
          class="float-right alert-right-icon"
          v-if="opt.selected"
        />
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  name: "Selectable",
  props: {
    options: {
      Type: Array,
      default: () => []
    },
    selectedOptions: {
      Type: Array,
      default: () => []
    }
  },
  computed: {
    selectableOptions() {
      this.options.map(option => {
        this.$set(option, "selected", this.getIsSelected(option)); //set reactive property
      });
      return this.options;
    }
  },
  methods: {
    toggleSelected(index) {
      this.selectableOptions[index].selected = !this.selectableOptions[index]
        .selected;
    },
    getIsSelected(option) {
      this.selectedOptions.forEach(selectedOption => {
        if (selectedOption.id == option.id) return true;
      });
      return false;
    }
  }
};
</script>

<style scoped>
.alert {
  position: relative;
  padding: 0.5rem 1rem 0.5rem 1.25rem;
  margin-bottom: 0.8rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  border-color: #d8dbe0;
  font-size: 0.8rem;
}
.alert:hover {
  cursor: pointer;
}
.alert-right-icon {
  font-size: 0.9rem;
  scroll-padding-top: 0.95rem;
}
.alert-secondary {
  color: #3c4b64;
}
.alert-selected {
  border: 1px solid #321fdb;
  background-color: #321fdb;
  color: white;
}
</style>
