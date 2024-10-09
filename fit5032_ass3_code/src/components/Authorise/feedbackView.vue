<template>
  <h1>Feedback</h1>
  <p>Sum of Rating: {{ sumRating }}</p>
  <p>Count of Rating: {{ countRating }}</p>
  <p v-if="countRating > 0">Average of Rating: {{ sumRating / countRating }}</p>

  <form @submit.prevent="addFeedback">
    <div class="form-group mt-3">
      <label for="rating">Rating</label>
      <input
        type="number"
        class="form-control mt-3"
        id="rating"
        min="0"
        max="5"
        v-model="feedback.rating"
      />
    </div>
    <div class="form-group mt-3">
      <label for="comment">Comment</label>
      <textarea class="form-control mt-3" id="comment" v-model="feedback.comment"></textarea>
    </div>
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
  </form>

  <div class="row mt-3" v-if="countRating > 0">
    <div class="d-flex flax-wrap justify-content-start">
      <div class="card m-3" v-for="fb in userFeedback" :key="fb.id" style="width: 17rem">
        <div class="card-header">Rating: {{ fb.rating }}</div>
        <div class="card-body">Comments: {{ fb.comment }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import { database } from '@/components/firebase/firebaseIndex.js'
import { v4 as uuidV4 } from 'uuid'

const feedback = ref({
  rating: 0,
  comment: ''
})

const sumRating = ref(0)
const countRating = ref(0)

const userFeedback = ref([])

const addFeedback = () => {
  console.log(feedback.value)
  addDoc(collection(database, 'userFeedback'), {
    id: uuidV4(),
    rating: feedback.value.rating,
    comment: feedback.value.comment
  })
  feedback.value = {
    rating: 0,
    comment: ''
  }
}

onMounted(async () => {
  onSnapshot(collection(database, 'userFeedback'), (inquerySnapshot) => {
    let fbFeedback = []
    let sum = 0
    inquerySnapshot.forEach((doc) => {
      const feedback = {
        id: doc.id,
        comment: doc.data().comment,
        rating: doc.data().rating
      }

      fbFeedback.push(feedback)
      sum += feedback.rating
    })

    userFeedback.value = fbFeedback
    sumRating.value = sum
    countRating.value = fbFeedback.length

    console.log(userFeedback.value)
  })
})
</script>

<style scoped></style>
