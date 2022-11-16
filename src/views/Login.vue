<script>
import { auth } from '../stores/auth.js'
export default {
    data() {
        return {
            email : '',
            password : ''
        }
    },
    methods: {
        login() {
            auth.authenticate(this.email, this.password);
        }
    },
    computed: {
        isDisabled() {
            if (this.email.length > 0 && this.password.length >= 6) {
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>
<template>
    <div id="login-view">
        <form class="login-form">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input id="input-email" placeholder="E-mail" v-model="email" />
            <input id="input-password" placeholder="Password" v-model="password" />
            <button :disabled="isDisabled" id="btn-submit" @click="login()">LOGIN</button>
        </form>
    </div>
</template>