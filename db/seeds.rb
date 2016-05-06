# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


new_user_workflow1 = Workflow.create!(name: 'New User')
new_user_workflow2 = Workflow.create!(name: 'Suggest Exercises')
new_user_workflow3 = Workflow.create!(name: 'Save Reps')
response1 = Response.create!(body: "Welcome to BotChat!  What should I call you?")
response4 = Response.create!(body: 'Sorry, what\'s your name?')
action1 = Action.create!(method: 'save_user_name')
action2 = Action.create!(method: 'name_first')
response2 = Response.create!(body: 'Alright, I\'ll call you *var', action_id: action2.id)
workflow_response1 = new_user_workflow1.workflow_responses.create!(actionable_id: response1.id, actionable_type: response1.class, is_root: true)
workflow_response2 = new_user_workflow1.workflow_responses.create!(actionable_id: action1.id, actionable_type: action1.class)
workflow_response1.outgoing_edges.create!(target_id: workflow_response2.id)
workflow_response3 = new_user_workflow1.workflow_responses.create!(actionable_id: response2.id, actionable_type: response2.class, terminates: true)
workflow_response4 = new_user_workflow1.workflow_responses.create!(actionable_id: response4.id, actionable_type: response4.class, terminates: true)
workflow_response2.outgoing_edges.create!(target_id: workflow_response3.id)
workflow_response2.outgoing_edges.create!(target_id: workflow_response4.id)
workflow_response4.outgoing_edges.create!(target_id: workflow_response2.id)

# Triggers
triggers = {
  'Confirm' => ['yes', 'yeah', 'yah', 'ya', 'ok', 'okay', 'sure', 'kk', 'k', 'alright', 'y'],
  'Deny' => ['no', 'nope', 'nah', 'neg', 'negative', 'n'],
  'Indifferent' => ['maybe', 'i dont know', 'i dunno', 'dunno', 'idk', 'i dnt knw', 'i dnt know'],
  'Commands' => ['help', 'commands', 'menu'],
  'Favorites' => ['favorites', 'faves', 'fav', 'fave'],
  'Query' => ['get', 'list'],
  'One Word Capture' => ['*^([a-z]+)$'],
  'Two Word Capture' => ['*^([a-z]+)$ *^([a-z]+)$'],
  'Action Success' => [],
  'Action Fail' => []
}

triggers.each do |type, trigger_strings|
  trigger = Trigger.create!(category: type)

  trigger_strings.each do |trigger_string|
    trigger.trigger_strings.create!(text: trigger_string)
  end
  if type == 'One Word Capture'
    workflow_response2.trigger_id = trigger.id
    workflow_response2.save!
  elsif type == 'Action Success'
    workflow_response3.trigger_id = trigger.id
    workflow_response3.save!
  elsif type == 'Action Fail'
    workflow_response4.trigger_id = trigger.id
    workflow_response4.save!
  end

end
