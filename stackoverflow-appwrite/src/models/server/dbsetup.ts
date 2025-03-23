import { databases } from "./config";
import  {createCollectionAnswer}  from "./answer.collection";
import  {createCollectionComment}  from "./comment.collection";
import  {createCollectionVote}  from "./vote.collection";
import { db } from "@/models/name";
import  {createCollectionQuestion}  from "./questions.collection";
import { getOrCreateStorage } from "./storage.collection";



export async function getOrCreateCollections(){
    try {
        await databases.get(db)
        console.log('database connected');
        
    } catch (error) {
        try {
            await databases.create(db,db)
            console.log('database created');
            await Promise.all([
                createCollectionAnswer(),
                createCollectionComment(),
                createCollectionVote(),
                createCollectionQuestion(),
                getOrCreateStorage()
            ])

            console.log('collections created');
            console.log('database connected');
            
        } catch (error) {
            console.log('error creating Databases or collections',error);
            
        }
    }

    return databases;
}