class User < ActiveRecord::Base
  validates :phone_number, presence: true

  def self.find_or_create_by_number(phone_number)
    user = User.find_by(phone_number: phone_number)

    if !user
      User.create!(phone_number: phone_number)
    end
    return user
  end
end
