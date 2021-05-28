ecs-cli configure --cluster todo-cluster-cmdl --default-launch-type FARGATE --config-name todo-config-cmdl --region ap-south-1
ecs-cli configure profile --access-key --secret-key --profile-name todo-profile-cmdl
ecs-cli compose --project-name todo-container-cmdl service up --cluster-config todo-config-cmdl --ecs-profile todo-profile-cmdl
