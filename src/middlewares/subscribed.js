export default function subscribed({ store, next }) {
    if(!store.getters['auth/user'].subscribed) {
        return next({name : 'Home'})
    }
    return next();
}