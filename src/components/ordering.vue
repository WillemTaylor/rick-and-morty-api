<template>
  <div class="order-by">
    <p>
      Order by:
      <span @click="handleSort">Name</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
    },
  },
  methods: {
    handleSort() {
      event.target.classList.remove('ascending');
      event.target.classList.remove('descending');

      if (this.isAscending) {
        this.data.sort((a, b) => a.name.localeCompare(b.name));
        event.target.classList.add('descending');
      } else {
        this.data.sort((a, b) => b.name.localeCompare(a.name));
        event.target.classList.add('ascending');
      }
      this.isAscending = !this.isAscending;
    },
  },
};
</script>
