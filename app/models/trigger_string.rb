class TriggerString < ActiveRecord::Base
  validates :text, presence: true
  belongs_to :trigger
end
