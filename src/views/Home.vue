<template>
  <div>
    <h1>Check Quality of AI</h1>
    <section>
      <input type="text" v-model="city">
      <button @click="getMeasurements()">LOAD</button>
      {{promise}}
      <p v-if="promise">.....</p>
      <p>{{measurements}}</p>
    </section>
    {{city}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  data() {
    return {
      city: undefined,
      measurements: undefined,
      promise: undefined
    };
  },
  methods: {
    async getMeasurements() {
      this.promise = axios
        .get(`https://api.openaq.org/v1/measurements?city=${this.city}`)
        .then(x => x.data)
        .catch(err => console.log(err));
      console.log(this.promise);
      this.measurements = await this.promise;
      console.log("LLLLL");
    }
  }
};
</script>

<style lang="scss" scoped></style>
