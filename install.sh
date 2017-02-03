# App name
NEXT=false
while [ $NEXT=false ] ; do
    echo "What's the name of your Application? "
    read app
    echo "IS '$app' correct? (y/n)"
    read answer
    case ${answer:0:1} in
        y|Y )
            break
        ;;
        * )
            NEXT=false
        ;;
    esac
done
sed -i "" "s/\[APPLICATION\]/$app/g" app/keystone.js
sed -i "" "s/\[APPLICATION\]/$app/g" app/templates/layouts/default.pug
echo "..."
echo "..."
echo "..."
# Host
while [ $NEXT=false ] ; do
    echo "What's the host for your Mongo database? (enter 'localhost' for local mongo)? "
    read host
    echo "IS '$host' correct? (y/n)"
    read answer
    case ${answer:0:1} in
        y|Y )
            break
        ;;
        * )
            NEXT=false
        ;;
    esac
done
sed -i "" "s/\[APPLICATION_DB_HOST\]/$host/g" app/.env
echo "..."
echo "..."
echo "..."

# Database name
while [ $NEXT=false ] ; do
    echo "What's the name of your Mongo database?"
    read db
    echo "IS '$db' correct? (y/n)"
    read answer
    case ${answer:0:1} in
        y|Y )
            break
        ;;
        * )
            NEXT=false
        ;;
    esac
done
sed -i "" "s/\[APPLICATION_DB\]/$db/g" app/.env
echo "..."
echo "..."
echo "..."

# Database Username
while [ $NEXT=false ] ; do
    echo "What's the username for your Mongo database?"
    read user
    echo "IS '$user' correct? (y/n)"
    read answer
    case ${answer:0:1} in
        y|Y )
            break
        ;;
        * )
            NEXT=false
        ;;
    esac
done
sed -i "" "s/\[APPLICATION_DB_USERNAME\]/$user/g" app/.env
echo "..."
echo "..."
echo "..."
# Database pwd
while [ $NEXT=false ] ; do
    echo "What's the password for your Mongo database?"
    read pwd
    echo "IS '$pwd' correct? (y/n)"
    read answer
    case ${answer:0:1} in
        y|Y )
            break
        ;;
        * )
            NEXT=false
        ;;
    esac
done
sed -i "" "s/\[APPLICATION_DB_PWD\]/$pwd/g" app/.env
echo "..."
echo "..."
echo "..."

# Setup Mongo
echo "Setting up Mongo..."
mkdir -p ~/logs/mongodb
mongo admin --eval 'db.shutdownServer();'
sleep 2
mongod --fork --logpath ~/logs/mongodb/mongo.log
# Wait until mongo logs that it's ready (or timeout after 60s)
COUNTER=0
grep -q 'waiting for connections on port' ~/logs/mongodb/mongo.log
while [[ $? -ne 0 && $COUNTER -lt 60 ]] ; do
    sleep 2
    let COUNTER+=2
    echo "Waiting for mongo to initialize... ($COUNTER seconds so far)"
    grep -q 'waiting for connections on port' ~/logs/mongodb/mongo.log
done
if [ $COUNTER -ge 30 ]
then
    echo 'Mongo failed to start.'
    exit 1
fi

mongo "$host/$db" --eval "db.createUser({ user: '$user', pwd: '$pwd', roles: [{ role: 'readWrite', db: '$db' }]});"
# Start App
echo "Starting application..."
cd app
rm ./keystone.log
npm install
pm2 kill
pm2 flush
pm2 start keystone.js --no-autorestart --merge-logs -l ./keystone.log --watch
# Wait until keystone logs that it's ready (or timeout after 60s)
COUNTER=0
grep -q 'KeystoneJS Started' ./keystone.log
while [[ $? -ne 0 && $COUNTER -lt 20 ]] ; do
    sleep 2
    let COUNTER+=2
    echo "Waiting for keystone to initialize... ($COUNTER seconds so far)"
    grep -q 'KeystoneJS Started' ./keystone.log
done

if [ $COUNTER -ge 20 ]
then
    cat ./keystone.log
    echo 'Keystone failed to start.'
    pm2 kill
    exit 1
fi

echo 'Keystone Ready'
echo 'Initializing tests...'
npm test
