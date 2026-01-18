```sh
 helm create store-web
 helm create store-api
 helm create store-postgres-database
 cd store-web/
 helm template store-web .
 ```

 ### Install Helm chart into Kubernetes

 ```sh
 helm install store-web ./store-web
```

Upgrade later with:

```sh
helm upgrade store-web ./store-web
```