# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


new_user_flow = Workflow.create!(name: 'New User')

new_user_flow.responses.create!(body: "Welcome to BrodinBot!  What should I call you?", index: 0)
