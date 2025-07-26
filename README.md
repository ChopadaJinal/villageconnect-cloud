Project Overview

VillageConnect is a simple static front-end (HTML/CSS) paired with a lightweight Node.js backend API. It aims to provide rural communities with announcements and essential services. This repository contains all source code, documentation, and deployment scripts for AWS.

Architecture

+------------+       +------------+
|            |       |            |
| S3 Bucket  | <---> |   Users    |
| (Static    |       | (Browser)  |
|  Website)  |       |            |
+------------+       +------------+S
       |
       | (API calls)
       v
+------------+       +---------------+
|            |       |               |
| EC2 Instance| ---> | CloudWatch    |
| (Node.js   |       | (Metrics,     |
|  Backend)  |       |  Alarms)      |
+------------+       +---------------+

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

Deployment Steps

1. Static Website on S3

Create S3 bucket

aws s3 mb s3://villageconnect-frontend

Enable static website hosting

aws s3 website s3://villageconnect-frontend --index-document index.html --error-document error.html

Configure Bucket Policy (make objects publicly readable):

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

Deploy files
  aws s3 sync frontend/ s3://villageconnect-frontend
   
   <img width="1920" height="1080" alt="Screenshot (15)" src="https://github.com/user-attachments/assets/b69d17bf-6aa0-4140-be4c-9720ef225de6" />

