import { Permission} from 'node-appwrite'

import { databases } from './config'
import {db,votesCollection} from '@/models/name'


export async function createCollectionVote(){
    // create Collection
    await databases.createCollection(db,votesCollection,votesCollection,[
        Permission.read('any'),
        Permission.write('users'),
        Permission.delete('users'),
        Permission.create('users'),
        Permission.update('users')
    ])
    console.log('vote collection created');
    // creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db,votesCollection,'votedById',100,true),
        databases.createStringAttribute(db,votesCollection,'typeId',10000,true),
        databases.createEnumAttribute(db,votesCollection,'type',['question','answer'],true),
        databases.createEnumAttribute(db,votesCollection,'voteStatus',['upvoted','downvoted'],true)
    ])
    console.log('vote collection attributes created');

    //create indexes
   /*
    await Promise.all([
        databases.createIndex(db,questionsCollection,'title',IndexType.Fulltext,["title"],['asc']),
        databases.createIndex(db,questionsCollection,'content',IndexType.Fulltext,["content"],['asc']),

    ])
        */
}