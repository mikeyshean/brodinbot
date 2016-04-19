json.array! @workflows do |workflow|
  json.(workflow, :id, :name, :is_active)
end
