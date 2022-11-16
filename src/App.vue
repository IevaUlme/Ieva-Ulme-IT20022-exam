<script>
import { auth } from './stores/auth.js'
export default {
    data() {
        return {
            authent : auth.is_authenticated
        }
    },  
}
</script>
<template>
    <Header v-show="authent"></Header>
    <div id="section-body">
        <Navigation v-show="authent"></Navigation>
        <router-view class="section-router"></router-view>
    </div>
    <div v-show="authent" id="section-player">
        <AudioPlayer />
    </div>
</template>