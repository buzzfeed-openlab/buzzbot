#! /usr/bin/python
"""Modifies nginx configuration file on AWS Elastic Beanstalk to support
WebSocket connections."""

__author__ = "Sven Kreiss <me@svenkreiss.com>"
__version__ = "0.0.2"

import os


NGINX_CONF_FILE = '/etc/nginx/sites-enabled/elasticbeanstalk-nginx-docker-proxy.conf'
NGINX_CONFIG = """
    location /admin/socket.io {
        proxy_pass      http://docker/admin/socket.io;
        proxy_http_version      1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";

        proxy_set_header Host                $host;
        proxy_set_header X-Real-IP           $remote_addr;
        proxy_set_header X-Forwarded-For     $proxy_add_x_forwarded_for;
    }
"""


def file_contains_string(trigger='location /admin/socket.io'):
    with open(NGINX_CONF_FILE, 'r') as f:
        for line in f:
            if trigger in line:
                return True

    return False


def add_string_after_block(block='location /', string=NGINX_CONFIG):
    f = open(NGINX_CONF_FILE, 'r').readlines()
    new_f = []

    inside_block = False
    for line in f:
        new_f.append(line)

        if block in line:
            inside_block = True
        if inside_block and '}' in line:
            new_f += [l+'\n' for l in string.split('\n')]
            inside_block = False

    print new_f

    # overwrite config file
    f = open(NGINX_CONF_FILE, 'w')
    for line in new_f:
        f.write(line)
    f.close()


def restart_nginx():
    os.system("service nginx restart")


def main():
    print '--- NginX conf file exists ---'
    print NGINX_CONF_FILE
    isfile = os.path.isfile(NGINX_CONF_FILE)
    print isfile
    if not isfile:
        print 'abort'
        return

    print '--- Checking NginX configuration ---'
    already_fixed = file_contains_string()
    print already_fixed
    if already_fixed:
        print 'abort'
        return

    print '--- Changing NginX configuration ---'
    add_string_after_block()

    print '--- Restart NginX ---'
    restart_nginx()


if __name__ == "__main__":
    main()