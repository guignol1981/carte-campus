<template>
    <div class="h-screen flex justify-center w-full bg-gray-900 ">
        <div class="w-4/5" id="firebaseui-auth-container"></div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import firebase from 'firebase';

    @Component
    export default class AppLoginView extends Vue {
        protected mounted(): void {
            this.$ui.start('#firebaseui-auth-container', {
                callbacks: {
                    signInSuccessWithAuthResult: (): boolean => {
                        this.$router.push('home');

                        return false;
                    }
                },
                signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
            });
        }
    }
</script>
