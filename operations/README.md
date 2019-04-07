# Operations

`$ az login`

`$ az group create -n ${AZURE_RESOURCE_GROUP} -l japaneast`

```
$ az storage account create -n ${AZURE_STORAGE_ACCOUNT} -g ${AZURE_RESOURCE_GROUP} --kind StorageV2 -l japaneast --https-only true --sku Standard_LRS
```

```
$ az storage blob service-properties update --account-name ${AZURE_STORAGE_ACCOUNT} --static-website --404-document 404.html --index-document index.html
```

```
$ az storage blob upload-batch -s . -d \$web --account-name ${AZURE_STORAGE_ACCOUNT}
```

```
az storage container create -n ${AZURE_BLOB_CONTAINER} --account-name ${AZURE_STORAGE_ACCOUNT} --public-access blob
```

```
az functionapp create -n ${AZURE_FUNCTION_APP} -g ${AZURE_RESOURCE_GROUP} -s ${AZURE_STORAGE_ACCOUNT} -c japaneast
```

- maybe this is needless
```
az functionapp config appsettings set --name ${AZURE_FUNCTION_APP} -g ${AZURE_RESOURCE_GROUP} --settings FUNCTIONS_EXTENSION_VERSION=~2
```

```
func azure functionapp publish ${AZURE_FUNCTION_APP}
```

```
az functionapp config appsettings set -n ${AZURE_FUNCTION_APP} -g ${AZURE_RESOURCE_GROUP} --settings AZURE_STORAGE_CONNECTION_STRING=$(az storage account show-connection-string -n ${AZURE_STORAGE_ACCOUNT} -g ${AZURE_RESOURCE_GROUP} --query "connectionString" --output tsv) -o table
```

```
az functionapp cors add -g ${AZURE_RESOURCE_GROUP} -n ${AZURE_FUNCTION_APP} --allowed-origins ${AZURE_PRIMARY_ENDPOINT}
```

```
function app cors setting blob base url
```

```
az storage cors add --methods OPTIONS PUT --origins '*' --exposed-headers '*' --allowed-headers '*' --services b --account-name <storage account name>
```

az group delete --name
