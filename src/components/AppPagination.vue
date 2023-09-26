  <script>
  export default {
    props: {
      currentPage: Number,
      totalPages: Number
    },
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('page-change', page);
        }
      }
    }
  };
  </script>
<template>
    <nav aria-label="Pagination">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click="changePage(currentPage - 1)"><i class="fa-solid fa-circle-arrow-left fa-xl"></i></a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click="changePage(currentPage + 1)"><i class="fa-solid fa-circle-arrow-right fa-xl"></i></a>
        </li>
      </ul>
    </nav>
  </template>
  