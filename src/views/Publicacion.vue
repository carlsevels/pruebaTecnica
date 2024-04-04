<template>
  <div>
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col>
          <h2>Publicacion</h2>
        </v-col>
        <v-spacer></v-spacer>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" color="#dc3545" text="Delete" variant="flat"></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Eliminar publicacion">
              <v-card-text>
                Una vez eliminada esta publicacion no podras recuperarla, estas seguro?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Eliminar" @click="deleteItem(getPost.userId)"></v-btn>
                <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
        <v-dialog max-width="500">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" text="Edit" variant="flat"></v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-form @submit.prevent="updateRecord">
              <v-card title="Editar publicacion" style="padding: 16.0px;">
                <v-text-field v-model="editPost.title" label="Titulo" variant="underlined"></v-text-field>
                <v-textarea v-model="editPost.body" label="Descripcion" variant="underlined"></v-textarea>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary">Save Changes</v-btn>
                </v-card-actions>
              </v-card></v-form>
          </template>
        </v-dialog>
      </v-row>
    </v-container>
    <v-card :title="getPost.title" :text="getPost.body"></v-card>
    <div style="height: 16.0px;"></div>
    <h2>Comentarios</h2>
    <v-list lines="one">
      <v-list-item v-for="comments in getCommentsOfPost" :key="comments" :title="comments.name"
        :subtitle="comments.body"></v-list-item>
    </v-list>
  </div>
</template>

<script>
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  props: ['id'],
  data() {
    return {
      id: this.id,
      getPost: [],
      getCommentsOfPost: [],
      editPost: {
        id: this.id,
        title: '',
        body: '',
      }
    }
  },
  created() {

    this.loadRecordFromDatabase(),
      fetch('https://jsonplaceholder.typicode.com/posts/' + this.id + '/comments')
        .then((response) => response.json())
        .then((data) => (this.getCommentsOfPost = data))
  },
  mounted() {
    // Aquí cargarías los datos del registro que deseas editar desde la base de datos
    // Por ejemplo, podrías hacer una solicitud HTTP a tu API para obtener los datos del registro con el ID correspondiente

    this.loadRecordFromDatabase();
  },
  methods: {
    loadRecordFromDatabase() {
      fetch('https://jsonplaceholder.typicode.com/posts/' + this.id)
        .then((response) => response.json())
        .then((data) => (this.getPost = data)).then(response => {
          this.editPost.title = response.title;
          this.editPost.body = response.body;
        });

    },
    async deleteItem(userId) {
      try {
        fetch(`https://jsonplaceholder.typicode.com/posts/` + this.id, {
          method: 'DELETE',
        }); // Reemplaza 'URL_DE_TU_API' por la URL de tu API y itemId por el ID del elemento a eliminar
        this.$router.push('/perfil/' + userId);
        console.log("Item Eliminado Exitosamente!");
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
      }
    },
    updateRecord() {
      fetch('https://jsonplaceholder.typicode.com/posts/' + this.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.editPost.title,
          body: this.editPost.body,
          id: this.id,
        }),
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Luego de la actualización exitosa, podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
        alert('Registration successful!: ' + JSON.stringify(this.editPost));
        console.log('Record updated successfully');
      })
        .catch(error => {
          console.error('There was a problem updating the record:', error);
          // Manejo de errores, podrías mostrar un mensaje al usuario indicando que ocurrió un error
        });

    }
  }
}
</script>
