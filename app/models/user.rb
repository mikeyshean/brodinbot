class User < ActiveRecord::Base
  validates :phone_number, presence: true
  has_many :messages
  has_many :user_workflows
  attr_reader :is_new

  def self.find_or_create_by_number(phone_number)
    user = User.find_by(phone_number: phone_number)

    if !user
      user = User.create!(phone_number: phone_number)
    end

    return user
  end

  def has_active_workflow?
    @active_workflow = UserWorkflow.find_by(user_id: self.id, ended_at: nil)
  end

  def active_workflow
    @active_workflow
  end

  def is_new?
    @is_new ||= self.user_workflows.count == 0
  end
end
