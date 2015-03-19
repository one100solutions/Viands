ssh -i /home/akash/ubuntu_viands_2.pem ubuntu@ec2-54-152-155-94.compute-1.amazonaws.com
cd Viands
git stash
git pull
pm2 restart ./bin/www
