json.array! @workflows do |workflow|
  json.(workflow, :id, :name, :is_active, :current_version)
end
