import request from '../main.js'

class ClearingOldData{

    endpoint;
    authUser;

    constructor(endpoint, authUser) {
        this.endpoint = endpoint
        this.authUser = authUser
    }

    async doClearing(){

        let response = await request
            .get(this.endpoint)

        let items = response.body
        let catIds     = [];
        for(let i=0; i < items.length ; i++){
            //exclude special category
            if(this.endpoint == '/wp/v2/categories' && items[i].id != 1){
                catIds.push(items[i].id)
            }
        }
    
        let _this = this
        //we don't have multiple delete endpoint, so we iterate to clear it;(
        await Promise.all(catIds.map(async function(id){
            await _this.deleteAt(id)
        }))
        
    }
    
    async deleteAt(id){
        let deleteThis = this.endpoint+'/'+id
        await request
            .delete(deleteThis)
            .set(this.authUser)
            .query({ force: true })
    }
}


export async function clearCategories(authUser){
    let clear = new ClearingOldData('/wp/v2/categories', authUser)
    await clear.doClearing()
}

export async function clearTags(authUser){
    let clear = new ClearingOldData('/wp/v2/tags', authUser)
    await clear.doClearing()
}