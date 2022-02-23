docker run \
    --name postgres \
    -e POSTGRES_USER=norton \
    -e POSTGRES_PASSWORD=root \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres