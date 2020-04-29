<template>
  <div>
    <Ordering :data="data" />
    <div v-if="filter" class="keywords">
      <div class="filters">
        <div v-if="!removeClicked && status">
          <h4>{{ status }}</h4>
          <span id="status" @click="handleRemoveFilter">&#10006;</span>
        </div>
        <div v-if="!removeClicked && species">
          <h4>{{ species }}</h4>
          <span id="species" @click="handleRemoveFilter">&#10006;</span>
        </div>
        <div v-if="!removeClicked && gender">
          <h4>{{ gender }}</h4>
          <span id="gender" @click="handleRemoveFilter">&#10006;</span>
        </div>
        <div v-if="!removeClicked && origin">
          <h4>{{ origin }}</h4>
          <span id="origin" @click="handleRemoveFilter">&#10006;</span>
        </div>
        <div v-if="!removeClicked && location">
          <h4>{{ location }}</h4>
          <span id="location" @click="handleRemoveFilter">&#10006;</span>
        </div>
      </div>
      <h5 @click="removeFilterDashboard">Clear</h5>
    </div>
    <div class="tile-container">
      <div class="tile" v-for="tile in handleShowTiles" :key="tile.data">
        <img :src="`${tile.image}`" />
        <div class="title-container" @click="handleShowEpisodes(tile.episode)">
          <h1>{{ tile.name }}</h1>
          <p>
            id: {{ tile.id }}
            -
            <span>created {{ tile.created | formatTime() }}</span>
          </p>
        </div>
        <div class="tile-info">
          <p>
            STATUS
            <span id="status" @click="handleClickFilter">{{ tile.status }}</span>
          </p>
          <hr />
          <p>
            SPECIES
            <span id="species" @click="handleClickFilter">{{ tile.species }}</span>
          </p>
          <hr />
          <p>
            GENDER
            <span id="gender" @click="handleClickFilter">{{ tile.gender }}</span>
          </p>
          <hr />
          <p>
            ORIGIN
            <span id="origin" @click="handleClickFilter">{{ tile.origin.name }}</span>
          </p>
          <hr />
          <p>
            LAST LOCATION
            <span id="location" @click="handleClickFilter">{{ tile.location.name }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Ordering from './ordering';

export default {
  components: {
    Ordering,
  },
  data() {
    return {
      data: [],
      filter: false,
      removeClicked: false,
      status: '',
      species: '',
      gender: '',
      origin: '',
      location: '',
      isAscending: null,
    };
  },
  mounted() {
    axios.get('https://rickandmortyapi.com/api/character/').then((response) => (this.data = response.data.results));
  },
  computed: {
    handleShowTiles() {
      let status = this.status;
      let species = this.species;
      let gender = this.gender;
      let origin = this.origin;
      let location = this.location;

      if (status || species || gender || origin || location) {
        return this.data
          .filter((arr) => (status.length > 0 ? arr.status === status : arr))
          .filter((arr) => (species.length > 0 ? arr.species === species : arr))
          .filter((arr) => (gender.length > 0 ? arr.gender === gender : arr))
          .filter((arr) => (origin.length > 0 ? arr.origin.name === origin : arr))
          .filter((arr) => (location.length > 0 ? arr.location.name === location : arr));
      } else return this.removeFilterDashboard();
    },
  },
  methods: {
    handleShowEpisodes(val) {
      sessionStorage.setItem('episodes', JSON.stringify(val));
      this.$router.push('episodes');
    },
    removeFilterDashboard() {
      this.status = '';
      this.species = '';
      this.gender = '';
      this.origin = '';
      this.location = '';
      this.filter = false;
      return this.data;
    },
    handleRemoveFilter() {
      let id = event.target.id;

      id === 'status'
        ? (this.status = '')
        : id === 'species'
        ? (this.species = '')
        : id === 'gender'
        ? (this.gender = '')
        : id === 'origin'
        ? (this.origin = '')
        : id === 'location'
        ? (this.location = '')
        : '';
      this.handleShowTiles;
    },
    handleClickFilter() {
      let result = event.target.innerHTML;
      let id = event.target.id;

      id === 'status'
        ? (this.status = result)
        : id === 'species'
        ? (this.species = result)
        : id === 'gender'
        ? (this.gender = result)
        : id === 'origin'
        ? (this.origin = result)
        : id === 'location'
        ? (this.location = result)
        : '';
      this.removeClicked = false;
      this.filter = true;
    },
  },
};
</script>
