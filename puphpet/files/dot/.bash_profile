source ~/.bashrc

PATH=$PATH:$HOME/bin
export PATH
cd /var/www
sudo wp cli update
git config --global user.name "Leonardo Gobatto"
git config --global user.email "lgobatto@lgobatto.eti.br"