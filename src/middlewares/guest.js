export default function auth({ store, next }) {
    if(store.getters['auth/authenticated']) {
        return next({name : 'Home'})
    }
    return next();
}