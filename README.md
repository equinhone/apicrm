# apicrm




sudo apt update && sudo apt upgrade -y
sudo apt install -y git
git clone https://github.com/equinhone/apicrm apicrm
npm run install
npm run exec

pm2 start "npm run start" --watch --name apicrm01
pm2 save
