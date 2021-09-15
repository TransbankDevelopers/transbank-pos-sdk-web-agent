<template>
  <div>

    <div class="content" id="app">

      <span style="color: green; font-weight: bold; font-size: 14px; text-transform: uppercase">Agente POS activo en puerto: 8090 ✅</span>
      <div>
        <span>Clientes conectados a websocket: <span id="usersCount">0</span></span>
      </div>

      <a href="" @click.prevent="showLogs = !showLogs" id="log_toggle">
        <span v-if="!showLogs">Mostrar últimos eventos</span>
        <span v-if="showLogs">Ocultar últimos eventos</span>
      </a>

      <div class="logs" v-if="showLogs">
        <pre class="log" v-for="log in logs">
<span style="font-style: italic; color: #999">{{ log.time.format('{hour-24}:{minute-pad}:{second-pad}') }}</span> | {{ log.message }}
        </pre>
      </div>
    </div>

  </div>
</template>
<script>
import store from './store/store';
export default {
  data() {
    return {
      showLogs: true
    }
  },
  computed: {
    logs() {
      return store.logs;
    }
  }
}
</script>
<style>
  .log {
    display: block;
  }
</style>

