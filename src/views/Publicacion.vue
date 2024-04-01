<template>
    <div>
        <h1>Publicacion</h1>
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
export default {
    props: ['id'],
    data() {
        return {
            id: this.id,
            getPost: [],
            getCommentsOfPost: [],
        }
    },
    created() {
        fetch('https://jsonplaceholder.typicode.com/posts/' + this.id)
            .then((response) => response.json())
            .then((data) => (this.getPost = data))

        fetch('https://jsonplaceholder.typicode.com/posts/' + this.id + '/comments')
            .then((response) => response.json())
            .then((data) => (this.getCommentsOfPost = data))

    },
}
</script>