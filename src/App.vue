<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
*{
  font-size: 0.9rem;
  font-family: 'Quicksand';
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance:textfield;
}

a {
    cursor: pointer;
}

</style>
