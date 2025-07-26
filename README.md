Project Overview

    VillageConnect is a simple static front-end (HTML/CSS) paired with a lightweight Node.js backend API. It aims to provide rural communities with announcements and            essential services. This repository contains all source code, documentation, and deployment scripts for AWS.

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
    ├── backend/                    # Node.js backend
    │   ├── index.js                # Main server file
    │   ├── package.json            # Dependencies and metadata
    │   ├── package-lock.json       # Dependency lock file
    │   └── routes/                 # API routes
    │       └── userRoutes.js
    ├── deploy-scripts/            # CloudFormation and deployment scripts
    │   └── template.yaml           # Infrastructure as Code (IaC) template
    ├── docs/                      # Project-related documentation
    │   └── architecture.png        # Architecture diagram
    └── frontend/                  # Static frontend website
        ├── index.html              # Homepage HTML
        ├── styles.css              # Custom styles
        └── script.js               # JS logic for frontend


```
Deployment Steps
'''
    1. Static Website on S3
''
        1.Create S3 bucket

            aws s3 mb s3://villageconnect-frontend
'
        2.Enable static website hosting

            aws s3 website s3://villageconnect-frontend --index-document index.html --error-document error.html
'
        3. Configure Bucket Policy (make objects publicly readable):

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
'
            <img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/a4af53db-353d-4296-a695-9016fa4ec23d" />

'
        4. Deploy files
        
            aws s3 sync frontend/ s3://villageconnect-frontend
   '
            <img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/b69d17bf-6aa0-4140-be4c-9720ef225de6" />

2. Backend API on EC2

     -Launch EC2 Instance
    
     -AMI: Amazon Linux 2
    
     -Instance Type: t2.micro (free tier)
    
     -Security Group: Allow inbound  custom TCP(port 3000) and SSH (port 22)
 

    1.Connect via SSH
      ssh -i path/to/key.pem ec2-user@<EC2_PUBLIC_IP>
    
    2.Install Node.js & Git
    '
        sudo yum update -y
       ' 
        curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
        '
        sudo yum install -y nodejs git3.
    
    Clone and start the app
    '
        cd villageconnect-cloud/backend
     '
        npm install
      '
        node index.js
    
    
    6.Test API
   '
           curl http://<EC2_PUBLIC_IP>:3000/health
   

4. Monitoring with CloudWatch
   - Create Alarms in CloudWatch Console

       EC2 CPU Utilization Alarm: Trigger if > 50% for 5 minutes.

       Memory Usage Alarm: Trigger if > 75% for 5 minutes. 

       Custom Log Metric (optional): Track specific API errors via CloudWatch Logs.
   
                     
<img width="1920" height="1080" alt="Screenshot (23)" src="https://github.com/user-attachments/assets/21a71938-5440-4e44-84ca-3a769d0bef1c" />

<img width="1920" height="1080" alt="Screenshot (21)" src="https://github.com/user-attachments/assets/fc01e9ea-d16b-45b6-86f3-727cde3bbb25" />

