<template>
  <div>
    <div class="order-by">
      <p>
        Order by:
        <span @click="handleSort">Name</span>
      </p>
    </div>
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
            <span id="species" @click="handleClickFilter">
              {{
              tile.species
              }}
            </span>
          </p>
          <hr />
          <p>
            GENDER
            <span id="gender" @click="handleClickFilter">
              {{
              tile.gender
              }}
            </span>
          </p>
          <hr />
          <p>
            ORIGIN
            <span>{{ tile.origin.name }}</span>
          </p>
          <hr />
          <p>
            LAST LOCATION
            <span>{{ tile.location.name }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: "",
      filter: false,
      removeClicked: false,
      status: "",
      species: "",
      gender: "",
      origin: "",
      location: "",
      isAscending: null
    };
  },
  mounted() {
    axios
      .get("https://rickandmortyapi.com/api/character/")
      .then(response => (this.data = response.data.results));
  },
  computed: {
    handleShowTiles() {
      let status = this.status;
      let species = this.species;
      let gender = this.gender;
      // let origin = this.origin;
      // let location = this.location

      if (status || species || gender) {
        return this.data
          .filter(arr => (status.length > 0 ? arr.status === status : arr))
          .filter(arr => (species.length > 0 ? arr.species === species : arr))
          .filter(arr => (gender.length > 0 ? arr.gender === gender : arr));
      } else return this.removeFilterDashboard();
    }
  },
  methods: {
    handleShowEpisodes(val) {
      sessionStorage.setItem("episodes", JSON.stringify(val));
      this.$router.push("episodes");
    },
    handleSort() {
      event.target.classList.remove("ascending");
      event.target.classList.remove("descending");

      if (this.isAscending) {
        this.data.sort((a, b) => a.name.localeCompare(b.name));
        event.target.classList.add("descending");
      } else {
        this.data.sort((a, b) => b.name.localeCompare(a.name));
        event.target.classList.add("ascending");
      }
      this.isAscending = !this.isAscending;
    },
    removeFilterDashboard() {
      this.status = "";
      this.species = "";
      this.gender = "";
      this.filter = false;
      return this.data;
    },
    handleRemoveFilter() {
      let id = event.target.id;

      id === "status"
        ? (this.status = "")
        : id === "species"
        ? (this.species = "")
        : id === "gender"
        ? (this.gender = "")
        : "";
      this.handleShowTiles;
    },
    handleClickFilter() {
      let result = event.target.innerHTML;
      let id = event.target.id;

      id === "status"
        ? (this.status = result)
        : id === "species"
        ? (this.species = result)
        : id === "gender"
        ? (this.gender = result)
        : "";
      this.removeClicked = false;
      this.filter = true;
    }
  }
};
</script>
