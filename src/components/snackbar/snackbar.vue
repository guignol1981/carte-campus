<template>
    <div>
        <!-- This example requires Tailwind CSS v2.0+ -->
        <div
            :class="[
                'fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end'
            ]"
        >
            <div
                :class="[
                    !!msg
                        ? 'transform ease-out duration-300 transition translate-y-0 opacity-100 sm:translate-x-0  pointer-events-none'
                        : 'transition ease-in duration-100 opacity-0  pointer-events-none',
                    'z-50 max-w-sm w-full bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 overflow-hidden'
                ]"
            >
                <div
                    v-if="!!msg"
                    :class="[
                        'pointer-events-none animate-grow bg-gray-900 w-full h-full absolute bg-opacity-10'
                    ]"
                ></div>
                <div class="p-4">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <!-- Heroicon name: outline/check-circle -->
                            <svg
                                class="h-6 w-6 text-green-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm font-medium text-gray-900">
                                Success!
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                                {{ msg }}
                            </p>
                        </div>
                        <div class="ml-4 flex-shrink-0 flex">
                            <button
                                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                @click="$emit('close')"
                            >
                                <span class="sr-only">Close</span>
                                <!-- Heroicon name: solid/x -->
                                <svg
                                    class="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop, Watch } from 'vue-property-decorator';

    @Component
    export default class AppSnackbarComponent extends Vue {
        @Prop({ required: true })
        public msg!: string;

        @Watch('msg')
        public watchMsg(): void {
            if (!this.msg) return;
            setTimeout(() => {
                this.$emit('close');
            }, 2000);
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes grow {
        0% {
            transform: scaleX(0);
        }
        100% {
            transform: scaleX(1);
        }
    }
    .animate-grow {
        transform-origin: left;
        animation: grow linear 2s;
    }
</style>
