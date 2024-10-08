<template>
  <h1>Our Service</h1>

  <GoogleMap
    api-key="AIzaSyD6u-MfKYKEDdsrFz432zc24i1O_oi57Rg"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="10"
    ref="mapRef"
  >
    <Marker
      v-for="(service_item, index) in serviceMarkers"
      :key="index"
      :options="{ position: service_item.position }"
      @click="showInfoWindow(service_item)"
    />

    <InfoWindow v-if="selectedService" :options="{ position: selectedService.position }">
      <div>
        <h3>{{ selectedService.service.name }}</h3>
        <p>Address: {{ selectedService.service.address }}</p>
        <p>Contact: {{ selectedService.service.contact }}</p>
      </div>
    </InfoWindow>
  </GoogleMap>

  <hr />

  <h3>Get Route</h3>
  <form @submit.prevent="calculateRoute">
    <div class="form-group mt-4">
      <label for="startPlace" class="form-label">Start</label>
      <input
        type="text"
        id="startPlace"
        class="form-control mt-2"
        v-model="startPlace"
        placeholder="Enter start address"
        ref="autocompleteInput"
        required
      />
    </div>

    <div class="form-group mt-4">
      <label for="endPlace" class="form-label">End</label>
      <select v-model="selectedServiceId" class="form-control mt-2" required>
        <option v-for="s in services" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </div>

    <div class="form-group mt-4">
      <label for="travelMode" class="form-label">Travel Mode</label>
      <select v-model="travelMode" class="form-control mt-2">
        <option value="DRIVING">Driving</option>
        <option value="WALKING">Walking</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary btn-block mt-4">Get Route</button>
  </form>

  <br />

  <div v-if="routeDetails">
    <h3>Route Details</h3>
    <p><strong>From:</strong> {{ routeDetails.start_address }}</p>
    <p><strong>To:</strong> {{ routeDetails.end_address }}</p>
    <p><strong>Distance:</strong> {{ routeDetails.distance.text }}</p>
    <p><strong>Duration:</strong> {{ routeDetails.duration.text }}</p>
    <h5>Step-by-step directions:</h5>
    <ul>
      <li v-for="(step, index) in routeDetails.steps" :key="index" v-html="step.instructions"></li>
    </ul>
  </div>

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
// google map
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

const services = ref([])
const serviceMarkers = ref([])
const dt_table = ref()
const selectedService = ref(null)

const mapRef = ref(null)
const startPlace = ref('')
const travelMode = ref('')
const selectedServiceId = ref('')
const autocomplete = ref(null)
const routeDetails = ref(null)

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
  autoWidth: false,
  responsive: true,
  columnDefs: [
    { width: '30%', targets: 0 },
    { width: '40%', targets: 1 },
    { width: '30%', targets: 2 }
  ]
}

// geocode service address to get coordinates
const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        const position = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        resolve(position)
      } else {
        reject('Geocode was not successful for the following reason: ' + status)
      }
    })
  })
}

// get selected service and show info window
const showInfoWindow = (service_item) => {
  selectedService.value = service_item
}

// get route
const calculateRoute = () => {
  const selectedService = services.value.find((s) => s.id === selectedServiceId.value)
  if (!startPlace.value || !selectedService || !travelMode.value) {
    alert('Please select start place, end place and travel mode')
    return
  }

  const directionService = new google.maps.DirectionsService()
  let travel = {
    origin: startPlace.value,
    destination: selectedService.address,
    travelMode: travelMode.value
  }

  directionService.route(travel, (result, status) => {
    if (status === 'OK') {
      console.log(result)
      let directionsDisplay = new google.maps.DirectionsRenderer({
        map: mapRef.value.map
      })
      directionsDisplay.setDirections(result)
      routeDetails.value = result.routes[0].legs[0]
    } else {
      alert('Directions request failed due to ' + status)
    }
  })
}

// autocomplete for start place
const initAutocomplete = () => {
  autocomplete.value = new google.maps.places.Autocomplete(document.getElementById('startPlace'))
  autocomplete.value.addListener('place_changed', () => {
    const place = autocomplete.value.getPlace()
    if (place.geometry) {
      startPlace.value = place.formatted_address
    }
  })
}

onMounted(async () => {
  let databaseServices = []
  const querySnapshot = await getDocs(collection(database, 'service'))
  querySnapshot.forEach(async (doc) => {
    const service = {
      id: doc.id,
      name: doc.data().name,
      address: doc.data().address,
      contact: doc.data().contact
    }
    databaseServices.push(service)

    try {
      const position = await geocodeAddress(service.address)
      serviceMarkers.value.push({ position, service })
    } catch (error) {
      console.error(error)
    }
  })
  services.value = databaseServices
  initAutocomplete()
})

// define a function to search column
const searchColumn = (columnIndex, event) => {
  const table = dt_table.value.dt
  const searchTerm = event.target.value
  table.column(columnIndex).search(searchTerm).draw()
}

const center = { lat: -37.913003, lng: 145.133822 }
</script>

<style scoped>
th,
td {
  text-align: left;
  padding: 10px;
}
table {
  width: 100%;
}
th {
  font-weight: bold;
}
th:nth-child(1),
td:nth-child(1) {
  width: 30%;
}
th:nth-child(2),
td:nth-child(2) {
  width: 40%;
}
th:nth-child(3),
td:nth-child(3) {
  width: 30%;
}
</style>
