import { defineStore } from "pinia";
import { ref } from "vue";

export const useModal = defineStore('modal', () => {

    const modal = ref(false)

    function showModal(){
        modal.value = !modal.value
    }



    return {
        modal,
        showModal
    }
})