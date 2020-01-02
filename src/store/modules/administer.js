import { get } from '../../http/axios';
import { deletes } from '../../http/axios';
import { post } from '../../http/axios';
export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async gUsers(context, data) {
            let response = await get('/getUserList')
            return response.data;
        },
        async dUser(context, data) {
            await deletes('/removeUser?userID='+data);
            let response = await get('/getUserList')
            return response.data;
        },
        async dSomeUsers(context, data) {
            await deletes('/removeUsers?userIDs='+data);
            let response = await get('/getUserList')
            return response.data;
        },
        async pUser(context, data) {
            await post('/updateUserMesg?userID='+data.userId+'&password='+data.userPwsd+'&username='+data.userName+'&userphone='+data.user_phone);
            let response = await get('/getUserList')
            return response.data;
        },
    }
}