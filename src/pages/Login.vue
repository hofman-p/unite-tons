<template>
  <q-page class="flex flex-center">
    <div class="wrapper row justify-center">
      <div class="column items-center">
        <q-avatar color="red" text-color="white" icon="lock" />
        <h5 class="signin__typo">Sign In</h5>
      </div>
      <authenticate />
      <div>
        <span>Forgot password ?</span>
        <span>Don't have an account ? Sign Up</span>
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
    margin-bottom: 1rem
  .wrapper
    max-width: 444px

  @media screen and (min-width: 444px)
    .wrapper
      width: 100%
</style>
