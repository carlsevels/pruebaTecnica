<template>
    <div>
        <v-row>
            <v-col v-for="photo in getPhotosOfAlbum" :key="photo" class="d-flex child-flex" cols="4">
                <v-img :lazy-src="photo.thumbnailUrl" :src="photo.url" aspect-ratio="1" class="bg-grey-lighten-2" cover>
                    <template v-slot:placeholder>
                        <v-row align="center" class="fill-height ma-0" justify="center">
                            <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </v-col>
        </v-row>
    </div>
</template>


<script>
export default {
    props: ['id'],
    data() {
        return {
            id: this.id,
            getPhotosOfAlbum: []
        }
    },
    created() {
        fetch('https://jsonplaceholder.typicode.com/photos/?albumId=' + this.id)
            .then((response) => response.json())
            .then((data) => (this.getPhotosOfAlbum = data))
    },
}
</script>