<script setup>
import { ref, computed, watch } from 'vue';
import { useOpenIDConnect } from './composable/OpenIDConnect';
import { useTodoApi } from './composable/TodoApi';
import TodoItem from './components/TodoItem.vue';

const oidc = useOpenIDConnect(
  'http://host.docker.internal:8080', // Keycloak Base URL(OIDC Provider)
  'todo', // Realm
  'todo-client', // Client ID
);

const todoApi = useTodoApi(
  'http://host.docker.internal:8081', // Web API Base URL
  () => oidc.value.accessToken  // Access Token acquisition function
);

watch(
  () => oidc.value.isAuthenticated,
  () => {
    if (oidc.value.isAuthenticated) {
      todoApi.refresh(
        () => console.log('fetch succeeded.'),
        error => console.error('fetch failed.', error)
      );
    } else {
      todoApi.clear();
    }
  }
);

const titleField = ref("");
const handleRegister = () => {
  todoApi.add(
    titleField.value,
    () => {
      console.log('add succeeded.')
      todoApi.refresh();
    },
    error => console.error('fetch failed.', error)
  );
  titleField.value = "";
};

const handleComplete = id => {
  todoApi.remove(
    id,
    () => {
      console.log('delete succeeded.')
      todoApi.refresh();
    },
    error => console.error('fetch failed.', error)
  );
};
</script>

<template>
  <header>
    <h1>TODO管理</h1>
    <button @click="oidc.logout()" v-if="oidc.isAuthenticated">ログアウト</button>
    <button @click="oidc.login()" v-else>ログイン</button>
  </header>
  <main v-if="oidc.isAuthenticated">
    <input type="text" v-model="titleField">
    <button @click="handleRegister">登録</button>
    <ul>
      <TodoItem v-for="item in todoApi.items.value" :key="item.id" :todo-item="item" @complete="handleComplete"/>
    </ul>
  </main>
  <main v-else>
    <h2>ログインが必要です。</h2>
  </main>
</template>

<style scoped>
h1 {
  display: inline-block;
  margin-inline-end: 1em;
}
ul {
  list-style-type: none;
  padding-inline-start: 0;
}
</style>