<template>
    <div
        id="app"
        class="h-screen w-full flex flex-col items-center justify-center space-y-6"
    >
        <router-view />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component
    export default class App extends Vue {}
</script>
