import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const chai = require('chai')
const expect = chai.expect

import request from '../main.js'
import auth from '../helper/auth.js'
import { clearCategories } from '../helper/Clearing.js'
import captureResp from '../helper/captureResp.js'
import * as user from '../constants/user.js'
import { categoryUrl } from '../constants/endpoint.js'
import { categorySingleSchema } from '../schema/category-schema.js'

let authUser, 
    response, 
    categoryId,
    anotherCategoryId,
    categoryName,
    categoryToEdit

describe('Check "Category" endpoint', function () {

    before(async function(){
        authUser = await auth.loginAs(user.admin)
        await clearCategories(authUser)
    })
    
    it('Should NOT be able to create category without provide "name" field', async function(){

        response = await request
                .post(categoryUrl)
                .set(authUser)
                        
        expect(response.status).to.eql(400)
        expect(response.body.message).to.eql('Missing parameter(s): name')
        
    })

    it('Should be able to create category with only name field', async function(){
        categoryName = 'Api Testing'
        response = await request
                .post(categoryUrl)
                .set(authUser)
                .send({
                    name : categoryName
                })
                        
        expect(response.status).to.eql(201)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.eql(categoryName)
        categoryId = response.body.id
        
    })

    it('Should be able to create category with name and slug field', async function(){
        let testData = {
            name : 'Mocha Test',
            slug : 'mocha-test'
        }

        response = await request
                .post(categoryUrl)
                .set(authUser)
                .send(testData)
                        
        expect(response.status).to.eql(201)
        expect(response.body.name).to.eql(testData.name)
        expect(response.body).to.have.property('slug')
        expect(response.body.slug).to.eql(testData.slug)
        anotherCategoryId = response.body.id
    })

    it('Should be able to create category with name, slug and description field', async function(){
        let testData = {
            name : 'Chai Test',
            slug : 'chai-test',
            description : 'Using Mocha and chai to test REST API'
        }
        response = await request
                .post(categoryUrl)
                .set(authUser)
                .send(testData)
                        
        expect(response.status).to.eql(201)
        expect(response.body.name).to.eql(testData.name)
        expect(response.body.slug).to.eql(testData.slug)
        expect(response.body).to.have.property('description')
        expect(response.body.description).to.eql(testData.description)
        
    })

    it('Should NOT be able to create category with same name field', async function(){
        response = await request
                .post(categoryUrl)
                .set(authUser)
                .send({
                    //previously used
                    name : categoryName
                })
                        
        expect(response.status).to.eql(400)
        expect(response.body.message).to.eql('A term with the name provided already exists with this parent.')
        
    })

    it('Should be able to see newly created category ', async function(){

        response = await request
                .get(categoryUrl+'/'+categoryId)
                        
        expect(response.status).to.eql(200)
        expect(response.body.id).to.eql(categoryId)
        expect(response.body).to.have.property('name')
        expect(response.body.name).to.be.a('string')
        expect(response.body).to.have.property('slug')
        expect(response.body.slug).to.be.a('string')
        expect(response.body).to.have.property('description')
        expect(response.body.description).to.be.a('string')
        //or we can validate the schema
        
    })

    it('Should be able to update category ', async function(){

        let newValue = {
            name : 'Category Edited',
            slug : 'slug-edit',
            description : 'Mencoba fitur edit'
        }

        response = await request
                .post(categoryUrl+'/'+categoryId)
                .set(authUser)
                .send(newValue)
                        
        expect(response.status).to.eql(200)
        expect(response.body.id).to.eql(categoryId)
        expect(response.body.name).to.eql(newValue.name)
        expect(response.body.slug).to.eql(newValue.slug)
        expect(response.body.description).to.eql(newValue.description)
        categoryToEdit = newValue

    })

    it('Should NOT be able to update with existing category ', async function(){

        response = await request
                .post(categoryUrl+'/'+anotherCategoryId)
                .set(authUser)
                .send(categoryToEdit)
                        
        expect(response.status).to.eql(500)
        expect(response.body.code).to.eql('duplicate_term_slug')
        
    })

    it('Should be able to delete category ', async function(){

        response = await request
            .delete(categoryUrl+'/'+categoryId)
            .set(authUser)
            .query({ force: true })

        expect(response.status).to.eql(200)
        expect(response.body).to.have.property('deleted')
        expect(response.body.deleted).to.eql(true)
        expect(response.body).to.have.property('previous')
        expect(response.body.previous).to.have.property('id')
        expect(response.body.previous.id).to.eql(categoryId)
        
    })

    it('Validate schema of single category response', async function(){

        chai.use(require('chai-json-schema-ajv'))
        response = await request
                .get(categoryUrl+'/'+anotherCategoryId)
                        
        expect(response.status).to.eql(200)
        expect(response.body).to.be.jsonSchema(categorySingleSchema)
    
    })

    afterEach(function(){
        if(response){
            captureResp(this, response)
        }
        //reset
        response = undefined
    })
});



