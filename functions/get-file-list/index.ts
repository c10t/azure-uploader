import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { SharedKeyCredential, StorageURL, ServiceURL, ContainerURL, Aborter, BlobURL } from '@azure/storage-blob'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    /*
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    if (name) {
        context.res = {
            // status: 200, //* Defaults to 200
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    */

    const { accountName, accountKey, container } = getFromEnvironmentVariables()


    const skc = new SharedKeyCredential(accountName, accountKey)
    const pipeline = StorageURL.newPipeline(skc)
    const serviceURL = new ServiceURL(`https://${accountName}.blob.core.windows.net`, pipeline)
    const containerURL = ContainerURL.fromServiceURL(serviceURL, container)

    ///*

    let marker = undefined
    let allItems = []
    let allMetadata = []
    do {
      const listBlobsResponse = await containerURL.listBlobFlatSegment(Aborter.none, marker)
      marker = listBlobsResponse.nextMarker
      // TODO: change to await all
      listBlobsResponse.segment.blobItems.forEach(async blob => {
        const blobURL = BlobURL.fromContainerURL(containerURL, blob.name)
        await blobURL.setMetadata(Aborter.none, { meta1: 'value1', meta2: 'value2' })
        const properties = await blobURL.getProperties(Aborter.none)
        allMetadata = [ ...allMetadata, properties ]
      })
      const listBlobsResponseUpdated = await containerURL.listBlobFlatSegment(Aborter.none, marker)
      allItems = [ ...allItems, ...listBlobsResponseUpdated.segment.blobItems ]
    } while (marker)

    context.res = {
      status: 200,
      body: {
        files: allItems,
        meta: allMetadata
      }
    }
    context.done()
    //*/
}

const getFromEnvironmentVariables = () => {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  const { accountName, accountKey } = parseConnectionString(connectionString)
  const container = 'example'
  return { accountName, accountKey, container }
}

const parseConnectionString = (str: string) => {
  const splitted = str.split(';')
  const accountName = splitted.find(x => x.includes('AccountName=')).replace('AccountName=', '')
  const accountKey = splitted.find(x => x.includes('AccountKey=')).replace('AccountKey=', '')

  return { accountName, accountKey }
}

export default httpTrigger;
