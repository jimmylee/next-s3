# next-s3

This is a working example of an express server setup that can make large file uploads (Last tested: 4GB) to S3.

- There is no interface, you will need to use the console to see logs.
- Can be deployed to https://render.com, give it a try!
- Uses a public bucket I setup, add your own `.env` variables for your own bucket.

```sh
IAM_USER_KEY=key
IAM_USER_SECRET=secret
BUCKET_NAME=bucket-name
```
