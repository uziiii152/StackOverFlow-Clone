import { Permission} from 'node-appwrite'

import { databases } from './config'
import {db,answersCollection} from '@/models/name'


export async function createCollectionAnswer(){
    // create Collection
    await databases.createCollection(db,answersCollection,answersCollection,[
        Permission.read('any'),
        Permission.read('users'),
        Permission.delete('users'),
        Permission.create('users'),
        Permission.update('users')
    ])
    console.log('answers Collection created');
    // creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db,answersCollection,'content',10000,true),
        databases.createStringAttribute(db,answersCollection,'questionId',50,true),
        databases.createStringAttribute(db,answersCollection,'authorId',50,true),
    ])
    console.log('answers Collection attributes created');

    //create indexes
   /*
    await Promise.all([
        databases.createIndex(db,questionsCollection,'title',IndexType.Fulltext,["title"],['asc']),
        databases.createIndex(db,questionsCollection,'content',IndexType.Fulltext,["content"],['asc']),

    ])
        */
}