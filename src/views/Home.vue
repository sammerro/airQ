<template>
  <div>
    <h1>Check Quality of AIR in</h1>
    <!-- <hr>
    <h2>{{groupedLatest}}</h2>
    <hr>-->
    <section class="value__section">
      <h2 v-colorParameter:red="getCitiesByCountry">latest avg results</h2>
      <ul class="value__container">
        <li class="value__list" v-for="(value,parameterName) in latestAvg" :key="parameterName">
          <span class="results__parameterName">{{parameterName}}:</span>
          <span class="results__parameterValue">{{value.toFixed(2)}}</span>
        </li>
      </ul>
    </section>
    <section>
      <!--       <input type="text" v-model="country"> -->
      <!--       <h2>PARAMETERS:</h2>
      <ul>
        <li v-for="(param,index) in parameters" :key="index">{{param}}</li>
      </ul>-->
      <!--       <button @click="getCountries()">LOAD</button> -->
      <select class="select-country" v-model="country">
        <option
          class="select-country__option"
          v-for="(country, index) in countries"
          :value="country.code"
          :label="country.name"
          :key="index"
        ></option>
      </select>
      <!--       <button @click="getCitiesByCountry(country)">getCITIEs</button> -->
    </section>
    <article>
      <ul class="city__container">
        <li v-for="(c, index) in cities" :key="index">
          <button class="city" @click="city=c">{{c}}</button>
        </li>
      </ul>
    </article>
    <!-- <article>{{latest}}</article>
    <hr>
    <ul>
      <li v-for="(param, index) in parametersIds" :key="index">{{param}}: ==== {{}}</li>
    </ul>
    <p style="font-size: 22px;">{{flatLatestMeasurements}}</p>-->
  </div>
</template>

<script>
import axios from "axios";
import { getCountries, getCities, getLatest, getParameters } from "@/api/api";
import { objectMap, avg, isToday, isYesterday } from "@/helpers";

export default {
  name: "HomeView",
  data() {
    return {
      country: "",
      countries: [],
      city: "",
      cities: [],
      parameters: undefined,
      latest: undefined
    };
  },
  async mounted() {
    this.getCountries();
  },
  watch: {
    country: {
      handler(newVal) {
        this.cities = this.getCitiesByCountry(newVal);
      },
      immediate: false
    },
    city: {
      handler(newVal) {
        if (newVal !== "") {
          this.getLatestByCity(newVal);
        }
      }
    }
  },
  async mounted() {
    const [parametersResponse, countriesResponse] = await Promise.all([
      getParameters(),
      getCountries()
    ]);
    this.parameters = parametersResponse.results;
    this.countries = countriesResponse.results;
  },
  computed: {
    resultsObject() {
      if (this.measurements) {
        return this.measurements.results;
      }
      return undefined;
    },
    parametersIds() {
      if (this.parameters) {
        this.parameters.map(el => el.id);
      }
    },
    groupedLatest() {
      if (this.flatLatestMeasurements) {
        const grouped = this.flatLatestMeasurements.reduce((acc, rec) => {
          const lastUpdated = rec.lastUpdated;
          if (isToday(lastUpdated) || isYesterday(lastUpdated)) {
            if (acc[rec.parameter] === undefined) {
              acc[rec.parameter] = [];
            }
            acc[rec.parameter].push(rec.value);
          }
          return acc;
        }, {});
        return grouped;
      }
      return null;
    },
    latestAvg() {
      debugger;
      if (this.groupedLatest) {
        return objectMap(this.groupedLatest, avg);
      }
      return null;
    },
    // helper
    flatLatestMeasurements() {
      if (this.latest) {
        const measurementArrays = this.latest.map(obj => obj.measurements);
        const flatMeasurements = measurementArrays.reduce((acc, rec) =>
          acc.concat(rec)
        );
        return flatMeasurements;
      }
      return null;
    }
  },
  methods: {
    async getCountries() {
      const countriesResponse = await getCountries();
      this.countries = countriesResponse.results;
    },
    async getCitiesByCountry(country) {
      const citiesResponse = await getCities({ country: country });
      this.cities = citiesResponse.results.map(obj => obj.city);
    },
    async getLatestByCity(city) {
      const latestResponse = await getLatest({ city: city });
      this.latest = latestResponse.results;
    }
  }
};
</script>

<style lang="scss" scoped>
.results {
  &__parameterName {
    font-size: 1.4em;
    color: red;
  }
  &__parameterValue {
    color: blue;
    font-size: 2em;
  }
}
.select-country {
  padding: 0.5em 1em;
}
.select-country__option {
  transition: all 0.2s ease-out;
  margin: 1em;
  padding: 0.5em 1em;
}
.select-country__option:hover {
  background-color: #bbb;
}
.city {
  &__container {
    width: 600px;
    margin: auto;
    list-style: none;
    display: flex;
    flex-flow: row wrap;
  }
  &,
  &:link {
    margin: 0.5em 1em;
    display: block;
    padding: 0.5em 1em;
    color: #555;
    background-color: #efefef;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }
  &:hover {
    background-color: #bbb;
  }
  &:active {
    color: #333;
  }
}

.value {
  &__section {
    min-height: 10em;
    background: rgb(209, 233, 235);
  }
  &__container {
    display: flex;
    list-style: none;
  }
  &__list {
    padding: 0.4em 1em;
    margin: 1em;
  }
}
</style>
