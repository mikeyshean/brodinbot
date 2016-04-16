class Trigger < ActiveRecord::Base
  validates :category, presence: true, uniqueness: true
  has_many :trigger_strings
  has_many :workflow_responses
end
