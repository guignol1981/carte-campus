<template>
    <div id="app">
        <app-navbar-component />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AppNavbarComponent from './components/navbar/navbar.vue';

    @Component({
        components: {
            AppNavbarComponent
        }
    })
    export default class App extends Vue {}
</script>
