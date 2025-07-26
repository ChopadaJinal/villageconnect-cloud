Project Overview

VillageConnect is a simple static front-end (HTML/CSS) paired with a lightweight Node.js backend API. It aims to provide rural communities with announcements and essential services. This repository contains all source code, documentation, and deployment scripts for AWS.

Architecture

<img width="430" height="446" alt="image" src="https://github.com/user-attachments/assets/67e611d6-9dbd-4169-99ad-8581a2d1a4be" />


## Prerequisites

- An AWS account with permissions to create S3 buckets, EC2 instances, IAM roles, and CloudWatch resources.
- AWS CLI installed and configured with a default profile.
- Node.js (v14+) installed locally for testing the backend.
- Git for cloning this repository.

## Folder Structure

```text
villageconnect-cloud/
├── frontend/           # Static HTML/CSS site
│   ├── index.html
│   ├── styles.css
│   └── assets/         # Images, icons
│       └── logo.png
├── backend/            # Node.js API
│   ├── index.js
│   ├── package.json
│   └── routes/
├── docs/               # Documentation and diagrams
├── README.md           # This file
└── deploy-scripts/     # Automation scripts (e.g., bash, CloudFormation templates)

```
Deployment Steps

1. Static Website on S3

Create S3 bucket

aws s3 mb s3://villageconnect-frontend

Enable static website hosting

aws s3 website s3://villageconnect-frontend --index-document index.html --error-document error.html

Configure Bucket Policy (make objects publicly readable):
```text
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::villageconnect-frontend/*"
  }]
}
```

Deploy files
  -aws s3 sync frontend/ s3://villageconnect-frontend
   
   <img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/b69d17bf-6aa0-4140-be4c-9720ef225de6" />

2. Backend API on EC2

 -Launch EC2 Instance

 -AMI: Amazon Linux 2

 -Instance Type: t2.micro (free tier)

 -Security Group: Allow inbound HTTP (port 80) and SSH (port 22)

1.Connect via SSH
  ssh -i path/to/key.pem ec2-user@<EC2_PUBLIC_IP>

2.Install Node.js & Git
  <img width="811" height="118" alt="image" src="https://github.com/user-attachments/assets/4aff8c61-6d2e-4f17-98e4-2c0aea995b44" />
3.Clone and start the app
       cd villageconnect-cloud/backend
       npm install
       node index.js

4.(Optional) Set up a process manager
       sudo npm install -g pm2
       pm2 start index.js --name villageconnect-backend
       pm2 startup
       pm2 save

5.Test API
       curl http://<EC2_PUBLIC_IP>:3000/health

3. Monitoring with CloudWatch
   - Create Alarms in CloudWatch Console

       EC2 CPU Utilization Alarm: Trigger if > 80% for 5 minutes.
       Memory Usage Alarm: Trigger if > 75% for 5 minutes. 
       Custom Log Metric (optional): Track specific API errors via CloudWatch Logs.
   
                     

<img width="1920" height="1080" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/fc01e9ea-d16b-45b6-86f3-727cde3bbb25" />

