<template>
  <q-form
    @submit="onSubmit"
    class="full-width"
  >
    <q-input
      type="email"
      v-model="email"
      outlined
      label="Email"
      lazy-rules
      autofocus
    />
    <q-input
      :type="isPwd ? 'password' : 'text'"
      v-model="password"
      outlined
      lazy-rules
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-checkbox class="full-width" label="Remember me" v-model="isRemembered" />
    <q-btn class="full-width" label="Submit" type="submit" color="primary" />
  </q-form>

</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Authenticate',
  setup() {
    const router = useRouter();
    const isRemembered = ref(false);
    const email = ref('');
    const password = ref('');
    const onSubmit = async () => {
      try {
        // TODO: Fake authentication (axios api calls file
        // + vuex store dispatch login to api call files)
        if (isRemembered.value) {
          // TODO: add cookies option to expire
        }
        // TODO: Cookies management and user store management
        router.push({
          name: 'movies',
        });
      } catch (e) {
        // TODO: Notify user (Vue3 composable ??)
      }
    };
    return {
      email,
      password,
      isPwd: ref(true),
      isRemembered,
      onSubmit,
    };
  },
});
</script>
