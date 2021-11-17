# frozen_string_literal: true

class AttemptAnswer < ApplicationRecord
  belongs_to :question
  belongs_to :attempt
end
