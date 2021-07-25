<template>
  <q-page class="flex flex-center">
    <div class="wrapper">
      <div class="column items-center">
        <q-avatar color="red" text-color="white" icon="lock" />
        <h5 class="signin__typo">Sign In</h5>
      </div>
      <authenticate />
      <div class="row justify-between">
        <a href="#">Forgot password</a>
        <a href="#">Sign Up</a>
      </div>
    </div>
  </q-page>
</template>

<script>
import Authenticate from 'src/components/Authenticate.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageLogin',
  components: { Authenticate },
});
</script>

<style lang="sass" scoped>
  .signin__typo
    margin-top: 0.8rem
    margin-bottom: 1.5rem
  .wrapper
    max-width: 444px
    min-width: 300px

  @media screen and (min-width: 444px)
    .wrapper
      width: 100%
</style>
