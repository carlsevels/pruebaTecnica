<style>
/* Estilos para la impresión */
@media print {

  /* Estilos para la impresión */
  .logo-print {
    display: none;
    /* Mostrar el logo solo durante la impresión */
  }

  .text-print {
    display: none;
    /* Mostrar el texto solo durante la impresión */
  }
}

/* Estilos para la vista normal */
.logo-print {
  display: block;
}

.text-print {
  display: block;
  /* Ocultar el logo y el texto en la vista normal */
}
</style>

<template>
  <div>
    <v-row>
      <v-col>
        <h1>Users</h1>
      </v-col>
      <v-co>
        <v-btn id="cmd" @click="printPDF" variant="tonal">
          Imprimir
        </v-btn>
      </v-co>
    </v-row>
    <div id="content">
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
  </div>
</template>


<script>
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
    printPDF() {
      var doc = new jsPDF();
      var specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };
      // Agregar un encabezado
      doc.addImage('https://infimg.com/bimg/2016/11/imagenes-gratis-sin-copyright.jpg', 'JPEG', 15, 15, 50, 50, {
        'width': 170,
        'elementHandlers': specialElementHandlers
      });

      // Agregar un pie de página
      doc.addImage('https://infimg.com/bimg/2016/11/imagenes-gratis-sin-copyright.jpg', 'JPEG', 15, doc.internal.pageSize.height - 20, 50, 50, {
        'width': 170,
        'elementHandlers': specialElementHandlers
      });


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
