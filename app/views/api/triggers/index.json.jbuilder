json.array! @triggers do |trigger|
  json.(trigger, :id, :category)
end
