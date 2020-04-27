<template>
  <div class="tile-container">
    <div class="tile" v-for="tile in handleShowCharacters" :key="tile.data">
      <img :src="`${tile.image}`" />
      <div class="title-container">
        <h1>{{ tile.name }}</h1>
        <p>
          id: {{ tile.id }}
          -
          <span>created {{ tile.created | formatTime(tile.created) }}</span>
        </p>
      </div>
      <div class="tile-info">
        <p>
          STATUS <span>{{ tile.status }}</span>
        </p>
        <hr />
        <p>
          SPECIES
          <span>{{ tile.species }}</span>
        </p>
        <hr />
        <p>
          GENDER
          <span>{{ tile.gender }}</span>
        </p>
        <hr />
        <p>
          ORIGIN
          <span>{{ tile.origin.name }}</span>
        </p>
        <hr />
        <p>
          LAST LOCATION
          <span>{{ tile.location.url }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      data: '',
      location: '',
    };
  },
  mounted() {
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then((response) => (this.data = response.data.results));
    axios
      .get('https://rickandmortyapi.com/api/location')
      .then((response) => (this.location = response.data.results));
  },
  computed: {
    handleShowCharacters() {
      return this.data;
    },
  },
  filters: {
    formatTime(val) {
      return moment(val).fromNow();
    },
  },
};
</script>
