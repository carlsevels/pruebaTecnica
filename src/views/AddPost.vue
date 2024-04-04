<template>
  <h2>Agregar Publicacion</h2>
  <v-card style="padding: 16.0px;">
    <v-form @submit.prevent="createPost">
      <div>
        <v-text-field v-model="formData.title" learable variant="underlined" label="Titulo"></v-text-field>
        <v-textarea v-model="formData.body" rows="1" label="Descripcion" variant="underlined" clearable></v-textarea>
      </div>
      <v-btn type="submit" color="primary">Register</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      formData: {
        title: '',
        body: '',
        userId: ''
      }
    };
  },
  methods: {
    async createPost() {
      // Perform client-side validation
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // Prepare data for POST request
      const requestData = {
        title: this.formData.title,
        body: this.formData.body,
        userId: this.id
      };
      try {
        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            title: this.formData.title,
            body: this.formData.body,
            userId: this.id
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(requestData)
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          // Handle successful registration
          alert('Registration successful!: ' + JSON.stringify(requestData));

          // You might want to redirect the user to another page here
        })
          .catch(error => {
            console.error('There was a problem with your registration:', error);
            alert('Registration failed. Please try again.');
          });
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
      }
    }
  }
}

</script>
