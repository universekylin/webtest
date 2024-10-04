<template>
  <h1>Service</h1>

  <datatable :data="services" :columns="columns" :options="options" class="display" ref="dt_table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Contact</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>
          <input type="text" placeholder="Search Name" v-on:input="searchColumn(0, $event)" />
        </th>
        <th>
          <input type="text" placeholder="Search Address" v-on:input="searchColumn(1, $event)" />
        </th>
        <th>
          <input type="text" placeholder="Search Contact" v-on:input="searchColumn(2, $event)" />
        </th>
      </tr>
    </tfoot>
  </datatable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// firebase
import { database } from '@/components/firebase/firebaseIndex.js'
import { collection, getDocs } from 'firebase/firestore'
// datatables
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'

const services = ref([])
const dt_table = ref()

const datatable = DataTable
datatable.use(DataTablesCore)

const columns = [{ data: 'name' }, { data: 'address' }, { data: 'contact' }]

const options = {
  paging: true,
  searching: true,
  ordering: true,
  info: true,
  lengthChange: true,
  pageLength: 10,
  lengthMenu: [5, 10, 25, 50, 100],
  order: [[0, 'asc']],
  autoWidth: true,
  responsive: true
}

onMounted(async () => {
  //  get data from firebase
  let dbservices = []
  const querySnapshot = await getDocs(collection(database, 'service'))
  querySnapshot.forEach((doc) => {
    const service = {
      id: doc.id,
      name: doc.data().name,
      address: doc.data().address,
      contact: doc.data().contact
    }
    dbservices.push(service)
  })
  services.value = dbservices
})

// define a function to search column
const searchColumn = (columnIndex, event) => {
  const table = dt_table.value.dt
  const searchTerm = event.target.value
  table.column(columnIndex).search(searchTerm).draw()
}
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
</style>
