<template>
  <div class="tile-container">
    <div v-if="this.data.length === 0">
      <h1>No episodes to show</h1>
    </div>
    <div v-else class="tile" v-for="tile in data" :key="tile.data">
      <p style="margin-left: 15px;">
        id: {{ tile.id }}
        -
        <span>created {{ tile.created | formatTime() }}</span>
      </p>
      <div class="tile-info">
        <p>
          EPISODE
          <span>{{ tile.episode }}</span>
        </p>
        <hr />
        <p>
          NAME
          <span>{{ tile.name }}</span>
        </p>
        <hr />
        <p>
          AIR DATE
          <span>{{ tile.air_date }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '../assets/filters';

export default {
  data() {
    return {
      data: '',
    };
  },
  mounted() {
    let eps = JSON.parse(sessionStorage.getItem('episodes'));
    axios
      .get('https://rickandmortyapi.com/api/episode')
      .then((response) =>
        eps.length > 1
          ? (this.data = response.data.results.filter((x) => eps.filter((y) => x.url === y)))
          : eps.length === 1
          ? (this.data = response.data.results.filter((x) => x.url === eps[0]))
          : (this.data = [])
      );
  },
};
</script>
