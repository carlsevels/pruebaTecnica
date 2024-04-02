<template>
    <div>
        <v-row>
            <v-col>
                <h1>Users</h1>
            </v-col>
            <v-co>
                <v-btn @click="convertToPDF" variant="tonal">
                    Imprimir
                </v-btn>
            </v-co>
        </v-row>
        <v-list item-props lines="one">
            <v-list-item v-for="getList in getAll" :key="getAll.id" :title="getList.username" :subtitle="getList.email">
                <router-link id="posts" :to="{ name: 'Posts', params: { id: getList.id } }">
                    <v-btn variant="tonal">
                        Ver Perfil
                    </v-btn>
                </router-link>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import html2pdf from 'html2pdf.js';
export default {
    data() {
        return {
            getAll: []
        }
    },
    created() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => (this.getAll = data))
    },
    methods: {
        convertToPDF() {
            const element = this.$el; // Captura el elemento que contiene la lista
            html2pdf().from(element).save();
        }
    }
}
</script>