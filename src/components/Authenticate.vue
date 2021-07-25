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
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar, date } from 'quasar';

export default defineComponent({
  name: 'Authenticate',
  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar();
    const isRemembered = ref(false);
    const email = ref('');
    const password = ref('');
    const user = computed(() => store.state.userStore.user);
    const onSubmit = async () => {
      try {
        await store.dispatch('userStore/login', { email: email.value, password: password.value });
        const options = {
          // httpOnly: true,
          secure: true,
        };
        if (isRemembered.value) {
          options.expires = date.addToDate(new Date(), { months: 6 });
        }
        $q.cookies.set('user_token', user.value.token, options);
        $q.cookies.set('user_email', user.value.email, options);
        $q.cookies.set('user_role', user.value.role, options);
        router.push({
          name: 'movies',
        });
        // TODO: Add rules to inputs
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
