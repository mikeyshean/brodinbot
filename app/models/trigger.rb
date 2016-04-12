class Trigger < ActiveRecord::Base
  validates :category, presence: true, uniqueness: true
  has_many :trigger_strings
end
