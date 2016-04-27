json.array! @users do |user|
  json.(user, :id, :phone_number)
  name_first = user.name_first ? user.name_first.capitalize : nil
  name_last = user.name_last ? user.name_last.capitalize : nil
  name_full = name_last ? "#{name_first} #{name_last}" : name_first
  json.name_first name_first
  json.name_last name_last
  json.name_full name_full
end
