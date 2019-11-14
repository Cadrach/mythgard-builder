    1  sudo apt-get install wget
    5  sudo apt-get update
    6  wget https://repo.mysql.com//mysql-apt-config_0.8.14-1_all.deb
    7  sudo dpkg -i mysql-apt-config_0.8.14-1_all.deb
    8  sudo apt-get update
    9  sudo apt-get install mysql-server
   12  adduser cadrach
   13  usermod -aG sudo cadrach
   15  ufw status
   16  apt update
   17  apt isntall apache2
   18  apt install apache2
   19  ufw app list
   20  sudo ufw allow in "Apache Full"
   21  sudo apt install php libapache2-mod-php php-mysql
   22  vi /etc/apache2/mods-enabled/dir.conf
   23  sudo systemctl restart apache2
   25  sudo apt install php-cli
   31  printf "netdata:$(openssl passwd -apr1)" > /etc/nginx/passwords
   32  vi sites-available/netdata.conf
   33  systemctl restart nginx
   35  curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
   36  sudo apt install nodejs
   40  yarn start
   41  rm -fr node_modules/
   42  yarn
   43  yarn start
   44  ufw
   45  ufw enable
   47  ufw app list
   48  ufw disable
   49  ufw enable
   50  yarn build
   61  vi /etc/apache2/sites-enabled/000-mythgard-decks.conf
   62  systemctl restart apache2
