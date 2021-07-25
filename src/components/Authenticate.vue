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
      :rules="[val => isRequired(val) || 'Please type your email',
      val => isValidEmail(val) || 'Please enter valid email']"
    />
    <q-input
      class="signin__password"
      :type="isPwd ? 'password' : 'text'"
      v-model="password"
      outlined
      lazy-rules
      :rules="[val => isRequired(val) || 'Please type your password']">
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-checkbox class="signin__rememberme full-width" label="Remember me" v-model="isRemembered" />
    <q-btn class="signin__submit full-width" label="Submit" type="submit" color="primary" />
  </q-form>

</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar, date } from 'quasar';
import useNotify from '../composables/useNotify';
import { isValidEmail, isRequired } from '../helpers/validators';

export default defineComponent({
  name: 'Authenticate',
  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar();
    const { showNotif } = useNotify();
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
      } catch (e) {
        showNotif({
          color: 'negative',
          position: 'bottom-right',
          message: e.message,
        });
      }
    };
    return {
      email,
      password,
      isValidEmail,
      isRequired,
      isPwd: ref(true),
      isRemembered,
      onSubmit,
    };
  },
});
</script>

<style lang="sass" scoped>
.signin__password
  margin-top: 1rem
  margin-bottom: 1rem
.signin__rememberme
  margin-bottom: 1rem
.signin__submit
  margin-bottom: 1rem
</style>
