# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


new_user_flow = Workflow.create!(name: 'New User')
response1 = Response.create!(body: "Welcome to BrodinBot!  What should I call you?")
response2 = Response.create!(body: 'Alright I\'ll call you #{var}')
new_user_flow.workflow_responses.create!(response_id: response1.id)
new_user_flow.workflow_responses.create!(response_id: response2.id, index: 1, parent_id: response1.id)

# Triggers
triggers = {
  'Confirm' => ['yes', 'yeah', 'yah', 'ya', 'ok', 'okay', 'sure', 'kk', 'k', 'alright', 'y'],
  'Deny' => ['no', 'nope', 'nah', 'neg', 'negative', 'n'],
  'Indifferent' => ['maybe', 'i dont know', 'i dunno', 'dunno', 'idk', 'i dnt knw', 'i dnt know'],
  'Commands' => ['help', 'commands', 'menu'],
  'Favorites' => ['favorites', 'faves', 'fav', 'fave'],
  'Query' => ['get', 'list'],
  'First Word' => ['^[a-z]+(\s|$)']
}

triggers.each do |type, trigger_strings|
  trigger = Trigger.create!(category: type)

  trigger_strings.each do |trigger_string|
    trigger.trigger_strings.create!(text: trigger_string)
  end
  if type == 'First Word'
    response2.trigger_id = trigger_id
    response2.save!
  end
end
