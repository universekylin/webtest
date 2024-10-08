<template>
  <h1>Booking</h1>

  <button @click="exportToPDF" class="btn btn-primary">Export to PDF</button>
  <button @click="exportToCSV" class="btn btn-secondary">Export to CSV</button>
  <button @click="exportToExcel" class="btn btn-success">Export to Excel</button>

  <datatable
    :data="volunteers"
    :columns="columns"
    :options="options"
    class="display"
    ref="dt_table"
  >
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Action</th>
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
        <th></th>
      </tr>
    </tfoot>
  </datatable>

  <!-- Show booked volunteers -->
  <div v-if="bookings.length > 0">
    <h3>Booked Volunteers</h3>
    <ul>
      <li v-for="(booking, index) in bookings" :key="index">
        {{ booking.volunteerName }} - {{ booking.date }} - {{ booking.timeSlot }}
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No bookings yet.</p>
  </div>
</template>

<script setup>
import * as XLSX from 'xlsx'
import { ref, onMounted } from 'vue'
import { database } from '@/components/firebase/firebaseIndex.js'
import { collection, getDocs } from 'firebase/firestore'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'
import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

const volunteers = ref([])
const dt_table = ref()
const bookings = ref([])

const datatable = DataTable
datatable.use(DataTablesCore)

const columns = [
  { data: 'name' },
  { data: 'address' },
  { data: 'contact' },
  {
    data: null,
    render: (data, type, row) => {
      return `<button class="btn btn-sm btn-primary book-btn" data-id="${row.id}">Book</button>`
    }
  }
]

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
  responsive: true,
  columnDefs: [
    { width: '30%', targets: 0 },
    { width: '40%', targets: 1 },
    { width: '30%', targets: 2 }
  ]
}

const availableTimeSlots = ref([])

onMounted(async () => {
  let dbVolunteers = []
  const querySnapshot = await getDocs(collection(database, 'volunteer'))
  querySnapshot.forEach((doc) => {
    const volunteer = {
      id: doc.id,
      name: doc.data().name,
      address: doc.data().address,
      contact: doc.data().contact
    }
    dbVolunteers.push(volunteer)
  })
  volunteers.value = dbVolunteers

  // Populate available time slots from 9:00 to 17:00 with 30-minute intervals
  const startHour = 9
  const endHour = 17
  for (let hour = startHour; hour < endHour; hour++) {
    availableTimeSlots.value.push(`${hour}:00 - ${hour}:30`)
    availableTimeSlots.value.push(`${hour}:30 - ${hour + 1}:00`)
  }

  // Add event listener to handle clicks on dynamically generated "Book" buttons
  document.addEventListener('click', handleBookButtonClick)
})

const handleBookButtonClick = (event) => {
  const target = event.target
  if (target && target.classList.contains('book-btn')) {
    const volunteerId = target.getAttribute('data-id')
    bookVolunteer(volunteerId)
  }
}

const searchColumn = (columnIndex, event) => {
  const table = dt_table.value.dt
  const searchTerm = event.target.value
  table.column(columnIndex).search(searchTerm).draw()
}

const exportToPDF = () => {
  const doc = new jsPDF()
  let yOffset = 10

  doc.setFontSize(18)
  doc.text('Volunteer Data', 10, yOffset)
  yOffset += 10

  doc.setFontSize(12)
  doc.text('Name', 10, yOffset)
  doc.text('Address', 60, yOffset)
  doc.text('Contact', 150, yOffset)
  yOffset += 10

  volunteers.value.forEach((volunteer) => {
    doc.text(volunteer.name, 10, yOffset)
    doc.text(volunteer.address, 60, yOffset)
    doc.text(volunteer.contact, 150, yOffset)
    yOffset += 10
  })

  doc.save('volunteer-data.pdf')
}

const exportToCSV = () => {
  const csvContent = [
    ['Name', 'Address', 'Contact'],
    ...volunteers.value.map((volunteer) => [volunteer.name, volunteer.address, volunteer.contact])
  ]
    .map((e) => e.join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'volunteer-data.csv')
}

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(volunteers.value)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'volunteer')
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, 'volunteer-data.xlsx')
}

const bookVolunteer = (volunteerId) => {
  const volunteer = volunteers.value.find((vol) => vol.id === volunteerId)
  const selectedDate = prompt('Please select a date (YYYY-MM-DD):')
  const selectedTimeSlot = prompt('Please select a time slot (e.g., 9:00 - 9:30):')

  if (selectedDate && selectedTimeSlot) {
    bookings.value.push({
      volunteerName: volunteer.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot
    })
  } else {
    alert('Booking was not completed. Please provide valid date and time slot.')
  }
}
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
  width: 100%;
}
.modal-actions {
  margin-top: 20px;
  display: flex;
  display: flex;
  justify-content: space-between;
}
</style>
