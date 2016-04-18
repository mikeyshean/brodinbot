class Action < ActiveRecord::Base
  validates :method, presence: true
  has_many :workflow_responses, through: :actionable
end
