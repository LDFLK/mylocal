echo "AWS_EC2_IP_ADDRESS=$AWS_EC2_IP_ADDRESS"
echo "AWS_EC2_PEM_FILE=$AWS_EC2_PEM_FILE"
echo "AWS_EC2_USER=$AWS_EC2_USER"

EC2_SUDO="ssh -i $AWS_EC2_PEM_FILE $AWS_EC2_USER@$AWS_EC2_IP_ADDRESS sudo "

$EC2_SUDO docker pull nuuuwan/mylocal
$EC2_SUDO docker run -p 80:80 -d nuuuwan/mylocal
$EC2_SUDO docker ps
