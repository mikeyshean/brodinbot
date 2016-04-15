class User < ActiveRecord::Base
  validates :phone_number, presence: true
  has_many :messages

  def self.find_or_create_by_number(phone_number)
    response = { status: "Found" }
    user = User.find_by(phone_number: phone_number)

    if !user
      user = User.create!(phone_number: phone_number)
      response[:status] = "New"
    end
    response[:user] = user
    return response
  end
end
