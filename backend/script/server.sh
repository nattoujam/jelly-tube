#!/bin/bash

bundle install
RAILS_ENV=production bundle exec rails db:setup
rm -f tmp/pids/server.pid

bundle exec rails s -p 3333 -b '0.0.0.0' -e production