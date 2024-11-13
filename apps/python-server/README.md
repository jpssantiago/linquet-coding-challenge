# To run the python API:

- Run the docker compose `docker compose up -d`. 
- Inside the node-server folder:
    - Install all dependencies `pnpm i`
    - Run `prisma generate && prisma db push && pnpm seed` to generate the clients and populate the database.
    - Run the server `pnpm dev`
- Inside the python-server folder:
    - Install all dependencies
    - Run the server `python3 src/server.py`