import req  from '../main.js'
import { expect } from 'chai';
let auth = {
	
	async loginAs(userObj){
		const res = await req
						.post("/jwt-auth/v1/token")
						.send(userObj)

        expect(res.status).to.eql(200)
        expect(res.body.data).to.have.property('token')

        let authenticated = { 'Authorization': 'Bearer ' +res.body.data.token }
		return authenticated
	},
	
}

export default auth