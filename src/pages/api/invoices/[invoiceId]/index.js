import {MongoClient, ObjectId} from 'mongodb'




async function handler(req, res){

    const {invoiceId} = req.query

    const client = await MongoClient.connect(
        'mongodb+srv://sanmi0704:Q1KnmQfvzrbsy6eY@cluster0.0cfollw.mongodb.net/invoices?retryWrites=true&w=majority', { useNewUrlParser: true}
    );

    const db = client.db();
    const collection = db.collection('myInvoices');

    if(req.method === 'PUT'){
        await collection.updateOne({_id: new ObjectId(invoiceId)}, {
            $set: {
                status: "paid",
            }
        }
        )
        client.close()
    }

    // delete request

    if(req.method === 'DELETE'){
        await collection.deleteOne({ _id: new ObjectId(invoiceId)});
        res.status(200).json({message: "Invoice deleted successfully"})
        client.close();
    }
}


export default handler