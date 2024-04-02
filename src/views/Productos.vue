<template>
    <Bar :chart-options="chartOptions" :data="chartData"></Bar>
    <v-list lines="one">
        <v-list-item class="column-4" v-for="products in getAllProductos" :key="products.id">
            <v-card class="mx-auto" max-width="344">
                <v-img height="200px" :src="products.image" cover></v-img>
                <v-card-title>
                    {{ products.title }} - ${{ products.price }}
                </v-card-title>

                <v-card-subtitle>
                    {{ products.category }}
                </v-card-subtitle>

                <v-card-actions>
                    <v-btn color="orange-lighten-2" variant="text">
                        Explore
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>

                        <v-card-text>
                            {{ products.description }}
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-list-item>
    </v-list>
</template>

<script>
import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'vue-chartjs';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        }
    },
    data() {
        return {
            getAllProductos: [],
            show: false,
            categorias: [],
            price: [],
            chartData: [],
            chartOptions: {
                responsive: true
            },
        }
    },
    async mounted() {
        const datos = await axios.get('https://fakestoreapi.com/products');
        datos.data.map((row) => (
            this.categorias.push(row.category),
            this.price.push(row.price)
        )),
            this.chartData = {
                labels: this.categorias,
                datasets: [
                    { label: 'Precios', data: this.price }
                ]
            }
    },
    created() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then((data) => (this.getAllProductos = data))
    },
}
</script>

<style scoped>
.column-4 {
    width: calc(25% - 16px);
    /* 25% width for each column with some spacing */
    margin-right: 16px;
    /* Adjust spacing between columns as needed */
    float: left;
    /* Float the items to create a grid layout */
    box-sizing: border-box;
    /* Include padding and border in the element's total width and height */
}
</style>