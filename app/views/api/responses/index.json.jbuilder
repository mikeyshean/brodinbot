json.array! @responses do |response|
  json.(response, :id, :label)
end
