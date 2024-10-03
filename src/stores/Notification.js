import { defineStore } from "pinia";    
import { ref, watch } from "vue";

export const useNotification = defineStore('notification', () => {

    const text = ref('')
    const show = ref(false)
    const error = ref(false)

    watch(show, () => {
        if (show.value) {
            setTimeout(() => {
                text.value = ''
                show.value = false
                error.value = false
            }, 5000);
        }
    })

    return {
        text,
        show,
        error
    }
})