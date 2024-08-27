<template>
  <div class="row">
    <div class="col-md-6 offset-md-2">
      <h1>Sign Up</h1>
      <hr />
      <form>
        <div class="form-group mt-3">
          <label for="Username">Username</label>
          <input type="Username" class="form-control mt-3" id="Username" required />
        </div>
        <div class="form-group mt-3">
          <label for="Email">Email</label>
          <input type="Email" class="form-control mt-3" id="Email" required />
        </div>
        <div class="form-group mt-3">
          <label for="password">Password</label>
          <input type="password" class="form-control mt-3" id="password" required />
        </div>
        <div class="form-group mt-3">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" class="form-control mt-3" id="confirmPassword" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
      </form>

      <p class="mt-3">
        Already have an account? Click <span><router-link to="Login">Here</router-link></span> to
        login
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
