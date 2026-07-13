import AOS from 'aos'
import 'aos/dist/aos.css'

export default defineNuxtPlugin(() => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 80,
    })
})