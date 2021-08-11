<template>
    <div>
        <input
            ref="fileUpload"
            id="file-upload"
            name="file-upload"
            type="file"
            class="sr-only"
            @change="onFileChange($event)"
        />
        <div class="text-center">
            <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    vector-effect="non-scaling-stroke"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">
                {{ file ? file.name : 'Fichier manquant' }}
            </h3>
            <p class="mt-1 text-sm text-gray-500" v-if="!file">
                Ajouter un fichier de données brutes (JSON)
            </p>
            <div class="mt-6">
                <button
                    type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="addFile"
                >
                    <svg
                        class="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    {{ file ? 'Changer fichier' : 'Nouveau fichier' }}
                </button>
                <button
                    v-if="file"
                    type="button"
                    class="inline-flex ml-2 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    @click="upload"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="-ml-1 mr-2 h-5 w-5"
                        fill="none"
                        viewBox="0 0 20 20"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                    </svg>
                    Téléverser
                </button>
            </div>
        </div>
        <app-snackbar-component :msg="snackbarMsg" @close="snackbarMsg = ''" />
    </div>
</template>

<script lang="ts">
    import Component from 'vue-class-component';
    import Vue from 'vue';
    import Axios from 'axios';
    import AppSnackbarComponent from '@/components/snackbar/snackbar.vue';

    @Component({
        components: {
            AppSnackbarComponent
        }
    })
    export default class AppHomeView extends Vue {
        public file: File | null = null;

        public snackbarMsg = '';

        public $refs!: {
            fileUpload: HTMLInputElement;
        };

        public addFile(): void {
            this.$refs.fileUpload.click();
        }

        public onFileChange(e: any) {
            const files = e.target.files || e.dataTransfer.files;

            if (!files.length) return;

            this.file = files[0];
        }

        public upload(): void {
            if (!this.file) return;

            const formData = new FormData();
            formData.append('file', this.file);

            let endpoint =
                'https://us-central1-monportail-test.cloudfunctions.net/fileToFirebase';

            if (location.hostname === 'localhost') {
                endpoint =
                    'http://localhost:5001/monportail-test/us-central1/fileToFirebase';
            }

            Axios.create()
                .post(endpoint, formData)
                .then(() => {
                    this.file = null;
                    this.snackbarMsg = 'données téléversées!';
                });
        }
    }
</script>

<style lang="scss" scoped>
    .box__dragndrop,
    .box__uploading,
    .box__success,
    .box__error {
        display: none;
    }
</style>
