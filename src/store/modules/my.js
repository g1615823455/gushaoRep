import { post } from '../../http/axios'

export default {
    namespaced: true,
    state: {
    },
    mutations: {
    },
    actions: {
        async gUserMesg(context, data) {
            let response = await post('/user/info?token='+data)
            return response.data;
        },
        async pUserMesg(context, data) {
            let response = await post('/updateUserMesg?userID='+data.id+'&password='+data.introduction+'&username='+data.name+'&userphone='+data.userphone)
            return response.data;
        },
        async pUserPwsd(context, data) {
            let response = await post('/updateUserPwsd?userID='+data.uid+'&password='+data.upwsd)
            return response.data;
        },
    }
}