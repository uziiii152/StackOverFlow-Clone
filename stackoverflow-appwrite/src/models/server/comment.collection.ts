import { Permission} from 'node-appwrite'

import { databases } from './config'
import {db,commentsCollection} from '@/models/name'


export async function createCollectionComment(){
    // create Collection
    await databases.createCollection(db,commentsCollection,commentsCollection,[
        Permission.read('any'),
        Permission.read('users'),
        Permission.delete('users'),
        Permission.create('users'),
        Permission.update('users')
    ])
    console.log('comment Collection created');
    // creating attributes and indexes

    await Promise.all([
        databases.createEnumAttribute(db,commentsCollection,'type',['answer','question'],true),
        databases.createStringAttribute(db,commentsCollection,'content',10000,true),
        databases.createStringAttribute(db,commentsCollection,'typeId',50,true),
        databases.createStringAttribute(db,commentsCollection,'authorId',50,true)
    ])
    console.log('comment collection attributes created');

    //create indexes
   /*
    await Promise.all([
        databases.createIndex(db,questionsCollection,'title',IndexType.Fulltext,["title"],['asc']),
        databases.createIndex(db,questionsCollection,'content',IndexType.Fulltext,["content"],['asc']),

    ])
        */
}