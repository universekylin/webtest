<template>
  <div class="row">
    <div class="col-md-6 offset-md-2">
      <h1>Login</h1>
      <hr />
      <form>
        <div class="form-group mt-3">
          <label for="Username">Username</label>
          <input type="Username" class="form-control mt-3" id="Username" required />
        </div>
        <div class="form-group mt-3">
          <label for="password">Password</label>
          <input type="password" class="form-control mt-3" id="password" required />
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
      </form>

      <p class="mt-3">
        Don't have an account? Click <span><router-link to="SignUp">Here</router-link></span> to
        Register
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
