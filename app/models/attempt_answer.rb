# frozen_string_literal: true

class AttemptAnswer < ApplicationRecord
  belongs_to :question
  belongs_to :attempt
  validates :attempt_id, uniqueness: { scope: :question_id }
  validates :attempted_answer, presence: true
end
