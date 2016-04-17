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
response3 = Response.create!(body: 'You confirmed :)')
response4 = Response.create!(body: 'You denied :(')
new_user_flow.workflow_responses.create!(response_id: response1.id)
workflow_response2 = new_user_flow.workflow_responses.create!(response_id: response2.id, terminates: true, parent_id: response1.id)
workflow_response3 = new_user_flow.workflow_responses.create!(response_id: response3.id, terminates: true, parent_id: response1.id)
workflow_response4 = new_user_flow.workflow_responses.create!(response_id: response4.id, terminates: true, parent_id: response1.id)

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
    workflow_response2.trigger_id = trigger.id
    workflow_response2.save!
  elsif type == 'Confirm'
    workflow_response3.trigger_id = trigger.id
    workflow_response3.save!
  elsif type == 'Deny'
    workflow_response4.trigger_id = trigger.id
    workflow_response4.save!
  end

end
