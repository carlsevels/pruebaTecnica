<script setup>
import { ref } from 'vue';
const count = ref(0)
</script>
<template>
  <v-app>
    <v-main>
      <v-btn @click="count++">
        Count is: {{ count }}
      </v-btn>
      <HelloWorld />
      <div id="app">

      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

</script>



<style>
#contacts {
  height: 210px;
  overflow: auto;
}

.v-list {
  margin-bottom: 16.0px;
}

#user {
  margin-left: 8.0px;
}

#user2 {
  margin-right: 8.0px;
}

#encabezadoChat {
  margin-bottom: 16.0px;
}

#mensajes {
  height: 400px;
}

#mensajeUser {
  width: max-content;
  background-color: blue;
  border-radius: 8.0px;
  margin-right: 8.0px;
  margin-bottom: 8.0px;

  -webkit-box-shadow: 0px 5px 10px 0px rgba(133,133,133,1);
-moz-box-shadow: 0px 5px 10px 0px rgba(133,133,133,1);
box-shadow: 0px 5px 10px 0px rgba(133,133,133,1);
  ;
}

#profilePhoto {
  border-radius: 100%;
}

#mensajeUser{
  color: white
}

</style>
