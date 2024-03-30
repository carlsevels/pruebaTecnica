<template>
  <v-container>
    <v-responsive>
      <v-row>
        <v-col cols="3">
          <v-text-field label="Search" prepend-icon="$vuetify" clearable variant="underlined">
          </v-text-field>
          <v-card title="Chats" color="indigo"></v-card>
          <v-list id="chats" lines="two">
            <v-list-item v-for="n in 2" :key="n" :title="'Item ' + n" subtitle="Mensajes de texto"
              :prepend-avatar="'https://randomuser.me/api/portraits/women/8.jpg'"></v-list-item>
          </v-list>
          <v-divider class=""></v-divider>
          <v-card color="indigo" title="Contacts">
            <v-list id="contacts" lines="two">
              <v-list-item v-for="n in 10" :key="n" :title="'Contact #' + n" subtitle="Enviar mensaje"
                :prepend-avatar="'https://randomuser.me/api/portraits/women/8.jpg'"></v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-toolbar border id="encabezadoChat">
            <div class="ma-4">
              <v-img id="profilePhoto" :aspect-ratio="1" class="bg-white"
                src="https://media.revistagq.com/photos/606b3183a359af169e483dcb/16:9/w_2560%2Cc_limit/estar-guapo.jpeg"
                width="50" cover></v-img>
            </div>
            <v-toolbar-title>Carlos Velez</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-paperclip</v-icon>
            </v-btn>
          </v-toolbar>
          <v-col>
            <v-list id="mensajes" class="justify-end" align="right" lines="two">
              <v-list-item  color="red" id="mensajeUser" v-for="name in filteredMensajes" :key="name" :title="name"
                subtitle="Enviado">
              </v-list-item>
            </v-list>
            <v-row>
              <v-col cols="10">
                <v-text-field id="inputMensaje" @keydown.enter="create" v-model="first" label="Escribir mensaje..."
                  clearable variant="underlined">
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn @click="create">Enviar</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';

const mensajeList = reactive([])
const selected = ref('')
const prefix = ref('')
const first = ref('')

const filteredMensajes = computed(() =>
  mensajeList.filter((n) =>
    n.toLowerCase().startsWith(prefix.value.toLowerCase())
  )
)

watch(selected, (mensaje) => {
  ;[first.value] = mensaje.split(', ')
})

function create() {
  if (hasValidInput()) {
    const fullName = `${first.value}`
    mensajeList.push(fullName)
    first.value = ''
  }
}

// var input = document.getElementById("inputMensaje");
// input.addEventListener("keyup", function (event) {
//   if (event.keyCode === 13) {
//     create();
//   }
// });

function hasValidInput() {
  return first.value.trim()
}

</script>