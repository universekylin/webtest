<template>
  <div class="mt-3 p-6" style="color: blueviolet">
    <h1 class="display-4" style="color: red">Welcome</h1>
    <p class="head">
      We are an organization dedicated to providing healthcare services to the immigrant community.
      We understand the language barriers, cultural differences, and unique challenges in healthcare
      needs that immigrants may face when adapting to a new environment. Therefore, our platform is
      designed to help them better integrate into their new society by providing multilingual
      support, culturally sensitive medical resources, and health services designed specifically for
      immigrants, while ensuring that their health needs are properly addressed. Whether it is the
      first time you seek medical services or you need ongoing health management, we are here to
      provide you with comprehensive support.
    </p>
  </div>
  <hr />
  <div class="row">
    <div class="col-md-3">
      <div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title" style="color: red">Achievement</h5>
          <p class="card-text">
            Since the platform was created, we have achieved many brilliant achievements
          </p>
          <router-link to="/Storynav/about-us" class="btn btn-primary">Achievement</router-link>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="https://plus.unsplash.com/premium_photo-1664476604101-dffcc355af9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhlYWx0aCUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title" style="color: red">Service</h5>
          <p class="card-text">We have very high quality and diverse services</p>
          <router-link to="/Storynav/our-service" class="btn btn-primary">Service</router-link>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="https://media.istockphoto.com/id/1092112400/photo/cheerful-nurse-taking-care-of-eldery-lady.webp?b=1&s=612x612&w=0&k=20&c=FEUDaWfaHe_jveKyI6Db138Rt0BwMuHWOT3vE8_UO1E="
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title" style="color: red">Volunteer</h5>
          <p class="card-text">We have a very organized volunteer resource</p>
          <router-link to="/Storynav/our-volunteer" class="btn btn-primary">Volunteer</router-link>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card" style="width: 18rem">
        <img
          class="card-img-top"
          src="https://media.istockphoto.com/id/641867114/photo/another-success-means-another-life-saved.webp?b=1&s=612x612&w=0&k=20&c=NPEda_Vntc73ZvNjoLWHwnAOjCDxc7w1Z9tJo0tgo88="
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title" style="color: red">Introduction</h5>
          <p class="card-text">
            We specialize in providing culturally sensitive care to immigrant communities.
          </p>
          <router-link to="/Storynav/about-us" class="btn btn-primary">About</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
