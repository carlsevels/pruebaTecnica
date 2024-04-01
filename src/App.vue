<style src="../public/css/index.css"></style>

<script setup> 
import { ref } from 'vue';
const count = ref(0)
</script>
<template> 
    <v-layout style="margin: 32px;">
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
          <template v-slot:append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <router-link id="links" :to="{ name: 'Home' }"><v-list-item prepend-icon="mdi-home-city" title="Home"
              value="Home">Home</v-list-item></router-link>
          <router-link id="links" :to="{ name: 'About' }"><v-list-item prepend-icon="mdi-home-city" title="About"
              value="About">About</v-list-item></router-link>
          <router-link id="links" :to="{ name: 'GetList' }"><v-list-item prepend-icon="mdi-home-city" title="GetList"
              value="GetList">GetList</v-list-item></router-link>
        </v-list> 
      </v-navigation-drawer>
      <v-main>
        <router-view /> 
      </v-main>
    </v-layout>
</template>