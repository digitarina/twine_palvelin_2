# twine_palvelin

## Asennus

Tuore asennus, Ubuntu 16.04.5 LTS.

    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install screen
    screen

seuraavat screenissä (https://kb.iu.edu/d/acuy)

    sudo apt-get install git curl build-essential make zsh
    git clone https://github.com/digitarina/twine_palvelin.git
    mv twine_palvelin/ /var
    cd /var/twine_palvelin/
    curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
    sudo apt install nodejs
    npm install
    npm start

    ctrl-C pysäyttää palvelun

Serveri toiseen porttiin: Muuta server.js rivillä 6 portti.

Pavelin on konffattu toimimaan localhostissa. Muuta tarvittaessa controller.js:stä oikea IP. Myös mukana tuleva twine on konffattu localhostille. Jos tarvitset IP:tä tai domainnimeä, käännä oma Twine twine_front -paketista.

Kehityspalvelin tarvittaessa: node_modules/webpack-dev-server/bin/webpack-dev-server.js  --host 192.168.1.1 --port 80 (vaihda oma IP)
