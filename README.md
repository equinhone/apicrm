# apicrm




sudo apt update && sudo apt upgrade -y
sudo apt install -y git
git clone https://github.com/equinhone/apicrm apicrm
npm run install
npm run exec

pm2 start "npm run start" --watch --name apicrm01
pm2 save


npx sequelize-cli migration:generate --name create-clientes

pm2 start ./dist/server.js --name wppserver

pm2 start ./dist/server.js --name apicrm


//backup linux
pg_dump -f /postgres/bkpcrmame/crmame26062024.dump -F tar -h localhost -p 5432 -d crmame -U ame
pg_dump -f /postgres/bkpcrmame/crmame26062024.dump -F p -h localhost -p 5432 -d crmame -U ame -Z 3

apenas schema
pg_dump -f /postgres/bkpcrmame/crmame26062024s.dump -F p -h localhost -p 5432 -d crmame -U ame -s


//PM2
admin365214
pm2 start ./dist/app.js --name ame_backend2 --max-memory-restart 300M