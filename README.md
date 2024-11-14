# How to run

Run the docker container for the database `docker compose up -d`

Inside the folder apps/node-server:  
    - Install the dependencies `pnpm i`  
    - Set up the environment variables on `.env`:   
        > `DATABASE_URL="postgresql://docker:docker@localhost:5432/linquetdb"`    
        > `JWT_SECRET="MY_JWT_SECRET_GOES_HERE"`  
        > `BCRYPT_SALT_ROUNDS=10`  
    - Generate the prisma client and seed `pnpm prisma generate && pnpm prisma db push && pnpm seed`  
    - Run the server `pnpm dev`  

Inside the folder apps/python-server:  
    - Install the dependencies  
    - Set up the environment variables on `.env`:  
        > `DATABASE_URL="postgresql://docker:docker@localhost:5432/linquetdb"`  
        > `JWT_SECRET="MY_JWT_SECRET_GOES_HERE"`  
    - Run the server `python3 src/server.py`  

Inside the folder apps/rn_app:  
    - Install the dependencies `pnpm i`  
    - Install cocoa pods (iOS) `cd ios && pod install`  
    - Run the app `pnpm ios` or `pnpm android`  

Inside the folder apps/react-web:  
    - Install the dependencies `pnpm i`  
    - Set up the environment variables on `.env.local` with the deployed or local urls:  
        > `NEXT_PUBLIC_AUTH_API_URL=https://api-auth-linquet.joaosantiago.com.br`  
        > `NEXT_PUBLIC_MSG_API_URL=https://api-msg-linquet.joaosantiago.com.br`  
        or  
        > `NEXT_PUBLIC_AUTH_API_URL=http://localhost:3001`    
        > `NEXT_PUBLIC_MSG_API_URL=http://127.0.0.1:5001`  
    - Run the webapp `pnpm dev`  