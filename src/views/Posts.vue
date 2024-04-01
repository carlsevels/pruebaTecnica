<template>
    <div>
        <h1>Perfil de {{ getUser.name }}</h1>
        <h2>Posts</h2>
        <v-list lines="one">
            <v-list-item v-for="posts in getPost" :key="n" :title="posts.title" :subtitle="posts.title">
                <router-link id="posts" :to="{ name: 'Publicacion', params: { id: posts.id } }">
                    <v-btn variant="tonal">
                        Ver Publicacion
                    </v-btn>
                </router-link>
            </v-list-item>
        </v-list>
        <h2>Albums</h2>
        <v-list class="horizontal-list">
            <v-list-item v-for="albums in getAlbumOfUser" :key="albums.id">
                <router-link id="posts" :to="{ name: 'Album', params: { id: albums.id } }"> <v-card
                        class="mx-auto my-8" max-width="344" subtitle="Visitar Album" :title="albums.title" link>
                    </v-card></router-link>
            </v-list-item>
        </v-list>
    </div>
</template>

<style scoped>
.horizontal-list {
    display: flex;
    flex-direction: row;
    /* Asegura que los elementos se muestren en línea horizontalmente */
}
</style>

<script>
export default {
    props: ['id'],
    data() {
        return {
            id: this.id,
            getPost: [],
            getUser: [],
            getAlbumOfUser: []
        }
    },
    created() {
        fetch('https://jsonplaceholder.typicode.com/posts/?userId=' + this.id)
            .then((response) => response.json())
            .then((data) => (this.getPost = data))

        fetch('https://jsonplaceholder.typicode.com/users/' + this.id)
            .then((response) => response.json())
            .then((data) => (this.getUser = data))

        fetch('https://jsonplaceholder.typicode.com/albums/?userId=' + this.id)
            .then((response) => response.json())
            .then((data) => (this.getAlbumOfUser = data))
    },
}
</script>