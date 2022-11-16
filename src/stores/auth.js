import { reactive } from 'vue'
// TE DEFINĒT USER OBJEKTU
export const auth = reactive({
user : {
    name : "Ieva",
    surname : "Ulme",
    code : "IT20022",
    favorite_songs : []
},
is_authenticated: localStorage.is_authenticated ?? false,

setUserData(name, surname, code) {
    this.user.name = name;
    this.user.surname = surname;
    this.user.code = code;
},

authenticate(email, password) {
    if (email == "ieva.ulme@va.lv" && password == "123456"){
        localStorage.is_authenticated = true;
        this.is_authenticated = true;
        router.push('/');
    }
},

logout() {
    localStorage.clear();
    this.is_authenticated = false;
    router.push('/login');
},

toggleFavorite(songID) {
    for(let i = 0; i < this.user.favorite_songs.length; i++){
        if(this.user.favorite_songs[i] == songID){
            this.user.favorite_songs.splice(i,1);
        }else{
            this.user.favorite_songs.push;
        }
    }
},

getFavoriteSongs() {
    return this.user.favorite_songs;
}
})