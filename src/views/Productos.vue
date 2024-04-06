<template>
  <v-row id="content" align="start" no-gutters>
    <v-col style="position: sticky; top: 16.0px;" cols="3">
      <h1>Productos</h1>
      <div v-if="loading">
        <center>
          <v-progress-circular color="info" size="24" indeterminate></v-progress-circular>
          <h3>Cargando grafica...</h3>
        </center>
      </div>
      <div v-else-if="error">Error: {{ errorMessage }}</div>
      <div v-else>
        <!-- Renderizar los datos aquí -->
        <Bar :chart-options="chartOptions" :data="chartData"></Bar>
      </div>
    </v-col>
    <v-col align="end" cols="9">
      <div
        style="position: sticky; top:  16.0px; z-index: 1; background-color: white; padding: 16.0px;box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;">
        <v-btn @click="printPDF" variant="outlined">
          Imprimir
        </v-btn>
      </div>
      <v-list lines="one">
        <v-list-item class="column-4" v-for="products in getAllProductos" :key="products.id">
          <v-card class="mx-auto" max-width="200">
            <v-img height="100px" :src="products.image" cover></v-img>
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
    </v-col>
  </v-row>
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
      loading: true,
      error: false,
      errorMessage: '',
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
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const datos = response.data;

      // Simular un retraso para demostrar el estado de carga
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (Array.isArray(datos) && datos.length > 0) {
        // Procesar los datos y asignarlos a chartData
        // En este ejemplo, simplemente mostramos un conjunto de datos vacío
        this.categorias = [];
        this.price = [];
        datos.forEach(row => {
          if (row.category && row.price) {
            this.categorias.push(row.category);
            this.price.push(row.price);
          }
        });

        this.chartData = {
          labels: this.categorias,
          datasets: [{ label: 'Precios', data: this.price }]
        };
      } else {
        // Mostrar un mensaje de error si no se encontraron datos
        this.error = true;
        this.errorMessage = 'No se encontraron datos';
      }
    } catch (error) {
      // Mostrar un mensaje de error si hay un error en la solicitud
      this.error = true;
      this.errorMessage = error.message || 'Error al obtener los datos de la API';
    } finally {
      // Cambiar el estado de carga después de completar la solicitud
      this.loading = false;
    }
  },
  created() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data) => (this.getAllProductos = data))
  },
  methods: {
    printPDF() {
      var doc = new jsPDF();
      var specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };

      // Agregar un pie de página HTML
      var footerHtml = `
    <div style="text-align:center;">
      <v-row>
        <v-spacer></v-spacer>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            Footer
          </v-sheet>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>

        </v-col>
      </v-row>
    </div>`;
      doc.fromHTML(footerHtml, 15, doc.internal.pageSize.height - 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
      });

      // Agregar un encabezado HTML
      var headerHtml = `<v-row>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          Header
        </v-sheet>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
      </v-col>
    </v-row>`;
      doc.fromHTML(headerHtml, 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
      });

      doc.fromHTML($('#content').html(), 15, 30, {
        'width': 170,
        'elementHandlers': specialElementHandlers
      });
      doc.save('users.pdf');
    }
  }
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
