import { IndexType, Permission} from 'node-appwrite'

import { databases } from './config'
import {db,questionsCollection} from '@/models/name'


export async function createCollectionQuestion(){
    // create Collection
    await databases.createCollection(db,questionsCollection,questionsCollection,[
        Permission.read('any'),
        Permission.write('users'),
        Permission.delete('users'),
        Permission.create('users'),
        Permission.update('users')
    ])
    console.log('Question Collection created');
    // creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db,questionsCollection,'title',100,true),
        databases.createStringAttribute(db,questionsCollection,'content',10000,true),
        databases.createStringAttribute(db,questionsCollection,'authorId',50,true),
        databases.createStringAttribute(db,questionsCollection,'tags',50,true,undefined,true),
        databases.createStringAttribute(db,questionsCollection,'attachmentId',50,false)
    ])
    console.log('Question Collection attributes created');

    //create indexes
   /*
    await Promise.all([
        databases.createIndex(db,questionsCollection,'title',IndexType.Fulltext,["title"],['asc']),
        databases.createIndex(db,questionsCollection,'content',IndexType.Fulltext,["content"],['asc']),

    ])
        */
}