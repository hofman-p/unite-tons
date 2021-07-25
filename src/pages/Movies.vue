<template>
  <q-page class="flex justify-center">
    <q-card v-for="movie in movies" :key="movie.id" class="my-card">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`">
      <q-card-section>
        <div class="text-h6">{{movie.original_title}}</div>
        <div class="text-subtitle2">{{movie.release_date}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ movie.overview }}
      </q-card-section>
    </q-card>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
          v-model="fab"
          label="Surprise..."
          label-position="right"
          color="primary"
          icon="keyboard_arrow_left"
          direction="left"
        >
        <q-fab-action
          v-if="user.role === 'admin'"
          color="secondary"
          icon="sentiment_very_satisfied"
          label="You're admin B-)"
        />
        <q-fab-action
          v-if="user.role === 'viewer'"
          color="secondary"
          icon="sentiment_very_satisfied"
          label="You're viewer :D"
        />
        <q-fab-action
          color="positive"
          icon="logout"
          label="RESET !"
          @click="reset"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import {
  defineComponent, ref, onMounted, computed,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import TmdbAPI from '../api/Tmdb';
import useNotify from '../composables/useNotify';

export default defineComponent({
  name: 'PageMovies',
  setup() {
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar();
    const { showNotif } = useNotify();
    const movies = ref([]);
    const user = computed(() => store.state.userStore.user);
    onMounted(async () => {
      try {
        movies.value = await TmdbAPI.getTrendingMovies();
      } catch (e) {
        showNotif({
          color: 'negative',
          position: 'bottom-right',
          message: e.message,
        });
      }
    });
    const reset = () => {
      $q.cookies.remove('user_token');
      $q.cookies.remove('user_email');
      $q.cookies.remove('user_role');
      store.commit('userStore/setUser', {
        user_token: '',
        user_role: '',
        user_email: '',
      });
      router.replace({ name: 'login' });
    };
    return {
      movies,
      user,
      fab: ref(true),
      reset,
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
