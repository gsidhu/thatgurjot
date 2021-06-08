---
title: "How to set up Commento self-hosting"
date: 2021-06-08T08:11:05+05:30
lastmod: 2021-06-08T08:11:05+05:30
draft: false
keywords: ["commento", "how to", "tutorial", "self-hosting", "foss"]
description: ""
tags: ['commento', 'tutorial']
categories: ['how-to']
author: ""
hiddenFromHomePage: false
layout: "single"
---

This post is saved here for posterity. I hope it helps someone out.

---

Care about your user’s privacy? Hate ads? Running Ubuntu + Nginx configuration? This is for you.

After using Disqus for the initial setup on Chachi, I decided it was time that I moved away to a privacy-first solution.

Enter [Commento](https://commento.io/) — a fast, privacy-focused commenting platform.

> Shoutout to [Paolo Tagliaferri](https://www.paolotagliaferri.com/add-self-hosted-commento-comments-to-ghost-blog/) for his detailed tutorial.

Most of what I write here draws on his article. The only reason I decided to write this article is that I wanted to cover a bit more ground than Paolo did. And because I wanted to document the process for myself.

Here’s how I set Commento up on my blog.

## The Structure
There are five main steps to this –
1. Setting up PostgreSQL.
2. Installing Commento.
3. Configuring DNS, Nginx and Let’s Encrypt.
4. Running Commento as a system service.
5. Setting up Commento admin dashboard.

### Requirements
This post assumes that you are running an Ubuntu machine (VPS) and use Nginx to handle the reverse proxy to your site.

## The Process
Let’s get into it. First, some cleaning up –

`sudo apt update`

### Setting up PostgreSQL

Install the necessary packages –

`sudo apt install postgresql postgresql-contrib`

Start the postgresql service, check if it’s working correctly and make it run on boot by default –

```
sudo systemctl start postgresql
sudo systemctl status postgresql # should return a green light!
sudo systemctl enable postgresql
```

Now let’s set up the user and database –

```
# switching to the default postgres user
sudo -i -u postgres

# calling up the SQL shell
psql

# this creates the user 'commento'
CREATE ROLE commento WITH LOGIN;

# set up a password for the user 'commento'
\password commento

# create a db to store all commento data
CREATE DATABASE commento;

# check if the database was created
\l

# quit the SQL shell 
\q

# quit the postgres user
exit
```

Excellent. Your PostgreSQL database and user is now set up and receiving on the default port (5432).

## Installing Commento

First we create a new user on our machine. You could do this within your normal user (don’t use root please) but that makes cleaning up difficult. With a separate user you can just use `sudo deluser --remove-home commento` and get rid of most things.

Anyway, the user –

```
# create new user and give it a nice password
sudo adduser commento
```

Get the latest release binary here. Time to install Commento –

```
# switch to the newly created user
sudo -i -u commento

# make sure you are in the root directory
cd

# download the latest release binary
wget https://dl.commento.io/release/commento-v1.8.0-linux-glibc-amd64.tar.gz

# create a new folder where Commento will be installed
mkdir commento-v1.8.0

# unzip the gzip file into that folder
tar xvf commento-v1.8.0-linux-glibc-amd64.tar.gz -C commento-v1.8.0

# create a new folder with a symlink to the commento folder
# this way when you update commento
# you just need to symlink it to this folder 
ln -s commento-v1.8.0 commento-latest
```

Congratulations. You have installed Commento. But it won’t work yet.

We need to define the environment variables first –

```
# create a new file that stores the environment variables
nano /home/commento/commento.env
```

Copy the following configuration –

```
# Set binding values
COMMENTO_ORIGIN=https://commento.<YOUR DOMAIN>
COMMENTO_PORT=8081

# Set PostgreSQL settings
COMMENTO_POSTGRES=postgres://commento:<THAT POSTGRES PASSWORD>@127.0.0.1:5432/commento?sslmode=disable

# Set the SMTP credentials when you have them
# COMMENTO_SMTP_HOST=
# COMMENTO_SMTP_PORT=
# COMMENTO_SMTP_USERNAME=
# COMMENTO_SMTP_PASSWORD=
# COMMENTO_SMTP_FROM_ADDRESS=no-reply@<YOUR DOMAIN>

# Uncomment this after creating your first user
# COMMENTO_FORBID_NEW_OWNERS=true

# Set Google OAuth credentials
# COMMENTO_GOOGLE_KEY=YOUR_KEY_HERE
# COMMENTO_GOOGLE_SECRET=YOUR_SECRET_HERE

# Akismet API key
# COMMENTO_AKISMET_KEY=YOUR_API_KEY_HERE
```

One last step –

```
# logout from the commento user
exit
```

## Configuring DNS, Nginx and Let’s Encrypt

Find out how you can create a new A record on your domain name provider. It should usually be under the DNS settings somewhere. When you do figure it out, we will create a new subdomain on your site like so –

Create a new A record with the following properties –
* Name: commento
* Type: A 
* TTL: 1hr 
* IP: <Your VPS' IP Address>

Now we tell Nginx to direct traffic –

```
# Create a new site (eg. commento.myblog.com)
sudo nano /etc/nginx/sites-available/commento.<YOUR DOMAIN NAME>
```

```
# Copy the following configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    gzip off;
    server_name commento.<YOUR DOMAIN NAME>;
    root /var/www/html;

location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://127.0.0.1:8081;
    }
}
```

Important: We will use port 8081 for Commento. You can change this if you like but only do it if you know what you are doing. If you do change the port, remember to change the port value in the nginx server configuration above and in the `commento.env` file defined before.

Good, now we create a symlink to make sure this works –

`sudo ln -s /etc/nginx/sites-available/commento.<YOUR DOMAIN NAME> /etc/nginx/sites-enabled/commento.<YOUR DOMAIN NAME>`

Just a quick test to ensure that nothing is broken –

```
# this should say "test is successful"
sudo nginx -t
```

Brilliant. Time to get that HTTPS certificate. If you don’t already use Let’s Encrypt, you should. A quick search online should help you find a tutorial.

When you’ve got certbot on your system, run –

```
sudo certbot
# select the commento.<YOUR DOMAIN> option
# choose the redirect to https option for security
```
Well done. Time to breathe life into Commento.

## Running Commento as a system service

Create a new systemd service file –

`sudo nano /etc/systemd/system/commento.service`

Copy the following configuration –

```
[Unit]
Description=Commento daemon service
After=network.target postgresql.service

[Service]
Type=simple
ExecStart=/home/commento/commento-latest/commento
Environment=COMMENTO_CONFIG_FILE=/home/commento/commento.env

[Install]
WantedBy=multi-user.target
```

Tell Ubuntu to run Commento –

```
sudo systemctl start commento.service
sudo systemctl status commento.service # check green light here!
sudo systemctl enable commento.service
```

Now head over to commento.<YOUR DOMAIN NAME> and you should see the login page.

{{< img class="center" data-src="https://cdn-images-1.medium.com/max/800/1*BHZrjsiivKmM6jozcL7RsQ.png" caption="Feels good, eh?" alt="Commento Dashboard login page" >}}

## Setting up Commento admin dashboard

1. Go to commento.<YOUR DOMAIN NAME> and create a new user by signing up. Don’t lose these credentials.
2. Add your domain.
3. Click through the tabs. Set the relevant settings as you like.
4. Go to the installation guide tab and copy the HTML code.
5. Embed this code wherever you want the comment section to be in your site.

Great success. You have done it.

---

## Appendix
If for some reason you would like to investigate the Postgres DB using a GUI you should follow the steps in [this guide](https://blog.logrocket.com/setting-up-a-remote-postgres-database-server-on-ubuntu-18-04/). Basically, open the traffic to the Postgres server on your VPS to the world, then connect to it using a GUI tool like [Table Plus](https://tableplus.com/).