import { getCurrentUser } from '../api/user.api.js';
import { store } from '../store/store.js';
import { redirect } from '@tanstack/react-router';
import { login } from '../store/slice/authSlice.js';

export const checkAuth = async({context}) => {
    try{
        const {store, queryClient} = context;
        const user = await queryClient.ensureQueryData({
            queryKey: ['currentUser'],
            queryFn: getCurrentUser,
        });
        if(!user) return false;
        store.dispatch(login(user));
        const {isAuthenticated} = store.getState().auth;
        if(!isAuthenticated) return false;
        return true;
    }
    catch(error){
        return redirect({to: '/auth'});
    }
}