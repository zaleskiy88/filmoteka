export default {
    isAuth: false,
    userName: '',
    userEmail: '',
    userUiid: '',
    movieLists: {},
    clear: () => {
        this.isAuth = false;
        this.userName = '';
        this.userEmail = '';
        this.userUiid = '';
        this.movieLists = {};
    }
}