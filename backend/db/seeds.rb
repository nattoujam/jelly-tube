# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# coding: utf-8
Video.create(:title => 'video1', :url => 'https://jelly-fish.local:3333/1/1.m3u8')
Video.create(:title => 'video2', :url => 'https://jelly-fish.local:3333/2/2.m3u8')
Video.create(:title => 'video3', :url => 'https://jelly-fish.local:3333/3/3.m3u8')
Video.create(:title => 'video4', :url => 'https://jelly-fish.local:3333/4/4.m3u8')
